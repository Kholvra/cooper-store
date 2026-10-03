# Session-Only Foundation Cutover Implementation Plan

**Goal:** Remove Create T3 authentication and persistent identity/sample-post scaffolding while preserving PostgreSQL/Prisma exclusively as the catalog persistence boundary.

**Architecture:** Keep the current App Router, tRPC transport, Prisma PostgreSQL datasource, `DATABASE_URL`, and server-side DB module. Remove NextAuth, auth route/config/context, sample Post feature and schema models. Checkout, selection, and receipts remain session-only; do not run a database mutation until the target is independently verified as non-production with backup/rehearsal evidence.

**Tech Stack:** Next.js 15 App Router, tRPC 11, Prisma ORM 6.19.3, PostgreSQL, TypeScript.

## Branch

- **Branch name:** `req-001` (existing current worktree)
- **Base branch:** Current HEAD `ed97f23` on `req-001`
- **Rule:** Implement only the foundation/auth cutover in this worktree. Do not switch, reset, merge, or edit the REQ-002/003/004 worktrees.

## Deliverables

- Anonymous foundation without NextAuth route, configuration, env requirements, or sign-in UI.
- Prisma schema and generated client without scaffold identity or Post models, while preserving the PostgreSQL catalog boundary.
- No mutating operation against an unverified database target; operational migration requirement and blocker recorded.
- Typecheck/build and local route smoke evidence, or exact reported environmental blockers.

## Scope

### In Scope
- `src/app/page.tsx`, `src/app/_components/post.tsx`, `src/app/api/auth/[...nextauth]/route.ts` and `src/server/auth/{config,index}.ts` auth/sample feature cutover.
- Remove `src/server/api/routers/post.ts` and remove its registration from `src/server/api/root.ts`.
- Remove session creation from `src/server/api/trpc.ts` while retaining anonymous request context and database access for the catalog.
- Remove scaffold `Post`, `User`, `Account`, `Session`, `VerificationToken` schema models and relations; preserve PostgreSQL datasource, Prisma generator, `DATABASE_URL`, `src/server/db.ts`, and tRPC infrastructure.
- Remove auth-only `next-auth` and `@auth/prisma-adapter` packages and auth environment variables from validation/template. Update package lock using pnpm in this worktree.
- Regenerate Prisma Client only in current worktree; never hand-edit generated code.
- Update directly affected project docs/readiness evidence to reflect the now session-only foundation and still-deferred database cleanup.

### Out of Scope
- Any implementation or file changes in REQ-002 catalog, REQ-003 checkout, or REQ-004 receipt worktrees; no copying of their user modifications/generated outputs.
- Catalog feature/UI/API implementation, pricing/assets, selection-state behavior, checkout, receipt, or design-contract changes.
- Any real authentication replacement, persistent accounts/orders/receipts, payment integration, or new session service.
- Database `db push`, migration apply/deploy, direct SQL, or table deletion until a non-production target, backup, and rehearsal are verified. No access to actual `.env` values.
- Removing PostgreSQL or Prisma; REQ-002 C-010 requires persistent catalog data.

## Scenario Matrix

