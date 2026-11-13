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

Open `https://finam-case.pages.dev/?debug=blocks` to show clickable outlines and copyable block IDs on the homepage. The same shared `debug-blocks.js` is used on Finam. The complete ID registry is in [`HOME-BLOCK-MAP.md`](HOME-BLOCK-MAP.md). In the normal homepage mode no overlays are loaded.


## Hosting

Cloudflare project `finam-case` remains in place. `portfolio.pages.dev` is already occupied by an unrelated site and must not be treated as this repository's endpoint. Confirm the correct Cloudflare Pages project and hostname separately. No DNS or Cloudflare project settings are changed by this repository migration.

Repository: https://github.com/rrpdsgn111126/portfolio
