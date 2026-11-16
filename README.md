# Roman Khokhlov — portfolio

## Routes

- `/` — portfolio homepage in `index.html`, composed with `home.css`
- `/cases/finam/` — original Finam case in `cases/finam/index.html`
- `/cases/{slug}/` — convention for future case migrations; no placeholder routes

The homepage reproduces the visible Readymag compositions for Beeline Family, AlfaForex and Equilibrium, then presents Finam in the same alternating layout. ST Forex is deliberately hidden, and Readymag's previously hidden archival list is excluded. Original artwork lives in `assets/home/`.

## Styles and synchronization

Shared typography, tokens, layout primitives and components are in `shared/`; each page loads the four shared stylesheets before its own layout CSS. Finam uses `styles.css` and existing carousel/image reveal controllers, without homepage layout rules.

All Figma export scripts operate on `cases/finam/index.html` and `assets/`. No process may overwrite homepage `index.html`. The old `build-finam-mirror.mjs` script has been removed.

## Checks

```sh
node scripts/verify-portfolio-structure.mjs
node scripts/verify-assets.mjs
node --check components-carousel.js
```

Playwright/Chromium audit workflows inspect Finam via `/cases/finam/`. Homepage browser tests use the original Readymag as reference.

## Block inspector

Open `https://portfolio-rrr.pages.dev/?debug=blocks` to show clickable outlines and copyable block IDs on the homepage. The same shared `debug-blocks.js` is used on Finam. The complete ID registry is in [`HOME-BLOCK-MAP.md`](HOME-BLOCK-MAP.md). In the normal homepage mode no overlays are loaded.


## Hosting

The primary deployment is Cloudflare Pages project `portfolio-rrr`, connected to `rrpdsgn111126/portfolio` with automatic production deployments from `main`.

- Homepage: https://portfolio-rrr.pages.dev/
- Finam case: https://portfolio-rrr.pages.dev/cases/finam/
- Block inspector: https://portfolio-rrr.pages.dev/?debug=blocks

`finam-case.pages.dev` is the older standalone Finam deployment, and the `romanportfolio` Worker is not the canonical portfolio site. Do not use those endpoints for the portfolio navigation or production browser checks. `portfolio.pages.dev` is owned by an unrelated project. Unmigrated case links remain on their original external sites until moved under `/cases/{slug}/`.

Repository: https://github.com/rrpdsgn111126/portfolio
