# REQ-003 — Simulated Checkout — Requirement

## Metadata

```yaml
id: REQ-003
slug: simulated-checkout
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
related_to: [REQ-002]
artifact_role: canonical
profile: product-app
links:
  discussion: ./00-discussion.md
  acceptance: ./02-acceptance-criteria.md
  readiness: ./03-readiness-review.md
  epic: ../../epics/EPIC-001-mlbb-top-up-store.md
```

## Summary

Provide one multi-game checkout that retains the selected game and listed offer, collects only the account fields applicable to that game, and requires an accessible order-confirmation dialog before submitting a clearly simulated payment with an evaluator-selected deterministic outcome.

## Actors / consumers

- Visitor entering a simulated top-up or voucher purchase.
- Evaluator choosing a deterministic success or failure outcome.
- REQ-004 result surface consuming the selected game, offer, account-field values when applicable, payment method, and outcome.

## Scope

### In scope

- One checkout flow for the nine-game catalogue: MLBB, Free Fire, PUBG Mobile, Genshin Impact, Roblox, Valorant, Call of Duty Mobile, Delta Force Mobile, and Blood Strike.
- Retain and show selected game, selected listed package/voucher offer, and its price/total throughout checkout, validation feedback, result, and retry.
- Game-specific required fields: MLBB `ID` and `Server` separately; Free Fire `ID`; PUBG Mobile `Player ID`; Genshin Impact `UID` and `Server`; Valorant Riot ID and tag entered as one value; Call of Duty Mobile `PlayerID`; Delta Force Mobile `ID`; Blood Strike `ID`.
- Roblox has no Player ID field and uses only the listed Robux/Gift Card voucher path.
- Required/non-empty-only checks for applicable account fields; clear inline errors associated with each empty required field.
- Select exactly one simulated payment method from QRIS, e-wallet, or Virtual Account.
- Allow the evaluator to select a deterministic success or failure simulation outcome.
- Before submission, show an accessible confirmation dialog summarizing the selected game and offer, applicable entered account values, simulated payment method, and total; provide `Kembali edit` and `Konfirmasi simulasi` actions.
- Closing the dialog through `Kembali edit` or Escape returns to checkout without submitting and preserves the form and selections.
- Pass the confirmed checkout context to the result surface without implying payment, account verification, or delivery.
- Keyboard-accessible labeled controls, visible focus, readable contrast, and Indonesian-first UI copy.

### Explicitly out of scope

- Any game, product, marketplace category, or gift-card path outside the nine approved games and Roblox listed voucher path; accounts, boosting, unrelated items, and unrelated gift cards.
- ID format, length, or character-pattern rules; ownership/account validity checks or account lookup.
- Real payment processing, authorization, fulfillment, or delivery.
- Cart, any second checkout view/route, additional review steps beyond the one in-scope confirmation dialog, saved payment details, account, persistent order history, or durable invoice storage.
- Receipt and failure/retry presentation owned by REQ-004, apart from passing checkout context to it.

## Constraints & invariants

- Package/voucher choices and prices come from the legible entries in `docs/list-harga-topup-2026.md`; do not invent or backfill missing entries. The documented missing/cropped MLBB package row remains unavailable and must not be implied to be complete.
- Required account fields are checked only for non-empty input. No format, length, character, ownership, or validity claim is permitted.
- Roblox checkout follows a voucher offer and collects no Player ID.
- Empty required fields block submission and produce field-associated inline feedback; correcting input does not discard the selected game, offer, or other entered/selected context.
- A payment method and evaluator-selected outcome are required before confirmation; the simulated submission occurs only after the visitor confirms the summary.
- All processing and outcomes are simulated, deterministic for the selected evaluator outcome, and session-only.
- After REQ-001 clears, REQ-003 may be developed in parallel with REQ-002 against the shared selected-offer/checkout-context contract owned by `design-contracts`; integration of both outcomes occurs in REQ-004.

## Behavior / rules

1. Checkout displays the selected game, offer name/amount, listed price, and total. It keeps this context while the visitor corrects fields, reviews confirmation, sees an error, views a result, or retries.
2. Checkout presents only the applicable account fields listed above. Roblox presents no Player ID field and identifies the selected listed offer as a voucher.
3. Each applicable account field is required. Empty values block opening the confirmation dialog and show a clear inline error next to and programmatically associated with that field. Non-empty values are accepted without format or validity checks.
4. After required fields, one simulated payment method, and the evaluator-selected result are set, the visitor can open an accessible confirmation dialog showing the game, offer, applicable entered values, payment method, total, and an explicit simulation label.
5. `Kembali edit` or Escape closes the dialog and returns to checkout with context intact and no result created. `Konfirmasi simulasi` submits the selected context and outcome once to REQ-004.
6. The UI and result must state that this is a simulation; it does not make a real payment, verify an account, or deliver a product.

## Success

For any approved game and listed offer, the visitor can complete applicable required fields (or no account field for Roblox), choose a simulated payment method and evaluator-selected outcome, review the summary, and confirm the simulated submission. Empty required fields are recoverable inline; editing or cancelling confirmation does not lose the selected offer or other context.

## Edge cases

- Any empty applicable account field → block submission, show its inline error, retain entered/selected context.
- A non-empty value with unusual format or characters → accepted by this requirement; no format validation or account-validity claim is made.
- Roblox voucher offer → no Player ID field is shown or required.
- Missing/cropped MLBB package row → it is not presented as an available selectable offer.
- Missing payment choice or simulation outcome → submission is not accepted until selected.
- Failure result and retry → preserve game, offer, account-field values, payment method, and relevant choices as defined by REQ-004.
- Cancelling confirmation or pressing Escape returns to checkout without submitting and preserves all entered and selected context.

## Decision references

- Approved nine-game scope, field profiles, and price reference: [`../../../list-harga-topup-2026.md`](../../../list-harga-topup-2026.md).
- Product and interface constraints: [`../../../../docs/Web Store dan Automasi Top-Up Game (Study Case 1).md`](../../../../docs/Web%20Store%20dan%20Automasi%20Top-Up%20Game%20%28Study%20Case%201%29.md), [`../../../../docs/design/INFORMATION_ARCHITECTURE.md`](../../../../docs/design/INFORMATION_ARCHITECTURE.md), and [`../../../../docs/design/DESIGN_BRIEF.md`](../../../../docs/design/DESIGN_BRIEF.md).
