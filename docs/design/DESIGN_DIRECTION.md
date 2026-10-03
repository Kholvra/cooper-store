# Visual Direction: After-hours Market

## Selected Direction

**After-hours Market** adapts the user-provided marketplace screenshot into a distinct Indonesian multi-game top-up store. The screenshot's charcoal storefront, compact commerce layout, game imagery, and bright yellow action color are visual evidence; its Testing.gg name, branding, copy, full category taxonomy, and exact composition are not to be copied.

**Design thesis:** a dark game-top-up counter where game identity helps visitors enter the right catalogue and one sharp yellow signal leads them from package choice to simulated checkout.

**Status:** chosen by the user from three proposed design directions. Functional scope is the nine-game top-up/voucher list only.

**Design Read:** Indonesian-language multi-game top-up storefront for visitors choosing a game/package, in a charcoal and yellow gaming-market visual language.

**Liveliness dials (agent-proposed for this user-selected direction):** ENERGY 2 / RHYTHM 2 / MOTION 1. The reference is vivid but task-led; retain moderate section variation and state-only motion.

**Identity levers:** one focal task per view (choose a game, choose a package, complete one checkout; its final confirmation stays inside checkout); whitespace separates catalogue and transaction regions; yellow is concentrated on the primary purchase/selection signal and visible keyboard focus; a compact yellow selection marker is the store motif, never a decorative stripe on every card.

## Color Strategy and Physical Context

Use a **restrained** strategy: charcoal and near-black neutral surfaces dominate, text remains off-white, and a bright yellow accent marks primary actions, selection, and visible keyboard focus. Supporting status colors appear only to communicate real success, warning, error, or information. The chosen dark presentation follows the user's supplied reference and is intended for browsing game catalogues in a gaming context; this rationale does not assert an official game brand palette.

The palette belongs to the store, not to MLBB or another game. Game artwork keeps its native colors inside bounded media regions. Package amount, price, ID fields, payment choices, and transaction state stay on opaque store surfaces.

## Page Expression

### Storefront
- Keep a compact brand/navigation/search strip; the product name/logo is not yet supplied, so use no invented mark and do not reuse Testing.gg branding.
- Make the game directory and search the first viewport's working content. Do not label games "popular" or "deals" without real ranking/campaign data.
- Use a content-driven game catalogue. Within a game, prioritize denomination and IDR price over decorative imagery.
- Use image-led game tiles only with owner-approved supplied or explicitly authorized assets. Otherwise show clear text game names and a neutral surface; never fetch or invent replacement art.
- Do not create visual hierarchy through a full-page dot grid or decorative pattern; the screenshot's background texture is not required to achieve the selected dark market direction.

### Catalogue and Checkout
- Keep package selection readable on opaque cards/list rows; show a distinct selected state with accent boundary and text/icon cue.
- Maintain the selected game's currency and package context through checkout and the confirmation dialog.
- Present per-game ID/UID/Server fields only where specified. Roblox's voucher path has no Player ID.
- Keep QRIS/e-wallet/Virtual Account and evaluator success/failure controls visibly marked as simulated.
- The one confirmation dialog belongs inside checkout: summarize game, package, applicable account values, simulated payment method, and total; make `Kembali edit` the non-destructive path and `Konfirmasi simulasi` the yellow primary action. No terms checkbox or additional review route.
- After confirmation, show the status sequence `Pesanan dibuat` → `Simulasi berjalan` → `Hasil simulasi` with explicit simulation wording. If the result is immediate, keep the completed sequence visible with it; do not use QR, countdown, `Menunggu Pembayaran`, or a fixed wait.

### Result
- Reuse the selected package summary in the Indonesian “Nota”.
- State success/failure in text and a relevant icon; color may reinforce but never carry meaning alone.
- Keep progress clearly separate from payment states; do not imply that payment cleared, a payment is pending, or game goods were delivered.

## Typography, Shape, and Density

