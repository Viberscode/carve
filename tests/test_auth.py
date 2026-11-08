"""Server-side sign-in checks. Google and Dodo are faked, so no network is used."""
import json
import os
import sys
import tempfile
import time
import unittest
from pathlib import Path
from unittest import mock

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import dodo_backend as backend

CLIENT_ID = backend.DEFAULT_GOOGLE_CLIENT_ID
GOOD_INFO = {
    "aud": CLIENT_ID,
    "sub": "google-sub-1",
    "email": "Ana@Example.com",
    "email_verified": "true",
    "expires_in": "3000",
}
USER = {"id": "google-sub-1", "email": "ana@example.com", "name": "Ana"}


def post_login(body):
    return backend.handle_request("POST", "/api/auth/google", {}, {}, json.dumps(body).encode())


def cookie_for(token):
    return {"Cookie": "other=1; %s=%s" % (backend.SESSION_COOKIE, token)}


class BackendCase(unittest.TestCase):
    def setUp(self):
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        directory = Path(tmp.name)
        for patcher in (
            mock.patch.object(backend, "STORE_DIR", directory),
            mock.patch.object(backend, "STORE_PATH", directory / "store.json"),
            mock.patch.object(backend, "SECRETS_PATH", directory / "missing.json"),
            mock.patch.dict(os.environ, {"CARVE_SESSION_SECRET": "s" * 48}),
        ):
            patcher.start()
            self.addCleanup(patcher.stop)
        os.environ.pop("VERCEL", None)
        os.environ.pop("CARVE_GOOGLE_CLIENT_ID", None)

    def google_returns(self, *responses):
        patcher = mock.patch.object(backend, "fetch_google_json", side_effect=list(responses))
        self.addCleanup(patcher.stop)
        return patcher.start()


class GoogleLoginTests(BackendCase):
    def test_access_token_creates_session_from_verified_identity(self):
        self.google_returns(
            (200, GOOD_INFO),
            (200, {"sub": "google-sub-1", "name": "Ana Rao", "given_name": "Ana", "picture": "p"}),
        )
        code, payload, headers = post_login({"access_token": "tok", "user_id": "attacker"})
        self.assertEqual(code, 200)
        self.assertEqual(payload["user"]["id"], "google-sub-1")
        self.assertEqual(payload["user"]["email"], "ana@example.com")
        self.assertEqual(payload["user"]["name"], "Ana Rao")
        cookie = headers["Set-Cookie"]
        self.assertIn("HttpOnly", cookie)
        self.assertIn("SameSite=Lax", cookie)
        token = cookie.split(";")[0].split("=", 1)[1]
        self.assertEqual(backend.read_session_token(token)["sub"], "google-sub-1")

    def test_id_token_creates_session(self):
        info = {**GOOD_INFO, "iss": "https://accounts.google.com", "exp": str(int(time.time()) + 60),
                "name": "Ana"}
        self.google_returns((200, info))
        code, payload, _ = post_login({"credential": "jwt"})
        self.assertEqual(code, 200)
        self.assertEqual(payload["user"]["name"], "Ana")

    def assert_rejected(self, info, body, expected=401):
        self.google_returns((200, info))
        code, payload, headers = post_login(body)
        self.assertEqual(code, expected)
        self.assertNotIn("Set-Cookie", headers)
        self.assertNotIn("user", payload)

    def test_token_for_another_app_is_rejected(self):
        self.assert_rejected({**GOOD_INFO, "aud": "other-app"}, {"access_token": "tok"})

    def test_unverified_email_is_rejected(self):
        self.assert_rejected({**GOOD_INFO, "email_verified": "false"}, {"access_token": "tok"}, 403)

    def test_id_token_with_wrong_issuer_is_rejected(self):
        info = {**GOOD_INFO, "iss": "evil", "exp": str(int(time.time()) + 60)}
        self.assert_rejected(info, {"credential": "jwt"})

    def test_expired_id_token_is_rejected(self):
        info = {**GOOD_INFO, "iss": "accounts.google.com", "exp": str(int(time.time()) - 1)}
        self.assert_rejected(info, {"credential": "jwt"})

    def test_token_google_calls_invalid_is_rejected(self):
        self.google_returns((400, {"error": "invalid_token"}))
        self.assertEqual(post_login({"access_token": "bad"})[0], 401)

    def test_missing_and_oversized_tokens_are_rejected(self):
        self.assertEqual(post_login({})[0], 400)
        self.assertEqual(post_login({"access_token": 5})[0], 400)
        self.assertEqual(post_login({"access_token": "x" * 9000})[0], 400)

    def test_google_outage_is_not_reported_as_invalid_token(self):
        self.google_returns(RuntimeError("Could not reach Google"))
        self.assertEqual(post_login({"access_token": "tok"})[0], 503)

    def test_vercel_without_secret_fails_closed(self):
        with mock.patch.dict(os.environ, {"VERCEL": "1", "CARVE_SESSION_SECRET": ""}):
            self.assertEqual(post_login({"access_token": "tok"})[0], 503)
            self.assertIsNone(backend.read_session_token("a.b"))

    def test_short_secret_fails_closed(self):
        with mock.patch.dict(os.environ, {"CARVE_SESSION_SECRET": "short"}):
            self.assertEqual(backend.session_secret(), b"")

    def test_local_secret_is_generated_once(self):
        with mock.patch.dict(os.environ, {"CARVE_SESSION_SECRET": ""}):
            first = backend.session_secret()
            self.assertGreaterEqual(len(first), 32)
            self.assertEqual(backend.session_secret(), first)

    def test_cookie_is_secure_behind_https(self):
        cookie = backend.session_cookie("t", {"x-forwarded-proto": "https"})
        self.assertIn("Secure", cookie)
        self.assertNotIn("Secure", backend.session_cookie("t", {}))

    def test_logout_clears_cookie(self):
        code, _, headers = backend.handle_request("POST", "/api/auth/logout", {}, {}, b"")
        self.assertEqual(code, 200)
        self.assertIn("Max-Age=0", headers["Set-Cookie"])


