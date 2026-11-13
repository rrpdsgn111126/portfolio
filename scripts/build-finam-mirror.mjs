import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const original = readFileSync(resolve(root, 'index.html'), 'utf8');
const nested = original
  .replaceAll('href="shared/', 'href="../../shared/')
  .replaceAll('href="styles.css"', 'href="../../styles.css"')
  .replaceAll('src="assets/', 'src="../../assets/')
  .replaceAll('src="portfolio-home-spin.js"', 'src="../../portfolio-home-spin.js"')
  .replaceAll('src="components-carousel.js"', 'src="../../components-carousel.js"')
  .replaceAll('src="text-reveal.js"', 'src="../../text-reveal.js"')
  .replaceAll('src="image-reveal.js"', 'src="../../image-reveal.js"')
  .replaceAll('src="debug-blocks.js"', 'src="../../debug-blocks.js"');
const destination = resolve(root, 'cases/finam/index.html');
if (process.argv.includes('--check')) {
  if (readFileSync(destination, 'utf8') !== nested) {
    console.error('Finam mirror is out of sync. Run node scripts/build-finam-mirror.mjs');
    process.exitCode = 1;
  } else {
    console.log('Finam mirror is current');
  }
} else {
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, nested);
  console.log('Updated cases/finam/index.html');
}