| ID | Risk | Trigger / input | Preconditions | Expected observable state / output | Oracle / assertions | Edge or failure behavior | Recovery / side effect | Test level / type | Task | Test / verification | Data / environment |
|---|---|---|---|---|---|---|---|---|---|---|---|
| S1 | High | Anonymous request to `/` | App built/launched with auth vars absent and a syntactically valid disposable `DATABASE_URL` | Page responds HTTP 200 and renders no sign-in or sample-post UI; it does not connect to PostgreSQL | HTTP status/body assertions reject auth/post terms; no DB listener or query is used | Build/runtime fails for unrelated env/dependency reason | Report exact failure; never invent auth credentials or use real DB target | Build + local smoke | T1 | `pnpm typecheck`; `pnpm build`; start controlled local app and GET `/` | Dummy `postgresql://postgres:password@127.0.0.1:1/cutover-smoke`; auth vars explicitly unset |
| S2 | High | Request auth URL variants and unknown tRPC procedure | Auth route removed; tRPC catch-all route retained; root router has no product procedure until REQ-002 integration | Auth URLs get ordinary not-found with no redirect/cookie; unknown tRPC procedure returns tRPC `NOT_FOUND`; route manifest still contains `/api/trpc/[trpc]` | Probe `/api/auth/session`, `/api/auth/signin`, `/api/auth/callback/discord`; inspect built route manifest; GET unknown procedure and assert tRPC error envelope/code | No synthetic health API; empty router is intentional in this foundation-only branch | Keep tRPC boundary for later product routers; no auth/session side effect | Route contract + local smoke | T1 | Route manifest and HTTP probes; `/` RSC smoke confirms anonymous caller path | Controlled local app; dummy DB URL; auth vars unset |
| S3 | High | Validate and generate Prisma Client | Schema models removed | Schema validates and generated client exposes no scaffold identity/Post model delegates; PostgreSQL datasource, generator, output path, `DATABASE_URL`, and `src/server/db.ts` remain | `prisma validate/generate`; exact schema-model and generated declaration inspection for removed delegates; retained client import/typecheck | A retained model/delegate or lost persistence infrastructure fails the check | Fix schema and regenerate only current worktree; no sibling generated output | Schema/static + typecheck | T2 | `pnpm exec prisma validate`; `pnpm exec prisma generate`; inspect `generated/prisma/index.d.ts`; `pnpm typecheck` | Current root schema; generation is local and does not connect to DB |
| S4 | High | Destructive DB schema cleanup requested | Deployment target is unverified | No DB mutation or connection occurs; no table is dropped | Record every executed Prisma command; only `validate` and `generate` allowed; inspect package lifecycle scripts before running package manager | Unknown/non-production target may contain persistent data | Stop; request verified non-prod target, backup, and rehearsal for separate migration work | Operational manual | T3 | Review exact command log; confirm no migrate/db-push/SQL/connect command | Do not inspect or print `.env` values; Prisma CLI may auto-load it, but an explicit disposable `DATABASE_URL` is set |
| S5 | Medium | Linked worktrees contain user changes | REQ-002/003/004 worktrees present | Pre-existing worktree status and protected files remain unchanged | Capture full `git status --short --untracked-files=all` for each sibling before/after; hash user-modified generated/user-owned files before/after where feasible; if no baseline, report unverified | Existing modifications/untracked assets are not mistaken as new work | Keep sibling worktrees read-only; do not stage/copy/reset/clean/regenerate there | Operational manual | T4 | Compare captured status and file hashes | Read-only git status/hash commands |
| S6 | Medium | Startup/build with no auth environment variables | `DATABASE_URL` set to disposable syntactically valid localhost URL | Auth variables are not required; `DATABASE_URL` remains required by shared env validation for the app's PostgreSQL infrastructure | Controlled env launch/build succeeds without auth vars; page returns 200 and no DB connection occurs | Missing `DATABASE_URL` remains a config validation failure by design | Keep catalog persistence boundary; do not inspect or print `.env` values | Static + build/runtime smoke | T1 | Run build and local app with auth vars unset and dummy URL; verify page body/status | Process-local controlled env, no real DB |
| S7 | Medium | Review product persistence after foundation cutover | Root schema has no catalog models today | Result is described only as retained PostgreSQL/Prisma infrastructure; catalog model/API/persistence remains unimplemented and owned by REQ-002 | Read schema, product C-010, and status docs; no claim says the foundation delivered catalog persistence | Empty domain schema must not falsely pass C-010 implementation acceptance | Leave catalog feature work to owning REQ-002 integration; do not copy sibling work | Contract/manual | T2/T3 | Inspect plan/status language and root schema | Current root only; sibling catalog model is read-only reference |

The Scenario Matrix in this plan is canonical; the functional-flow document references these IDs and does not define a second, partial matrix.
## Architecture Decisions

