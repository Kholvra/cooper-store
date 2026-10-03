# Exasti Case Study — Game Top-Up Store

This repository is a Next.js App Router scaffold for the nine-game simulated top-up storefront. The storefront features are not implemented yet.

## Project baseline

- Node.js: no supported version is pinned in `package.json` (`engines` is absent). Node `v25.2.1` was present during the REQ-001 evidence check; this is an observation, not a support declaration.
- Package manager: pnpm `10.18.3`.
- Application: Next.js `^15.2.3`, React `^19.0.0`, TypeScript, tRPC, and Prisma. Auth scaffold has been removed.
- Setup and repository conventions: [`AGENTS.md`](AGENTS.md).
- Product scope and foundation status: [`docs/product/README.md`](docs/product/README.md).

## Local commands

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm build
```

The app requires `DATABASE_URL` for its PostgreSQL persistence boundary; retain the local values documented in [`.env.example`](.env.example), but do not commit `.env` or secret values. Auth environment variables are no longer required. `pnpm typecheck` and `pnpm build` pass; a production local smoke returned HTTP 200 at `/` and ordinary 404 responses for removed auth routes with a disposable localhost URL.

## Quality and architecture

- Typecheck: `pnpm typecheck`
- Production build: `pnpm build`
- No automated test runner is configured yet.
- Executable architecture rules: [`docs/architecture/GUARDRAILS.json`](docs/architecture/GUARDRAILS.json); human context: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md).

Foundation readiness remains **partial and blocked**. The authentication/identity schema conflict is resolved in source, but the nine-game storefront and catalog models are not implemented in this worktree. The supported Node.js version and delivery workflow are also not established. Legacy database tables may remain because no deployment target was verified for destructive cleanup. See [`docs/architecture/BASELINE.md`](docs/architecture/BASELINE.md) and [`REQ-001`](docs/product/items/REQ-001-runnable-product-baseline/03-readiness-review.md). REQ-002/003/004 delivery remains blocked.
