# Multi-Game Top-Up Store - Product Backlog

This is the compact canonical delivery index. Detailed scope, decisions, acceptance behavior, and readiness evidence live in the linked item packages.

## Backlog configuration

```yaml
profile: product-app
canonical_source: docs/product/backlog.md
foundation_first: true
foundation_status: partial
ordering: graph # user-approved
active_prefix: REQ
discovery_prefix: DISC
milestone: M0
```

Foundation evidence is partial: runtime/package commands and architecture rules exist, `pnpm typecheck` passes, but build and local launch fail when Discord auth variables are unset. The scaffold also contains persistent identity models forbidden by the session-only boundary (`ARCH-SCO-002`). See [`README.md`](README.md), [`REQ-001 evidence`](items/REQ-001-runnable-product-baseline/03-readiness-review.md), and [`EPIC-001`](epics/EPIC-001-mlbb-top-up-store.md). Do not clear the gate until these blockers are resolved.

## Active delivery graph

| Graph role | ID | Epic | Milestone | Outcome | Type | Requirement status | Delivery status | Priority | Size | `depends_on` | `blocks` | `related_to` | `enables` | Handoff / plan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Foundation gate | [REQ-001](items/REQ-001-runnable-product-baseline/01-requirement.md) | [EPIC-001](epics/EPIC-001-mlbb-top-up-store.md) | M0 | Establish an evidenced runnable baseline and foundation gate for the storefront | chore | ready | queued | unset | unset | `[]` | `[REQ-002, REQ-003, REQ-004]` | `[]` | `[]` | `repo-workflow` / Evidence partial; gate still unresolved (`ARCH-SCO-002`) |
| Parallel catalog branch | [REQ-002](items/REQ-002-browse-select-diamond-packages/01-requirement.md) | [EPIC-001](epics/EPIC-001-mlbb-top-up-store.md) | M0 | Browse, compare, and select listed offers across the nine approved games | feature | ready | blocked | unset | unset | `[REQ-001]` | `[REQ-004]` | `[REQ-003, DISC-001]` | `[]` | `design-contracts` / Not created |
| Parallel checkout branch | [REQ-003](items/REQ-003-simulated-checkout/01-requirement.md) | [EPIC-001](epics/EPIC-001-mlbb-top-up-store.md) | M0 | Submit one game-aware simulated checkout with required fields and offer context retained | feature | ready | blocked | unset | unset | `[REQ-001]` | `[REQ-004]` | `[REQ-002]` | `[]` | `design-contracts` / Not created |
| Join | [REQ-004](items/REQ-004-receipt-and-retry/01-requirement.md) | [EPIC-001](epics/EPIC-001-mlbb-top-up-store.md) | M0 | Show a session-only success nota or recoverable simulated failure | feature | ready | blocked | unset | unset | `[REQ-002, REQ-003]` | `[]` | `[]` | `[]` | `design-contracts` / Not created |

The graph is user-approved. After `REQ-001` clears and `design-contracts` aligns the shared selected-offer/checkout-context contract, `REQ-002` catalog and `REQ-003` checkout may proceed in parallel. `REQ-004` is the join and waits for both branch outcomes. Typed prerequisite edges gate delivery, not the readiness of a package for its next-domain handoff; parallel branches are not serialized by artificial sequence numbers.

All active requirement packages are `ready` for their named next-domain handoff (user decision REQ-001 C-005). This does not clear delivery gates: REQ-002/003/004 remain `delivery_status: blocked` while foundation and branch prerequisites are unmet.

## Discovery lane

| Lane | ID | Outcome or uncertainty | Type | Requirement status | Delivery status | `discovery_of` | `blocks` | `enables` | Link |
|---|---|---|---|---|---|---|---|---|---|
| discovery | [DISC-001](items/DISC-001-authorized-mlbb-artwork/01-requirement.md) | Map user-confirmed supplied artwork to games and record treatment | spike | ready | queued | `[REQ-002]` | `[]` | `[REQ-002]` (mapped artwork only) | [item package](items/DISC-001-authorized-mlbb-artwork/01-requirement.md) |

## Foundation gate

`REQ-001` gates all active feature delivery. Until its acceptance evidence exists, `REQ-002`, `REQ-003`, and `REQ-004` remain `delivery_status: blocked`; no human waiver is recorded. `DISC-001` can map user-confirmed assets independently and does not block feature delivery.

`DISC-001` is nonblocking. The user confirms that supplied images intended for use are theirs or authorized; DISC-001 records exact file mapping and treatment. Games without a selected image use text names. Its `enables` relation refers to mapped artwork, not the catalog outcome itself.

## Milestone view

- **M0 - Nine-game simulated top-up flow:** deliver the evidenced baseline, both parallel catalog/checkout branches, and the result/retry join.
- **Graph-level critical path:** REQ-001 foundation work and the shared `design-contracts` contract can proceed independently; REQ-002 / REQ-003 implementation starts after both are ready, then REQ-004 joins both branch outcomes. The slower parallel prerequisite and the slower feature branch control the join.
- **Join condition:** REQ-004 delivery begins after both REQ-002 and REQ-003 outcomes are available; the shared contract must already be agreed before either implementation branch starts.
- **Exit condition:** foundation is ready; all nine games have content-driven catalog entries from legible 2026 transcription records; the cropped MLBB source gap is disclosed; checkout accepts required values without claiming account validity; an evaluator can exercise the success/failure/retry and session-only result paths. Display only selected, user-confirmed artwork mapped in DISC-001; text names remain for games without a selected image.
- **Stop/rethink condition:** real payment processing, game-account verification, game-credit delivery, user accounts, persistent order history, additional games, non-top-up marketplace categories, or promotional claims are requested; these are outside the approved backlog boundary.

## Source and handoff links

- Product constraints and simulation: [`docs/Web Store dan Automasi Top-Up Game (Study Case 1).md`](../Web%20Store%20dan%20Automasi%20Top-Up%20Game%20%28Study%20Case%201%29.md).
- Canonical price/package and visible input reference: [`docs/list-harga-topup-2026.md`](../list-harga-topup-2026.md); this transcription records the available PDF only and is not a freshness guarantee.
- Asset inventory and permission discovery: [`docs/Game Assets/`](../Game%20Assets/) and [`DISC-001`](items/DISC-001-authorized-mlbb-artwork/01-requirement.md).
- Design brief: [`docs/design/DESIGN_BRIEF.md`](../design/DESIGN_BRIEF.md).
- Visual direction: [`docs/design/DESIGN_DIRECTION.md`](../design/DESIGN_DIRECTION.md).
- Information architecture: [`docs/design/INFORMATION_ARCHITECTURE.md`](../design/INFORMATION_ARCHITECTURE.md).
- Design tokens: [`docs/design/DESIGN_TOKENS.md`](../design/DESIGN_TOKENS.md).
