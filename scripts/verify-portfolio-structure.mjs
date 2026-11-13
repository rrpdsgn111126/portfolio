import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'cases/finam/index.html'];
const cssFiles = ['styles.css','shared/tokens.css','shared/typography.css','shared/layout.css','shared/components.css'];
let failures = 0;
function check(ok, message) {
  if (!ok) { console.error('ERROR: ' + message); failures++; }
}
function localFile(pagePath, url) {
  if (/^(?:https?:|data:|mailto:|tel:|#)/i.test(url)) return null;
  const cleaned = url.split(/[?#]/)[0];
  if (!cleaned) return null;
  return cleaned.startsWith('/') ? join(root,cleaned.slice(1)) : resolve(root,dirname(pagePath),cleaned);
}
for (const page of pages) {
  const abs=resolve(root,page);
  check(existsSync(abs),'Missing page: '+page);
  if (!existsSync(abs)) continue;
  const html=readFileSync(abs,'utf8');
  check(html.includes('Finam — Roman Khokhlov'),'Finam metadata missing: '+page);
  for (const sheet of ['tokens','typography','layout','components']) {
    check(html.includes('shared/'+sheet+'.css'),sheet+' CSS not linked in '+page);
  }
  const refs=html.matchAll(/\b(?:src|href)=["']([^"']+)["']/g);
  for (const ref of refs) {
    const target=localFile(page,ref[1]);
    if (target) check(existsSync(target),page+' references missing '+relative(root,target));
  }
  for (const p of html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)) {
    check(!/\.\s*$/.test(p[1].replace(/<[^>]+>/g,'').trim()),'Final period in paragraph: '+page);
  }
}
for (const css of cssFiles) check(existsSync(resolve(root,css)),'Missing stylesheet '+css);
const css=readFileSync(resolve(root,'styles.css'),'utf8');
for (const m of css.matchAll(/url\(\s*['"]?([^)'"]+)/g)){
  const target=localFile('styles.css',m[1]);
  if (target) check(existsSync(target),'Missing CSS asset '+relative(root,target));
}
if (failures) process.exitCode=1;
else console.log('Portfolio structure: HTML, shared CSS, assets and scripts OK');
