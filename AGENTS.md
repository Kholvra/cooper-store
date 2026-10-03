# Repository Guidelines

## Project Overview
Next.js 15 App Router storefront, currently a Create T3 App foundation using React 19, TypeScript, tRPC, Prisma, NextAuth, Zod, and Tailwind CSS v4. Product documents define a nine-game Indonesian top-up case study with simulated checkout and session-only receipts; the implementation is still scaffold-level and does not yet satisfy that product boundary.

## Setup Commands
- Install: `pnpm install`
- Dev: `pnpm dev`
- Typecheck: `pnpm typecheck`
- Build: `pnpm build`
- Database: `pnpm db:generate`, `pnpm db:migrate`, `pnpm db:push`, `pnpm db:studio`
- Local PostgreSQL helper: `./start-database.sh`

## Non-negotiables
- Search before writing; reuse the owning module instead of duplicating a helper or concept.
- Extend an existing module when it fits; do not add a near-duplicate file.
- Make the smallest change and do not refactor unrelated scaffold code.
- Preserve strict TypeScript and the `~/*` alias (`~/*` maps to `src/*`).
- Keep user-facing errors actionable and free of stack traces; retain technical detail in diagnostics.
- Do not invent catalog prices or artwork. Use the approved references under `docs/`.
- The storefront remains simulation-only: no real payment gateway, card charge, or persistent order/account feature.

## Language & Style
- TypeScript is strict, uses ES modules, async/await, Zod validation, and tRPC procedures.
- Server Components own server data fetching; add `"use client"` only for interactive React components.
- Use tRPC routers for typed API boundaries, Prisma only through server-side modules, and `server-only` where already established.
- Use Tailwind v4 in `src/styles/globals.css`; follow the existing design tokens under `docs/design/`.

### Naming Conventions
- `PascalCase` for React components (`RootLayout`, `Home`, `LatestPost`).
- `camelCase` for functions, variables, hooks, and utilities; Next route folders use `[trpc]` and `[...nextauth]`.
- Match the primary export and keep tests colocated or consistently mirrored if tests are introduced; there are currently no test files or test script.
- Prefer named exports; route handlers use the framework-required `GET`/`POST` exports.

## Architecture Rules
- UI: `src/app`; client tRPC provider/hydration: `src/trpc`; server API composition: `src/server/api`; auth: `src/server/auth`; database: `src/server/db.ts` and `prisma/`.
- Flow is App Router entry point → tRPC procedure → Prisma/auth context. Lower layers must not import UI modules.
- Keep route handlers thin: adapt HTTP requests and delegate to tRPC or auth modules.
- `src/server/api/root.ts` is the tRPC router registry; add feature routers there rather than bypassing the API boundary.
- Treat `tmp-t3/` as a duplicate/generated workspace, not a second application source root. Resolve or document it before adding code there.

## Architecture Enforcement
- Executable source: `docs/architecture/GUARDRAILS.json`
- Human context: `docs/architecture/ARCHITECTURE.md`
- Before plan lock: run `$architecture-guardrails` in `preflight` mode.
- After each TDD vertical slice: run `task-check` before starting the next task.
- Before completion: run `landing-check` with tests and smoke checks.
- A BLOCK or unsupported BLOCK result must be fixed or explicitly escalated; prose does not override it.

## Testing Instructions
No test framework or test files are configured. Use `pnpm typecheck` and `pnpm build` for current verification. New behavior requires a consumer-visible regression test once a test framework is deliberately introduced.

## Operational Notes
- Required env vars are `AUTH_SECRET`, `AUTH_DISCORD_ID`, `AUTH_DISCORD_SECRET`, `DATABASE_URL`, and `NODE_ENV`; copy `.env.example` to local environment only.
- Prisma generates client output under `generated/prisma`; do not edit generated files.
- Development tRPC middleware intentionally adds a random 100–500 ms delay and logs timing.
- `docs/architecture/BASELINE.md` says foundation status is missing; current Prisma/NextAuth persistent user models conflict with the documented session-only product boundary and require resolution, not silent extension.

## Communication
Use concise English, concrete paths and commands, and report observed verification output. Keep product-facing copy consistent with the existing Indonesian storefront direction when implementing UI.

## Principles
- Product constraints outrank template defaults.
- One owner for each domain fact and API contract.
- Prefer boring composition over new abstractions.
- Make unsupported behavior impossible or explicitly visible.

