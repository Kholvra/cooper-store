# Exasti Case Study — Game Top-Up Store

This repository is a Next.js App Router scaffold for the nine-game simulated top-up storefront. The storefront features are not implemented yet.

## Project baseline

- Node.js: no supported version is pinned in `package.json` (`engines` is absent). Node `v25.2.1` was present during the REQ-001 evidence check; this is an observation, not a support declaration.
- Package manager: pnpm `10.18.3`.
- Application: Next.js `^15.2.3`, React `^19.0.0`, TypeScript, tRPC, Prisma, and NextAuth.
- Setup and repository conventions: [`AGENTS.md`](AGENTS.md).
- Product scope and foundation status: [`docs/product/README.md`](docs/product/README.md).

## Local commands

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm build
```

The app currently requires local environment values documented in [`.env.example`](.env.example). Do not commit `.env` or secret values. At the evidence check, `pnpm typecheck` passed; `pnpm build` and `pnpm dev` could not start because the Discord auth environment variables were unset.

## Quality and architecture

- Typecheck: `pnpm typecheck`
- Production build: `pnpm build`
- No automated test runner is configured yet.
- Executable architecture rules: [`docs/architecture/GUARDRAILS.json`](docs/architecture/GUARDRAILS.json); human context: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md).

Foundation readiness remains **partial and blocked**. The scaffold contains persistent auth/account models that conflict with the session-only product boundary; see [`docs/architecture/BASELINE.md`](docs/architecture/BASELINE.md) and [`REQ-001`](docs/product/items/REQ-001-runnable-product-baseline/03-readiness-review.md). Do not begin REQ-002/003/004 implementation until that conflict and the remaining baseline gaps are resolved.
