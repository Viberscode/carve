from http.server import BaseHTTPRequestHandler
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
import dodo_backend


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        dodo_backend.vercel_respond(self, "/api/dodo/config")

    def do_GET(self):
        dodo_backend.vercel_respond(self, "/api/dodo/config")

    def do_POST(self):
        dodo_backend.vercel_respond(self, "/api/dodo/config")
