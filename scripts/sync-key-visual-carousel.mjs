import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const config = JSON.parse(await fs.readFile('key-visual-carousel.json', 'utf8'));
const token = process.env.FIGMA_TOKEN;
if (!token) throw new Error('FIGMA_TOKEN repository secret is required');
if (config.targetHtmlId !== 'key-visual-media') throw new Error('Unexpected target section');
if (!Array.isArray(config.frames) || config.frames.length !== 6) throw new Error('Exactly six Figma frames required');
if (new Set(config.frames.map(frame => frame.id)).size !== config.frames.length) throw new Error('Duplicate Figma node IDs');
if (new Set(config.frames.map(frame => frame.name)).size !== config.frames.length) throw new Error('Duplicate asset names');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function requestJSON(apiPath) {
  for (let attempt = 0; attempt < 7; attempt++) {
    const response = await fetch('https://api.figma.com/v1' + apiPath, {
      headers: {'X-Figma-Token': token}
    });
    if (response.status === 429 || response.status >= 500) {
      if (attempt === 6) throw new Error('Figma API failed after retry: ' + response.status);
      const retrySeconds = Number(response.headers.get('retry-after'));
      await sleep(Number.isFinite(retrySeconds) && retrySeconds > 0
        ? Math.min(retrySeconds * 1000, 180000)
        : Math.min(6000 * (2 ** attempt), 120000));
      continue;
    }
    if (!response.ok) throw new Error('Figma API HTTP ' + response.status + ': ' + (await response.text()).slice(0, 500));
    const data = await response.json();
    if (data.err || data.error) throw new Error('Figma API returned an error: ' + JSON.stringify(data).slice(0, 500));
    return data;
  }
}
async function download(url) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const response = await fetch(url);
    if (response.ok) return Buffer.from(await response.arrayBuffer());
    if (!(response.status === 429 || response.status >= 500) || attempt === 4) {
      throw new Error('Figma rendered image download failed: ' + response.status);
    }
    await sleep(1500 * (2 ** attempt));
  }
}

const ids = config.frames.map(frame => frame.id);
const nodes = await requestJSON('/files/' + config.fileKey + '/nodes?ids=' + encodeURIComponent(ids.join(',')));
for (const item of config.frames) {
  const node = nodes.nodes?.[item.id]?.document;
  if (!node || node.type !== 'FRAME') throw new Error('Target is not an individual Figma FRAME: ' + item.id);
  const w = node.absoluteBoundingBox?.width ?? node.size?.x;
  const h = node.absoluteBoundingBox?.height ?? node.size?.y;
  if (!(w > 0 && h > 0)) throw new Error('Invalid Figma frame dimensions: ' + item.id);
}

const render = await requestJSON('/images/' + config.fileKey + '?ids=' + encodeURIComponent(ids.join(',')) + '&format=png&scale=2');
const results = [];
const binaryFiles = new Map();

for (const item of config.frames) {
  const url = render.images?.[item.id];
  if (!url) throw new Error('Figma did not render frame ' + item.id);
  const input = await download(url);
  const inputInfo = await sharp(input).metadata();
  if (!inputInfo.width || !inputInfo.height) throw new Error('Cannot read PNG dimensions: ' + item.name);
  const optimized = await sharp(input).rotate()
    .resize({width: config.maximumPixelWidth ?? 1660, withoutEnlargement: true})
    .webp({quality: config.quality ?? 84, effort: 6, alphaQuality: 100})
    .toBuffer({resolveWithObject: true});
  if (optimized.info.width > (config.maximumPixelWidth ?? 1660)) throw new Error('Retina width limit exceeded');
  const inputRatio = inputInfo.width / inputInfo.height;
  const outputRatio = optimized.info.width / optimized.info.height;
  if (Math.abs(inputRatio - outputRatio) > .005) throw new Error('Aspect ratio changed: ' + item.name);
  const filename = item.name + '.webp';
  binaryFiles.set(filename, optimized.data);
  results.push({
    filename, figmaId: item.id, width: optimized.info.width, height: optimized.info.height,
    originalPNGBytes: input.length, optimizedWebPBytes: optimized.data.length
  });
}

const html = await fs.readFile('cases/finam/index.html', 'utf8');
for (const item of results) {
  if (!html.includes('src="../../assets/' + item.filename + '"'))
    throw new Error('Existing HTML asset mapping differs: ' + item.filename);
}
// Preserve the existing six-slide carousel and shared controller.

const assetDir = 'assets';
await fs.mkdir(assetDir, {recursive: true});
for (const [filename, bytes] of binaryFiles) await fs.writeFile(path.join(assetDir, filename), bytes);
// Do not modify HTML from an asset export.

const before = results.reduce((total, file) => total + file.originalPNGBytes, 0);
const after = results.reduce((total, file) => total + file.optimizedWebPBytes, 0);
let report = '# Key Visual Figma carousel export\n\n';
report += '- Figma file: ' + config.fileKey + '\n- Source section: ' + config.sourceSectionId + '\n';
report += '- Target: #' + config.targetHtmlId + '\n- Frames: ' + results.length + '\n';
report += '- Rendered PNG total: ' + before + ' bytes\n- Optimized WebP total: ' + after + ' bytes\n';
report += '- Reduction: ' + (100 * (1 - after / before)).toFixed(1) + '%\n';
report += '- Method: individually rendered Figma child frames (not the containing section), preserving each frame composition\n\n';
report += '| File | Figma ID | Dimensions | PNG (bytes) | WebP (bytes) |\n|---|---|---:|---:|---:|\n';
for (const item of results) report += '| ' + item.filename + ' | ' + item.figmaId + ' | ' + item.width + '×' + item.height + ' | ' + item.originalPNGBytes + ' | ' + item.optimizedWebPBytes + ' |\n';
await fs.writeFile('KEY-VISUAL-EXPORT-REPORT.md', report);
console.log(report);
