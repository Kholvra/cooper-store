# REQ-001 Foundation Evidence Quick Plan

## Goal

Replace the stale claim that the repository contains no runnable baseline with observed evidence, while keeping foundation readiness and downstream feature delivery blocked until the session-only identity conflict is resolved.

## Scope

### In Scope

- Verify the existing runtime and quality commands without changing dependencies or app behavior.
- Attempt the existing dev launch and document its actual outcome; do not use fake auth values or bypass environment validation.
- Update canonical foundation status/evidence as `partial`; preserve REQ-001 delivery metadata as `queued` and downstream feature deliveries as `blocked`. Do not claim foundation readiness.

### Out of Scope

- Auth, Prisma schema/data ownership, secrets, environment values, app behavior, CI, and delivery workflow setup.
- Feature work for REQ-002/003/004 or any readiness waiver.

## Existing Context

- `package.json` declares Next.js `^15.2.3`, React `^19.0.0`, `pnpm@10.18.3`, and `typecheck`, `build`, and `dev` scripts. Runtime observed locally: Node `v25.2.1`; no `engines` field declares it as the supported Node version.
- Before this slice, `README.md` was Create T3 App template copy; it now documents the project commands and current evidence. `AGENTS.md` documents project setup/check commands.
- `src/app/page.tsx` is still a T3 sample and calls auth/tRPC. `src/env.js` requires auth provider and database variables.
- `pnpm typecheck` exited 0. `pnpm build` and `pnpm dev` exited nonzero during env validation because `AUTH_DISCORD_ID` and `AUTH_DISCORD_SECRET` were unset; no homepage response was available.
- `ARCH-SCO-002` conflicts with the Prisma-backed persistent `User`/`Account`/`Session` models; no exception or product decision is recorded. That conflict remains an explicit blocker.
- No test script or test files are configured; no `.github` workflow directory is present.

## Contract and State Changes

- Foundation evidence is recorded as `partial` based on the declared app/config and passing typecheck, offset by failed build/dev launch and the unresolved architecture conflict; it is not evidence of a runnable product.
- REQ-001 requirement-package status remains `ready` for handoff and its backlog delivery status remains `queued`; foundation evidence is `partial`. REQ-002/003/004 delivery remains `blocked`.
- No auth/schema/data-ownership behavior changes and no waiver is created. `ready` foundation status is explicitly not claimed.

## Scenario Matrix

| ID | Risk | Trigger / input | Preconditions | Expected observable state / output | Oracle / assertions | Edge or failure behavior | Recovery / side effect | Test level / type | Task | Test / verification | Data / environment |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S1 | Low | Contributor inspects project root docs and manifest | Existing checkout | Runtime/framework/package manager and available launch/check commands are discoverable; unsupported Node-version assumptions are disclosed | Root README names the declared project baseline and exact existing commands; it does not claim an undeclared Node version is supported | Missing `engines` or absent delivery workflow remains visible as a gap | Documentation only | Contract/manual inspection | Task 1 | Inspect README, `package.json`, and documented commands | Local repo; no dependency changes |
| S2 | Medium | Run `pnpm typecheck` and `pnpm build` | Dependencies installed; local ignored env file is used without printing values | Each command yields an observed exit status; evidence is recorded accurately, including any failure | Command exits 0 for a pass; nonzero result is documented as a gap, never treated as pass | Environment/build failure is distinguished from typecheck result | No source/data mutation intended | Static + production build | Task 1 | `pnpm typecheck`; `pnpm build` | Existing lockfile/dependencies and local env; no secret values output |
| S3 | Medium | Launch `pnpm dev`; request `/` only if the server becomes ready under an approved local environment | App dependencies; required auth environment absent in this run | With required values, sample page is expected to return HTTP 200 and `Create T3 App`; with auth variables unset, dev exits before listening | This run's oracle: nonzero exit during environment validation naming the missing variables; no route response was observed | Missing env blocks any route smoke; do not use `SKIP_ENV_VALIDATION` or fabricated credentials | Process exited before route invocation; any future route smoke requires an isolated local DB because the page calls auth/tRPC | Local integration smoke | Task 1 | `pnpm dev`; local HTTP/browser check only if server is ready | Loopback; no credentials; no request made in this run |
| S4 | High | Evaluate architecture/foundation evidence | Source unchanged; no waiver | Persistent identity conflict is explicitly documented and gate/downstream delivery remain blocked | Backlog/BASELINE/review text agree on `partial` and blocker; no field says foundation `ready` or implementation waiver | Any existing architecture violation prevents foundation promotion | Documentation only; preserve existing auth/schema | Contract/guardrail + metadata review | Task 1 | Architecture `task-check`/`landing-check`, inspect gate metadata | `docs/architecture/GUARDRAILS.json`; docs-only scope |

