# REQ-002 — Browse and Select Top-Up Packages — Requirement

## Metadata

```yaml
id: REQ-002
slug: browse-select-diamond-packages
epic: EPIC-001
milestone: M0
lane: active
sequence: unset
type: feature
status: ready
delivery_status: blocked
priority: unset
size: unset
depends_on: [REQ-001]
blocks: [REQ-004]
enables: []
discovery_of: []
continuation_of: []
related_to: [REQ-003, DISC-001]
artifact_role: canonical
profile: product-app
links:
  discussion: ./00-discussion.md
  acceptance: ./02-acceptance-criteria.md
  readiness: ./03-readiness-review.md
  epic: ../../epics/EPIC-001-mlbb-top-up-store.md
  discovery: ../DISC-001-authorized-mlbb-artwork/01-requirement.md
  catalog_source: ../../../list-harga-topup-2026.md
  pdf_source: ../../../List%20Harga%20Topup%202026.pdf
```

## Summary

Provide the primary storefront directory for the exactly nine user-approved games, with searchable game-specific product listings sourced from the manual transcription of the supplied price-list PDF. Visitors can select a listed product and continue with its game and package context.

## Actors / consumers

- Visitors browsing a supported game top-up or Roblox voucher.
- Evaluators verifying catalog coverage, source-faithful product semantics, search, selection, responsive behavior, and handoff.
- The following checkout flow consumes the selected game/product context.

## Scope

### In scope

- A directory containing exactly MLBB, Free Fire, PUBG Mobile, Genshin Impact, Roblox, Valorant, Call of Duty Mobile, Delta Force Mobile, and Blood Strike.
- Per-game product listings and prices from [`../../../list-harga-topup-2026.md`](../../../list-harga-topup-2026.md), the manual transcription of [`../../../List%20Harga%20Topup%202026.pdf`](../../../List%20Harga%20Topup%202026.pdf). Use only legible listed entries; do not invent, infer, or backfill rows.
- Product labels retain their game currency/product semantics: MLBB Diamonds (including base-plus-bonus composition where transcribed); Free Fire Diamonds; PUBG Mobile UC; Genshin Impact Crystals; Valorant VP; Call of Duty Mobile CP; Delta Force Mobile Delta Coins; Blood Strike Gold; and Roblox Robux or Roblox Gift Card IDR denominations through the voucher path only.
- Source-backed search across the directory and listed products, so visitors can find a game/product without adding unsupported categories or changing product meaning.
- Selection of one available listed product with visible selected state and clear continuation, retaining game and product context.
- Responsive, scannable presentation; Indonesian-first copy, keyboard-accessible controls, visible focus, and selection cues that do not rely on color alone.
- Use supplied game imagery for catalog entries where an intended, user-confirmed asset is mapped to that game; keep the game name visible as text. Use text names where no image is selected. DISC-001 records per-file mapping and treatment before use.
- Disclose the documented MLBB transcription gap: the visible source entries jump from 632 to 1,220 Diamonds because a portion is cropped/covered; do not fill the gap or imply completeness.

### Explicitly out of scope

- Any game beyond the nine approved games; marketplace categories such as accounts, boosting, items, or unrelated gift cards.
- Roblox Player ID collection or direct Roblox account top-up; Roblox products use the listed Robux/Gift Card voucher path.
- Account ownership lookup/verification or claims that an entered identifier is valid.
- Checkout fields, payment method, submission, simulated outcome, receipt, failure retry, or order history.
- Cart, multi-product selection, or a separate review view between catalog selection and the checkout flow.
- Official affiliation, official/current price claims, or filling missing/ineligible source data.
- Asset-rights discovery is not a prerequisite to catalog delivery; unselected or unconfirmed artwork must not be presented as approved.

## Constraints & invariants

