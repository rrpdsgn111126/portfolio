# Portfolio — shared styles and case studies

The portfolio is being expanded from the existing Finam site into a multi-page project.
The **same GitHub repository** and current Cloudflare Pages project remain in use.

## Current safe migration state

- `/` (root `index.html`) — **existing Finam page**, unchanged in content and behavior.
- `/cases/finam/` — mirrored Finam case, using root assets and shared styles.
- `/shared/` — reusable design tokens, typography, layout primitives and approved card components.
- Home page from Readymag is **not implemented yet**. It will replace `/` only after design and Cloudflare routing are checked.

Shared CSS loading order on every page:
```html
<link href="/shared/tokens.css" rel="stylesheet">
<link href="/shared/typography.css" rel="stylesheet">
<link href="/shared/layout.css" rel="stylesheet">
<link href="/shared/components.css" rel="stylesheet">
```
Load Google Fonts (Poppins 400, Unbounded 400/600/700) in the page head.
Case-specific CSS comes after shared CSS. See `shared/README.md` for the components.

For Finam, the nested page links use `../../shared/*.css` and `../../styles.css`.
Root `styles.css` retains **Finam-only** CSS and all carousel geometry and responsive overrides.
Do not copy Finam CSS wholesale for a new case.

## Figma automation

Existing Figma workflows still operate on root `index.html` and `assets/`.
Until the homepage is migrated, `scripts/build-finam-mirror.mjs` mirrors the root Finam
markup into `cases/finam/index.html`. Workflows that update root HTML also refresh this mirror.

To check locally with Node 20+:
```bash
node scripts/build-finam-mirror.mjs --check
node scripts/verify-portfolio-structure.mjs
```

Before replacing the root with the portfolio homepage: retarget Figma workflows to
`cases/finam/index.html`, stop mirroring root HTML, update its source-relative paths,
and preserve the original Finam layout. Do not do that as part of the current staging.

## Hosting

Current site: https://finam-case.pages.dev/ — existing Cloudflare Pages settings
have not been changed. Once the homepage and URLs are ready, verify Cloudflare
deployment, custom domain and redirects before changing `/`.

Repository: https://github.com/rrpdsgn111126/portfolio
