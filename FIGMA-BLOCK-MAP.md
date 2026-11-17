# Finam — HTML ↔ Figma mapping

Source: [Cases — Copy](https://www.figma.com/design/zG9GLaQaUXOhPeZC9VOBmx/), Figma file `zG9GLaQaUXOhPeZC9VOBmx`, Finam page `2301:627`, reference desktop root `2301:628`.

All HTML targets are in `cases/finam/index.html`. CSS: root `styles.css`. Inspector: root `debug-blocks.js`. IDs refer to site elements; parent Figma IDs for containers/cards are *approximate mappings* when no one-to-one frame was verified. Use `docs/FIGMA-WORKFLOW.md` for scope and export rules.

| Element | HTML ID | GitHub file | Figma Node ID |
|---|---|---|---|
| Header / portfolio link | `#site-header` | `cases/finam/index.html` | `2301:628` |
| Portfolio star | `#portfolio-home-link` | `cases/finam/index.html` | `2301:631` |
| Finam intro | `#case-intro` | `cases/finam/index.html` | `2301:633` |
| Finam title | `#case-title` | `cases/finam/index.html` | `2301:634` |
| Intro copy container | `#intro-copy` | `cases/finam/index.html` | `2301:635` |
| Intro headline | `#intro-lead` | `cases/finam/index.html` | `2301:636` |
| Hero showcase | `#hero-showcase` | `cases/finam/index.html` | `2304:1991` |
| Hero image group | `#hero-artboard` | `cases/finam/index.html` | `2401:2235` |
| Hero left image | `#hero-image-left` | `cases/finam/index.html` | `2401:2233` |
| Hero right image | `#hero-image-right` | `cases/finam/index.html` | `2401:2228` |
| Insights | `#insights` | `cases/finam/index.html` | `2301:644` |
| Insights heading | `#insights-title` | `cases/finam/index.html` | `2301:646` |
| Insights cards container | `#insight-grid` | `cases/finam/index.html` | `2301:648` |
| Visual style insight | `#insight-card-visual-style` | `cases/finam/index.html` | `2301:648` |
| Hierarchy insight | `#insight-card-hierarchy` | `cases/finam/index.html` | `2301:648` |
| Emotional insight | `#insight-card-emotion` | `cases/finam/index.html` | `2301:648` |
| Key visual | `#key-visual` | `cases/finam/index.html` | `2336:2023` |
| Key visual heading | `#visual-title` | `cases/finam/index.html` | `2301:656` |
| Key visual copy | `#key-visual-copy` | `cases/finam/index.html` | `2301:654` |
| Key visual artwork container | `#key-visual-media` | `cases/finam/index.html` | `2304:2007` |
| Key visual image | `#key-visual-image` | `cases/finam/index.html` | `2333:12271` |
| Modular Block System | `#modular-block-system` | `cases/finam/index.html` | `2343:1975` |
| Modular heading | `#block-title` | `cases/finam/index.html` | `2301:664` |
| Modular copy | `#modular-copy` | `cases/finam/index.html` | `2301:662` |
| Modular artwork container | `#modular-media` | `cases/finam/index.html` | `2334:2010` |
| Modular image | `#modular-image` | `cases/finam/index.html` | `2401:2239` |
| Components | `#components` | `cases/finam/index.html` | `2336:2024` |
| Components heading | `#components-title` | `cases/finam/index.html` | `2336:2028` |
| Components copy | `#components-copy` | `cases/finam/index.html` | `2336:2026` |
| Components artwork container | `#components-media` | `cases/finam/index.html` | `2336:2031` |
| Page examples | `#page-examples` | `cases/finam/index.html` | `2343:1976` |
| Page examples heading | `#examples-title` | `cases/finam/index.html` | `2343:1979` |
| Page examples copy | `#examples-copy` | `cases/finam/index.html` | `2343:1977` |
| Examples artwork | `#examples-media` | `cases/finam/index.html` | `2344:2011` |
| Examples grid | `#examples-stack` | `cases/finam/index.html` | `2344:2011` |
| Example row 1 | `#examples-row-one` | `cases/finam/index.html` | `2344:2011` |
| Example row 2 | `#examples-row-two` | `cases/finam/index.html` | `2344:2011` |
| Example row 3 | `#examples-row-three` | `cases/finam/index.html` | `2344:2011` |
| Page example 1 | `#example-image-one` | `cases/finam/index.html` | `2422:4224` |
| Page example 2 | `#example-image-two` | `cases/finam/index.html` | `2422:4225` |
| Page example 3 | `#example-image-three` | `cases/finam/index.html` | `2425:4249` |
| Page example 4 | `#example-image-four` | `cases/finam/index.html` | `2425:4251` |
| Page example 5 | `#example-image-five` | `cases/finam/index.html` | `2423:4230` |
| Page example 6 | `#example-image-six` | `cases/finam/index.html` | `2424:4238` |
| Results | `#results` | `cases/finam/index.html` | `2301:801` |
| Results heading | `#results-title` | `cases/finam/index.html` | `2301:805` |
| Results copy | `#results-intro` | `cases/finam/index.html` | `2301:803` |
| Results metrics grid | `#results-grid` | `cases/finam/index.html` | `2301:801` |

To inspect the site, open `https://portfolio-rrr.pages.dev/cases/finam/?debug=blocks`. Click a labeled block to copy its ID. Without the query parameter the inspector does not run.

## Modular carousel — five published slides

Current exporter: `figma-assets.json` → `scripts/sync-figma-images.mjs`. The live `#modular-carousel` in `cases/finam/index.html` has **five slides**, which must not be replaced by a four-slide HTML generator. The source Figma Section 4 (`4315:62167`) has four direct child frames, but the five-item export list includes **nested child frames**; this is why the old four-slide re-export was retired.

| Slide | Current configured Figma node | Exported asset |
|---|---|---|
| 1 | `4315:62168` | `assets/modular-slide-01.webp` |
| 2 | `4315:62230` | `assets/modular-slide-02.webp` |
| 3 | `4315:62292` | `assets/modular-slide-03.webp` |
| 4 | `4315:62380` | `assets/modular-slide-04.webp` |
| 5 | `4315:62440` | `assets/modular-slide-05.webp` |

These IDs have been verified to exist in Figma; the ordering is that of the export configuration, **not** a newly approved visual redesign. Before updating artwork, inspect the frames against the current website. The manual export updates assets only.

## Key Visual carousel (Figma Section 6)

Figma source: `zG9GLaQaUXOhPeZC9VOBmx`, section `4330:6979`.
Slides ordered top-to-bottom, left-to-right in the source gallery. Target: `#key-visual-media`.

| HTML ID | Figma node ID | Asset |
|---|---|---|
| `#key-visual-slide-1` / `#key-visual-image-1` | `4330:5948` | `assets/key-visual-slide-01.webp` |
| `#key-visual-slide-2` / `#key-visual-image-2` | `4330:5973` | `assets/key-visual-slide-02.webp` |
| `#key-visual-slide-3` / `#key-visual-image-3` | `4330:5902` | `assets/key-visual-slide-03.webp` |
| `#key-visual-slide-4` / `#key-visual-image-4` | `4330:5925` | `assets/key-visual-slide-04.webp` |
| `#key-visual-slide-5` / `#key-visual-image-5` | `4330:6019` | `assets/key-visual-slide-05.webp` |
| `#key-visual-slide-6` / `#key-visual-image-6` | `4330:5996` | `assets/key-visual-slide-06.webp` |

Carousel controls: `key-visual-carousel.js`. Styling: `styles.css`. Automated export: `scripts/sync-key-visual-carousel.mjs`, `key-visual-carousel.json`.

## Components carousel — source Section 7

Figma: `zG9GLaQaUXOhPeZC9VOBmx`, `4337:12973`.
Order follows original artboard layout: tall left frame, upper right frame, lower right frame. Only `#components-media` is replaced; the section heading and copy are preserved.

| HTML ID | GitHub file | Figma Node ID | Asset |
|---|---|---|---|
| `#components-media` | `cases/finam/index.html` | `4337:12973` | Carousel container |
| `#components-carousel` | `cases/finam/index.html` | `4337:12973` | Carousel region |
| `#components-carousel-track` | `cases/finam/index.html` | `4337:12973` | Slider track |
| `#components-slide-1` / `#components-image-1` | `cases/finam/index.html` | `4408:41190` | `components-slide-01.webp` |
| `#components-slide-2` / `#components-image-2` | `cases/finam/index.html` | `4337:9058` | `components-slide-02.webp` |
| `#components-slide-3` / `#components-image-3` | `cases/finam/index.html` | `4327:5812` | `components-slide-03.webp` |

Controls: `components-carousel.js`. Styles: `styles.css`. Export automation: `components-carousel.json`, `scripts/sync-components-carousel.mjs`, `.github/workflows/sync-components-carousel.yml`.
