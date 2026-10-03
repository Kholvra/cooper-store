# REQ-004 — Receipt and Retry Result — Requirement

## Metadata

```yaml
id: REQ-004
slug: receipt-and-retry
epic: EPIC-001
milestone: M0
lane: active
sequence: unset
type: feature
status: ready
delivery_status: blocked
priority: unset
size: unset
depends_on: [REQ-002, REQ-003]
blocks: []
enables: []
discovery_of: []
continuation_of: []
related_to: []
artifact_role: canonical
profile: product-app
links:
  discussion: ./00-discussion.md
  acceptance: ./02-acceptance-criteria.md
  readiness: ./03-readiness-review.md
  epic: ../../epics/EPIC-001-mlbb-top-up-store.md
```

## Summary

Present a concise simulated progress sequence followed by the current multi-game checkout's evaluator-selected outcome as either a clear success nota or recoverable failure, retaining selected game/offer context and keeping all result data session-only.

## Actors / consumers

- Visitor/evaluator who submitted a simulated checkout.
- Current checkout session, which supplies the game, selected listed offer, price/total, applicable account-field values, payment method, and simulation outcome.

## Scope

### In scope

- A result surface for the selected deterministic success/failure outcome.
- After the visitor confirms checkout, show the transient progress sequence `Pesanan dibuat` → `Simulasi berjalan` → `Hasil simulasi` while the selected outcome is resolved; if resolution is immediate, keep the completed sequence visible with the final result.
- Label the progress as simulated; it must not present an actual payment-pending state or imply payment authorization.
- Clear text and icon status cues that do not rely on color alone.
- Indonesian success label “Nota”.
- Success nota fields: a simulation-generated invoice number, transaction time for this simulated result, game, selected package/voucher and its amount when applicable, applicable entered account fields (none for Roblox voucher), payment method, total, and status.
- Explicit disclosure that the outcome is simulated and does not confirm real payment, account verification, or product delivery.
- Failure feedback without a success nota/invoice.
- Retry action that keeps the game, selected offer, applicable account-field values, payment method, and relevant checkout choices available.
- Session-only result behavior; no durable/shareable invoice route or order history.

### Explicitly out of scope

- Real invoice issuance, payment confirmation, account lookup/verification, fulfillment/delivery, refunds, or support workflows.
- Persistent storage, user accounts, shareable invoice links, or cross-session recovery.
- New catalog, payment, or account-field validation behavior owned by REQ-003.
- Products, games, or marketplace categories outside the nine approved games and the Roblox listed Robux/Gift Card voucher path.

## Constraints & invariants

- Success shows every required nota field, identifying the selected game and offer; account fields are game-specific, and Roblox has no Player ID.
- Failure must not present a success nota/invoice and must preserve checkout context for retry.
- Status remains understandable through text and icon cues if color is unavailable.
- “Invoice number” and transaction time describe this simulated session result only, not a real transaction record.
- Refreshing or leaving the current session must not create durable history or a persistent invoice route.
- No result claims a real payment, account verification, or product delivery.
- Progress is transient and must not add a fixed wait or countdown; do not show a QR code or payment-pending status.

## Behavior / rules

1. After confirmed checkout, show the brief progress sequence `Pesanan dibuat` → `Simulasi berjalan` → `Hasil simulasi`, clearly labelled as simulated; if the outcome resolves immediately, keep the completed sequence visible with the final result rather than adding an artificial wait.
2. A simulated success shows a clear success status and an itemized “Nota” with simulation-generated invoice number, transaction time, game, selected package/voucher and amount, applicable account-field values (none for Roblox voucher), payment method, total, and status.
3. A simulated failure shows a clear failure status and explanation, explicitly identifies the simulation, and does not show a success nota or invoice.
4. From failure, retry returns to checkout with the current game, offer, applicable account-field values, payment method, and relevant choices preserved.
5. Result data belongs only to the current checkout session; leaving or refreshing does not create order history or a durable invoice URL.
6. Both outcomes explicitly identify the flow as simulated and avoid claims of actual payment, account validity, or delivery.

## Success

An evaluator can see the simulation progress resolve into a complete success nota for any approved game offer, exercise a failure without receiving a false success invoice, retry without losing checkout context, and confirm that no real transaction or durable order history is represented.

## Edge cases

- Success → every required nota field is present; Roblox voucher results show the game and voucher offer without inventing an account identifier.
- Failure → no success nota/invoice appears; retry preserves selected game and offer plus applicable checkout context.
- Refresh or leave after a result → no persistent invoice or order-history entry is created.
- Result wording and labels remain explicit that invoice/time are simulated session details, even when styled like a receipt.
- If simulation resolves immediately, show the result with the completed progress sequence; do not hold it for animation or imply that payment is pending.

## Decision references

- Approved games, field profiles, and price reference: [`../../../list-harga-topup-2026.md`](../../../list-harga-topup-2026.md).
- Product and interface constraints: [`../../../../docs/Web Store dan Automasi Top-Up Game (Study Case 1).md`](../../../../docs/Web%20Store%20dan%20Automasi%20Top-Up%20Game%20%28Study%20Case%201%29.md), [`../../../../docs/design/INFORMATION_ARCHITECTURE.md`](../../../../docs/design/INFORMATION_ARCHITECTURE.md), [`../../../../docs/design/DESIGN_DIRECTION.md`](../../../../docs/design/DESIGN_DIRECTION.md), and [`../../../../docs/design/DESIGN_BRIEF.md`](../../../../docs/design/DESIGN_BRIEF.md).