| Decision | Options considered | Chosen approach | Why | Risk / reversibility |
|---|---|---|---|---|
| Persistence boundary | Keep scaffold identity DB; remove all DB; preserve DB for catalog | Retain PostgreSQL/Prisma infrastructure, remove scaffold identity/Post schema, and do not claim catalog persistence is implemented yet | User approved catalog-only persistence and REQ-002 C-010 requires Neon PostgreSQL catalog persistence, but current root schema has no catalog models | Source schema is reversible. Catalog models remain owned by REQ-002; DB tables may remain until separately safe migration |
| Auth boundary | Replace NextAuth; leave dormant auth; delete auth scaffold | Remove provider, adapter, routes, context, env, deps, and consumers | No product accounts/server auth; dormant scaffold remains an accidental capability | Source change reversible; no replacement auth path |
| tRPC context | Preserve auth session context; remove tRPC; make anonymous context | Keep tRPC route and DB context but remove session field/auth helper; an empty root router is intentional until feature integration | Existing plumbing is reusable; no synthetic health procedure or catalog feature is added | Calls relying on session are removed in same cutover; typecheck and unknown-procedure smoke cover boundary |
| Database migration | Apply schema automatically; retain database tables untouched until target proven | Never connect to or mutate unknown deployment target in this task | `.env`/target identity and backup status are unknown; scaffold data being disposable is not proof that deployed target is nonproduction | Leaves orphaned legacy DB tables; cleanup is a separate, gated operation |
| Worktree ownership | Merge/reset feature worktrees; isolate current `req-001` | Edit only `req-001`, preserve all sibling worktrees | Sibling worktrees contain uncommitted user changes and generated Prisma artifacts | Changes do not automatically propagate; report cutover for integration without copying user work |

## Executable Guardrails

- Rule source: `docs/architecture/GUARDRAILS.json`
- Applicable rules: `ARCH-SEC-001`, `ARCH-SCO-001`, `ARCH-SCO-002`.
- Preflight scope: auth, page, tRPC, schema, env, package files listed in `architecture-preflight.md`.
- Task checkpoint: after T1 auth/tRPC cutover and after T2 schema/client cutover, before next task.
- Landing checkpoint: all changed files, tests, and smoke checks before completion.
- Baseline exceptions: none.
- Unsupported BLOCK handling: stop and request a checker/rule decision.
- Important checker limitation: `ARCH-SCO-002` only matches three literal terms under `src/**/*`; it does not inspect Prisma schema or prove absence of database identity models. Keep the plan's schema/client contract checks as explicit verification; do not report the guardrail PASS as proof of schema compliance.

## Resource References

- `docs/resource/next-auth/` — NextAuth v5 beta.25 setup/provider/route/config surface being removed; no replacement auth API.
- `docs/resource/prisma/` — Prisma ORM 6.19.3 CLI, schema, validation, generation. This plan invokes validate/generate only; migration APIs are explicitly not used.
- `docs/resource/prisma--client/` — Prisma Client 6.19.3 generated output/lifecycle. Generated models change from the schema; regenerate only in this worktree.
- `docs/resource/trpc--server/` — tRPC server context and router composition; keep established anonymous context/router boundary.

## Files to Study

### Application and API
- `src/app/page.tsx` — current auth/post scaffold and primary anonymous page.
- `src/app/_components/post.tsx` — sample post client consumer to remove.
- `src/app/api/auth/[...nextauth]/route.ts` — auth endpoint to remove.
- `src/server/auth/config.ts`, `src/server/auth/index.ts` — provider/adapter/session setup to remove.
- `src/server/api/trpc.ts` — remove session lookup/context while preserving DB.
- `src/server/api/root.ts` and `src/server/api/routers/post.ts` — remove sample route and registry reference.
- `src/trpc/server.ts` — currently provides RSC hydration helpers used only by the scaffold page; remove when the sample page is removed because the intentionally empty router has no inferred procedures and the helper has no remaining consumers.
- `src/server/db.ts` — retain server-only Prisma Client singleton for catalog use.
- `src/env.js` — retain `DATABASE_URL`; remove auth env validation.

### Schema and dependencies
- `prisma/schema.prisma` — remove identity/Post models and relations only.
- `package.json`, `pnpm-lock.yaml` — remove auth packages through pnpm; preserve Prisma/tRPC deps.
- `.env.example` — remove auth-only sample variables and comments.
- `generated/prisma/` — generated only with repo command; do not hand-edit.

