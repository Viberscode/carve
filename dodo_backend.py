from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlparse
from urllib.request import Request, urlopen
import base64
import hashlib
import hmac
import json
import os
import threading
import time

ROOT = Path(__file__).resolve().parent
SITE_URL = (os.environ.get("CARVE_SITE_URL") or "https://carve-lime.vercel.app").strip().rstrip("/")

if os.environ.get("VERCEL"):
    STORE_DIR = Path("/tmp/carve-dodo")
else:
    STORE_DIR = ROOT / "server-data"
STORE_PATH = STORE_DIR / "dodo-subscriptions.json"
SECRETS_PATH = ROOT / "dodo-secrets.json"

STORE_LOCK = threading.Lock()
ACTIVE_STATUSES = {"active"}
GRANT_EVENTS = {"subscription.active", "subscription.renewed"}
REVOKE_EVENTS = {
    "subscription.on_hold",
    "subscription.failed",
    "subscription.cancelled",
    "subscription.expired",
}
PLACEHOLDER_SECRETS = {
    "your_dodo_api_key",
    "whsec_your_webhook_signing_secret",
    "pdt_your_carve_plus_subscription",
}


def _env(name, default=""):
    return str(os.environ.get(name) or default).strip()


def _clean_secret(value):
    text = str(value or "").strip()
    if not text or text in PLACEHOLDER_SECRETS or text.startswith("your_"):
        return ""
    return text


