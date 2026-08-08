import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const PORT = Number(process.env.PORT || 4173);
const PASSWORD = process.env.SITE_PASSWORD || '360EYE-LOCK';
const DIST_DIR = path.resolve('dist');
const SESSION_COOKIE = '360eye_auth';
const sessions = new Set();

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
};

function cookieHeader(name, value, extras = []) {
  return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; ${extras.join('; ')}`.trim();
}

function parseCookies(header = '') {
  return header.split(';').reduce((acc, part) => {
    const [rawKey, ...rest] = part.trim().split('=');
    if (!rawKey) return acc;
    acc[rawKey] = decodeURIComponent(rest.join('=') || '');
    return acc;
  }, {});
}

function isAuthenticated(req) {
  const cookies = parseCookies(req.headers.cookie || '');
  return cookies[SESSION_COOKIE] && sessions.has(cookies[SESSION_COOKIE]);
}

function loginPage(error = '') {
  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>360eye Archive Locked</title>
      <style>
        body { margin:0; min-height:100vh; display:grid; place-items:center; background:#181512; color:#f1e3c3; font-family:Inter,system-ui,sans-serif; }
        .card { width:min(560px, calc(100vw - 32px)); border:1px solid rgba(227,183,74,.22); background:#221d18; padding:28px; box-shadow:0 24px 60px rgba(0,0,0,.38); }
        h1 { font-family:monospace; letter-spacing:.08em; font-size:28px; margin:0 0 12px; }
        p { color:#8e806c; line-height:1.6; }
        label { display:block; margin:20px 0 8px; font-size:12px; letter-spacing:.18em; font-family:monospace; }
        input, button { width:100%; box-sizing:border-box; padding:14px 16px; font:600 14px monospace; }
        input { border:1px solid rgba(227,183,74,.22); background:#191512; color:#f1e3c3; }
        button { margin-top:12px; border:0; background:#e3b74a; color:#1b1713; cursor:pointer; }
        .error { color:#df5a43; min-height: 20px; margin-top:10px; }
        .foot { margin-top:16px; font-size:12px; }
      </style>
    </head>
    <body>
      <form class="card" method="post" action="/login">
        <h1>360EYE ARCHIVE LOCKED</h1>
        <p>Enter the server password to access the portfolio dashboard.</p>
        <label for="password">ACCESS PASSWORD</label>
        <input id="password" name="password" type="password" autocomplete="current-password" />
        <div class="error">${error}</div>
        <button type="submit">UNLOCK ARCHIVE</button>
        <div class="foot">Server password is not exposed in the client bundle.</div>
      </form>
    </body>
  </html>`;
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/login' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(loginPage());
    return;
  }

  if (url.pathname === '/login' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const attempt = params.get('password') || '';
      if (attempt === PASSWORD) {
        const token = crypto.randomUUID();
        sessions.add(token);
        res.writeHead(302, {
          Location: '/',
          'Set-Cookie': cookieHeader(SESSION_COOKIE, token, ['Max-Age=28800']),
        });
        res.end();
      } else {
        res.writeHead(401, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(loginPage('Incorrect password'));
      }
    });
    return;
  }

  if (url.pathname === '/logout') {
    const cookies = parseCookies(req.headers.cookie || '');
    if (cookies[SESSION_COOKIE]) sessions.delete(cookies[SESSION_COOKIE]);
    res.writeHead(302, {
      Location: '/login',
      'Set-Cookie': cookieHeader(SESSION_COOKIE, '', ['Max-Age=0']),
    });
    res.end();
    return;
  }

  if (!isAuthenticated(req)) {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return;
  }

  const requestPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const filePath = path.join(DIST_DIR, requestPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    serveFile(res, filePath);
    return;
  }

  serveFile(res, path.join(DIST_DIR, 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Secure portfolio server running on http://localhost:${PORT}`);
});
