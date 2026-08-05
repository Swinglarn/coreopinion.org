/**
 * Minimal static server that mimics the Vercel config for coreopinion.org:
 * cleanUrls, trailingSlash:false, plus the rewrites in vercel.json.
 * Filesystem is checked BEFORE rewrites, matching Vercel's behaviour.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = require('path').join(__dirname, '..');
const PORT = 4177;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.woff2': 'font/woff2', '.mp4': 'video/mp4'
};

// rewrites from vercel.json, in order
const REWRITES = [
  [/^\/ideology\/[^/]+$/, '/ideology'],
  [/^\/party\/[^/]+$/, '/party'],
  [/^\/parties$/, '/party'],
  [/^\/parties\/[^/]+$/, '/party'],
];

function resolve(pathname) {
  const rel = decodeURIComponent(pathname).replace(/^\/+/, '').replace(/\/+$/, '');
  const candidates = rel === ''
    ? ['index.html']
    : [rel, rel + '.html', path.join(rel, 'index.html')];
  for (const c of candidates) {
    const p = path.join(ROOT, c);
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }
  return null;
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let file = resolve(url.pathname);

  if (!file) {
    for (const [re, dest] of REWRITES) {
      if (re.test(url.pathname)) { file = resolve(dest); break; }
    }
  }
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    return res.end('<h1>404</h1>');
  }
  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log('serving ' + ROOT + ' on http://localhost:' + PORT));
