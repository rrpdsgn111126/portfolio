# Portfolio component registry

This registry documents **approved implementations**, not idealized values from a Figma screenshot. Before copying any component, inspect its current HTML, final CSS cascade, JS controller (if any), and mobile media-query overrides. Do not alter a reference component unless explicitly requested.

Canonical references:
- Homepage: `index.html` + `home.css`
- Finam: `cases/finam/index.html` + `styles.css`
- Shared opt-in primitives: `shared/*.css`
- Interactive controllers: `components-carousel.js`, `text-reveal.js`, `image-reveal.js`, `home-interactions.js`, `home-intro-reveal.js`, `portfolio-home-spin.js`

## REFERENCE-INTRO — case introduction

Reference: Finam `#case-intro`, `#case-title`, `#intro-copy`, and `#intro-lead`. The desktop grid and mobile stacked composition are defined in `styles.css`. Preserve the approved typography and vertical start position when creating a new case; vary the copy and case slug. `shared/typography.css` supplies opt-in `.portfolio-display`, `.portfolio-lead` and `.portfolio-body` for new cases.

## REFERENCE-FEATURE — copy/media section

Reference: Finam `#key-visual` and `#modular-block-system`. Reuse `.feature`, `.feature-copy`, `.section-title`, `.media-frame`, `.media-artboard`, and `.full-bleed` with unique IDs. Left/right layouts (`.right-aligned`, `.left-inset`) and background/color variants must be explicitly selected; do not assume every case section is identical.

## REFERENCE-HOMEPAGE-CARD — project cards

Reference: `#home-work .home-project` in `index.html` and `home.css`; individual elements are indexed by `HOME-BLOCK-MAP.md`. Preserve the desktop alternating composition and the existing mobile one-image presentation. New cards need their own semantic IDs; do not reuse project-specific IDs or assume homepage cards are interchangeable with Finam `.info-card`.

## REFERENCE-INTERACTIONS — homepage and image reveal

Canonical behavior is in `home-interactions.js`, `home-intro-reveal.js`, `portfolio-home-spin.js`, `text-reveal.js`, and `image-reveal.js`. For star scroll/hover and entrance reveals, reuse the existing mechanism and honor `prefers-reduced-motion`. The behavior cannot be copied from a Figma static frame.

## Reference components: approved Finam patterns

### INFO-CARD-INSIGHTS — informational card group

- **Reference card:** `#insight-card-visual-style` inside `#insights` in `cases/finam/index.html`.
- **Reference group:** `#insight-grid` / `.insight-grid`.
- **Reference card class:** `.info-card`.
- **Use for:** groups of informational cards with a heading and descriptive text, especially when copying the visual rhythm of the Insights section.
- **Primary invariant:** card padding on every side, inter-card gap, and resulting layout across responsive breakpoints.
- **Source of truth:** current selectors and their final cascade in `styles.css`; the following values are a baseline snapshot and must be checked against the current file before modifying or copying.

| Viewport | Card padding | Gap between cards | Layout | Radius | Min height |
| --- | --- | --- | --- | --- | --- |
| Desktop, above 1100px | `24px` | `24px` | 3 equal columns | `20px` | `220px` |
| Intermediate, 768–1100px | `24px` | `24px` | 3 equal columns | `20px` | `220px` |
| Mobile, up to 767px | `6.25vw` each side (20px at 320px viewport) | `4.375vw` (14px at 320px viewport) | stacked, single column | `16px` | content-driven (`0`) |

- Mobile overrides defined **later** in `styles.css` override earlier `.info-card{padding:20px}` and `.insight-grid{gap:12px}` declarations. Preserve the *computed* outcome, not just the first matching rule.
- Mobile horizontal page gutter is also `6.25vw` via `--pad`. Keep card **internal padding** distinct from the page's external gutter.
- The reference card's inner structure is `<article class="info-card"><h3>…</h3><p>…</p></article>`. Maintain the existing heading/body spacing when applying the card pattern.
- Reuse `.insight-grid` and `.info-card` where appropriate; if cards in a different section need special styling, scope it without altering the approved Insights set.

