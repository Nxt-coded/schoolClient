import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, extname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const distDir = resolve(__dirname, '..', 'dist');
const require = createRequire(import.meta.url);

// Minimal static file server for dist/
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

const server = createServer((req, res) => {
  let urlPath = req.url.split('?')[0].replace(/^\//, '') || 'index.html';
  let filePath = resolve(distDir, urlPath);
  if (!existsSync(filePath) || !extname(filePath)) {
    filePath = resolve(distDir, 'index.html');
  }
  const ext = extname(filePath);
  const mime = mimeTypes[ext] || 'application/octet-stream';
  try {
    const content = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': mime });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 45678;

server.listen(PORT, async () => {
  console.log(`Static server running at http://localhost:${PORT}`);

  let rendered = false;

  try {
    // Use react-snap's bundled puppeteer v1.20.0
    const puppeteer = require('../node_modules/puppeteer/index.js');

    console.log('Launching browser via puppeteer v' + require('../node_modules/puppeteer/package.json').version + '...');

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    // Suppress console noise
    page.on('pageerror', () => {});
    page.on('requestfailed', () => {});

    await page.goto(`http://localhost:${PORT}/`, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    const html = await page.content();
    await browser.close();

    writeFileSync(resolve(distDir, '200.html'), html, 'utf8');
    writeFileSync(resolve(distDir, '404.html'), html, 'utf8');
    console.log('✅  Prerendered / -> dist/200.html and dist/404.html');
    rendered = true;
  } catch (err) {
    console.warn('⚠️  Puppeteer prerender failed:', err.message);
  }

  if (!rendered) {
    // Fallback: copy index.html for SPA routing (no JS prerendering)
    const idx = readFileSync(resolve(distDir, 'index.html'), 'utf8');
    writeFileSync(resolve(distDir, '200.html'), idx, 'utf8');
    writeFileSync(resolve(distDir, '404.html'), idx, 'utf8');
    console.log('⚠️  Fallback: copied index.html as 200.html and 404.html (SPA mode, no JS prerender)');
  }

  server.close();
});