class SessionTokenTests(BackendCase):
    def test_tampered_token_is_rejected(self):
        body, signature = backend.issue_session_token(USER).split(".")
        forged = backend._b64url_encode(json.dumps({"sub": "victim", "email": "v@x.com",
                                                    "exp": int(time.time()) + 60}).encode())
        self.assertIsNone(backend.read_session_token("%s.%s" % (forged, signature)))
        self.assertIsNone(backend.read_session_token(body + ".AAAA"))
        self.assertIsNone(backend.read_session_token(body))
        self.assertIsNone(backend.read_session_token("é.é"))

    def test_token_from_another_secret_is_rejected(self):
        token = backend.issue_session_token(USER)
        with mock.patch.dict(os.environ, {"CARVE_SESSION_SECRET": "t" * 48}):
            self.assertIsNone(backend.read_session_token(token))

    def test_expired_token_is_rejected(self):
        issued = time.time() - backend.SESSION_TTL_SECONDS - 1
        self.assertIsNone(backend.read_session_token(backend.issue_session_token(USER, now=issued)))


class ProtectedEndpointTests(BackendCase):
    def fake_dodo(self):
        calls = []

        def respond(method, path, body=None):
            calls.append((method, path, body))
            if path == "/checkouts" and method == "POST":
                return 200, {"session_id": "cks_new", "checkout_url": "https://pay"}
            if path == "/checkouts/cks_victim":
                return 200, {"payment_status": "succeeded"}
            if path.startswith("/customers"):
                return 200, {"items": []}
            return 404, {}

        patcher = mock.patch.object(backend, "dodo_request", side_effect=respond)
        patcher.start()
        self.addCleanup(patcher.stop)
        env = mock.patch.dict(os.environ, {"DODO_PAYMENTS_API_KEY": "k", "DODO_PAYMENTS_PRODUCT_ID": "p"})
        env.start()
        self.addCleanup(env.stop)
        return calls

    def request(self, method, path, query=None, headers=None, body=b""):
        return backend.handle_request(method, path, query or {}, headers or {}, body)[:2]

    def test_status_requires_session_even_with_user_id(self):
        calls = self.fake_dodo()
        query = {"user_id": ["victim"], "email": ["victim@example.com"]}
        code, _ = self.request("GET", "/api/dodo/status", query)
        self.assertEqual(code, 401)
        self.assertEqual(calls, [])

    def test_forged_cookie_is_rejected(self):
        code, _ = self.request("GET", "/api/dodo/status", headers=cookie_for("forged.token"))
        self.assertEqual(code, 401)

    def test_status_ignores_user_id_and_email_in_query(self):
        calls = self.fake_dodo()
        token = backend.issue_session_token(USER)
        backend.write_store({
            "users": {"victim": {"status": "active", "email": "victim@example.com"}},
            "sessions": {}, "subscriptions": {},
        })
        query = {"user_id": ["victim"], "email": ["victim@example.com"]}
        code, payload = self.request("GET", "/api/dodo/status", query, cookie_for(token))
        self.assertEqual(code, 200)
        self.assertFalse(payload["active"])
        self.assertIn(("GET", "/customers?email=ana%40example.com", None), calls)

    def test_another_users_checkout_session_grants_nothing(self):
        calls = self.fake_dodo()
        token = backend.issue_session_token(USER)
        backend.write_store({
            "users": {"victim": {"email": "victim@example.com"}},
            "sessions": {"cks_victim": "victim"}, "subscriptions": {},
        })
        code, payload = self.request(
            "GET", "/api/dodo/status", {"session_id": ["cks_victim"]}, cookie_for(token)
        )
        self.assertEqual(code, 200)
        self.assertFalse(payload["active"])
        self.assertFalse(any(path == "/checkouts/cks_victim" for _, path, _ in calls))

    def test_unknown_checkout_session_grants_nothing(self):
        calls = self.fake_dodo()
        token = backend.issue_session_token(USER)
        code, payload = self.request(
            "GET", "/api/dodo/status", {"session_id": ["cks_victim"]}, cookie_for(token)
        )
        self.assertEqual(code, 200)
        self.assertFalse(payload["active"])
        self.assertFalse(any(path == "/checkouts/cks_victim" for _, path, _ in calls))

    def test_own_checkout_session_grants_access(self):
        self.fake_dodo()
        token = backend.issue_session_token(USER)
        backend.write_store({
            "users": {"google-sub-1": {"email": "ana@example.com"}},
            "sessions": {"cks_victim": "google-sub-1"}, "subscriptions": {},
        })
        _, payload = self.request(
            "GET", "/api/dodo/status", {"session_id": ["cks_victim"]}, cookie_for(token)
        )
        self.assertTrue(payload["active"])

    def test_checkout_requires_session(self):
        calls = self.fake_dodo()
        body = json.dumps({"user_id": "victim", "email": "victim@example.com"}).encode()
        code, _ = self.request("POST", "/api/dodo/checkout", body=body)
        self.assertEqual(code, 401)
        self.assertEqual(calls, [])

    def test_checkout_uses_session_identity_not_body(self):
        calls = self.fake_dodo()
        token = backend.issue_session_token(USER)
        body = json.dumps({"user_id": "victim", "email": "victim@example.com", "name": "V"}).encode()
        code, _ = self.request("POST", "/api/dodo/checkout", headers=cookie_for(token), body=body)
        self.assertEqual(code, 200)
        sent = calls[0][2]
        self.assertEqual(sent["metadata"]["carve_user_id"], "google-sub-1")
        self.assertEqual(sent["customer"]["email"], "ana@example.com")
        self.assertEqual(sent["customer"]["name"], "Ana")
        self.assertEqual(backend.read_store()["sessions"]["cks_new"], "google-sub-1")