- Use one readable system sans-serif for navigation, game labels, numeric package values, and form controls; its broad platform availability avoids remote font loading and keeps Indonesian text legible.
- Give numeric amounts and prices stronger weight than metadata; right-align numeric values only where a comparison/list treatment benefits from it.
- Use compact, moderate-radius controls and cards; avoid pill-shaped card grids, stacked nested cards, and heavy shadows.
- Use tight spacing inside catalogue entries and wider spacing between game, catalogue, and checkout regions to support scanning without flattening all sections into one rhythm.

## Interaction and Motion

- The yellow accent marks the primary continuation/submit action, selected package, and visible keyboard focus; it is not a decorative stripe or universal icon color.
- Search, game tiles, package controls, form fields, and navigation must have real behavior and visible focus; no dead controls.
- Motion is limited to short selection/focus/feedback transitions. No looping glow, auto-moving carousel, or entrance choreography. Respect reduced-motion preferences.

## Accessibility and Resilience

- Meet the color/contrast and keyboard requirements in `DESIGN_TOKENS.md`; verify all final pairings when implementing.
- Keep form labels and inline errors visible and associated with the right game-specific field.
- Reflow game/product collections at mobile widths; no horizontal scrolling for the primary workflow.
- Keep controls usable at 200% zoom and with an on-screen keyboard; do not hide transaction data behind artwork.

## Non-Negotiables
- One active commerce category: game top-ups and listed Roblox vouchers.
- No copy of Testing.gg logo, text, footer, exact layout, or non-top-up categories.
- No unverified artwork, fake discounts, popularity labels, reviews, user counts, delivery claims, or official affiliation.
- Indonesian-first, responsive, keyboard-operable UI with visible focus and non-color state cues.
- Simulation status is explicit at checkout and result; no real payment/account/delivery behavior.

## Considered Directions

| Direction | Summary | Decision |
|---|---|---|
| After-hours Market | Dark charcoal marketplace mood with restrained yellow commerce accent and game-first catalog; adapt rather than copy the supplied screenshot. | **Selected by user.** |
| Game Shelf | Quieter, editorial game shelf with game artwork as identity and denser package lists. | Not selected; gives less of the requested marketplace energy. |
| Neon Counter | More utilitarian, price-led compact catalogue with sparing yellow. | Not selected; reduces the game-market atmosphere in the reference. |
| Screenshot clone | Reproduce the reference marketplace taxonomy, branding, and composition closely. | Not selected; would introduce unapproved categories and imitate another store. |

## Sources
- User-provided marketplace design image in the conversation (not stored as a repository asset); used as visual reference only.
- Product scope and simulation: [`../Web Store dan Automasi Top-Up Game (Study Case 1).md`](../Web%20Store%20dan%20Automasi%20Top-Up%20Game%20%28Study%20Case%201%29.md) and approved product backlog.
- Game/package evidence: [`../list-harga-topup-2026.md`](../list-harga-topup-2026.md).
- Current asset inventory: [`../Game Assets/`](../Game%20Assets/); the user confirms intended supplied images are owned or authorized. DISC-001 records the selected files, game mapping, and treatment.
- Product delivery scope and typed handoff: [`../product/backlog.md`](../product/backlog.md) and [`../product/epics/EPIC-001-mlbb-top-up-store.md`](../product/epics/EPIC-001-mlbb-top-up-store.md).
- Catalog, checkout, and result requirements: [`../product/items/REQ-002-browse-select-diamond-packages/01-requirement.md`](../product/items/REQ-002-browse-select-diamond-packages/01-requirement.md), [`../product/items/REQ-003-simulated-checkout/01-requirement.md`](../product/items/REQ-003-simulated-checkout/01-requirement.md), and [`../product/items/REQ-004-receipt-and-retry/01-requirement.md`](../product/items/REQ-004-receipt-and-retry/01-requirement.md).
- Permission status and text-name fallback: [`../product/items/DISC-001-authorized-mlbb-artwork/01-requirement.md`](../product/items/DISC-001-authorized-mlbb-artwork/01-requirement.md).
