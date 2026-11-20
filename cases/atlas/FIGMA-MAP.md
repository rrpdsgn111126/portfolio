# Atlas App — Figma → portfolio site mapping

Source case board: https://www.figma.com/design/zG9GLaQaUXOhPeZC9VOBmx/Cases--Copy-?node-id=4377-28865

Source export board: https://www.figma.com/design/6sBVAK6kmxac1SfD5w8gUw/Atlas-App?node-id=17948-10119

Case URL: `/cases/atlas/`

| Website section | Source case Figma node | Implementation |
| --- | --- | --- |
| `#case-intro` | `4377:28866` | Finam-based 307/936 introduction grid |
| `#hero-showcase` | `4377:28871` | Three live embedded motion prototypes; source remains editable |
| `#product-challenges` | `4377:28931` | Shared 3-column information cards |
| `#identity-verification` | `4377:28946` | Screen exports 17948:10990, 17948:11027, 17948:11050, 17948:11067 |
| `#money-movement` | `4377:29046` | Screen exports 17948:11501, 17948:12025, 17948:11883, 17948:11528 |
| `#virtual-cards` | `4377:31177` | Card screen exports 17948:12060, 17948:11386; card context 17948:11883; account context 17948:10121, 17948:10556 |
| `#results` | `4377:31443` | Shared 3-column information cards |

Hero frames share Figma's 281:609 aspect ratio. The corresponding source animations remain in:
- `experiments/atlas-onboarding/`
- `experiments/atlas-gradient/glow.html`
- `experiments/atlas-gradient/` (animated photo background, hero image 3)

The separate photo-crossfade experiment remains available but is not used by this hero.

Embedded screens use `?embed=1`, a presentation-only mode that hides test UI and preserves the original animation logic. All image assets in `cases/atlas/assets` are independent local PNG exports, not hotlinked temporary Figma URLs.

**Design limitation:** the second export board contains fewer card-specific screens than the five distinct card states on the first case board. The last two positions intentionally use the board's two account-context exports instead of inventing card states. Replacing those slots with new, exact card-state exports is a future asset-only change.
