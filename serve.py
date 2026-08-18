from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Accept-Ranges", "bytes")
        super().end_headers()

    def log_message(self, fmt, *args):
        print("[%s] %s" % (self.log_date_time_string(), fmt % args))

if __name__ == "__main__":
    host, port = "0.0.0.0", 8080
    httpd = ThreadingHTTPServer((host, port), Handler)
    print("CARVE serving at http://127.0.0.1:%s/" % port, flush=True)
    httpd.serve_forever()
