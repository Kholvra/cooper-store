# Resource: `@trpc/server`

- Ecosystem: npm / TypeScript
- Requested version: `^11.0.0` (`package.json`)
- Resolved version: `11.19.0` (`pnpm-lock.yaml`)
- Runtime/platform: Node.js server through framework/transport adapters; TypeScript consumers
- Status: PARTIAL (initial practical API grounding; full export inventory not verified)
- Last verified: 2026-10-03
- Verification scope: initialization, routers/procedures, context, input validation, middleware, errors, inference, server-side callers, and subscription contract.
- Coverage: discovered 14 practical API groups; documented 14; verified 14 practical groups from v11 docs; unverified 0 within scope. Package export/subpath inventory and exact patch peer/engine metadata remain unverified.

## Sources
- [Define Routers](https://trpc.io/docs/server/routers) — initialization/router/runtime configuration, v11.x.
- [Procedures](https://trpc.io/docs/server/procedures) — query/mutation procedure fundamentals, v11.x.
- [Middlewares](https://trpc.io/docs/server/middlewares) — middleware continuation and context narrowing, v11.x.
- [Context](https://trpc.io/docs/server/context) — request context lifecycle, v11.x.
- [Validators](https://trpc.io/docs/server/validators) — runtime input validation, v11.x.
- [Error handling](https://trpc.io/docs/server/error-handling) — structured errors, v11.x.
- [Server-side calls](https://trpc.io/docs/server/server-side-calls) — typed caller factory, v11.x.
- `[Code]` `src/server/api/trpc.ts:29-37` — context creation; `src/trpc/react.tsx:6,32-39` — inferred router input/output types.
- `[Code]` `package.json:23-25` — requested package range; `pnpm-lock.yaml:29-31` — exact resolution.

## Refresh Triggers
- Resolved version changes in lockfile/manifest.
- A task uses an API or feature outside the verification scope.
- A relevant deprecation, security advisory, or migration is discovered.
- The user explicitly requests a refresh.
