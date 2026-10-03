# Information Architecture: Multi-Game Top-Up Store

## Site Map

```text
/                              game directory and search
  /games/mlbb                  Mobile Legends: Bang Bang package catalogue
  /games/free-fire             Free Fire package catalogue
  /games/pubg-mobile           PUBG Mobile UC package catalogue
  /games/genshin-impact        Genshin Impact Crystals catalogue
  /games/roblox                Robux / Roblox Gift Card voucher catalogue
  /games/valorant              Valorant VP catalogue
  /games/call-of-duty-mobile  Call of Duty Mobile CP catalogue
  /games/delta-force-mobile   Delta Force Mobile Delta Coins catalogue
  /games/blood-strike          Blood Strike Gold catalogue
  /checkout                    selected offer, game-specific details, simulated payment, one confirmation dialog
    result state               simulated progress → success nota or failure/retry; current session only
```

The product sells the nine games' top-up/voucher offers only. Categories visible in the supplied marketplace screenshot such as game accounts, boosting, standalone items, and unrelated gift cards are not product sections. Roblox gift cards are included only because they appear in the supplied top-up price list.

## Navigation Model
- **Primary:** one `Top Up` destination returns to the game directory.
- **Search:** find an included game or package; search results stay within the nine-game top-up catalogue.
- **Game context:** a selected game's name/currency remains visible while browsing its packages and through checkout.
- **Utility:** checkout offers a clear return to the current game's catalogue without clearing a recoverable selection.
- **Mobile:** a compact, keyboard-operable navigation exposes only implemented top-up destinations; search remains directly reachable. No account/login menu.

## Content Hierarchy

### Game directory
1. Store identity as a neutral text label until product name/logo is approved.
2. Search field and the nine game choices.
3. Brief cue that all displayed prices are reference/demo data if the price-list freshness has not been confirmed.

### Game catalogue
1. Game and currency/voucher context.
2. Package denomination and IDR price for comparison.
3. Selection cue and action to continue.
4. Authorized game artwork only when usage is approved; no text overlays on variable imagery.

### Checkout
1. Game and selected package summary/total.
2. Game-specific account fields or voucher explanation/path.
3. Simulated QRIS, e-wallet, or Virtual Account choice.
4. Evaluator-controlled success/failure choice.
5. Before submission, an accessible confirmation dialog reviews the game, offer, applicable entered values, simulated payment method, and total; it offers `Kembali edit` and `Konfirmasi simulasi`.

### Checkout result
1. A clearly labelled simulated progress sequence: `Pesanan dibuat` → `Simulasi berjalan` → `Hasil simulasi`; if resolution is immediate, keep the completed sequence visible with the final outcome.
2. Explicit simulated success/failure status using text and icon.
3. On success, show an itemized nota with game, package/currency, account identifier where applicable, payment method, total, time, invoice number, and status.
4. On failure, explain the failed simulation and provide a retry action that preserves checkout context.

## Search and Transaction States

| Surface | Loading | Empty | Error | Success / active | Recovery |
|---|---|---|---|---|---|
| Checkout | No submission wait before confirmation | Missing required fields show associated inline errors | Validation stays on checkout; no result is created | Show selected offer/form and one confirmation dialog before submission | `Kembali edit` or Escape returns to checkout without losing context |
| Result | Announce progress only while the simulation resolves; no fixed delay | If no current-session result exists, explain it is session-only and link to directory | Selected failure is explicit; no success nota, QR, or payment-pending status | Show the simulated progress sequence with the selected outcome; success has nota, failure has no success nota | Failure retry preserves checkout context |

Search is expected to filter the provided catalogue data locally. If implementation makes it asynchronous, retain the same visible state meanings and do not fabricate result counts.

## User Flows

### Find and select
1. Open `/` and search or browse the nine games.
2. Choose a game and compare only its package denominations/prices.
3. Select one package and continue to `/checkout`.