### Contract and evidence
- `docs/architecture/ARCHITECTURE.md`, `docs/architecture/GUARDRAILS.json` — confirm current identity/catalog boundaries; no rule weakening.
- `docs/product/backlog.md`, `docs/architecture/BASELINE.md`, foundation/REQ readiness artifacts — update only statements affected by removal and retain accurate partial/block status.
- `docs/design/` and REQ-002/003/004 worktree files — read for compatibility, do not change feature requirements or sibling worktrees.

## Target File Structure

- `src/app/page.tsx` remains the anonymous App Router entry; no auth or sample-post component.
- `src/app/api/auth/[...nextauth]/route.ts` absent.
- `src/server/auth/` absent.
- `src/trpc/server.ts` absent; no unused RSC hydration helper is retained for an empty router.
- `src/trpc/react.tsx` and `/api/trpc` route remain available for later client-side product routers.
- `prisma/schema.prisma` keeps PostgreSQL datasource/generator but no domain models after scaffold removal; catalog models are not delivered by this change.
- `generated/prisma/` reflects the current root schema through Prisma generation only.

## Phase Plan

### Phase 1: Remove app/auth scaffold
- Remove auth UI, auth route/config, auth-dependent tRPC context and sample Post procedure/component.
- Remove auth-only package and environment requirements.
- **Exit criteria:** no auth references remain, `pnpm typecheck` passes, controlled root-page smoke responds 200 without auth variables, and representative auth URLs are ordinary not-found.

### Phase 2: Remove identity/Post schema
- Delete scaffold identity/Post schema models/relations, preserving PostgreSQL datasource/generator and DB module only.
- Validate and regenerate only current worktree's Prisma client.
- **Exit criteria:** Prisma validation/generation and typecheck pass; removed model/delegate API is absent; infrastructure remains. This does not implement catalog schema or fulfill REQ-002 C-010 by itself.

### Phase 3: Evidence and safe operational boundary
- Update exact foundation readiness and architecture evidence; preserve unrelated blockers and feature delivery gating.
- Record that no target has been verified and no destructive DB command or DB connection was used.
- **Exit criteria:** architecture landing check plus build/local smoke; sibling worktree baseline unchanged or explicitly unverified; no database mutation.

## Task Breakdown

### Task 1: Remove NextAuth and Post scaffold

**Files affected:**
- Modify `src/app/page.tsx`, `src/server/api/trpc.ts`, `src/server/api/root.ts`, `src/env.js`, `package.json`, `pnpm-lock.yaml`, `.env.example`.
- Delete `src/app/_components/post.tsx`, `src/app/api/auth/[...nextauth]/route.ts`, `src/server/auth/config.ts`, `src/server/auth/index.ts`, `src/server/api/routers/post.ts`, `src/trpc/server.ts`.

- Remove server auth lookup, sign-in/out links, and protected post UI from the homepage without implementing catalog UX.
- Remove the Post router registry reference and post router/component together.
- Keep anonymous tRPC context and database access; remove the context `session` field and auth imports.
- Remove auth env schema keys/example values; keep `DATABASE_URL`.
- Remove `next-auth` and `@auth/prisma-adapter`; update lockfile using pinned pnpm in current worktree.
- Remove the unused `src/trpc/server.ts` RSC hydration wrapper after removing its only consumer; the empty router otherwise triggers the installed helper's missing-procedure type error. Preserve `src/trpc/react.tsx` and the tRPC HTTP route.
- Verify frozen-lockfile integrity with `pnpm install --frozen-lockfile --ignore-scripts`; inspect `pnpm list next-auth @auth/prisma-adapter --depth 20` for remaining dependency paths. Run Prisma generation explicitly as its separate allowed operation.
- TDD/validation mode: characterization refactor. Baseline is known source/import map; consumer oracle is compiler/typecheck plus real route smoke, not copied implementation assertions.

**Scenarios covered:** S1, S2, S6.

**Guardrails:** `ARCH-SEC-001`, `ARCH-SCO-001`, `ARCH-SCO-002` — task-check after vertical slice. Manual architecture-semantic review required because checker coverage is limited.

