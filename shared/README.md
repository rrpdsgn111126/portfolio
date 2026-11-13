# Shared portfolio design layer

Use the established Finam values as the source of truth for the first shared layer.

| File | Purpose |
| --- | --- |
| `tokens.css` | Colors, content width, gutters, type sizes, fonts |
| `typography.css` | Poppins/Unbounded type scale and opt-in `.portfolio-*` text styles |
| `layout.css` | `.portfolio-container`, `.portfolio-full-bleed`, `.portfolio-media-frame` |
| `components.css` | `.portfolio-card-grid` and `.portfolio-info-card` |

Use the shared classes for new cases; customize composition with a case-specific
stylesheet loaded **after** these four files. The main portfolio homepage can have
its own layout but should use the shared tokens and text scale.

Current text classes:
- `.portfolio-display`: Unbounded 700, 50px desktop / 34px mobile
- `.portfolio-lead`: Unbounded 400, 50px desktop / fluid mobile
- `.portfolio-body`: Poppins 400, 18px desktop / 16px mobile
- `.portfolio-section-title`: Unbounded 700, 18px

The existing Finam selectors use those same shared declarations to preserve their
typography exactly; specific desktop/mobile layout overrides remain in `styles.css`.

Canonical interactive carousel is still `components-carousel.js` + corresponding
Finam markup/CSS. Its visual and interaction invariants are in `AGENTS.md`.
Do not copy carousel IDs across cases. Abstract reusable carousel markup only when
implementing a second real instance, after checking the Finam reference.

Finam's canonical HTML is now `cases/finam/index.html` and the root `index.html` is the homepage. Export and QA workflows operate on the nested case.
