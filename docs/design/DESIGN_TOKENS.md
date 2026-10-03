# Design Tokens: Multi-Game Top-Up Store

These semantic tokens specify the user-approved dark **After-hours Market** design direction for a responsive web storefront. They are design inputs only; no token implementation currently exists. Components MUST use semantic custom properties rather than raw values.

## Color

### Primitive palette

| Token | Value | Role |
|---|---|---|
| `--palette-neutral-950` | `#111317` | Main charcoal canvas |
| `--palette-neutral-900` | `#1B1D22` | Main grouped surface |
| `--palette-neutral-850` | `#202228` | Cards and controls |
| `--palette-neutral-800` | `#292B32` | Raised surface |
| `--palette-neutral-500` | `#777A85` | Control boundary / strong neutral |
| `--palette-neutral-300` | `#C3C5CC` | Secondary text |
| `--palette-neutral-100` | `#F5F4EF` | Primary text |
| `--palette-yellow-500` | `#FFD400` | Primary action and selected boundary |
| `--palette-yellow-600` | `#E6BF00` | Pressed/hover accent surface |

The charcoal/yellow palette is a store-owned interpretation of the supplied reference, not an official game palette. The image's bright game art remains unmodified inside media regions.

### Semantic tokens

| Token | Value | Use |
|---|---|---|
| `--color-bg-primary` | `#111317` | Page canvas |
| `--color-bg-secondary` | `#1B1D22` | Main grouping surface |
| `--color-surface` | `#202228` | Catalogue cards and form controls |
| `--color-surface-raised` | `#292B32` | Focused/temporary raised regions |
| `--color-surface-selected` | `#302B16` | Selected package tint derived from yellow |
| `--color-text-primary` | `#F5F4EF` | Headings and main content |
| `--color-text-secondary` | `#C3C5CC` | Supporting text |
| `--color-text-tertiary` | `#9DA0A9` | Captions and metadata |
| `--color-border` | `#454750` | Non-action decorative separation |
| `--color-border-control` | `#777A85` | Input/control boundaries (3:1 non-text minimum) |
| `--color-border-focus` | `#FFD400` | Keyboard focus and selected boundary |
| `--color-accent` | `#FFD400` | Primary actions and selected state |
| `--color-accent-hover` | `#E6BF00` | Hover/pressed action surface |
| `--color-on-accent` | `#191A1F` | Text/icons on yellow action |
| `--color-success` | `#69D39A` | Success state |
| `--color-success-subtle` | `#162820` | Success region |
| `--color-warning` | `#F2C766` | Non-blocking warning |
| `--color-warning-subtle` | `#2C271A` | Warning region |
| `--color-danger` | `#FF7D78` | Validation error and failed simulation |
| `--color-danger-subtle` | `#2B1A1C` | Error region |
| `--color-info` | `#7DC4E5` | Informational help |
| `--color-info-subtle` | `#19272E` | Help region |
| `--color-overlay` | `rgba(5, 6, 8, 0.72)` | Dialog/backdrop overlay |

Measured WCAG 2.x contrast for initial text pairings: primary text on page background 16.89:1; secondary text on the main surface 9.78:1; tertiary text on cards 6.08:1; yellow accent on page/cards 12.99:1 and 11.11:1; dark action text on yellow/default and pressed-yellow actions 12.13:1 and 9.78:1; success/danger on the page background 10.08:1 and 7.49:1; success/warning/danger/info on their subtle status surfaces 8.38:1, 9.30:1, 6.67:1, and 7.95:1. These measured pairs pass the normal-text AA minimum. The control boundary against the main surface measures 3.94:1 and passes the non-text 3:1 minimum. Recheck actual component/state pairings before implementation; do not infer every pairing from this sample.

Use yellow sparingly for the primary action, focus, and selected package boundary. Status colors retain distinct meanings and MUST also have text/icon cues. Game artwork is not part of the store palette and MUST NOT carry transaction text overlays.

## Typography