## Test Strategy

- S1: low risk; manual contract inspection; oracle is exact discoverability of declared stack/scripts and explicit absence of a declared supported Node version; repository files only; deterministic; run once before handoff.
- S2: medium; configured typecheck/build commands; exit status is the oracle, with results separate; existing dependencies and environment only; no env values printed; no retries. Both were run before docs edits; documentation cannot change their result, so do not repeat the failing build as a retry.
- S3: medium; real local launch attempt, not a mocked handler. Here `pnpm dev` exited before listening on the missing auth variables, so no `/` request or page/database activity occurred. Never report a route smoke as passed; any future request needs an isolated local DB because the sample page calls auth/tRPC.
- S4: high consequence for gate correctness; metadata inspection and guardrail checker; oracle requires foundation status `partial`, REQ-001 delivery `queued`, REQ-002/003/004 `blocked`, and no waiver. Source-scope checker output does not establish semantic compliance; manually inspected Prisma-backed identity models remain an ARCH-SCO-002 blocker.
- No permanent test is added: repository has no configured test runner and this slice changes documentation only. `pnpm typecheck`, the failed build, and the dev launch failure are the selected observed checks; no route smoke passed.

## Architecture Decisions

| Decision | Options considered | Chosen approach | Why | Risk / reversibility |
|---|---|---|---|---|
| Existing persistent identity conflict | Change auth/schema now; claim it as an exception; keep gate blocked pending explicit decision | Do not touch auth/schema or create an exception; document the exact conflict and preserve the blocked gate | This evidence-only slice cannot authorize a sensitive data-ownership change | Low reversibility risk: documentation can be corrected; the actual boundary remains unresolved and blocks readiness |
| Foundation evidence status | Continue claiming no runtime exists; mark ready from manifest alone; record partial evidence | Record `partial` only after observed checks, never `ready` | Manifest alone does not prove the app runs or the architecture is compliant | Reversible documentation; downstream work remains blocked |

## Resource References

- No new package/API is adopted. Verification uses only the repository-declared `pnpm` scripts; package/runtime versions are recorded from `package.json` and command output. The existing `docs/resource/create-t3-app/` directory is empty and no external API surface is being implemented.

## Executable Guardrails

- Rule source: `docs/architecture/GUARDRAILS.json`
- Applicable rules: documentation-scope preflight reports all BLOCK rules not-applicable. A separate preflight ran against every `src/` file and likewise reported `not-applicable`; this checker output does not clear the manually observed `ARCH-SCO-002` conflict in `src/server/auth/config.ts` + `prisma/schema.prisma`.
- Documentation preflight scope: `README.md`, `docs/product/README.md`, `docs/product/backlog.md`, `docs/product/epics/EPIC-001-mlbb-top-up-store.md`, `docs/product/items/REQ-001-runnable-product-baseline/01-requirement.md`, `docs/product/items/REQ-001-runnable-product-baseline/03-readiness-review.md`, `docs/product/items/REQ-002-browse-select-diamond-packages/03-readiness-review.md`, `docs/product/items/REQ-003-simulated-checkout/03-readiness-review.md`, `docs/product/items/REQ-004-receipt-and-retry/03-readiness-review.md`, `docs/product/items/DISC-001-authorized-mlbb-artwork/03-readiness-review.md`, `docs/architecture/BASELINE.md`
- Preflight: PASS for documentation scope; rules reported not-applicable. Source check also ran; it does not prove ARCH-SCO-002 compliance.
- Task checkpoint: after the evidence/documentation slice.
- Landing checkpoint: before completion with final evidence.
- Baseline exceptions: none.
- Unsupported BLOCK handling: stop and request a checker or explicit rule-owner decision.