class WebhookTests(BackendCase):
    EVENT = json.dumps({
        "type": "subscription.active",
        "data": {"metadata": {"carve_user_id": "attacker"}, "subscription_id": "sub_1"},
    }).encode()

    def test_unsigned_webhook_without_key_is_rejected(self):
        code, _ = backend.handle_webhook(self.EVENT, {})
        self.assertEqual(code, 503)
        self.assertEqual(backend.read_store()["users"], {})

    def test_badly_signed_webhook_is_rejected(self):
        with mock.patch.dict(os.environ, {"DODO_PAYMENTS_WEBHOOK_KEY": "whsec_c2VjcmV0"}):
            code, _ = backend.handle_webhook(self.EVENT, {"webhook-signature": "v1,bad"})
        self.assertEqual(code, 401)
        self.assertEqual(backend.read_store()["users"], {})


class AppBearerTests(ProtectedEndpointTests):
    def test_app_login_returns_token_web_login_does_not(self):
        for headers, expect in (({}, False), ({"X-Carve-Client": "android-app"}, True)):
            self.google_returns((200, GOOD_INFO), (200, {"sub": "google-sub-1", "name": "Ana"}))
            code, payload, _ = backend.handle_request(
                "POST", "/api/auth/google", {}, headers, json.dumps({"access_token": "tok"}).encode()
            )
            self.assertEqual(code, 200)
            self.assertEqual("session_token" in payload, expect)

    def test_bearer_token_opens_protected_endpoint(self):
        self.fake_dodo()
        token = backend.issue_session_token(USER)
        code, _ = self.request("GET", "/api/dodo/status", headers={"Authorization": "Bearer " + token})
        self.assertEqual(code, 200)

    def test_forged_bearer_is_rejected(self):
        code, _ = self.request("GET", "/api/dodo/status", headers={"Authorization": "Bearer forged.token"})
        self.assertEqual(code, 401)


class HiddenPathTests(unittest.TestCase):
    def test_secret_paths_stay_hidden(self):
        cwd = os.getcwd()
        self.addCleanup(os.chdir, cwd)
        import serve  # serve.py changes directory on import.

        for path in (
            "/dodo-secrets.json", "/DODO-SECRETS.JSON", "/server-data/session-secret",
            "/Server-Data/session-secret", "/x/../server-data/session-secret",
            "/%73erver-data/session-secret", "/server-data", "/x/..\\server-data/session-secret",
        ):
            self.assertTrue(serve.is_hidden_path(path), path)
        for path in ("/", "/index.html", "/script.js", "/server-database.js"):
            self.assertFalse(serve.is_hidden_path(path), path)


if __name__ == "__main__":
    unittest.main()
