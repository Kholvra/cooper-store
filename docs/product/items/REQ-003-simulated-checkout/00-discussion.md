# REQ-003 — Simulated Checkout — Discussion

## Raw request

User requested an end-to-end backlog for the documented top-up storefront; the approved product scope is the nine games in the 2026 price-list reference.

## Context

Checkout remains one selected-offer view. An accessible order-confirmation dialog inside that flow reviews the applicable game-specific details before a simulated submission and result. The checkout supports the approved input profiles, Roblox's listed voucher-only path, simulated payment choices, and an evaluator-selected deterministic success or failure outcome. Shared scope and field decisions are recorded in the linked price reference and parent product artifacts.

## Actor / consumer

- Visitor entering a simulated purchase.
- Evaluator exercising valid, invalid, success, and failure paths consistently.
- REQ-004 result surface consuming the current session context and simulated outcome.

## Problem

A selected offer is not useful unless the visitor can provide the fields required for that game's flow, understand recoverable validation feedback, choose a simulated payment method, and submit a controlled outcome without implying a real transaction.

## Desired outcome

A visitor can review the selected game and offer, fill only applicable required account fields (or no ID for a Roblox voucher), choose QRIS/e-wallet/Virtual Account, then confirm the game, offer, applicable values, simulated payment method, and total before submitting an evaluator-selected simulated result. Empty required values are explained inline without losing context.

## Known constraints

- Approved scope is exactly MLBB, Free Fire, PUBG Mobile, Genshin Impact, Roblox, Valorant, Call of Duty Mobile, Delta Force Mobile, and Blood Strike.
- MLBB uses separate `ID` and `Server`; Free Fire `ID`; PUBG Mobile `Player ID`; Genshin Impact `UID` and `Server`; Roblox has no Player ID and uses the listed Robux/Gift Card voucher path; Valorant Riot ID and tag are one value; Call of Duty Mobile `PlayerID`; Delta Force Mobile `ID`; Blood Strike `ID`.
- Required/non-empty checks only; no format, length, character-pattern, ownership, or account-validity checks or claims.
- The manual visual price transcription is `docs/list-harga-topup-2026.md`; use only legible listed entries. Its MLBB table documents a missing/cropped package row.
- Payment methods and payment processing are simulated only. Outcomes are evaluator-selected and deterministic.
- The checkout remains one view; one order-confirmation dialog inside that view is in scope. No cart or second checkout view/route is introduced.
- Indonesian-first labels, field associations, visible focus, readable contrast, and practical 44px touch targets are required by existing design constraints.

## Questions and closure status

| ID | Question | Why it matters | Owner | Status |
|---|---|---|---|---|
| D-001 | Is the proposed strict-sequential topology accepted? | Controls when checkout can be delivered | Human project owner | Closed: user approved the graph topology in REQ-001 C-004 on 2026-10-03 |
| D-004 | Which formal state/invariant contract will define checkout-to-result transition ownership? | Prevents divergent behavior across implementation slices | `design-contracts` | Downstream contract decision |

## Decisions

| ID | Decision | Date | Owner | Consequence |
|---|---|---|---|---|
| C-001 | Checkout uses selected game, listed offer, and total as its summary | 2026-09-27 | IA and design docs | Offer context cannot be lost before submission |
| C-002 | Earlier combined MLBB `UserID(ZoneID)` format and 15-digit assumptions are superseded; use separate `ID`/`Server` and required/non-empty-only checks for every applicable game's approved profile | 2026-10-03 | User | No format, length, character, ownership, or account-validity rules are added |
| C-003 | QRIS, e-wallet, and Virtual Account are simulated payment choices | 2026-09-27 | Study case | No real gateway or payment side effect is in scope |
| C-004 | The evaluator selects success or failure for repeatable demonstrations | 2026-09-27 | Study case | Both result paths are deterministic and testable |
| C-005 | Checkout covers only the approved nine games; Roblox is a listed Robux/Gift Card voucher path without Player ID | 2026-10-03 | User | No unrelated marketplace categories or gift cards are included |
| C-006 | The 2026 manual price transcription is the checkout offer reference; do not invent illegible/missing entries, including the documented MLBB row | 2026-10-03 | User | Catalog completeness is not implied for the cropped MLBB entry |
| C-007 | One confirmation dialog precedes simulated submission; edit/cancel returns to checkout without losing context, while confirmation hands off once to the simulated result flow | 2026-10-03 | User | No terms checkbox, QR, countdown, or payment-pending state is added |

## Delivery topology

- REQ-001 is the true prerequisite for active feature delivery.
- REQ-002 catalog and REQ-003 checkout are parallel branches after the foundation gate; REQ-003 does not depend on catalog delivery.
- `design-contracts` owns the shared selected-offer/checkout-context contract and formal state/failure-ownership decisions.

## Rejected alternatives (optional)

- Combined MLBB `UserID(ZoneID)` and numeric/15-digit format validation are superseded by the user's approved per-game input profiles and required/non-empty-only rule.

## Next step

Hand the ready REQ-003 package to `design-contracts` now for the shared selected-offer/checkout-context and formal checkout state contract; this can proceed in parallel with REQ-001 foundation work. Feature branches start only after both prerequisites clear; REQ-004 joins their outcomes.
