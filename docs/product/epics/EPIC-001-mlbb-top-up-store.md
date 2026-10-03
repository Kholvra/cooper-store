# EPIC-001 - Nine-Game Simulated Top-Up Store

## Why

The case study originally describes an MLBB-only flow, but the user-approved product scope now covers the nine game top-up/voucher offers in the supplied 2026 price-list reference. Visitors need to identify a game, compare only that game's listed offers, and reach one checkout with the correct account fields or voucher path.

## Outcome and success measure

An evaluator can open the store, find each of the nine approved games, compare its legible listed package offers, select one, complete the applicable checkout fields, review and confirm the simulated order summary, follow the simulated progress sequence, inspect a session-only success nota, and exercise missing-required-field or simulated-failure/retry behavior without losing offer context.

The outcome is met only when the active requirements and their observable acceptance criteria are satisfied. No quantitative business metric or real-account validity is invented for this case study.

## Scope

### In scope

- One responsive Indonesian-language storefront for the nine top-up/voucher products listed in the price reference: Mobile Legends: Bang Bang (MLBB), Free Fire, PUBG Mobile, Genshin Impact, Roblox, Valorant, Call of Duty Mobile, Delta Force Mobile, and Blood Strike.
- Content-driven game directory and per-game catalogues based only on legible package entries in [`docs/list-harga-topup-2026.md`](../../list-harga-topup-2026.md). The source PDF's cropped MLBB gap remains disclosed; no missing offer or price is guessed.
- Roblox Robux/Gift Card voucher offers shown in the supplied top-up list; Roblox checkout does not ask for a Player ID.
- Game-specific account fields described in [`docs/design/INFORMATION_ARCHITECTURE.md`](../../design/INFORMATION_ARCHITECTURE.md). MLBB uses separate `ID` and `Server` fields; PUBG Mobile uses `Player ID` per the user's PDF decision.
- Required/non-empty checks for applicable account fields only. No unprovided format/length rules, account ownership verification, or claim of validity.
- One selected-offer checkout view with QRIS, e-wallet, or Virtual Account, one accessible order-confirmation dialog, and evaluator-controlled simulated success/failure.
- Session-only success nota, simulated progress, or recoverable failure/retry; selected game, offer, form data, and payment choice remain available after an invalid required-field submission or simulated failure.
- Use supplied game imagery where files are selected and mapped to games in DISC-001; the user confirms that intended assets are theirs or authorized. Keep text names visible and use them for games without a selected image.
- The user-selected After-hours Market visual direction, adapted from the supplied marketplace screenshot without its brand, exact composition, or non-top-up categories.

### Explicitly out of scope

- Game accounts, boosting, standalone items, unrelated gift cards, user/login accounts, carts, broad marketplace categories, or games beyond the nine approved entries.
- Real payment processing, payment-gateway integration, account lookup/verification, game-credit delivery, refunds, support, or official affiliation claims.
- Persistent invoice/order history, saved payment details, promotion archive, fabricated popularity/deal labels, discounts, or unsupported security/trust claims.
- Invented package data, prices, field formats, generic replacement artwork, or use of assets without approved permission evidence.
- Additional checkout review steps beyond one confirmation dialog inside the existing checkout, or durable/shareable invoice routes.

## Constraints and linked invariants

- Human-approved decisions in item discussions and backlog metadata are canonical over the older single-game brief and generic seed data.
- Product/simulation constraints: [`docs/Web Store dan Automasi Top-Up Game (Study Case 1).md`](../../Web%20Store%20dan%20Automasi%20Top-Up%20Game%20%28Study%20Case%201%29.md).
- Package and visible field evidence: [`docs/list-harga-topup-2026.md`](../../list-harga-topup-2026.md). It is a manual transcription of the available PDF, not a guarantee that prices are current; the MLBB gap is not to be filled by inference.
- Experience and visual constraints: [`docs/design/DESIGN_BRIEF.md`](../../design/DESIGN_BRIEF.md), [`docs/design/DESIGN_DIRECTION.md`](../../design/DESIGN_DIRECTION.md), [`docs/design/INFORMATION_ARCHITECTURE.md`](../../design/INFORMATION_ARCHITECTURE.md), and [`docs/design/DESIGN_TOKENS.md`](../../design/DESIGN_TOKENS.md).
- Existing `docs/game-topup-seed-data.md` is reference-only where it conflicts with the user-approved PDF input labels or prices.
- Artwork permission: [`DISC-001`](../items/DISC-001-authorized-mlbb-artwork/01-requirement.md); no asset is approved merely because it is present in `docs/Game Assets/`.
- Formal states, invariants, input boundaries, trust boundaries, and the shared selected-offer/checkout-context contract for REQ-002 and REQ-003 remain a downstream `design-contracts` handoff, not duplicated here.

Foundation status is **partial and blocked**. Package/runtime configuration and scripts exist, and `pnpm typecheck` passes; however, `pnpm build` and `pnpm dev` fail because `AUTH_DISCORD_ID` and `AUTH_DISCORD_SECRET` are unset. Additionally, the schema implements persistent User/Account/Session identity models via the NextAuth Prisma adapter, conflicting with ARCH-SCO-002 without an explicit waiver. `REQ-001` remains the common gate and hands the baseline outcome to `repo-workflow`; feature delivery is blocked.

