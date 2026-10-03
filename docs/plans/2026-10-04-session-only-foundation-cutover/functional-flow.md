# Functional Flow: Session-Only Foundation Cutover

## 1. Meta
- **Feature name:** Session-only foundation cutover
- **User story:** As a storefront visitor, I want to use the product without creating an account, so that checkout and receipts remain session-only while the catalog may persist.
- **Priority:** P0 (blocker)
- **Dependencies:** REQ-001 foundation; REQ-002 catalog persistence contract; PostgreSQL/Prisma catalog boundary.
- **Date:** 2026-10-04

## 2. Entry & Trigger
- **Trigger type:** Page load, tRPC API request, schema generation, and deployment database migration.
- **Who can access:** Anonymous visitors; no server-side identity or login is part of the product.
- **Access point:** `/`, existing `/api/trpc/[trpc]`, and deployment migration workflow.
- **Preconditions:** `DATABASE_URL` is configured as required; the deployment target is not presumed safe or connected. Destructive migration execution additionally requires a separately verified non-production target and a reviewed backup/rehearsal.

## 3. Happy Path
1. **Browse foundation:** Visitor opens `/`; the page renders without auth lookup, sign-in links, or the sample post feature.
2. **Anonymous API:** Existing tRPC HTTP transport and context remain; the sole scaffold router is removed, so no product procedure is promised until the owning feature is integrated. No session lookup occurs.
3. **Catalog storage boundary:** PostgreSQL/Prisma infrastructure remains available as the approved future catalog persistence boundary. The current root schema has no catalog models, so this cutover does not implement catalog persistence or satisfy REQ-002 C-010.
4. **Build/runtime:** App validates without auth-provider environment variables; `DATABASE_URL` remains required by shared env validation. Smoke checks use a syntactically valid disposable localhost URL and must not connect to PostgreSQL.

## 4. Alternative Flows

### Flow A: Legacy auth endpoint
- **When:** A client requests `/api/auth/*` after cutover.
1. No auth route is registered; framework returns its ordinary not-found response and no identity/session is created.

### Flow B: Database target is not verified
- **When:** Schema cleanup would remove scaffold tables but the database target cannot be proven non-production.
1. Source schema and application cutover may be reviewed, but no `db push`, migration deploy, or destructive SQL runs.
2. Report the required target/backup/rehearsal evidence; existing database data is left untouched.

### Flow C: Catalog data unavailable
- **When:** A later catalog consumer cannot reach PostgreSQL.
1. This cutover does not introduce fallback or fabricate catalog data; existing database error behavior remains owned by the catalog implementation.

## 5. State Matrix

| State | Trigger | Visual / Output | User Action | System Action |
|-------|---------|-----------------|-------------|---------------|
| Anonymous page | Open `/` | Page renders without account controls or sample-post UI | Browse | No auth lookup or session creation |
| Legacy auth URL | Request representative `/api/auth/*` paths | Ordinary not-found; no redirect/cookie | Return to storefront | No auth handler/session |
| Unknown tRPC procedure | Request an unregistered procedure | Normal tRPC `NOT_FOUND`; tRPC route remains registered | None | Anonymous context only; no DB connection |
| Database target unverified | Deployment/migration planning | No database changes | None | Refuse DB connection and destructive migration |
| Catalog schema not yet delivered | Inspect current req-001 schema | PostgreSQL/Prisma infrastructure exists; no catalog models yet | Feature owner integrates catalog | Do not claim C-010 implementation |
| Catalog database unavailable | Future database-backed request | Catalog error behavior is owned by its feature | Retry per owning feature | No identity/order persistence introduced |

## 6. Boundaries & Constraints

| Category | Limit | Validation |
|----------|-------|------------|
| Identity | No persistent users, accounts, auth sessions, or verification tokens | Schema and route/source review; generated client regenerated only in current worktree |
| Product state | Checkout, selection, and receipt state are session-only | No schema models/delegates or persistent order writes |
| Catalog | PostgreSQL/Prisma remain an allowed persistence boundary for catalog only; current root schema has no catalog models | Preserve `DATABASE_URL`, datasource, generator, and DB module; do not claim catalog persistence is already implemented |
| Database changes | This task permits only Prisma `validate` and `generate`; no DB connections, db push, migration, or SQL | Inspect lifecycle scripts and record exact commands |
| Auth config | Discord credentials and auth secret are not required; `DATABASE_URL` remains required by shared env validation | Controlled build/runtime env omits auth vars and supplies only disposable URL |