def load_secrets():
    data = {}
    if SECRETS_PATH.exists():
        try:
            data = json.loads(SECRETS_PATH.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            data = {}
    mode = (_env("DODO_PAYMENTS_ENVIRONMENT") or str(data.get("mode") or "test")).lower()
    if mode in ("live", "live_mode", "prod", "production"):
        mode = "live"
    else:
        mode = "test"
    verify = data.get("verify_webhooks", True)
    if isinstance(verify, str):
        verify = verify.strip().lower() not in ("0", "false", "no")
    webhook_secret = _clean_secret(
        _env("DODO_PAYMENTS_WEBHOOK_KEY")
        or _env("DODO_PAYMENTS_WEBHOOK_SECRET")
        or data.get("webhook_secret")
    )
    return {
        "api_key": _clean_secret(_env("DODO_PAYMENTS_API_KEY") or data.get("api_key")),
        "webhook_secret": webhook_secret,
        "product_id": _clean_secret(_env("DODO_PAYMENTS_PRODUCT_ID") or data.get("product_id")),
        "mode": mode,
        "price_label": _env("DODO_PAYMENTS_PRICE_LABEL")
        or str(data.get("price_label") or "₹1500").strip()
        or "₹1500",
        "price_interval": _env("DODO_PAYMENTS_PRICE_INTERVAL")
        or str(data.get("price_interval") or "/mo").strip()
        or "/mo",
        "verify_webhooks": bool(verify) and bool(webhook_secret),
    }


def dodo_base(mode):
    return "https://live.dodopayments.com" if mode == "live" else "https://test.dodopayments.com"


def dodo_error_message(result):
    if not isinstance(result, dict):
        return str(result or "Dodo request failed")
    msg = result.get("message") or result.get("error") or result.get("detail")
    if isinstance(msg, list):
        parts = []
        for item in msg:
            if isinstance(item, dict):
                parts.append(str(item.get("msg") or item.get("message") or item))
            else:
                parts.append(str(item))
        return "; ".join(parts) or "Dodo request failed"
    if isinstance(msg, dict):
        return json.dumps(msg)
    if msg:
        return str(msg)
    return "Dodo request failed"


def dodo_request(method, path, body=None):
    secrets = load_secrets()
    api_key = secrets["api_key"]
    if not api_key:
        raise RuntimeError("Dodo API key is not configured")
    url = dodo_base(secrets["mode"]) + path
    raw = None if body is None else json.dumps(body).encode("utf-8")
    req = Request(url, data=raw, method=method)
    req.add_header("Authorization", "Bearer %s" % api_key)
    req.add_header("Accept", "application/json")
    req.add_header("User-Agent", "CARVE/1.0 (+https://carve-lime.vercel.app)")
    if raw is not None:
        req.add_header("Content-Type", "application/json")
    try:
        with urlopen(req, timeout=30) as res:
            payload = res.read().decode("utf-8")
            return res.status, json.loads(payload) if payload else {}
    except HTTPError as err:
        payload = err.read().decode("utf-8", errors="replace")
        try:
            parsed = json.loads(payload) if payload else {}
        except json.JSONDecodeError:
            parsed = {"message": payload or err.reason}
        return err.code, parsed
    except URLError as err:
        raise RuntimeError(str(err.reason or err)) from err


def empty_store():
    return {"users": {}, "sessions": {}, "subscriptions": {}}


def read_store():
    if not STORE_PATH.exists():
        return empty_store()
    try:
        data = json.loads(STORE_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return empty_store()
    data.setdefault("users", {})
    data.setdefault("sessions", {})
    data.setdefault("subscriptions", {})
    return data


def write_store(data):
    STORE_DIR.mkdir(parents=True, exist_ok=True)
    tmp = STORE_PATH.with_suffix(".tmp")
    tmp.write_text(json.dumps(data, indent=2), encoding="utf-8")
    tmp.replace(STORE_PATH)


def public_user(record):
    status = str((record or {}).get("status") or "")
    return {
        "active": status in ACTIVE_STATUSES,
        "status": status or "none",
        "subscription_id": (record or {}).get("subscription_id") or None,
        "next_billing_date": (record or {}).get("next_billing_date") or None,
    }


def upsert_user(store, user_id, **fields):
    user_id = str(user_id or "").strip()
    if not user_id:
        return None
    rec = dict(store["users"].get(user_id) or {})
    rec.update({k: v for k, v in fields.items() if v is not None})
    rec["updated_at"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    store["users"][user_id] = rec
    session_id = rec.get("session_id")
    if session_id:
        store["sessions"][session_id] = user_id
    sub_id = rec.get("subscription_id")
    if sub_id:
        store["subscriptions"][sub_id] = user_id
    email = str(rec.get("email") or "").strip().lower()
    if email:
        rec["email"] = email
    return rec


def find_user_id(store, *, user_id="", email="", subscription_id="", session_id=""):
    if user_id and user_id in store["users"]:
        return user_id
    if session_id and store["sessions"].get(session_id):
        return store["sessions"][session_id]
    if subscription_id and store["subscriptions"].get(subscription_id):
        return store["subscriptions"][subscription_id]
    email = str(email or "").strip().lower()
    if email:
        for uid, rec in store["users"].items():
            if str(rec.get("email") or "").strip().lower() == email:
                return uid
    return user_id or ""


def webhook_secret_bytes(secret):
    raw = str(secret or "").strip()
    if raw.startswith("whsec_"):
        raw = raw[6:]
    try:
        decoded = base64.b64decode(raw)
        if decoded:
            return decoded
    except Exception:
        pass
    return str(secret or "").encode("utf-8")


def verify_webhook(raw_body, headers, secret):
    msg_id = str(headers.get("Webhook-Id") or headers.get("webhook-id") or "")
    timestamp = str(headers.get("Webhook-Timestamp") or headers.get("webhook-timestamp") or "")
    signatures = str(headers.get("Webhook-Signature") or headers.get("webhook-signature") or "")
    if not (msg_id and timestamp and signatures and secret):
        return False
    try:
        ts = int(timestamp)
    except ValueError:
        return False
    if abs(time.time() - ts) > 300:
        return False
    signed = b"%s.%s.%s" % (msg_id.encode("utf-8"), timestamp.encode("utf-8"), raw_body)
    digest = hmac.new(webhook_secret_bytes(secret), signed, hashlib.sha256).digest()
    expected = base64.b64encode(digest).decode("ascii")
    candidates = []
    for part in signatures.split():
        if "," in part:
            version, value = part.split(",", 1)
            if version == "v1" and value:
                candidates.append(value)
        else:
            candidates.append(part)
    return any(hmac.compare_digest(expected, item) for item in candidates)


def extract_metadata(data):
    meta = data.get("metadata") if isinstance(data, dict) else None
    if not isinstance(meta, dict):
        obj = data.get("object") if isinstance(data, dict) else None
        if isinstance(obj, dict) and isinstance(obj.get("metadata"), dict):
            meta = obj["metadata"]
        else:
            meta = {}
    return meta


def extract_customer(data):
    customer = data.get("customer") if isinstance(data, dict) else None
    if isinstance(customer, dict):
        return customer
    obj = data.get("object") if isinstance(data, dict) else None
    if isinstance(obj, dict) and isinstance(obj.get("customer"), dict):
        return obj["customer"]
    return {}


def apply_subscription_event(event_type, data):
    meta = extract_metadata(data)
    customer = extract_customer(data)
    subscription_id = str(
        data.get("subscription_id") or (data.get("object") or {}).get("subscription_id") or ""
    ).strip()
    session_id = str(meta.get("carve_session_id") or data.get("checkout_session_id") or "").strip()
    user_id = str(meta.get("carve_user_id") or "").strip()
    email = str(
        meta.get("carve_email") or customer.get("email") or data.get("customer_email") or ""
    ).strip().lower()
    status = str(data.get("status") or "").strip().lower()
    if event_type in GRANT_EVENTS:
        status = "active"
    elif event_type in REVOKE_EVENTS:
        status = {
            "subscription.on_hold": "on_hold",
            "subscription.failed": "failed",
            "subscription.cancelled": "cancelled",
            "subscription.expired": "expired",
        }.get(event_type, status or "inactive")
    next_billing = data.get("next_billing_date") or (data.get("object") or {}).get("next_billing_date")
    customer_id = str(customer.get("customer_id") or customer.get("id") or "").strip()
    with STORE_LOCK:
        store = read_store()
        uid = find_user_id(
            store,
            user_id=user_id,
            email=email,
            subscription_id=subscription_id,
            session_id=session_id,
        )
        if not uid:
            uid = user_id or email
        if not uid:
            return
        upsert_user(
            store,
            uid,
            email=email or None,
            status=status or None,
            subscription_id=subscription_id or None,
            customer_id=customer_id or None,
            next_billing_date=next_billing,
        )
        write_store(store)


def session_ids_for_user(store, user_id, extra=""):
    ids = []
    extra = str(extra or "").strip()
    if extra:
        ids.append(extra)
    rec = store["users"].get(user_id) or {}
    if rec.get("session_id"):
        ids.append(rec["session_id"])
    for sid, uid in (store.get("sessions") or {}).items():
        if uid == user_id:
            ids.append(sid)
    unique = []
    seen = set()
    for sid in ids:
        if sid and sid not in seen:
            seen.add(sid)
            unique.append(sid)
    unique.reverse()
    return unique[:8]


def apply_checkout_payload(store, uid, session_id, payload):
    payment_status = str(payload.get("payment_status") or "").lower()
    payment_id = payload.get("payment_id")
    updates = {"session_id": session_id}
    if payment_status == "succeeded":
        updates["status"] = "active"
        if payment_id:
            pay_code, pay = dodo_request("GET", "/payments/%s" % payment_id)
            if pay_code == 200 and isinstance(pay, dict):
                sub_id = pay.get("subscription_id")
                if sub_id:
                    updates["subscription_id"] = sub_id
                nxt = None
                if isinstance(pay.get("subscription"), dict):
                    nxt = pay["subscription"].get("next_billing_date")
                if nxt:
                    updates["next_billing_date"] = nxt
                cust = pay.get("customer") if isinstance(pay.get("customer"), dict) else {}
                if cust.get("customer_id"):
                    updates["customer_id"] = cust.get("customer_id")
                if cust.get("email"):
                    updates["email"] = str(cust.get("email")).lower()
        rec = upsert_user(store, uid, **updates) or {}
        return rec, True
    if payment_status in ("failed", "cancelled"):
        rec = store["users"].get(uid) or {}
        if rec.get("status") not in ACTIVE_STATUSES:
            updates["status"] = payment_status
            rec = upsert_user(store, uid, **updates) or rec
        return rec, False
    return store["users"].get(uid) or {}, False


def _list_from(payload):
    if isinstance(payload, list):
        return payload
    if not isinstance(payload, dict):
        return []
    for key in ("items", "data", "customers", "subscriptions"):
        if isinstance(payload.get(key), list):
            return payload[key]
    return []


def lookup_dodo_by_email(email):
    email = str(email or "").strip().lower()
    if not email:
        return None
    code, payload = dodo_request("GET", "/customers?email=%s" % quote(email))
    customers = _list_from(payload)
    customer_id = ""
    for item in customers:
        if not isinstance(item, dict):
            continue
        if str(item.get("email") or "").strip().lower() == email:
            customer_id = str(item.get("customer_id") or item.get("id") or "").strip()
            if customer_id:
                break
    if not customer_id and isinstance(payload, dict):
        customer_id = str(payload.get("customer_id") or payload.get("id") or "").strip()
    if not customer_id:
        return None
    sub_code, subs = dodo_request("GET", "/subscriptions?customer_id=%s" % quote(customer_id))
    if sub_code != 200:
        return None
    product_id = load_secrets().get("product_id")
    for item in _list_from(subs):
        if not isinstance(item, dict):
            continue
        status = str(item.get("status") or "").lower()
        pdt = str(item.get("product_id") or "")
        if status in ACTIVE_STATUSES and (not product_id or not pdt or pdt == product_id):
            return {
                "status": "active",
                "subscription_id": item.get("subscription_id") or item.get("id"),
                "next_billing_date": item.get("next_billing_date"),
                "customer_id": customer_id,
                "email": email,
            }
    return None


def refresh_checkout_status(user_id, email="", session_id=""):
    with STORE_LOCK:
        store = read_store()
        uid = find_user_id(store, user_id=user_id, email=email, session_id=session_id)
        rec = dict(store["users"].get(uid) or {})
        if rec.get("status") in ACTIVE_STATUSES:
            return public_user(rec)
        pending = session_ids_for_user(store, uid or user_id, session_id)

    if session_id and session_id not in pending:
        pending = [session_id] + pending

    granted = False
    for sid in pending:
        code, payload = dodo_request("GET", "/checkouts/%s" % sid)
        if code != 200 or not isinstance(payload, dict):
            continue
        with STORE_LOCK:
            store = read_store()
            mapped = find_user_id(store, user_id=uid or user_id, email=email, session_id=sid)
            target = mapped or uid or user_id or email
            if not target:
                continue
            rec, ok = apply_checkout_payload(store, target, sid, payload)
            write_store(store)
        if ok:
            granted = True
            break
    if granted:
        return public_user(rec)

    remote = lookup_dodo_by_email(email)
    if remote:
        with STORE_LOCK:
            store = read_store()
            target = uid or user_id or email
            rec = upsert_user(store, target, **remote) or rec
            write_store(store)
        return public_user(rec)
    return public_user(rec)


def cors_origin(headers):
    origin = str(headers.get("Origin") or headers.get("origin") or "").strip()
    if not origin:
        return ""
    host = (urlparse(origin).hostname or "").lower()
    if host in ("127.0.0.1", "localhost", "::1", "carve-lime.vercel.app"):
        return origin
    if host.endswith(".vercel.app"):
        return origin
    if host.startswith("192.168.") or host.startswith("10."):
        return origin
    return ""


def config_payload():
    secrets = load_secrets()
    return {
        "configured": bool(secrets["api_key"] and secrets["product_id"]),
        "mode": secrets["mode"],
        "price_label": secrets["price_label"],
        "price_interval": secrets["price_interval"],
        "webhook_ready": bool(secrets["webhook_secret"]),
        "site": SITE_URL,
    }


def health_payload():
    secrets = load_secrets()
    if not secrets["api_key"] or not secrets["product_id"]:
        return 200, {"ok": False, "reason": "not_configured"}
    try:
        code, product = dodo_request("GET", "/products/%s" % secrets["product_id"])
    except RuntimeError as err:
        return 200, {"ok": False, "reason": str(err)}
    name = product.get("name") if isinstance(product, dict) else None
    recurring = product.get("is_recurring") if isinstance(product, dict) else None
    return 200, {
        "ok": code == 200,
        "mode": secrets["mode"],
        "product_http": code,
        "product_name": name,
        "is_recurring": recurring,
        "webhook_ready": bool(secrets["webhook_secret"]),
        "error": None if code == 200 else dodo_error_message(product),
    }


def create_checkout(payload, default_return_url=""):
    secrets = load_secrets()
    if not secrets["api_key"] or not secrets["product_id"]:
        return 503, {
            "error": "Dodo Payments is not configured. Set DODO_PAYMENTS_API_KEY and DODO_PAYMENTS_PRODUCT_ID on Vercel (or dodo-secrets.json locally)."
        }
    user_id = str(payload.get("user_id") or "").strip()
    email = str(payload.get("email") or "").strip()
    name = str(payload.get("name") or "CARVE member").strip() or "CARVE member"
    if not user_id or not email:
        return 400, {"error": "Signed-in Google user id and email are required"}
    return_url = str(payload.get("return_url") or "").strip() or default_return_url or (
        SITE_URL + "/?dodo_checkout=1"
    )
    body = {
        "product_cart": [{"product_id": secrets["product_id"], "quantity": 1}],
        "customer": {"email": email, "name": name},
        "return_url": return_url,
        "metadata": {"carve_user_id": user_id, "carve_email": email.lower()},
        "customization": {"theme": "dark"},
        "feature_flags": {"redirect_immediately": True},
    }
    try:
        code, result = dodo_request("POST", "/checkouts", body)
    except RuntimeError as err:
        return 502, {"error": str(err)}
    if code >= 400:
        return code, {"error": dodo_error_message(result), "details": result}
    session_id = result.get("session_id")
    checkout_url = result.get("checkout_url")
    if not checkout_url:
        return 502, {"error": "Dodo did not return a checkout URL", "details": result}
    with STORE_LOCK:
        store = read_store()
        upsert_user(
            store,
            user_id,
            email=email.lower(),
            session_id=session_id,
            status=(store["users"].get(user_id) or {}).get("status") or "checkout_created",
        )
        if session_id:
            store["sessions"][session_id] = user_id
        write_store(store)
    return 200, {"session_id": session_id, "checkout_url": checkout_url, "mode": secrets["mode"]}


def handle_webhook(raw_body, headers):
    secrets = load_secrets()
    if secrets["verify_webhooks"]:
        if not secrets["webhook_secret"]:
            return 503, {"error": "Webhook secret is not configured"}
        if not verify_webhook(raw_body, headers, secrets["webhook_secret"]):
            return 401, {"error": "Invalid webhook signature"}
    try:
        event = json.loads((raw_body or b"{}").decode("utf-8") or "{}")
    except json.JSONDecodeError:
        return 400, {"error": "Invalid JSON"}
    event_type = str(event.get("type") or "")
    data = event.get("data") if isinstance(event.get("data"), dict) else {}
    if event_type.startswith("subscription.") or event_type in ("payment.succeeded", "payment.failed"):
        if event_type == "payment.succeeded":
            event_type = "subscription.active"
        elif event_type == "payment.failed":
            event_type = "subscription.on_hold" if data.get("subscription_id") else "subscription.failed"
        apply_subscription_event(event_type, data)
    return 200, {"received": True}


def header_map(headers):
    if hasattr(headers, "items"):
        return {str(k): str(v) for k, v in headers.items()}
    return dict(headers or {})


def dispatch(method, path, query, headers, raw_body):
    method = (method or "GET").upper()
    path = (path or "").split("?")[0]
    headers = header_map(headers)
    query = query or {}

    def q(name):
        value = query.get(name)
        if isinstance(value, list):
            return str(value[0] or "").strip()
        return str(value or "").strip()

    if method == "OPTIONS" and path.startswith("/api/"):
        return 204, {}
    if method == "GET" and path == "/api/dodo/config":
        return 200, config_payload()
    if method == "GET" and path == "/api/dodo/health":
        return health_payload()
    if method == "GET" and path == "/api/dodo/status":
        user_id, email, session_id = q("user_id"), q("email"), q("session_id")
        if not user_id and not email and not session_id:
            return 400, {"error": "user_id or session_id is required"}
        try:
            return 200, refresh_checkout_status(user_id, email, session_id)
        except RuntimeError as err:
            with STORE_LOCK:
                store = read_store()
                uid = find_user_id(store, user_id=user_id, email=email, session_id=session_id)
                rec = store["users"].get(uid) or {}
            return 200, {**public_user(rec), "warning": str(err)}
    if method == "POST" and path == "/api/dodo/checkout":
        try:
            payload = json.loads((raw_body or b"{}").decode("utf-8") or "{}")
        except json.JSONDecodeError:
            return 400, {"error": "Invalid JSON"}
        return create_checkout(payload)
    if method == "POST" and path == "/api/dodo/webhook":
        return handle_webhook(raw_body or b"", headers)
    return 404, {"error": "Not found"}


def vercel_respond(handler, force_path):
    from urllib.parse import parse_qs, urlparse

    parsed = urlparse(handler.path)
    length = int(handler.headers.get("Content-Length") or 0)
    raw = handler.rfile.read(length) if length else b""
    code, payload = dispatch(
        handler.command, force_path, parse_qs(parsed.query), handler.headers, raw
    )
    body = b"" if code == 204 else json.dumps(payload).encode("utf-8")
    handler.send_response(code)
    origin = cors_origin(handler.headers)
    if origin:
        handler.send_header("Access-Control-Allow-Origin", origin)
        handler.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        handler.send_header("Access-Control-Allow-Headers", "Content-Type")
        handler.send_header("Vary", "Origin")
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Cache-Control", "no-store")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    if body:
        handler.wfile.write(body)
