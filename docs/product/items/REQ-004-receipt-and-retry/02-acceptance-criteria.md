# REQ-004 — Receipt and Retry Result — Acceptance Criteria

Observable criteria for the simulated multi-game result and recovery flow.

## AC-01 — Complete simulated success nota

- Given a valid checkout is submitted for an approved game and listed offer with the simulated success outcome
- When the result surface is shown
- Then it presents a clear success status and an Indonesian “Nota” containing a simulation-generated invoice number, simulated transaction time, game, selected package/voucher and amount, applicable account-field values (none for Roblox), payment method, total, and status.

## AC-02 — Explicit simulation boundary

- Given either simulated outcome is shown
- When the visitor reads the result
- Then it states that the outcome is simulated and does not confirm real payment, account verification, or product delivery; invoice number and transaction time are identified as simulation/session details.

## AC-03 — Failure without false nota

- Given a valid checkout is submitted with the simulated failure outcome
- When the result surface is shown
- Then it presents a clear failure status and explanation, and no success nota or invoice is displayed.

## AC-04 — Recoverable retry with context

- Given a simulated checkout fails
- When the visitor chooses retry
- Then checkout is available with the selected game, offer, applicable entered account-field values, payment method, and relevant choices preserved.

## AC-05 — Non-color status communication

- Given success or failure is displayed
- When color is unavailable or the visitor relies on text/icon cues
- Then the outcome remains distinguishable through explicit status text and an icon or equivalent non-color cue.

## AC-06 — Session-only result

- Given a success or failure result has been displayed
- When the visitor refreshes or leaves the current session
- Then no durable invoice route or order-history entry is created or implied.

## AC-07 — Game-specific nota context

- Given checkout succeeds for a non-Roblox game
- When the visitor inspects the nota
- Then the game, selected offer and its amount, and applicable account-field labels/values correspond to that checkout's game profile.
- And given checkout succeeds for a Roblox voucher
- Then the nota identifies the Roblox voucher offer and does not invent or require a Player ID.

## AC-08 — Simulated progress without payment implication

- Given the visitor confirms a valid checkout with an evaluator-selected outcome
- When the result surface is shown
- Then it displays `Pesanan dibuat` → `Simulasi berjalan` → `Hasil simulasi`, clearly identified as simulation; while resolving, show progress, and if resolution is immediate, keep the completed sequence visible with the final result.
- And the final state matches the selected success/failure outcome without a QR code, countdown, artificial wait, or payment-pending/paid/unpaid status.

## Edge cases

- Success for MLBB identifies separate `ID` and `Server`; Free Fire `ID`; PUBG Mobile `Player ID`; Genshin Impact `UID` and `Server`; Valorant Riot ID and tag as one value; Call of Duty Mobile `PlayerID`; Delta Force Mobile `ID`; Blood Strike `ID`.
- Roblox voucher success shows no account identifier; no account value is fabricated.
- Failure shows no success invoice; retry does not require re-entering preserved choices.
- Refresh/leave does not make a simulated result a stored order.
- Any wording that implies actual payment authorization, account verification, or delivery violates the simulation boundary.

## Verifiability

- AC-01 through AC-05 and AC-07 through AC-08 → human walkthrough of both evaluator-selected outcomes, including one result per input profile and the Roblox voucher path, with status/accessibility inspection.
- AC-06 → session refresh/leave walkthrough confirming no persistent history or invoice route is presented.
