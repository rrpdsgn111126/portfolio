# Figma → website workflow

This document describes the handoff between **editable design** and **published code**; it does not require both to be changed for every task. Entry points: `FIGMA.md` (design) and `AGENTS.md` (code).

## Ownership by output

| Requested change | Edit | Read-only reference |
| --- | --- | --- |
| New/updated visual layout or illustration | Figma target board | Existing site and component registry |
| Text on a published page | HTML in that case | Figma, if visual fit needs checking |
| Responsive CSS, hover, scroll and carousel behavior | HTML/CSS/JS | Figma composition |
| Existing approved component shared across cases | Shared code and explicitly affected cases | Figma references |
| Both Figma and site | Only elements explicitly covered by the task | Both instructions |

**Approved site behavior lives in code.** Figma is a compositional/editorial reference and source of graphics; there is no blanket two-way synchronization.

## Create a case from a Figma board

1. Identify the specific Figma file, page, board and viewport. Verify section hierarchy, copy and source images in the editable design.
2. Read `docs/COMPONENT-REGISTRY.md`, `shared/README.md`, `cases/finam/index.html` and `styles.css`. Match each new section to an established HTML/CSS reference **or** explicitly declare a new scoped variant. Do not quietly substitute another section.
3. Prepare a **case-specific mapping**: Figma file key + node ID; website path + unique element ID; reusable component; source graphic; image export dimensions. Mark uncertain mappings as unverified.
4. Implement at `cases/{slug}/index.html` with its own case stylesheet after `shared/*.css`. Maintain desktop/mobile behavior and accessibility. Do not duplicate Finam IDs or overwrite homepage.
5. Export only required artwork, preserving aspect ratios, transparency, content and consistent filenames. Compose layout and animations in code.
6. Validate HTML ID uniqueness, links, assets and Playwright/Chromium across affected viewports. Compare the published implementation to the intended Figma frame, without assuming that Figma has a native responsive equivalent.
7. Publish only after checks, then verify the deployed route. Do not invent a live URL or create a placeholder page before it is implemented.

## Editing Figma after site implementation

- Changes **only in Figma** remain only in Figma.
- A change **only on the website** updates code only; an old Figma frame does not override it.
- If synchronization is requested, identify the precise changed node/HTML ID pair and direction before editing; preserve all other approved content and interactions.
- The visual image exported from Figma is an **asset**, not markup, CSS, JS, DOM controls or accessible text.

## Existing Finam export jobs

The actions `sync-figma-images`, `sync-components-carousel`, `sync-key-visual-carousel`, and `sync-examples-media` are **manual-only**. They use `FIGMA_TOKEN` (GitHub Actions secret), export identified Figma nodes and replace matching `assets/*.webp` files. They must not rewrite the HTML or CSS and must not run automatically when a file changes on `main`.

- Hero + Modular: `figma-assets.json` and `scripts/sync-figma-images.mjs` (currently **five** Modular image assets plus two hero assets)
- Components: `components-carousel.json` and `scripts/sync-components-carousel.mjs` (three images)
- Key Visual: `key-visual-carousel.json` and `scripts/sync-key-visual-carousel.mjs` (six images)
- Page examples: `scripts/sync-examples-media.mjs` (six images)

The old competing four-slide Modular re-export is retired. `FIGMA-BLOCK-MAP.md` contains historical four-frame layout context, but the **published five-slide carousel** must remain intact until explicitly redesigned. Before each manual export, compare named Figma frames with the current website/asset mapping. The export job cannot guarantee that a Figma edit retained visual parity, so review images and Playwright results after any export.

## Naming and mapping

- One HTML `id` per element; unique within the document. Do not reuse IDs between unrelated case pages in selectors/scripts that are loaded together.
- Stable site IDs should describe the section's purpose: `#case-intro`, `#hero-showcase`, `#components-media`, etc.
- Figma Node IDs are **file-specific**. Never infer them from layer names. Use a verified node lookup; mark approximate associations.
- Existing registry: `FIGMA-BLOCK-MAP.md` (Finam), `HOME-BLOCK-MAP.md` (homepage). A new case should get its own mapping only when implementation starts.
