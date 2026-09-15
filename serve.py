# -*- coding: utf-8 -*-
"""
刷题应用专用服务器（替代裸 http.server）
原因：python -m http.server 不发 Cache-Control 头，浏览器启发式缓存 + 卡巴斯基
注入层会把旧的 app.js/data.js 钉在缓存里，改代码后页面仍跑旧版本。
本服务器给所有响应加 no-cache 头，强制浏览器每次向服务器验证新鲜度。
用法：python serve.py [端口]  （默认 8848，端口勿改，进度按 域名+端口 隔离）
"""
import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8848
ROOT = os.path.dirname(os.path.abspath(__file__))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()


if __name__ == '__main__':
    os.chdir(ROOT)
    srv = http.server.ThreadingHTTPServer(('0.0.0.0', PORT), NoCacheHandler)
    print(f'Serving {ROOT} at http://localhost:{PORT}/ (no-cache)')
    srv.serve_forever()
