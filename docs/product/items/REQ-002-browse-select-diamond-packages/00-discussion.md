# REQ-002 — Browse and Select Top-Up Packages — Discussion

## Raw request

User requested an end-to-end backlog for the MLBB top-up storefront described in repository documentation. On 2026-10-03, the user approved reshaping it to the exact nine-game top-up/voucher directory and package listing grounded in the manual transcription of the supplied price-list PDF.

## Context

The product scope is a directory of nine approved games with game-specific product, currency, or voucher semantics. Visitors browse/search the directory, choose a listed product, and carry it into the following checkout outcome. Product and price evidence comes from the manual visual transcription, not invented or backfilled data.

## Actor / consumer

- Visitors shopping for one of the approved game top-ups or Roblox vouchers.
- Evaluators verifying the directory, listed products, selection, responsive behavior, and handoff into checkout.
- The checkout flow consumes the selected game/product context.

## Problem

Visitors need to find the correct game and compare available, source-backed products, then make one unambiguous selection without encountering unrelated marketplace categories or invented package rows.

## Desired outcome

A visitor can browse/search the nine-game directory, inspect each game's product type and available listed packages, select an available product with its game context, and continue toward checkout.

## Known constraints

- Scope is exactly MLBB, Free Fire, PUBG Mobile, Genshin Impact, Roblox, Valorant, Call of Duty Mobile, Delta Force Mobile, and Blood Strike.
- Product names, denominations, currencies, voucher labels, and displayed prices use only legible entries in [`../../../list-harga-topup-2026.md`](../../../list-harga-topup-2026.md), manually transcribed from [`../../../List%20Harga%20Topup%202026.pdf`](../../../List%20Harga%20Topup%202026.pdf). No inferred or backfilled products.
- The MLBB transcription has a documented missing/cropped package gap between 632 and 1,220 Diamonds; do not imply the source list is complete or fill that gap.
- The user wants supplied game imagery in the catalog and confirms that intended assets are theirs or authorized. Exact file-to-game mapping and treatment are recorded in nonblocking DISC-001; text names remain the fallback for games without a selected image.

## Questions and closure status

| ID | Question | Why it matters | Owner | Status |
|---|---|---|---|---|
| D-002 | Should the catalog use supplied game images or text names only? | Determines whether game imagery is part of the catalog treatment | User / project design owner | Closed by C-009; per-file mapping remains in DISC-001 |
| D-001 | Is the proposed strict-sequential topology accepted? | Controls when this feature can be handed off | Human project owner | Closed: user approved the graph topology in REQ-001 C-004 on 2026-10-03 |

## Decisions

| ID | Decision | Date | Owner | Consequence |
|---|---|---|---|---|
| C-001 (historical) | The default landing surface was the MLBB Diamond catalogue, not a game selector | 2026-09-27 | Study case and IA docs | Historical decision superseded by the approved nine-game directory on 2026-10-03 |
| C-002 (historical) | Pocket Slip kept package discovery inventory-led and checkout/receipt itemized | 2026-09-27 | Design direction | Retained where compatible: selection and summary remain readable and data-first |
| C-003 (historical) | Promotions, when present, entered the same catalogue rather than a separate microsite | 2026-09-27 | IA doc | Historical direction retained only if compatible with the approved directory behavior |
| C-004 | The approved directory contains exactly nine games: MLBB, Free Fire, PUBG Mobile, Genshin Impact, Roblox, Valorant, Call of Duty Mobile, Delta Force Mobile, and Blood Strike; no marketplace categories or unrelated gift cards | 2026-10-03 | User | Catalog scope is limited to the listed top-ups and Roblox's listed Robux/Gift Card voucher path |
| C-005 | Use MLBB's separate `ID` and `Server` fields; this user decision supersedes the old combined `UserID(ZoneID)` form | 2026-10-03 | User | MLBB product context uses separate `ID` and `Server` |
| C-006 | Use PUBG Mobile `Player ID`, following the PDF rather than generic seed data | 2026-10-03 | User | PUBG account-field label is `Player ID` |
| C-007 | Use only legible catalog entries in the manual transcription; preserve and disclose the cropped/missing MLBB package gap, with no guessed fill | 2026-10-03 | User | Source gap is visible; no completeness claim or invented package |
| C-008 (historical) | Artwork was reference-only until source/provenance and permitted use were confirmed; text names were an acceptable fallback | 2026-10-03 | User | Superseded for intended assets by C-009; text fallback remains for games without a selected image |
| C-009 | Use supplied game imagery where mapped; user confirms intended assets are user-owned or authorized | 2026-10-03 | User | DISC-001 records exact file-to-game mapping and treatment; unselected assets are not approved by presence alone; text names remain the fallback |
| C-010 | Persist the approved game/package catalog in PostgreSQL hosted by Neon; seed values must come from the user-approved manual transcription, not generic reference seed data. This decision applies to catalog data only; users, orders, checkout, and receipts remain session-only/nonpersistent as specified by the existing requirements. | 2026-10-03 | User | Catalog persistence target is Neon-hosted PostgreSQL; no change to REQ-003/REQ-004 state boundaries |

## Delivery topology

- `REQ-001` is the true foundation prerequisite for active feature delivery.
- `REQ-002` and `REQ-003` are parallel branches after the foundation gate, using the shared selected-offer/checkout-context contract owned by `design-contracts`; each branch depends on REQ-001, not on the other's delivery.
- `REQ-004` joins the two branch outcomes.
- `DISC-001` relates to catalog artwork only; it is nonblocking and must not gate catalog delivery.

## Next step

Hand this ready package to `design-contracts` now to align the selected-offer/checkout-context contract while `repo-workflow` prepares the foundation. REQ-002 and REQ-003 implementation must wait for both prerequisites; REQ-004 joins their outcomes. Artwork discovery can continue independently.
