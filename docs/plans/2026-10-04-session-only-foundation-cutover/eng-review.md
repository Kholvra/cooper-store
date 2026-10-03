## Eng Review Report

### Step 0: Scope Assessment

- The existing implementation already has a single obvious scaffold dependency chain: homepage → `api.post.hello`/`auth()`/`LatestPost`; root router → `postRouter`; tRPC context → `auth()` and `protectedProcedure`; Prisma scaffold models. Removing those while retaining the established `db` singleton and tRPC HTTP/RSC plumbing is the minimum cutover. No new service or product UX is warranted.
- The branch boundary and prohibition on DB mutation and sibling-worktree edits are well scoped. The schema task correctly preserves catalog persistence, and deferring physical table cleanup is the safe choice absent a verified target.
- Complexity trigger: the plan lists ten source/config removals or modifications plus schema/client generation and documentation; this is a necessary tightly coupled cutover, not overbuilding. No new classes/services or infrastructure.
- Search was disallowed by assignment; proceeding from repository code and local resource packs only.
- No applicable deferred TODO was identified in the reviewed plan inputs. The related REQ-002/003/004 artifacts confirm catalog-only PostgreSQL persistence and session-only checkout/receipt; implementation remains out of scope.

### 1. Architecture

- [MEDIUM] (confidence: 9/10) `plan.md:150,203` — The proposed tRPC smoke path is self-contradictory: it suggests `post.hello` only “if this health path remains supported,” but Task 1 removes the entire sole router, leaving `appRouter` empty. No existing non-DB health procedure was found. A successful `/` render is a real RSC caller smoke; do not require a tRPC procedure to remain or add a synthetic API solely for testing. Specify that the tRPC HTTP transport is retained by route/source/type checks, while the root-page request proves context construction and server-side caller integration. If a transport response is explicitly required, define expected not-found behavior for an unknown procedure, rather than treating a removed endpoint as a health check.
- [MEDIUM] (confidence: 9/10) `plan.md:55,109,161` — The plan says the schema is “catalog-capable” yet Task 2 removes all five named models and adds no catalog models. The sibling REQ-002 worktree has `CatalogGame`/`CatalogOffer` models and a generated client, but it is explicitly out of scope and must not be copied. Clarify that this task leaves a valid PostgreSQL/Prisma persistence boundary (empty domain schema is valid), not a catalog model implementation; catalog models land through the owning REQ-002 integration after branch reconciliation. This avoids a false acceptance claim while preserving the approved boundary.
- [LOW] (confidence: 8/10) `plan.md:118,203` — The route smoke needs a controlled runtime environment: `DATABASE_URL` remains schema-required and `src/server/db.ts` constructs Prisma at module load, even though the homepage itself does not query the DB. State that the local smoke supplies a syntactically valid non-secret dummy PostgreSQL URL, does not connect/query, and omits auth variables; otherwise “no DB required” could be mistaken for “no DATABASE_URL required.”

### 2. Code Quality

- [MEDIUM] (confidence: 9/10) `plan.md:175-176` — Updating docs only when they claim persistent identity/auth “exists” is too narrow. `docs/architecture/BASELINE.md` and REQ-001 readiness evidence specifically state build/dev are blocked by missing Discord variables and identify the live auth models as an unresolved violation. After the cutover, those assertions become stale even though the overall foundation may remain partial/blocked for other reasons (no supported Node version, no test runner/CI). Make Task 3 explicitly update the exact readiness and baseline evidence, preserving unrelated blockers and accurately distinguishing source-schema removal from unapplied database-table cleanup.

### 3. Tests

- [HIGH] (confidence: 9/10) `plan.md:44-49,150,199-205` — S1/S6 do not establish that the homepage works with auth variables absent: typecheck is not runtime proof, and build may be influenced by local env or Next build-time evaluation. Specify an isolated local smoke with auth vars explicitly unset, a valid dummy `DATABASE_URL` if validator requires it, and an observed HTTP 200/body without auth/sample controls; retain exact failure attribution if unrelated env/build requirements block it. Run against the built app or explicitly identified dev server, not an unspecified mixture.
- [MEDIUM] (confidence: 9/10) `plan.md:45,150,203` — S2’s auth-route not-found check is useful, but the same row ambiguously asks that the tRPC route “still exists” after its only procedure is deleted. Distinguish route registration from procedure availability. Verify `/api/trpc` handler remains in route inventory and that `/api/auth/session` is an ordinary not-found, while homepage RSC smoke covers the existing server caller. Do not require a nonexistent health procedure.
- [MEDIUM] (confidence: 8/10) `plan.md:46,169,201` — Generated-client absence assertions are described as manual inspection but have no repeatable failing oracle. Require an explicit source/schema and generated API inspection for all five model/delegate names, with PostgreSQL datasource, `DATABASE_URL`, and generator output path retained; record command/output or a focused static check. `prisma validate/generate` and TypeScript alone can pass even if an unwanted model remains. This is especially important because the guardrail does not inspect schema/generated API, as the plan correctly acknowledges.
- [LOW] (confidence: 8/10) `plan.md:48,186,205` — Before/after sibling status comparison has no captured baseline in this plan, so it cannot prove unchanged state. Record read-only status output before work begins (or compare against the already-established preflight evidence if it actually captures all sibling paths), and after; avoid interpreting pre-existing untracked/generated files as new changes. No sibling files should be staged, copied, or regenerated.