## Quality Gates (SSOT / DRY / KISS / SOLID / YAGNI)
1. **SSOT — one owner per fact.** Types, prices, parsers, and statuses have one owner; import them rather than syncing copies.
2. **DRY — 2x extract, 3x build.** Extract the same meaningful block on its second repetition.
3. **KISS — small files, flat logic.** Split files over 400 lines or functions over 60 lines.
4. **SOLID — injectable I/O.** Keep database, fetch, env, and clock effects behind testable boundaries.
5. **YAGNI — no consumers, no code.** Delete unused abstractions and dependencies.
6. **Tests prove behavior.** Assert observable effects, not merely non-throwing execution.
7. **Retry prove-first.** Before repeating a side effect, prove it did not already happen; otherwise report uncertainty.
8. **Search before you write.** Reuse the owning module and make the smallest change.
9. **Same-commit hygiene.** Remove dead paths and update this file when documented facts change.

## Things to Avoid
- Real payments, payment credentials, or production card flows.
- Persistent user/order storage that violates the session-only scope.
- Editing `generated/prisma`, `.next`, `node_modules`, or other generated output.
- Committing `.env`, keys, tokens, or private credentials.
- Copying code between `src/` and `tmp-t3/`.
- Adding a second tRPC, auth, database, or catalog convention.
- Guessing omitted prices, assets, or requirements.

## Project Structure
- `src/app/`: routes, layouts, server pages, client components, and HTTP adapters; keep route-specific UI here.
- `src/server/api/`: tRPC context, root registry, and routers; keep domain API procedures here.
- `src/server/auth/`: NextAuth configuration and cached auth; do not put UI logic here.
- `src/trpc/`: client/server query plumbing and hydration; do not place business rules here.
- `prisma/`: schema and migrations; generated client output is not hand-edited.
- `docs/product/`, `docs/design/`, `docs/architecture/`: product contracts, visual/IA decisions, and executable guardrails.
- `tmp-t3/`: duplicate workspace artifact; do not treat it as an application domain.

## Project Structure Principles
1. Organize new work by domain: catalog, checkout, and receipt behavior should have clear owners rather than unrelated utility piles.
2. Keep application source under `src/`; config stays at root and build output stays ignored.
3. Keep each directory single-purpose; split unrelated additions instead of growing a junk drawer.
4. Shared contracts have one home, such as `src/server/api/root.ts` for router registration.
5. Keep layer direction one-way: App Router → tRPC → server/data; shared plumbing does not import UI.
6. Keep route handlers thin and business logic in procedures or domain modules.
7. Split files over 400 lines and functions over 60 lines.
8. Place component-specific behavior beside the component; keep global CSS in `src/styles/`.
9. Never commit build artifacts, generated Prisma output, `.next`, or `node_modules`.
10. Fix an incorrect boundary instead of adding a temporary workaround in the wrong directory.

## Boundaries
- Never commit `.env`, credentials, private keys, or tokens.
- Never edit generated Prisma output; edit `prisma/schema.prisma` and regenerate.
- Never bypass `docs/architecture/GUARDRAILS.json` or weaken its blocked rules.
- Never add real payment integration or persistent account/order storage without an explicit product/architecture decision.
- Do not alter approved product/design documents to make an implementation appear compliant.

## Git Workflow
No repository-specific branch or commit convention is documented. Use a focused branch and one logical change per commit; do not push directly to the default branch unless repository policy permits it. Run the relevant typecheck/build before committing and include observed output in review.

## Key Workflows
### Adding a tRPC feature
1. Add a router under `src/server/api/routers/` following `post.ts`.
2. Validate inputs with Zod and use the existing context/procedure helpers.
3. Register the router in `src/server/api/root.ts`.
4. Expose it through existing server/client tRPC helpers; do not call Prisma from UI.
5. Run `pnpm typecheck`, then `pnpm build`.

### Adding a page or interactive component
1. Follow `src/app/page.tsx` for server fetching and `_components/post.tsx` for client interaction.
2. Keep the component under the owning route and preserve the server/client boundary.
3. Use tokens in `docs/design/DESIGN_TOKENS.md` and styles in `src/styles/globals.css`.
4. Verify with `pnpm typecheck` and a local `pnpm dev` smoke check.

### Verifying a change
1. Run the narrowest available check (`pnpm typecheck` for code/config changes).
2. Run `pnpm build` for route, env, Prisma, or dependency changes.
3. Run architecture preflight/task/landing checks at their required checkpoints and report any BLOCK.
