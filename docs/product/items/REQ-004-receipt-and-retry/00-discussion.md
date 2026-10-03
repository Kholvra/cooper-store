# REQ-004 — Receipt and Retry Result — Discussion

## Raw request

User requested an end-to-end backlog for the documented top-up storefront; the approved scope is the nine games from the 2026 price-list reference.

## Context

The result is a state of the current checkout session. After the visitor confirms the order summary, a concise simulated progress sequence leads to either a clear Indonesian nota or recoverable failure; it must not imply that a real payment is pending. Success shows the selected game's applicable transaction context; failure shows no success invoice, preserves checkout context, and allows retry.

## Actor / consumer

- Visitor/evaluator who submitted a simulated checkout.
- Evaluator checking both deterministic success and failure paths.
- The current checkout session owns the transient result; no history consumer exists.

## Problem

A simulation needs a clear, trustworthy outcome. Success summarizes the current multi-game session without implying real payment or delivery, while failure remains recoverable rather than discarding the visitor's choices.

## Desired outcome

The result surface visibly distinguishes simulated success from failure, shows progress as a simulation resolves, reuses selected game/offer and applicable checkout context in a success nota, and lets a failed attempt return to checkout with its data intact.

## Known constraints

- Approved games: MLBB, Free Fire, PUBG Mobile, Genshin Impact, Roblox, Valorant, Call of Duty Mobile, Delta Force Mobile, and Blood Strike.
- Roblox uses the listed Robux/Gift Card voucher path and has no Player ID.
- Game-specific account profiles and offers are defined in the checkout requirement and `docs/list-harga-topup-2026.md`; use only legible listed entries and do not imply the cropped MLBB table is complete.
- Success nota must include a simulation-generated invoice number, simulated transaction time, game, selected offer/amount, applicable account fields (none for Roblox), payment method, total, and status.
- Failure has no success invoice and preserves selected game, offer, applicable account values, payment method, and relevant context for retry.
- Text and icon cues accompany status color.
- Result state is session-only; refresh or leaving the session does not create order history or a durable/shareable invoice route.
- Outcome is explicitly simulated and does not confirm real payment, account verification, or delivery.
- Progress is a transient simulation status after confirmation, not a payment status; no QR, countdown, or artificial wait is used.

## Questions and closure status

| ID | Question | Why it matters | Owner | Status |
|---|---|---|---|---|
| D-001 | Is the proposed strict-sequential topology accepted? | Controls when result behavior can be delivered | Human project owner | Closed: user approved the graph topology in REQ-001 C-004 on 2026-10-03 |
| D-005 | What formal session/result state contract and failure ownership should implementation use? | Prevents receipt/retry state divergence | `design-contracts` | Downstream contract decision |

## Decisions

| ID | Decision | Date | Owner | Consequence |
|---|---|---|---|---|
| C-001 | Success uses an itemized receipt labelled “Nota” | 2026-09-27 | Design direction and study case | Required receipt fields are visible together |
| C-002 | Failure shows no success invoice and preserves choices for retry | 2026-09-27 | Study case | Failed simulation remains recoverable |
| C-003 | Invoice/result data exists only in the current checkout session | 2026-09-27 | Study case and IA docs | Refresh/leave does not create order history |
| C-004 | Status uses text/icon cues in addition to color | 2026-09-27 | Accessibility/design docs | Success/failure remains understandable without color alone |
| C-005 | Result covers the approved nine-game offer scope and uses the game-specific checkout profile; Roblox voucher has no Player ID | 2026-10-03 | User | Nota and retry preserve the selected game/offer without inventing account fields |
| C-006 | Invoice number and transaction time are simulation/session details, not evidence of a real transaction | 2026-10-03 | User | Result remains explicitly simulated and non-persistent |
| C-007 | After confirmation, show `Pesanan dibuat` → `Simulasi berjalan` → `Hasil simulasi` as a clearly simulated progress sequence; resolve to the selected result without a QR, countdown, payment-pending status, or artificial wait | 2026-10-03 | User | If resolution is immediate, keep the completed sequence visible with the result; progress never implies payment authorization |

## Delivery topology

- REQ-004 joins both REQ-002 catalog and REQ-003 checkout outcomes.
- REQ-002 and REQ-003 each depend on REQ-001 and use the shared selected-offer/checkout-context contract.
- Formal session/result state transitions will be defined by `design-contracts`, not duplicated in this product requirement.

## Rejected alternatives (optional)

- Requiring or displaying a Player ID for the Roblox voucher path is not part of the approved checkout profile.
- Treating the simulated invoice/time as a real transaction record or storing it as order history is out of scope.

## Next step

Hand this ready package to `design-contracts` now to define session-result states and join semantics alongside the shared context contract while `repo-workflow` prepares the foundation. REQ-004 implementation waits for both REQ-002 and REQ-003 branch outcomes.
