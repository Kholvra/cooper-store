# REQ-002 — Browse and Select Top-Up Packages — Acceptance Criteria

Observable criteria for the approved nine-game directory and source-backed product selection.

## AC-01 — Exact game directory

- Given a visitor opens the storefront directory
- When the game choices are shown
- Then the directory contains exactly MLBB, Free Fire, PUBG Mobile, Genshin Impact, Roblox, Valorant, Call of Duty Mobile, Delta Force Mobile, and Blood Strike, and contains no other games or marketplace categories.

## AC-02 — Source-faithful product listings

- Given the manual transcription at [`../../../list-harga-topup-2026.md`](../../../list-harga-topup-2026.md) is the catalog reference
- When a visitor inspects any game's products
- Then each displayed denomination, currency/product label, bonus composition where listed, voucher label, and Rupiah price matches a legible entry in that transcription, with no guessed or backfilled entry and no claim that listed prices are official/current.

## AC-03 — Product and voucher semantics

- Given a visitor inspects the nine game listings
- When each game's product type is presented
- Then the labels preserve these meanings: MLBB Diamonds; Free Fire Diamonds; PUBG Mobile UC; Genshin Impact Crystals; Roblox Robux or Roblox Gift Card IDR voucher; Valorant VP; Call of Duty Mobile CP; Delta Force Mobile Delta Coins; and Blood Strike Gold.
- And Roblox is presented as the listed voucher path without a Player ID field or implication of direct account top-up.

## AC-04 — Content-driven listing

- Given the catalog contains the legible transcribed entries for the nine games
- When the directory displays product listings
- Then the number and presentation of entries follow available catalog content rather than six illustrative MLBB cards or a fixed six-slot limit.

## AC-05 — Search and no-match feedback

- Given a visitor searches by a displayed game or product label
- When matching catalog entries exist
- Then relevant games/products can be found without changing their game/currency/voucher meaning.
- Given the query matches no listed game or product
- When the search is applied
- Then a clear empty result is shown and the visitor can clear or change the query to return to the catalog.

## AC-06 — Single product selection and handoff

- Given a visitor selects one listed product
- When the selection is applied and the visitor continues
- Then the selected state is visible with a non-color cue, and the following checkout receives the same game, product/denomination, and listed-price context without a cart or separate pre-checkout review view.

## AC-07 — Source gap disclosure

- Given the MLBB transcription lists entries through 632 Diamonds and resumes at 1,220 Diamonds because an intervening portion is cropped/covered
- When MLBB products are presented
- Then no product is invented for the gap, and the interface or associated catalog information clearly discloses that the transcription is incomplete in that interval rather than implying complete MLBB coverage.

## AC-08 — Confirmed game artwork and text fallback

- Given a supplied image is selected and mapped to a game in DISC-001, and the user has confirmed that intended assets are theirs or authorized
- When that game's directory entry is displayed
- Then show the mapped image in a bounded media region with native colors and a visible text game name, without implying official affiliation.
- Given no image is selected for a game
- When the directory is displayed
- Then show its text name and keep the nine-game directory available.
- Given an image is not selected or is not covered by the user's confirmation
- Then do not display it.

## AC-09 — Responsive and keyboard-accessible browsing

- Given a visitor uses a narrow or wide viewport or keyboard navigation
- When they search, inspect, and select products
- Then game, product, and price remain identifiable and scannable, controls expose visible keyboard focus, and selection is not conveyed by color or pointer interaction alone.

## Edge cases

- Empty search query → full approved directory remains available.
- No-match query → understandable empty result and a way to clear/change query.
- MLBB 632-to-1,220-Diamond source interval → no inferred rows; limitation disclosed.
- No user-confirmed image is mapped to a game → show its text name; catalog browsing remains available.
- Roblox voucher product → no player identifier collection as part of catalog selection.

## Verifiability

- AC-01 and AC-03 → compare visible directory and product semantics with the nine sections in the manual transcription.
- AC-02 and AC-04 → compare every displayed catalog row to the transcription; confirm there are no fabricated entries and no six-slot cap.
- AC-05 and AC-06 → human walkthrough of matching/no-match search, product selection, and checkout handoff context.
- AC-07 → compare MLBB list with source notes and inspect visible limitation disclosure.
- AC-08 → inspect catalog fallback and, if artwork is present, its provenance/permission evidence.
- AC-09 → keyboard walkthrough and narrow/wide viewport inspection.
