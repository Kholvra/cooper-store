# Product Requirements Backlog

## Purpose

This directory is the Domain 1 source for product context, foundation readiness, epic structure, requirements, observable acceptance behavior, and downstream handoff for the nine-game top-up storefront case study.

## Project profile

`product-app` - a responsive Indonesian-language storefront for the nine games and top-up/voucher offers listed in the 2026 price-list reference, with one simulated checkout flow.

Requirement language emphasizes visitors/evaluators, visible workflow states, required-field validation, recoverable failure, and session boundaries. This backlog does not contain implementation tasks, code, test plans, infrastructure recipes, or formal technical contracts.

## Canonical source and artifact roles

- [`backlog.md`](backlog.md) is the compact canonical delivery index.
- [`epics/EPIC-001-mlbb-top-up-store.md`](epics/EPIC-001-mlbb-top-up-store.md) is the canonical parent outcome and milestone boundary. Its existing filename is retained as a stable link; the approved scope is nine games.
- Each folder under [`items/`](items/) is the canonical package for one foundation, active, or discovery item. REQ-002's original Diamond-package slug and DISC-001's MLBB-artwork slug are retained for link stability; their canonical content reflects the nine-game scope.
- Existing files under `docs/` are reference evidence unless a later human decision records a more specific canonical decision in an item package.
- `policies/` defines the backlog's readiness and delivery-quality checks; it is not an implementation or test plan.

## Source priority

When references conflict, use this order:

1. Human-approved decisions recorded in the relevant item discussion and canonical backlog metadata.
2. The manual transcription [`docs/list-harga-topup-2026.md`](../list-harga-topup-2026.md) for the nine-game list, legible package entries, displayed price, and visible account-field labels. It records the available PDF only; freshness is unconfirmed and the MLBB package list has a documented source gap.
3. [`docs/Web Store dan Automasi Top-Up Game (Study Case 1).md`](../Web%20Store%20dan%20Automasi%20Top-Up%20Game%20%28Study%20Case%201%29.md) for simulated checkout, payment, result, and session constraints. Its single-game scope and combined MLBB identifier are superseded by later user decisions.
4. Selected experience and information-architecture decisions in [`docs/design/DESIGN_BRIEF.md`](../design/DESIGN_BRIEF.md), [`docs/design/DESIGN_DIRECTION.md`](../design/DESIGN_DIRECTION.md), [`docs/design/INFORMATION_ARCHITECTURE.md`](../design/INFORMATION_ARCHITECTURE.md), and [`docs/design/DESIGN_TOKENS.md`](../design/DESIGN_TOKENS.md).
5. [`docs/game-topup-seed-data.md`](../game-topup-seed-data.md) is generic reference data only; do not use it to override the PDF field labels or approved product decisions.
6. Downstream implementation decisions must not override an approved product constraint without a recorded decision.

Prices are reference data from the supplied screenshot/PDF, not a price-validity guarantee or a claim of an active promotion. The package requirement must disclose omitted/cropped entries rather than inventing values.

## Current state and foundation

Foundation status: **partial**. REQ-001 remains `delivery_status: queued`; REQ-002/003/004 delivery remains blocked by the foundation gate.

Evidence from the REQ-001 check:

- `package.json` declares the Next.js/React app, pnpm version, and `dev`, `typecheck`, and `build` commands. `README.md` is the root entry point. Node `v25.2.1` was observed locally, but no supported Node version is declared.
- `pnpm typecheck` passed. `pnpm build` and `pnpm dev` both stopped during environment validation because `AUTH_DISCORD_ID` and `AUTH_DISCORD_SECRET` were unset. The app has not passed a local route smoke.
- `docs/architecture/ARCHITECTURE.md`, `GUARDRAILS.json`, and `AGENTS.md` document architecture and contributor workflow. No automated test runner or `.github` workflow is configured.
- The existing NextAuth/Prisma adapter and persistent `User`, `Account`, and `Session` models conflict with the session-only product boundary (`ARCH-SCO-002`). No exception or waiver is recorded; this is a blocker, not an approved baseline exception.

The foundation cannot be marked `ready` from manifest and typecheck evidence alone. REQ-002 and REQ-003 remain blocked by REQ-001 and the shared contract; REQ-004 remains blocked until both feature branches deliver.

## Operating model

The user-approved operating model is a graph: `REQ-001` gates active feature delivery; `REQ-002` and `REQ-003` are parallel branches after the foundation gate and shared contract; `REQ-004` joins them.

```yaml
canonical_source: docs/product/backlog.md
source_priority:
  - human-approved-item-decisions
  - canonical-backlog-and-acceptance-criteria
  - approved-reference-evidence
  - implementation-decisions
foundation:
  first: true
  status: partial
  gate: REQ-001
ordering: graph # user-approved
lanes:
  active:
    prefix: REQ
    consumes_sequence: false
  discovery:
    prefix: DISC
    consumes_sequence: false
  deferred:
    prefix: FU
    consumes_sequence: false
```

The user approved the graph topology on 2026-10-03: `REQ-001` is the common foundation gate; after it clears, `REQ-002` (catalog) and `REQ-003` (game-aware checkout) may progress in parallel against the shared selected-offer/checkout-context contract owned by `design-contracts`; `REQ-004` joins both branch outcomes. `depends_on` and `blocks` record true delivery prerequisites; for this backlog they gate `delivery_status`, not `status: ready` for a next-domain handoff. `related_to`, `enables`, and `discovery_of` describe shared contracts or nonblocking work. Existing `REQ`/`DISC` prefixes and IDs remain stable.

Per the user's decision in REQ-001 C-005 (2026-10-03), `REQ-001` through `REQ-004` are `status: ready` for their named next-domain handoff. This readiness does not mean delivery is ready: feature `delivery_status` remains `blocked` while the foundation or shared contract is missing, and no implementation waiver is recorded.

## Identifier and status conventions

- Active requirements use `REQ-###`.
- Discovery items use `DISC-###` and remain outside the active delivery graph.
- Epic and milestone identifiers use `EPIC-###` and `M#`.
- `status` describes requirement readiness for the named next-domain handoff; `ready` does not imply implementation or delivery readiness.
- `delivery_status` describes execution progress (`queued`, `blocked`, `in_progress`, `done`, or `deferred`).
- `priority` and `size` remain `unset` until a human triage decision is made.

## Downstream handoff

A ready item names its next engineering domain and links the canonical requirement, acceptance criteria, readiness review, and relevant source evidence. `repo-workflow` owns foundation setup; `design-contracts` can define the shared context and result contracts in parallel; `implementation-plan` or `dev-flow` owns technical task breakdown after both prerequisites are clear and preserves the approved parallel branches and join; `test-verification` owns test strategy and execution evidence.

## Open governance decisions

- Map intended supplied images to games and record per-file treatment in `DISC-001`; the user confirms intended assets are user-owned or authorized. No asset is approved by presence in `docs/Game Assets/` alone.
- Set priority and size during triage; values are intentionally not invented.