## 7. Side Effects

| Target | Action | When | Rollback Strategy |
|--------|--------|-------------------|-------------------|
| Source schema | Remove scaffold identity and `Post` models | Source cutover | Revert source change; generated code is regenerated, not hand-edited |
| Database | Potentially remove obsolete scaffold tables | Separate approved migration against verified non-production DB only | Backup restore or reviewed migration rollback; no production execution in this task |
| Package manifest | Remove NextAuth and Prisma adapter dependencies | Dependency cutover | Reinstall from lockfile after reversing manifest+lockfile |
| Environment contract | Remove auth env requirements; retain `DATABASE_URL` | Source cutover | Revert manifest/schema change |
| Session-only state | No persistent write | At all times | No persistent data to roll back |

## 8. Failure Modes

| Failure | Probability | User Impact | Detection | Recovery |
|---------|-------------|-------------|-------------|----------|
| Stale auth import remains | Medium | Build fails or auth code remains reachable | Typecheck, source reference scan, route smoke | Remove remaining caller and repeat checks |
| Prisma schema/client mismatch | Medium | Generation or typecheck fails | `prisma validate`, `prisma generate`, typecheck | Correct schema/source, regenerate only current worktree |
| Unknown database points to deployed data | High | Destructive migration could destroy data | Target identity cannot be independently verified | Do not connect or mutate; request verified target evidence |
| Catalog database boundary accidentally removed | Medium | Catalog persistence cannot be implemented | Schema and module inspection; catalog architecture contract | Restore Prisma datasource/client boundary without restoring identity models |
| Auth env still required at build | Medium | Build/start fails without credentials | Run source env validation and build without auth credentials | Remove stale env keys/usages |
| User feature work overwritten | Medium | Uncommitted feature work lost | Keep all other worktrees read-only; inspect their status before/after | Stop and preserve exact user changes; no worktree operations |

## 9. UX Copy

No new user-facing copy is introduced. The existing page loses scaffold sign-in/post controls; catalog and checkout copy belong to REQ-002/003/004 and are out of scope.

## 10. Non-Functional Requirements

| Category | Requirement | How Verified |
|----------|-------------|--------------|
| Security — auth | No server-side user authentication or identity persistence | Route/source/schema review and architecture gate; schema checked separately from limited source matcher |
| Security — data | No user/order/receipt persistence; secrets stay out of git | Schema inspection and `ARCH-SEC-001` check |
| Reliability | Prisma infrastructure remains available; catalog data models are still owned by REQ-002 | Schema/client inspection and typecheck; do not claim C-010 implemented |
| Data safety | No unverified destructive DB action or connection | Exact command record; only schema-local validation/generation |
| Compatibility | tRPC HTTP route remains without auth; no application procedure exists until product router integration | Route manifest and unknown-procedure `NOT_FOUND` smoke |

## 10.1 Test Strategy

| Risk / behavior | Test level / type | Oracle / assertions | Test data / environment | Cadence / gate |
|-----------------|-------------------|---------------------|-------------------------|----------------|
| Anonymous page and auth endpoint removal | Build + controlled local smoke | `/` returns 200 without auth env and body has no sign-in/sample-post UI; auth routes are ordinary 404 without redirect/cookie | Auth vars explicitly unset; dummy localhost `DATABASE_URL`; no DB listener or query | Before cutover completion |
| tRPC route/context boundary | Route manifest + local HTTP smoke | Catch-all tRPC route exists; unknown procedure returns `NOT_FOUND`; source context has no auth/session lookup | Controlled local app; no synthetic health procedure | After auth slice |
| No persistent identity/post schema | Prisma validation + generated-client inspection | Validation/generation succeeds; schema and generated client omit all five models/delegates | Current source schema; Prisma 6.19.3 pack | After schema slice |
| Retained persistence infrastructure vs catalog implementation | Schema/module contract | PostgreSQL datasource, `DATABASE_URL`, generator, DB module remain; current root schema has no catalog models and C-010 remains for REQ-002 | Current worktree only; no sibling code copied | After schema slice |
| No destructive mutation of unknown DB | Operational side-effect check | Only `validate` and `generate` Prisma commands run; no DB connection, migrate/db-push/SQL | Never inspect or print `.env` values; Prisma CLI may auto-load `.env`, but use an explicit dummy URL | Every phase; mandatory completion check |
| No edits in feature worktrees | Status/hash state inspection | Compare full read-only status and protected file hashes to captured baseline, or report integrity unverified if concurrent changes make comparison unstable | All linked worktrees remain read-only | Before/after implementation |

