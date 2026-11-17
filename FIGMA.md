# Portfolio — Figma agent rules

Repository: https://github.com/rrpdsgn111126/portfolio

Read this file for tasks whose **output is an editable Figma design**. For edits to the website/repository read `AGENTS.md` instead; when both outputs are requested, read both. **Reading the site for reference does not authorize changing code.**

## Source files and scope

- Current portfolio case designs: [Cases — Copy](https://www.figma.com/design/zG9GLaQaUXOhPeZC9VOBmx/) (`zG9GLaQaUXOhPeZC9VOBmx`).
- Finam reference: Figma page `2301:627`, desktop root frame `2301:628`; published reference: https://portfolio-rrr.pages.dev/cases/finam/
- Atlas editable desktop board: [Atlas App — Desktop 1440](https://www.figma.com/design/zG9GLaQaUXOhPeZC9VOBmx/?node-id=4377-28865) (`4377:28865`). Current board has seven main sections; do not assume there is an approved mobile board.
- `FIGMA-BLOCK-MAP.md` maps selected Finam source nodes to site selectors; mappings marked approximate are not verified 1:1.

## Design rules

1. Inspect the **current target board** and its parent page before editing. Reuse existing Figma frames, styles, components and patterns. Never overwrite approved elements or other agents' edits.
2. For an established visual pattern, check the **actual website implementation** and `docs/COMPONENT-REGISTRY.md`; the code defines existing published responsive/interactive behavior. New visual compositions and art direction are designed in Figma.
3. Work only on explicitly requested frames and breakpoints. If asked for desktop only, do not build or alter mobile. Keep layers editable; avoid flattening whole sections unnecessarily. Preserve useful node identity and naming.
4. For repeatable layout, prefer constraints/Auto Layout and correct text sizing. Do not insert speculative copy or design variants when reference content exists.
5. Do not treat a static Figma image as a complete specification for hover, scroll, carousels, accessibility or animations; these are implemented and tested on the website.
6. Validate the affected frames with node structure and visual screenshots. Report exactly which Figma nodes were changed.

## Handoff to the website

Follow `docs/FIGMA-WORKFLOW.md` for ID mapping, asset export, and review gates. Figma edits **never trigger an unrequested website update**. An explicitly requested transfer should preserve approved HTML/CSS/JS and export only named artwork; full-page Figma → HTML regeneration is prohibited.
