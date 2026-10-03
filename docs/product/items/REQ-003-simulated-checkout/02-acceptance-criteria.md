# REQ-003 — Simulated Checkout — Acceptance Criteria

Observable criteria for the approved multi-game simulated checkout.

## AC-01 — Selected offer context

- Given a visitor selects an available game and offer
- When checkout opens and while checkout remains active
- Then the selected game, offer name/amount, listed price, and total are visible and remain associated with the form.

## AC-02 — Game-specific account fields

- Given checkout is opened for an approved game
- When the visitor inspects its form
- Then it shows only the applicable required fields: MLBB `ID` and `Server` separately; Free Fire `ID`; PUBG Mobile `Player ID`; Genshin Impact `UID` and `Server`; Valorant Riot ID and tag as one value; Call of Duty Mobile `PlayerID`; Delta Force Mobile `ID`; Blood Strike `ID`.
- And for Roblox it shows the selected listed Robux/Gift Card voucher offer and no Player ID field.

## AC-03 — Required/non-empty validation

- Given a checkout has one or more applicable required fields empty
- When the visitor attempts to open order confirmation
- Then submission is blocked and each empty field receives a clear inline error associated with that field.
- And the selected game, offer, entered values, and choices remain available for correction.

## AC-04 — No invented account validation

- Given all applicable fields contain non-empty values
- When the visitor opens order confirmation after selecting the required payment method and evaluator outcome
- Then the values are accepted without format, length, character-pattern, ownership, or account-validity checks or claims.

## AC-05 — Payment and deterministic outcome

- Given checkout has all required account fields filled, or is a Roblox voucher checkout
- When the visitor chooses QRIS, e-wallet, or Virtual Account and the evaluator selects success or failure
- Then confirming the dialog submits exactly once and passes the selected payment method, outcome, game, offer, price/total, and applicable entered field values to the result flow as a simulation.

## AC-06 — Simulation boundary and context retention

- Given a visitor encounters validation feedback, a result, or retry
- When the current flow is displayed
- Then the selected game and offer remain clear, and the flow does not claim real payment, account verification, or product delivery.

## AC-07 — Catalog boundaries

- Given the visitor chooses a catalog offer
- When the available offers are presented for checkout
- Then only legible entries in the approved nine-game price reference are eligible; the documented missing/cropped MLBB row is not invented or presented as available.

## AC-08 — Accessible checkout controls

- Given the visitor uses keyboard navigation or a narrow viewport
- When they complete or correct checkout
- Then checkout controls and the confirmation dialog remain labeled and operable, focus is visible and returns to the order action when the dialog closes, and validation/status communication does not depend on color alone.

## AC-09 — Order confirmation and cancellation

- Given all applicable fields are non-empty and a payment method and evaluator outcome are selected
- When the visitor activates `Buat pesanan`
- Then an accessible dialog summarizes the game, package/voucher, applicable entered account values, simulated payment method, and total, and identifies the action as a simulation.
- And the dialog provides `Kembali edit` and `Konfirmasi simulasi`; `Kembali edit` or Escape returns to checkout with all values preserved and creates no result.
- And `Konfirmasi simulasi` submits the chosen context and outcome once to the result flow.

## Edge cases

- Empty MLBB `ID` or empty `Server` independently blocks submission and identifies the missing field.
- Empty Genshin Impact `UID` or empty `Server` independently blocks submission and identifies the missing field.
- A non-empty unusual-format value is not rejected by this requirement.
- Roblox checkout requires no account identifier.
- Missing payment method or evaluator outcome blocks submission without losing context.
- Cancelling the confirmation dialog returns to checkout without losing context or creating a result.

## Verifiability

- AC-01 through AC-07 and AC-09 → human walkthrough of one checkout for each approved game, including empty-field cases, unusual non-empty values, Roblox voucher path, evaluator-selected success/failure, and confirmation cancellation.
- AC-08 and AC-09 → keyboard and narrow-viewport walkthrough with field-error association, dialog operation, and focus-return inspection.
