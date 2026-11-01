import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '..', 'dist');
const indexFile = path.join(distDir, 'index.html');

if (!fs.existsSync(indexFile)) {
  console.error('index.html not found in dist. Make sure you run the build first.');
  process.exit(1);
}

// Remove stale react-snap output files so react-snap can run cleanly
for (const name of ['200.html', '404.html']) {
  const filePath = path.join(distDir, name);
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath);
    console.log(`Removed stale ${name} from dist.`);
  }
}

console.log('dist/index.html verified. react-snap will generate 200.html and 404.html.');
