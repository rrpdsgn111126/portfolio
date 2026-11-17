# Portfolio — site/GitHub agent rules

Repository: https://github.com/rrpdsgn111126/portfolio

Read this file for **site or repository changes**. For Figma edits read `FIGMA.md` instead; for a task changing both, read both. Reading a reference does not authorize modifying it.

## Sources and boundaries

- The current, approved **HTML/CSS/JS is authoritative for existing published behavior** (responsive geometry, styles, animations and interactions). Figma is the source of new compositions and exported artwork, not a full HTML generator.
- Reuse the existing implementation before inventing a new pattern. The canonical registry is `docs/COMPONENT-REGISTRY.md`; workflow and Figma handoff are in `docs/FIGMA-WORKFLOW.md`.
- Homepage: `index.html`, `home.css`, `assets/home/`; Finam: `cases/finam/index.html`, `styles.css`, `assets/`. Common primitives live in `shared/`. Future case pages live in `cases/{slug}/`; do not create placeholders.
- Do not overwrite the homepage from a Finam export. All Figma export jobs are **manual and asset-only**; no automated HTML/CSS rewriting, no automatic synchronization on `main`. Match Figma nodes to existing filenames and selectors before export.
- Keep approved reference sections, images, content, selectors and interactions unchanged unless the task expressly targets them. New elements require unique HTML IDs; use scoped modifiers instead of broad overrides.
- Preserve responsive behavior. Inspect the **final computed CSS cascade**, including later media queries; never infer an existing numeric rule from a screenshot when its CSS exists.
- On Finam, no paragraph ends with a period. Preserve punctuation between sentences. Do not revise unrelated copy.

## Execution and verification

1. Read the current `origin/main`, identify affected files and the exact approved reference; for Figma-based work read `FIGMA.md` and the mapping before modifying code.
2. Change only requested elements and their direct dependencies. Preserve desktop, mobile, keyboard/touch interactions and reduced-motion behavior.
3. Run `node scripts/verify-portfolio-structure.mjs`, `node scripts/verify-assets.mjs`, and relevant `node --check` commands. For browser verification use **Playwright + Chromium**, including screenshots and computed styles at affected desktop/mobile widths. For Finam carousels follow the detailed viewport/alpha-bound tests in the registry.
4. Do not claim tests or deployment passed unless independently verified. Confirm that the final commit is in remote `main` and inspect published routes when accessible.

## Parallel agent safety

- Use an isolated clone/worktree per task; fetch `origin` and review remote `main` before editing.
- Stage only task-specific paths; do not use `git add .` or `git add -A` indiscriminately.
- Before push, synchronize with remote main (normally `git pull --rebase origin main`). Preserve concurrent commits and uncommitted changes; stop on unresolved conflicts.
- Never force-push or overwrite another agent's approved changes. Avoid global refactors not needed by the request.

## Reference files

- `docs/COMPONENT-REGISTRY.md` — component and interaction invariants
- `FIGMA.md` — instructions when Figma is the output
- `docs/FIGMA-WORKFLOW.md` — mapping, handoff and controlled export
- `FIGMA-BLOCK-MAP.md` — Finam Figma-to-HTML mapping
- `HOME-BLOCK-MAP.md` — homepage debug IDs
- `shared/README.md` — shared CSS usage