- Exact scope is the nine approved games and no others.
- Package data is content-driven: listing count and layout must follow the source-backed catalog, not six illustrative slots or a hardcoded six-item assumption.
- The manual transcription is the product-data source for this requirement; only legible listed entries may be used. The PDF/transcription is not evidence that prices are officially approved or current.
- The MLBB source gap is an explicit limitation, not an invitation to interpolate. A note or equivalent user-visible indication must prevent implying that the visible transcription is complete.
- Account-field profiles for the downstream flow are: MLBB `ID` and `Server` separately; Free Fire `ID`; PUBG Mobile `Player ID`; Genshin Impact `UID` and `Server`; Roblox no Player ID; Valorant Riot ID plus tag as one value; Call of Duty Mobile `PlayerID`; Delta Force Mobile `ID`; Blood Strike `ID`.
- Search and product selection preserve the selected game/product meaning. No unsourced format/length rules or validity claims are implied.
- The user confirms that supplied images intended for use are user-owned or authorized. Only selected, mapped assets may be displayed; artwork discovery remains nonblocking and text names are sufficient where no image is selected.
- Catalog records are persisted in Neon-hosted PostgreSQL as decided in [C-010](00-discussion.md); the manual transcription remains the only approved source for seeded package data. This does not authorize persistent users, orders, checkout, or receipts.
- `REQ-001` is the true foundation prerequisite for active feature work; `DISC-001` is related to catalog art only and does not block this item.
- REQ-002 and REQ-003 are parallel branches after the foundation gate, aligned to the shared selected-offer/checkout-context contract owned by `design-contracts`; neither branch depends on the other's delivery, and their outcomes join in REQ-004.

## Behavior / rules

1. The directory exposes all and only the nine approved games, with names presented as text even if no usable artwork is available.
2. Each game's products are listed using only the transcribed source entries, retaining the appropriate currency, denomination, bonus composition when shown, voucher label, and listed Rupiah price.
3. Roblox presents Robux and Roblox Gift Card IDR products as vouchers; it does not request a Player ID or imply direct account top-up.
4. Search narrows/finds relevant games and listed products using their displayed names/labels. A query with no match gives a clear empty result and permits the visitor to clear or change the query.
5. Selecting a product visibly identifies the single selection and makes its game, product/denomination, and listed price clear to the continuation action.
6. Continuing hands off that selected game/product context directly to checkout; it does not add a cart or catalog-to-checkout review step. The order-confirmation dialog remains inside checkout as specified by REQ-003.
7. At responsive viewport sizes, users can inspect and select products without loss of game/package/price identity; keyboard focus and non-color selection cues remain visible.
8. The MLBB missing/cropped package interval is not represented by invented product entries. The catalog makes the source limitation clear and does not claim complete MLBB coverage.
9. For each game with an intended, user-confirmed image mapped in DISC-001, the catalog displays that image in a bounded media region with native colors and a visible text name; a game without a selected image remains identifiable by text.

## Success

A visitor can find any of the nine supported games or a listed product, understand its game-specific currency/voucher and source-listed price, select one product, and continue with the same product context. Mapped user-confirmed game images appear with visible text names; games without selected images remain fully identifiable. The catalog does not introduce unsupported products or disguise the MLBB source gap.

## Edge cases

- No search query: show the full approved directory and source-backed products.
- No matching search result: show an understandable empty state without changing the directory's approved scope.
- Multiple matching products: preserve distinct game/product/currency labels so similarly named values remain distinguishable.
- MLBB missing interval between the last listed entry at 632 Diamonds and the next at 1,220: show no guessed rows and disclose the transcription gap.
- No authorized artwork: render legible game names and product data without blocking catalog behavior.
- Roblox voucher selection: carry voucher/product choice forward without requesting a player identifier.

## Decision references

- User-approved scope and field choices: [`00-discussion.md`](00-discussion.md), decisions C-004–C-008.
- Catalog source and limitations: [`../../../list-harga-topup-2026.md`](../../../list-harga-topup-2026.md).
- Original PDF: [`../../../List%20Harga%20Topup%202026.pdf`](../../../List%20Harga%20Topup%202026.pdf).
- Product context: [`../../../../docs/Web Store dan Automasi Top-Up Game (Study Case 1).md`](../../../../docs/Web%20Store%20dan%20Automasi%20Top-Up%20Game%20%28Study%20Case%201%29.md).
- Design references remain subordinate to the approved decisions in this item.
