import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('out');
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const types = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.txt':'text/plain', '.xml':'application/xml', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp', '.ico':'image/x-icon', '.woff2':'font/woff2', '.pdf':'application/pdf'};
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (base && pathname !== base && !pathname.startsWith(`${base}/`)) throw new Error('Outside base path');
    let file = resolve(root, `.${pathname.slice(base.length) || '/'}`);
    if (file !== root && !file.startsWith(root + sep)) throw new Error('Outside export');
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const data = await readFile(file);
    response.writeHead(200, {'Content-Type': types[extname(file)] || 'application/octet-stream'});
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch {
    response.writeHead(404, {'Content-Type':'text/html'});
    response.end(await readFile(resolve(root, '404.html')).catch(() => 'Not found'));
  }
}).listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log(`Static portfolio: http://127.0.0.1:${process.env.PORT || 3000}${base}/`));