**Resource references:** `docs/resource/next-auth/`, `docs/resource/trpc--server/`.

**Verification:** `pnpm typecheck`; `pnpm build`; `pnpm install --frozen-lockfile --ignore-scripts`; inspect `pnpm list next-auth @auth/prisma-adapter --depth 20` for residual dependency paths; start a controlled local app with auth variables unset and `DATABASE_URL=postgresql://postgres:password@127.0.0.1:1/cutover-smoke`; GET `/` and assert HTTP 200 plus absence of sign-in/post text; probe `/api/auth/session`, `/api/auth/signin`, `/api/auth/callback/discord` as ordinary not-found without redirects/cookies; confirm route manifest retains `/api/trpc/[trpc]` and unknown-procedure request returns tRPC `NOT_FOUND`. No synthetic endpoint and no real DB target.

### Task 2: Remove identity/Post schema

**Files affected:**
- Modify `prisma/schema.prisma`.
- Regenerate current worktree `generated/prisma/` via `pnpm exec prisma generate`; do not edit generated output manually.

- Remove `Post`, `User`, `Account`, `Session`, and `VerificationToken` models and all relations/adapter-specific comments.
- Preserve generator output path and PostgreSQL datasource using `DATABASE_URL`; preserve the existing `src/server/db.ts` module.
- Validate and generate client without DB connection. Package lifecycle scripts must be inspected; only Prisma `validate` and `generate` are permitted; never run migrate/db-push/SQL.
- Verify removed schema models and generated delegates are absent and DB infrastructure remains. Root schema currently has no catalog models, so this task does not deliver catalog persistence or claim C-010 satisfied.

**Scenarios covered:** S3.

**Guardrails:** same applicable source rules; schema-level identity check is manual because current guardrail scope excludes Prisma files. Run task-check after slice.

**Resource references:** `docs/resource/prisma/`, `docs/resource/prisma--client/`.

**Verification:** `pnpm exec prisma validate`; `pnpm exec prisma generate`; `pnpm typecheck`; inspect exact removed model/delegate declarations in `generated/prisma/index.d.ts` and confirm PostgreSQL datasource, generator output path, and `DATABASE_URL` remain.

### Task 3: Preserve data safety and document unresolved migration

**Files affected:** `README.md`, `AGENTS.md`, `docs/architecture/BASELINE.md`, `docs/product/backlog.md`, and `docs/product/items/REQ-001-runnable-product-baseline/03-readiness-review.md`. Preserve historical evidence plans and all feature plans/worktrees.

- Replace the stale claim that build/dev are blocked by Discord auth variables with observed post-cutover results.
- Remove the current-identity-model blocker only after schema/client checks pass; retain foundation `partial`/delivery `queued` and REQ-002/003/004 `blocked` unless all acceptance gates are independently met.
- Explicitly state that physical legacy DB tables may remain because target identity is unverified and no cleanup migration ran; catalog model persistence is not implemented by this task.
- Retain the constraint that catalog alone may persist and orders/receipts stay session-only.
- Do not inspect or print `.env` values, connect to a database, issue SQL, or run `db:push`, migrate dev/deploy. Prisma CLI may auto-load `.env`; every schema command receives an explicit disposable localhost `DATABASE_URL`, and the app must not connect to it.

**Scenarios covered:** S4, S5, S7.

**Guardrails:** `ARCH-SEC-001`; architecture `ARCH-SCO-002` statement remains unchanged and is not weakened.

**Resource references:** none; no migration API is used.

**Verification:** inspect the docs changes for truthful partial/blocked status; compare captured sibling worktree statuses and hashes to post-task output; if ongoing sibling changes prevent exact comparison, report integrity as unverified. Confirm executed commands were restricted to package management, validate/generate, build/typecheck/smoke/checker and no DB connection/mutation. Prisma CLI may auto-load `.env` values into its process; do not read/print values, and confirm the explicit dummy URL is present in command environment.

## Risks