### Simulated checkout
1. Review the game/package summary, enter applicable account fields (or use the Roblox voucher path), and choose one simulated payment method and evaluator-selected result.
2. Activating `Buat pesanan` with missing required fields keeps checkout open and shows associated inline errors.
3. With required fields complete, activate `Buat pesanan` to review the game, offer, applicable values, payment method, and total in an accessible confirmation dialog.
4. `Kembali edit` or Escape returns to checkout without losing context or creating a result.
5. `Konfirmasi simulasi` submits the selected context once and starts the progress sequence; if resolution is immediate, show the completed sequence with the result.
6. Success shows the session-only nota; failure shows recoverable feedback and preserves entered context for retry.

## Game Input Profiles

The price-list screenshot's visible field labels are reference evidence, not proof that an account exists. By user decision, applicable account fields are required and only checked for non-empty input. Do not invent character, format, or length rules; no account ownership or validity is checked.

| Game | Visible account/voucher treatment in source |
|---|---|
| MLBB | `ID` and `Server` as separate fields, per user decision to follow the supplied PDF rather than the older combined-field brief |
| Free Fire | `ID` field |
| PUBG Mobile | `Player ID` field, per user decision to follow the supplied PDF over the generic seed data |
| Genshin Impact | `UID` and `Server` fields |
| Roblox | No player ID; voucher is claimed directly in Roblox |
| Valorant | Riot ID and tag (shown as one Riot ID + Tag value) |
| Call of Duty Mobile | `PlayerID` field |
| Delta Force Mobile | `ID` field |
| Blood Strike | `ID` field |

## Naming Conventions

| Concept | Consistent term |
|---|---|
| Store category | Top-up |
| Game | Full game name on first mention; familiar short name afterward |
| Game currency | Use the game's displayed denomination (Diamond, UC, Crystals, Robux, VP, CP, Delta Coins, Gold) |
| Purchasable amount and listed price | Package |
| Account details | Game-specific Player ID / UID / Riot ID + Tag / Server fields |
| Roblox redemption product | Voucher / Gift Card, as named by the source |
| Payment choice | Payment method |
| Successful simulated document | Nota |

## Component Reuse Map
- Game-directory tiles link to the canonical game catalogue route; the selected game is reused in the catalogue, checkout summary, and nota.
- A package's denomination/price is reused in catalogue selection, checkout summary, and receipt.
- Account forms are game-specific and use only fields actually listed for that game; shared visual form primitives do not imply shared validation formats.
- Roblox voucher handling has no player-ID field; it shares the selected-offer and simulated payment/result flow where applicable.
- Success nota and failure feedback share a result surface but never share success semantics.

## Content Growth Plan
- Render the game directory and each game's catalogue from supplied entries rather than fixed six-card slots.
- The initial reference covers nine games and package sets in `docs/list-harga-topup-2026.md`; the MLBB transcription has a visible source gap and must not be silently filled.
- Keep search scoped to the current nine-game top-up catalogue. Do not add category filters, rankings, promotion pages, or unrelated marketplace taxonomy without a product decision.
- Additional games require their own currency, product type, input profile, price evidence, artwork decision, and acceptance coverage.

## URL Strategy
- `/` is the canonical game directory/search entry.
- `/games/<slug>` identifies a game's catalogue; selected package and entered checkout data remain transient to the current session.
- `/checkout` represents the current selected-offer flow. It is not a durable order route.
- Success/failure is a session state, not a shareable invoice URL; refresh or leaving does not create history.

## Product Decision References

- Canonical scope and delivery index: [`../product/backlog.md`](../product/backlog.md) and [`../product/epics/EPIC-001-mlbb-top-up-store.md`](../product/epics/EPIC-001-mlbb-top-up-store.md).
- Game/package browsing and legible-source rule: [`../product/items/REQ-002-browse-select-diamond-packages/01-requirement.md`](../product/items/REQ-002-browse-select-diamond-packages/01-requirement.md).
- Required-field-only checkout and simulation: [`../product/items/REQ-003-simulated-checkout/01-requirement.md`](../product/items/REQ-003-simulated-checkout/01-requirement.md).
- Result and retry behavior: [`../product/items/REQ-004-receipt-and-retry/01-requirement.md`](../product/items/REQ-004-receipt-and-retry/01-requirement.md).
- Artwork permission and text fallback: [`../product/items/DISC-001-authorized-mlbb-artwork/01-requirement.md`](../product/items/DISC-001-authorized-mlbb-artwork/01-requirement.md).