- **Family:** `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. One platform-native sans family supports compact commerce UI and Indonesian text without remote font loading.
- **Scale:** five sizes only.

| Token | Size / line height | Use |
|---|---|---|
| `--font-caption` | `12px / 16px` | Non-critical metadata |
| `--font-small` | `14px / 20px` | Labels and helper text |
| `--font-body` | `16px / 24px` | Body copy and controls |
| `--font-section` | `24px / 32px` | Page/section headings |
| `--font-display` | `32px / 40px` | Main title only |

Use weight 400 for body, 500 for labels, 600 for section headings, and 700 for main titles and important numeric package values. Keep body measure between 50–75ch on desktop and 30–50ch on mobile. Allow user zoom; avoid clipped fixed-height text containers.

## Spacing

Use a 4px base scale with semantic custom properties: `--space-1: 4px`, `--space-2: 8px`, `--space-3: 12px`, `--space-4: 16px`, `--space-6: 24px`, `--space-8: 32px`, `--space-10: 40px`, `--space-12: 48px`, `--space-16: 64px`.

Use 4–8px for compact label/icon pairs, 12–24px for controls and catalogue entries, and 32px+ to distinguish page sections. Keep package rhythm content-driven; never reserve a fixed number of tiles.

## Radius and Elevation

- `--radius-control: 6px` for buttons, inputs, and small selection controls.
- `--radius-card: 10px` for game and package surfaces.
- `--radius-panel: 12px` for checkout/result groupings.
- `--shadow-card: 0 1px 3px rgba(0, 0, 0, 0.24)` only where adjacent dark surfaces need separation.
- `--shadow-overlay: 0 12px 32px rgba(0, 0, 0, 0.48)` for temporary overlays only.

Prefer tonal surface changes and visible boundaries over stacked shadows. Nested surfaces use smaller radii than their containers.

## Layout and Breakpoints

- `--breakpoint-mobile: 375px`, `--breakpoint-tablet: 768px`, `--breakpoint-desktop: 1280px`.
- Use a 4-column mobile, 8-column tablet, and 12-column desktop layout grid with 16px mobile and 24px tablet/desktop gutters.
- Game/package collections reflow based on available content width; cards may span multiple columns on narrow screens.
- Keep the desktop header compact; on mobile expose navigation and search without horizontal overflow.

## Motion

- `--motion-fast: 150ms`; `--motion-standard: 200ms`.
- Use restrained ease-out transitions for selection, focus, and inline feedback only.
- Motion MUST clarify state, not decorate; respect `prefers-reduced-motion` with equivalent immediate state changes.

## Theme

Use a fixed dark theme for the initial release because the user selected the supplied dark marketplace visual reference. Do not add an unrequested theme toggle or auto-invert the palette. If light mode is requested later, define a complete semantic palette and recheck contrast rather than deriving it by inversion.

## Anti-patterns

| Do not | Use instead |
|---|---|
| Copy Testing.gg marks, exact page composition, or unrelated marketplace nav | Apply the requested charcoal/yellow atmosphere to the nine-game top-up product and its own content order |
| Claim "popular", "deal", or percentage savings without verified campaign/ranking evidence | Show game, denomination, and listed reference price plainly |
| Hard-code raw colors, spacing, radii, or type values in components | Use semantic CSS custom properties above |
| Put transaction text over changing/bright game art | Keep transaction-critical content on opaque, contrast-checked surfaces |
| Use yellow on every card/icon/label or use color-only status | Reserve yellow for action/focus/selection; pair state colors with words/icons |
| Build a fixed six-slot or nine-slot product grid | Render game/package collections from available content and let them reflow |
| Use unverified game images or invent a store logo | Use only user-confirmed, mapped supplied assets; keep text labels for games without a selected image |
| Hide labels, show validation only in a toast, or remove keyboard focus | Keep visible labels, associated inline errors, and visible focus |
| Add full-page dot-grid texture, blanket glows, or deep shadows everywhere | Use matte dark surfaces and elevation only for clear hierarchy |
| Add unrequested accounts, boosting, item marketplace, login, or history sections | Keep navigation and content within top-ups and the listed Roblox vouchers |

**Migration notes:** No application UI or token implementation exists. The user confirms supplied images intended for use are owned or authorized; DISC-001 records specific files, game mapping, and treatment before use.

## Product Decision References

- Store scope and delivery index: [`../product/backlog.md`](../product/backlog.md).
- Selected experience and constraints: [`DESIGN_BRIEF.md`](DESIGN_BRIEF.md) and [`DESIGN_DIRECTION.md`](DESIGN_DIRECTION.md).
- Implementation use remains downstream of the canonical feature requirements and handoff: [`REQ-002`](../product/items/REQ-002-browse-select-diamond-packages/01-requirement.md), [`REQ-003`](../product/items/REQ-003-simulated-checkout/01-requirement.md), and [`REQ-004`](../product/items/REQ-004-receipt-and-retry/01-requirement.md).
