import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'cases/finam/index.html'];
const cssFiles = ['home.css','styles.css','shared/tokens.css','shared/typography.css','shared/layout.css','shared/components.css'];
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
  check(html.includes(page==='index.html'?"roman's portfolio":'finam portal'),'Incorrect page metadata: '+page);
  for (const sheet of ['tokens','typography','layout','components']) {
    check(html.includes('shared/'+sheet+'.css'),sheet+' CSS not linked in '+page);
  }
  const ids = new Set();
  for (const element of html.matchAll(/<([a-z][\w:-]*)\b([^<>]*)>/gi)) {
    const matches = [...element[2].matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)];
    check(matches.length <= 1, page + ' has multiple id attributes on one element: ' + element[0].slice(0, 120));
    for (const match of matches) {
      check(!ids.has(match[1]), page + ' has duplicate id: ' + match[1]);
      ids.add(match[1]);
    }
  }
  if (page === 'cases/finam/index.html') {
    for (const id of ['insight-card-visual-style','insight-card-hierarchy','insight-card-emotion','key-visual-copy','components-copy','modular-copy','examples-copy','examples-row-one','examples-row-two','examples-row-three'])
      check(ids.has(id), 'Missing Finam block mapping #' + id);
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
const css=readFileSync(resolve(root,'styles.css'),'utf8')+'\n'+readFileSync(resolve(root,'home.css'),'utf8');
for (const m of css.matchAll(/url\(\s*['"]?([^)'"]+)/g)){
  const target=localFile('styles.css',m[1]);
  if (target) check(existsSync(target),'Missing CSS asset '+relative(root,target));
}
const homepage=readFileSync(resolve(root,'index.html'),'utf8');
const finam=readFileSync(resolve(root,'cases/finam/index.html'),'utf8');
check(homepage.includes('href="/cases/finam/"'),'Homepage Finam case link missing');
check(finam.includes('href="/"'),'Finam home link is not /');
check(!homepage.includes('id="case-title"'),'Homepage contains Finam-specific markup');
const scripts=['sync-components-carousel.mjs','sync-examples-media.mjs','sync-figma-images.mjs','sync-key-visual-carousel.mjs'];
for(const script of scripts) {
 const source=readFileSync(resolve(root,'scripts',script),'utf8');
 check(!source.includes("readFile('index.html'") && !source.includes("writeFile('index.html'"),'Figma script targets root index: '+script);
 check(!source.includes("writeFile('cases/finam/index.html'") && !source.includes('writeFile(htmlPath, html)'),'Asset export rewrites approved Finam HTML: '+script);
}
check(!existsSync(resolve(root,'scripts/build-finam-mirror.mjs')),'Retired mirror builder exists');
check(!existsSync(resolve(root,'scripts/reexport-modular-carousel.mjs')),'Retired competing four-slide exporter exists');
if (failures) process.exitCode=1;
else console.log('Portfolio structure: HTML, shared CSS, assets and scripts OK');