### 4. Performance

- No material performance change is expected: auth session lookup and sample Post query/prefetch disappear; the Prisma singleton and tRPC boundary remain. No benchmark is proportionate for this scaffold cutover. Ensure the retained homepage does not accidentally initialize unnecessary database work; the observed route smoke is sufficient for this scope.

### Decision Log

| Decision | Options | Recommendation | Reversibility |
|----------|---------|----------------|---------------|
| Empty domain schema vs catalog model implementation | Add catalog models now; preserve only PostgreSQL/Prisma boundary | Keep Task 2 narrowly scoped; describe the result as catalog-capable infrastructure, with catalog models owned by REQ-002 | Source/schema change reversible; feature branch integration remains separately owned |
| tRPC smoke after sole router removal | Preserve synthetic health endpoint; accept unknown-procedure error; use RSC page smoke | Do not add a new endpoint; verify route registration and use homepage RSC smoke, with a documented unknown-procedure result only if needed | Fully reversible test choice |
| Runtime smoke environment | Depend on developer `.env`; control env explicitly | Explicitly unset auth vars and supply a valid dummy non-secret DB URL; prove no connection is attempted | Local-only, no DB side effects |

### Verdict

| Section | Verdict | Notes |
|---------|---------|-------|
| Scope Assessment | ✅ | Appropriate minimal foundation cutover; no feature worktree changes. |
| Architecture | ⚠️ | Clarify empty-schema/catalog integration boundary and remove impossible tRPC health ambiguity. |
| Code Quality | ⚠️ | Refresh specifically stale foundation/readiness evidence without clearing unrelated blockers. |
| Tests | ⚠️ | Make isolated no-auth runtime smoke and schema/client absence oracle concrete; transport-vs-procedure distinction. |
| Performance | ✅ | Removal reduces auth/query work; no separate perf test justified. |
## Targeted Closure Review

- **CLOSED — Controlled auth-absent runtime smoke:** `plan.md:44,49,153,200,207-208` specifies an isolated local app run with auth vars explicitly unset, a syntactically valid dummy `DATABASE_URL` at `127.0.0.1:1`, HTTP 200/body assertions, and no DB connection; it reports exact unrelated blockers rather than treating typecheck as runtime proof.
- **CLOSED — Unknown tRPC procedure vs route:** `plan.md:45,145,153,209` distinguishes retained `/api/trpc/[trpc]` transport registration from the intentionally empty procedure registry and explicitly expects unknown-procedure `NOT_FOUND`, without adding a health endpoint.
- **CLOSED — Catalog infrastructure vs model implementation:** `plan.md:57,111,164,195` and `functional-flow.md:19,45,54` preserve PostgreSQL/Prisma infrastructure while stating root has no catalog models and C-010 is not implemented.
- **CLOSED — Readiness docs preserve partial/block:** `plan.md:176-180,190` requires correcting auth/model claims while retaining foundation `partial`, delivery `queued`, feature delivery `blocked`, and the unapplied legacy-table cleanup boundary. The specified readiness artifact still contains stale Discord/model claims (`03-readiness-review.md:7,23,30-31`), but Task 3 explicitly directs their replacement.
- **CLOSED — Generated-client oracle and dummy URL:** `plan.md:46,163-164,172,196,206` requires validate/generate plus explicit inspection of removed model/delegate declarations and retained datasource/generator/output/DB module; `DATABASE_URL` and the dummy runtime URL are explicit (`plan.md:44,49,153,200`).

**New HIGH issues:** None identified in this targeted review.

### Addendum: Empty-router typecheck requirement

- **CLOSED — RSC helper removal is architecturally safe and required:** `src/server/api/root.ts` exports `appRouter = createTRPCRouter({})`; `src/trpc/server.ts` instantiates `createHydrationHelpers<AppRouter>` and creates a caller for that router. Per the reported current typecheck failure, the hydration helper cannot infer procedures for this empty router. The consumer search found no use of `src/trpc/server.ts` or its exports outside that file, so deleting this now-unused server-side RSC hydration wrapper removes the compile failure without removing a live call path.
- **CLOSED — Preserve distinct tRPC client/transport boundaries:** `src/app/layout.tsx` still imports and mounts `TRPCReactProvider` from `src/trpc/react.tsx`; that client provider uses `AppRouter` for client inference and targets `/api/trpc`. `src/app/api/trpc/[trpc]/route.ts` independently registers the HTTP handler against `appRouter`. Neither depends on the RSC hydration wrapper. Keeping both as the plan specifies preserves the client provider and HTTP route; with no procedures, the route has no callable product procedures until later router integration.
- **Plan disposition:** Task 1 already explicitly deletes `src/trpc/server.ts` due to the empty-router helper type error and explicitly preserves `src/trpc/react.tsx` and the tRPC HTTP route (`plan.md:90,110-111,138,145`). No further plan edit is required for this issue.
- **Evidence boundary:** reviewed the revised Task 1/target structure, root router, RSC helper, client provider, root layout, HTTP route, consumer search, and local `trpc--server` README/API/patterns/pitfalls. No web research or code changes performed; implementation typecheck remains for the main task's verification.