## Text punctuation — no final periods

- **Never end a paragraph with a period** anywhere on the Finam page, including introduction, section descriptions, informational cards, and results captions.
- Keep punctuation **between sentences within the same paragraph**. Remove only a final `.` from the paragraph's rendered text; do not rewrite its content or remove sentence-internal periods.
- When adding, translating, or editing text, check **every `<p>` in `cases/finam/index.html`** for trailing periods before publishing, even paragraphs outside the edited section.

### CAROUSEL-COMPONENTS — reference carousel for comparable galleries

- **Canonical implementation:** `#components-carousel` within `#components-media` in `cases/finam/index.html`, its selectors (including final media-query overrides) in `styles.css`, and the shared controller in `components-carousel.js` (also used by `#key-visual-carousel` and `#modular-carousel`).
- **Scope:** use as the structural and behavioral basis for new or explicitly requested changes to comparable image carousels. The canonical carousel and all three existing galleries were explicitly updated to crossfade. Preserve their images, content, intrinsic image proportions, per-section canvas dimensions, and other intentional differences.
- **HTML:** focusable `role="region"` / `aria-roledescription="carousel"`, containing an overflow-hidden viewport, a stacked slide container, previous/next buttons, and one accessible pagination button per slide. New instances must use unique IDs and properly matched selectors/JS; never reuse reference IDs.
- **Slide mechanics:** shared **crossfade** for all analogous galleries: no horizontal translation. Slides are stacked in the same viewport with `position:absolute;inset:0`, and switch simultaneously using `transition: opacity 400ms ease-in-out` in either direction. Incoming slide opacity `0 → 1`, outgoing `1 → 0`. Only the active slide receives pointer events, with the outgoing slide retained underneath until transition completion. Use `object-fit:contain`, never crop; preserve section-specific sizes and proportions. Account for image decode before activation and coalesce rapid input without exposing blank frames.
- **Desktop:** reference viewport width `59.15%` of artboard (specific to Components; do not force onto another section), fills artboard height. Preserve image width, aspect ratio, existing panel height and horizontal positioning. Round controls `40×40px`, centered vertically and inset `3.5%`, arrow font `30px`. Pagination dots are `8px` with `10px` gap; `75px` is the **former** bottom offset, now used only as a baseline for the dynamic spacing calculation.
- **Desktop vertical spacing standard (all slides, >=768px):** visually rendered image top to media-panel top **must equal** pagination bottom to media-panel bottom; image visible bottom to pagination top must be **exactly half the former gap** for the same active slide and viewport. Measure visible alpha bounds, including source transparency and object-fit letterboxing, rather than padding alone. The shared `components-carousel.js` controller sets `--carousel-visual-top` on each slide and `--carousel-pagination-bottom` on the root. CSS applies them only within `@media(min-width:768px)` and `.has-balanced-spacing`. Do not apply these desktop variables on mobile.
- **Measured desktop geometry in px:** original panel height `676px`, original slide insets `34px / 108px`, original pagination offset `75px`, dot height `8px`. Actual first-slide Chromium measurements at **1440, 1920, and 2560px** (same values because the artboard stays 1268px wide): Components **66.08 / 16.08 / 66.09px** (old gap 32.13px), Key Visual **73.31 / 20.88 / 73.31px** (old gap 41.75px), Modular **91.60 / 33.09 / 91.61px** (old gap 66.15px); values ordered as visual top / image-to-pagination / pagination bottom. These are **not fixed design tokens**: all remaining slides have individually calculated values according to their visible content. In GitHub Actions Playwright run 41095781813, all **78 slide/viewport checks passed**; maximum top-to-bottom discrepancy 0.015px and gap-to-half-baseline discrepancy 0.026px from subpixel rounding. Source alpha transparency is accounted for.
- **No cosmetic regressions:** Do not resize images, change image aspect ratios, horizontal padding, crossfade (`400ms ease-in-out`), image reveal, hover zoom, pagination appearance or mobile layout. Key Visual's original image height limit (`100cqh - 142px`) must remain effective after repositioning. Prefer preserving each panel's existing height rather than forcing new container heights.
- **Mobile (<=767px):** reference viewport width `91%` (section-specific), controls `30×30px`, arrow font `23px`, inset `1%`. **Final** mobile CSS overrides set the media panel to `height:auto;min-height:0;padding-block:34px`, artboard and slides to content height, carousel to relative column layout, images to intrinsic aspect ratio with `object-fit:contain`, and pagination in normal flow `margin-top:25px` (rather than desktop absolute positioning). Observe final cascade instead of copying earlier mobile `height:clamp(...)` declarations.
- **Navigation and accessibility:** previous/next arrows, dots, Left/Right keys, touch swipe with 40px threshold; wrap around; synchronize `is-current`, `aria-current`, and `aria-hidden`. Mobile viewport height follows the active image on load, resize, and slide change; height changes use `400ms ease-in-out` to avoid abrupt jumps. Support differing source aspect ratios. Preserve focus-visible outlines and disable opacity and height transitions for `prefers-reduced-motion:reduce`.
- **Reuse checklist:** inspect the original HTML, the full CSS cascade, and JS before building a similar carousel. Reuse controls, pagination rhythm, stacked-slide crossfade (same in both directions), navigation, and responsive behavior. All new analogous carousels must use this standard and preferably the shared controller, never a separate horizontal scroller. Do not hardcode the reference's 3 images, widths, fixed panel measurements, or identifiers into other carousels.
- **Verification:** compare desktop and mobile computed layout, image containment, controls, dots, swipes, keyboard control, rapid repeated input, simultaneous opacity transitions, absence of horizontal motion, active-slide sizing, and reduced motion. Do not claim visual/runtime verification if unavailable.