- **Unknown DB target:** current root has no migration history and `.env.example` is only a local template; an actual `.env`/deployed target could contain data. Mitigation: no DB connection or destructive operation; only Prisma validate/generate are permitted.
- **Catalog branch divergence:** req-002 has user-authored uncommitted Prisma catalog models/migration; root has no catalog models. Mitigation: call retained PostgreSQL/Prisma infrastructure only; do not claim C-010 implementation or copy/regenerate that branch's client.
- **Generated client staleness:** auth/Post delegates remain compiled if not regenerated. Mitigation: run project-local Prisma generation after schema edit and inspect generated declarations.
- **Hidden auth consumers:** `src/server/api/trpc.ts` and homepage currently use auth; additional consumers could survive. LSP is unavailable in this workspace; use exact source reference inventory and compiler/typecheck after removal.
- **Guardrail false confidence:** `ARCH-SCO-002` scans only literal forbidden patterns in `src/**/*`, not Prisma schema. Mitigation: schema and generated API are independent verification oracles.
- **Residual database tables:** code schema removal does not drop deployed tables. Mitigation: explicitly report this incomplete operational cleanup and require verified target/backup/rehearsal before a separate migration task.
- **Environment ambiguity:** `DATABASE_URL` remains required by shared env validation. Mitigation: runtime checks explicitly unset auth vars and set a syntactically valid disposable URL on `127.0.0.1:1`; no page DB connection is expected or allowed.

## Verification

- [x] `pnpm install --frozen-lockfile --ignore-scripts` confirms lockfile consistency; `pnpm list next-auth @auth/prisma-adapter --depth 20` confirms no residual dependency path.
- [x] `pnpm typecheck` passes.
- [x] `pnpm exec prisma validate` passes.
- [x] `pnpm exec prisma generate` succeeds in current worktree only; inspect generated API for removed delegates and retained infrastructure.
- [x] `pnpm build` passes with auth vars unset and disposable DB URL; report exact environmental blocker if not.
- [x] Controlled local app responds at `/` with HTTP 200 and body free of auth/post controls; no PostgreSQL connection is attempted.
- [x] Auth URL variants return ordinary not-found without redirects/cookies; tRPC route remains registered and unknown procedure returns its expected `NOT_FOUND` error.
- [x] Architecture `task-check` after Tasks 1 and 2; final landing-check rerun on the existing affected source and documentation paths returned `PASS` for `ARCH-SEC-001`, `ARCH-SCO-001`, and `ARCH-SCO-002`. The checker is not a substitute for the schema oracle.
- [ ] Feature worktree statuses match captured baseline and protected-file hashes match; concurrent sibling changes prevent proving unchanged state. We did not write to sibling paths, but file-level integrity is unverified.
- [x] Only Prisma validate/generate and non-DB project verification commands ran; no database connection or mutation occurred. Prisma CLI may auto-load `.env`; no values were inspected or printed, and schema commands used an explicit dummy URL.

## Handoff

1. Report that application/schema cutover is implemented while database table cleanup remains unapplied pending safe-target proof.
2. Keep follow-on integration in the relevant owner worktree; do not copy sibling uncommitted files or generated clients.

## Review Status

| Review | File | Verdict | Key findings |
|--------|------|---------|-------------|
| Resource Readiness | local `docs/resource/` packs | ✅ | Prisma v6.19.3 and NextAuth beta packs exist; only validate/generate and removal surfaces used |
| Architecture Preflight | `architecture-preflight.md` | ✅ | Preflight ran; `ARCH-SCO-002` source matcher does not prove Prisma schema absence |
| Design Detour | `design/` | N/A | Only scaffold auth/Post UI is removed; no product screen/interaction is designed |
| Eng Review | `eng-review.md` | ✅ | Initial plan concerns closed; targeted reviewer confirmed the empty-router SSR-helper removal is safe and the client provider/HTTP route remain |
| Scenario Review | `scenario-review.md` | ⚠️ | Initial HIGH findings closed in synthesis; exact package-lock checks added; concurrent sibling changes limit unchanged-state proof, so final integrity may remain unverified |
| Design Review | `design-review.md` | N/A | No design change |
| Skeptical Review | `skeptical-review.md` | ✅ | Independent report-only review found no issues; reviewer verified only the selected root-worktree cutover/docs scope and did not run checks |