## Task Breakdown

### Task 1: Establish and publish partial foundation evidence

**Files affected:**
- Plan: `docs/plans/2026-10-03-req-001-foundation-evidence/plan.md`
- Modify: `README.md`
- Modify: `docs/product/README.md`
- Modify: `docs/product/backlog.md`
- Modify: `docs/product/items/REQ-002-browse-select-diamond-packages/03-readiness-review.md`
- Modify: `docs/product/items/REQ-003-simulated-checkout/03-readiness-review.md`
- Modify: `docs/product/items/REQ-004-receipt-and-retry/03-readiness-review.md`
- Modify: `docs/product/items/DISC-001-authorized-mlbb-artwork/03-readiness-review.md`
- Modify: `docs/product/epics/EPIC-001-mlbb-top-up-store.md`
- Modify: `docs/architecture/BASELINE.md`
- Modify: `docs/product/items/REQ-001-runnable-product-baseline/01-requirement.md`
- Modify: `docs/product/items/REQ-001-runnable-product-baseline/03-readiness-review.md`
- Test/verification: `pnpm typecheck`, `pnpm build`, local homepage launch attempt, architecture guardrail checks

**Scenarios covered:** S1, S2, S3, S4

**Guardrails:** none applicable to documentation paths; run docs-scope task-check after the slice.

1. Capture runtime, quality-check, build, dev-launch, and guardrail evidence before editing.
2. Update only evidence/gate documentation; preserve requirement handoff readiness, keep REQ-001 delivery queued, do not mark the foundation ready, and keep downstream feature delivery blocked.
3. Re-run the documentation-scope guardrail check and verify metadata consistency.

## Verification

- `pnpm typecheck`: PASS before documentation edits; docs-only edits do not affect TypeScript compilation.
- `pnpm build`: BLOCKED before documentation edits because `AUTH_DISCORD_ID` and `AUTH_DISCORD_SECRET` were unset; no secret values were printed.
- `pnpm dev`: BLOCKED before listening for the same missing variables; no local route/browser response was possible.
- Architecture guardrails: documentation-scope `preflight`, `task-check`, and `landing-check` PASS; all BLOCK rules were `not-applicable` for docs paths. Source-scope preflight also reported `not-applicable`; none of these results establishes semantic ARCH-SCO-002 compliance. The Prisma-backed identity conflict remains manually verified and blocking.
- Final inspection confirmed foundation `partial`, REQ-001 requirement status `ready` for handoff with delivery `queued`, and REQ-002/003/004 delivery `blocked`. Evidence links were manually reviewed; no auth/schema/environment-secret files were edited.

## Review Status

LOW risk for this evidence-only slice; coverage completion reviewed inline. The broader identity/data-ownership issue remains blocking and is not reviewed or resolved here.

## Assumptions and Open Questions

- The user authorizes updating repository evidence only; this does not constitute a waiver of `ARCH-SCO-002` or permission to keep persistent user data.
- Local `.env` values, if present, are used only by existing commands and must not be printed or copied.
- Whether the persistent identity model must be removed or the product boundary changed remains unresolved; foundation readiness cannot advance until an explicit architecture/product decision and compliant evidence exist.
