from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse
import json
import os

import dodo_backend

os.chdir(dodo_backend.ROOT)

HIDDEN_PATHS = {"/dodo-secrets.json", "/dodo-secrets.example.json"}


class Handler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Accept-Ranges", "bytes")
        super().end_headers()

    def log_message(self, fmt, *args):
        print("[%s] %s" % (self.log_date_time_string(), fmt % args), flush=True)

    def _apply_cors(self):
        origin = dodo_backend.cors_origin(self.headers)
        if not origin:
            return
        self.send_header("Access-Control-Allow-Origin", origin)
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Vary", "Origin")

    def _send_json(self, code, obj):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self._apply_cors()
        super().end_headers()
        if code != 204:
            self.wfile.write(body)

    def _read_body(self):
        length = int(self.headers.get("Content-Length") or 0)
        return self.rfile.read(length) if length else b""

    def _dispatch(self):
        parsed = urlparse(self.path)
        if not parsed.path.startswith("/api/"):
            return False
        query = parse_qs(parsed.query)
        code, payload = dodo_backend.dispatch(
            self.command, parsed.path, query, self.headers, self._read_body()
        )
        self._send_json(code, payload)
        return True

    def do_OPTIONS(self):
        if not self._dispatch():
            self.send_error(404)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path in HIDDEN_PATHS or parsed.path.startswith("/server-data"):
            self.send_error(404)
            return
        if self._dispatch():
            return
        super().do_GET()

    def do_POST(self):
        if not self._dispatch():
            self.send_error(404)


def bind_server(host, port):
    try:
        return ThreadingHTTPServer((host, port), Handler)
    except OSError as err:
        print("Could not bind %s:%s (%s)" % (host, port, err), flush=True)
        return None


if __name__ == "__main__":
    port = int(dodo_backend._env("CARVE_PORT") or 5500)
    httpd = bind_server("0.0.0.0", port) or bind_server("127.0.0.1", port)
    if not httpd:
        raise SystemExit("Could not bind port %s." % port)
    print("CARVE  http://localhost:%s/" % port, flush=True)
    print("Site   %s" % dodo_backend.SITE_URL, flush=True)
    httpd.serve_forever()