## Delivery topology

The user approved this graph on 2026-10-03. `REQ-001` foundation work and the `design-contracts` shared selected-offer/checkout-context contract may proceed in parallel. After both prerequisites are ready, `REQ-002` and `REQ-003` may be delivered in parallel. Neither feature branch depends on the other's delivery; `REQ-004` joins both outcomes.

- `REQ-001` has no active prerequisite and blocks `REQ-002`, `REQ-003`, and `REQ-004` until foundation evidence or an explicit human waiver exists.
- `REQ-002` depends on `REQ-001`, relates to parallel branch `REQ-003`, and blocks the `REQ-004` join.
- `REQ-003` depends on `REQ-001`, relates to parallel branch `REQ-002`, and blocks the `REQ-004` join.
- `REQ-004` depends on both `REQ-002` and `REQ-003`; its nota/retry outcome consumes the selected offer context and simulated checkout result.
- `DISC-001` is in the separate discovery lane, `discovery_of: [REQ-002]`, `blocks: []`; it enables mapped, user-confirmed artwork. Text-name treatment remains available for games without a selected asset.
- Priority and size remain unset; the graph encodes prerequisites, not a total order or invented schedule.

## Child requirements

| Graph role / lane | ID | Outcome | Requirement status | Delivery status | Typed relationship |
|---|---|---|---|---|---|
| Foundation gate | [REQ-001](../items/REQ-001-runnable-product-baseline/01-requirement.md) | Establish an evidenced runnable baseline and foundation gate | Ready | queued | `blocks: [REQ-002, REQ-003, REQ-004]` |
| Discovery | [DISC-001](../items/DISC-001-authorized-mlbb-artwork/01-requirement.md) | Map user-confirmed supplied artwork and record treatment | Ready | queued | `discovery_of: [REQ-002]`; nonblocking; enables mapped artwork |
| Parallel catalog branch | [REQ-002](../items/REQ-002-browse-select-diamond-packages/01-requirement.md) | Browse and select legible listed offers for nine games | Ready | blocked | `depends_on: [REQ-001]`; `blocks: [REQ-004]`; `related_to: [REQ-003, DISC-001]` |
| Parallel checkout branch | [REQ-003](../items/REQ-003-simulated-checkout/01-requirement.md) | Complete a required-field-only, simulated checkout | Ready | blocked | `depends_on: [REQ-001]`; `blocks: [REQ-004]`; `related_to: [REQ-002]` |
| Join | [REQ-004](../items/REQ-004-receipt-and-retry/01-requirement.md) | Show a session-only success nota or recoverable failure | Ready | blocked | `depends_on: [REQ-002, REQ-003]` |

## Milestone, exit condition, and stop/rethink condition

**Milestone M0 - Nine-game simulated top-up flow.**

Exit when the foundation is ready, all nine catalogues use legible listed entries with source gaps disclosed, and every active acceptance criterion is delivered. An evaluator can execute game/package selection, required-field validation, simulated success/failure/retry with retained context, and a session-only nota. Use only selected, user-confirmed images mapped in DISC-001; games without selected images remain identifiable by text.

Stop and rethink the epic if requested scope changes to real payment, account verification, game-credit delivery, persistent history, an additional game, unrelated marketplace categories, or promotions. These changes require an explicit product decision rather than untracked expansion.

## Closed decisions

| ID | Decision | Owner / date | Consequence |
|---|---|---|---|
| D-001 | Approve the graph topology: REQ-001 foundation gate; REQ-002 and REQ-003 parallel branches against a shared contract; REQ-004 joins both | User / 2026-10-03 | Replaces the agent-proposed strict-sequential model; typed edges represent actual prerequisites |
| C-005 | Mark REQ-001 through REQ-004 requirement packages `ready` for their named next-domain handoffs; keep feature delivery blocked until foundation and shared-contract gates clear | User / 2026-10-03 | Requirement readiness does not waive implementation gates or change delivery status |
| C-006 | Use supplied game imagery where mapped; the user confirms intended assets are theirs or authorized | User / 2026-10-03 | DISC-001 records per-file mapping and treatment; unselected assets are not approved by presence alone; text names remain for games without an image |

## Open decisions

| ID | Decision needed | Owner | Impact |
|---|---|---|---|
| D-002 | Select and map specific supplied image files to games and record treatment constraints | User / project design owner | Determines optional per-game imagery; text names remain available and catalog delivery is not blocked |
| D-003 | Set priority and size for backlog items if delivery planning needs them | Human project owner | Changes triage metadata only; values remain `unset` |

## Canonical links

- Canonical backlog: [`../backlog.md`](../backlog.md).
- Backlog operating model: `requirements-backlog` skill reference used during initialization.
- Foundation package: [`REQ-001`](../items/REQ-001-runnable-product-baseline/01-requirement.md).
- Catalog package: [`REQ-002`](../items/REQ-002-browse-select-diamond-packages/01-requirement.md).
- Checkout package: [`REQ-003`](../items/REQ-003-simulated-checkout/01-requirement.md).
- Result package: [`REQ-004`](../items/REQ-004-receipt-and-retry/01-requirement.md).
- Artwork discovery: [`DISC-001`](../items/DISC-001-authorized-mlbb-artwork/01-requirement.md).