Reliability controls: never inspect or print `.env` values, and do not connect to a database or invoke DB-mutating commands. Prisma CLI may auto-load `.env`; set the explicit disposable `DATABASE_URL` in the command environment and use only `validate`/`generate`. Inspect package lifecycle scripts before execution. Use deterministic source/schema checks and existing toolchain. Keep all implementation edits in `req-001`; catalog model work remains owned by REQ-002.

## 11. Scope Boundaries

### In Scope
- Remove scaffold NextAuth usage and its HTTP route.
- Remove persistent `User`, `Account`, `Session`, `VerificationToken`, and sample `Post` models/procedure/UI, including scaffold-only consumers.
- Remove auth-only packages and auth environment requirements while retaining `DATABASE_URL`, Prisma, and tRPC plumbing needed for catalog.
- Keep catalog as the only permitted persistent domain; session selection, checkout, and receipt data remain non-persistent.
- Preserve all uncommitted user changes and all feature worktrees.

### Out of Scope
- Implement catalog, checkout, or receipt features in REQ-002/003/004.
- Edit or regenerate Prisma outputs in feature worktrees.
- Apply database schema changes or delete any actual database table until a non-production target, backup, and rehearsal are verified.
- Add auth replacements, persistent order tables, payment integration, or session storage infrastructure.
- Change the approved catalog prices/design or promote the REQ-002 design contract beyond the user-confirmed search-selection behavior.

## 12. Open Questions
- None on product scope. Database-target identity remains an operational prerequisite for any destructive migration and is intentionally not guessed.

## 13. Capabilities Checklist
- [x] Remove scaffold auth/session capabilities
- [x] Preserve anonymous tRPC transport and PostgreSQL/Prisma infrastructure; catalog models/persistence are not implemented here
- [x] Preserve user feature work and avoid database side effects
- [ ] Apply destructive schema migration (explicitly deferred until safe target verification)

## 14. Scenario Matrix
The canonical Scenario Matrix, including stable IDs S1–S7 and each task/oracle/environment, is in [`plan.md`](plan.md#scenario-matrix); do not maintain a second copy.

## 15. Architecture Decisions

| Decision | Options considered | Chosen approach | Why | Risk / reversibility |
|---|---|---|---|---|
| Persistent data boundary | Keep T3 identity DB; remove all DB use; retain DB for catalog only | Retain PostgreSQL/Prisma for catalog only; remove scaffold identity/Post persistence | User approved catalog-only persistence and REQ-002 C-010 requires catalog persistence | Schema source reversible; actual table drops are high risk and deferred |
| Auth boundary | Replace NextAuth; leave dormant auth; delete scaffold auth completely | Delete NextAuth setup, route, consumers, env and dependencies | Product prohibits server-side identity; dormant auth leaves an accidental capability | Source removal is reversible; no provider substitute |
| DB migration execution | Push/deploy to configured target; defer until target verified | Defer destructive operation | No deployment target evidence and `.env` must not be accessed or guessed | Leaves legacy DB tables possibly present, but unreachable from application schema |
| Worktree ownership | Merge or reset sibling worktrees; leave intact | Keep req-002/003/004 read-only | They contain user-owned uncommitted feature work and generated artifacts | Cutover applies only to current `req-001` worktree |