## Image shadow standard

- Apply this shared shadow to image surfaces that currently use the portfolio image shadow (including `.hero-tile` and `#examples-media .page-shot`).
- Desktop (above 767px): `box-shadow: 0 0 30px rgba(0, 0, 0, 0.25)`.
- Mobile (up to 767px): `box-shadow: 0 0 15px rgba(0, 0, 0, 0.25)`.
- Vertical offset is always `0`; do not introduce a downward shadow offset.
- Images whose shadow is explicitly reset to `box-shadow: none` remain unshadowed unless the task explicitly requests otherwise.

## Extension rule

If a requested composition differs from the registered reference, implement a scoped modifier and document the difference. Do not add speculative universal components. Register a new reusable pattern only after it is implemented, verified on desktop/mobile and intended for reuse.

## Finam tablet composition (768–1100px)

- Tablet content follows the existing `--pad:40px` outer gutter: `viewport width - 80px`. This aligns the left/right text blocks with the **visible two-image Hero group**, carousel images, and example artwork.
- The two Hero tile images retain their source geometry and are centered **as one group** via `#hero-artboard`. Their union occupies 82.0977918% of the artboard's width, so the tablet artboard is enlarged by `1 / 0.820977918` while its panel height scales proportionally. Their visible edges meet the existing 40px content gutters. Do not individually re-center or crop them.
- The three carousel viewports occupy the full readable content width. Their media panels expand to accommodate the tallest source artwork at full width while the existing desktop visible-alpha spacing algorithm keeps top/bottom margins balanced. Do not hardcode different image widths per slide.
- At tablet widths, the carousel slide hover zoom is disabled so artwork stays aligned with pagination; desktop >=1101px retains the 3% zoom. The Results text precedes a two-column tile grid within the same content width. Mobile <=767px and desktop >=1101px keep their separate rules.
- Verification: `.github/workflows/tablet-finam-audit.yml` checks 768/800/1024/1100px layout, and the existing carousel/hero workflows validate their own behavior.
