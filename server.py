#!/usr/bin/env python3
"""
人生简历 · 本地开发服务器
- 静态文件服务（伺服 preview.html 等）
- /api/ark  →  方舟 API 反向代理（解决浏览器 CORS 限制）
"""
from http.server import HTTPServer, SimpleHTTPRequestHandler
from socketserver import ThreadingMixIn
import json, urllib.request, urllib.error, os, sys

ARK_ENDPOINT = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions'
ARK_KEY      = os.environ.get('ARK_KEY')

class Handler(SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        if args and '/api/' in str(args[0]):
            print(f'  \033[36m[ARK]\033[0m {args[0]}  →  {args[1] if len(args)>1 else ""}')
        # 静默忽略静态文件日志

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors()
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/ark':
            if not ARK_KEY:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self._cors()
                self.end_headers()
                self.wfile.write(json.dumps({"error": "API Key not configured. Please set ARK_KEY environment variable."}).encode('utf-8'))
                return
            self._proxy_ark()
        else:
            self.send_error(404)

    def _proxy_ark(self):
        try:
            length = int(self.headers.get('Content-Length', 0))
            body   = self.rfile.read(length)

            req = urllib.request.Request(
                ARK_ENDPOINT, data=body,
                headers={
                    'Content-Type':  'application/json',
                    'Authorization': f'Bearer {ARK_KEY}'
                },
                method='POST'
            )
            with urllib.request.urlopen(req, timeout=60) as resp:
                data = resp.read()

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._cors()
            self.end_headers()
            self.wfile.write(data)

        except urllib.error.HTTPError as e:
            err = e.read()
            print(f'  \033[31m[ARK ERROR]\033[0m HTTP {e.code}: {err[:200]}')
            self.send_response(e.code)
            self.send_header('Content-Type', 'application/json')
            self._cors()
            self.end_headers()
            self.wfile.write(err)
        except Exception as e:
            msg = json.dumps({'error': str(e), 'type': type(e).__name__})
            print(f'  \033[31m[ARK ERROR]\033[0m {e}')
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self._cors()
            self.end_headers()
            self.wfile.write(msg.encode())

    def _cors(self):
        self.send_header('Access-Control-Allow-Origin',  '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

class ThreadingHTTPServer(ThreadingMixIn, HTTPServer):
    """每个请求在独立线程处理，支持并发 API 调用"""
    daemon_threads = True

if __name__ == '__main__':
    port   = int(os.environ.get('PORT', 8899))
    server = ThreadingHTTPServer(('0.0.0.0', port), Handler)
    print(f'\033[32m✓\033[0m 服务器启动：http://localhost:{port}')
    print(f'  打开游戏：http://localhost:{port}/preview.html')
    print(f'  方舟代理：http://localhost:{port}/api/ark')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n已停止。')
