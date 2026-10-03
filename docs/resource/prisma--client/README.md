# Resource: `@prisma/client`

- Ecosystem: npm / TypeScript ORM
- Requested version: `^6.6.0` (from `package.json`)
- Resolved version: `6.19.3` (user-provided lockfile resolution)
- Runtime/platform: Node.js; PostgreSQL project datasource; generated Prisma Client
- Status: PARTIAL (initial practical Prisma ORM v6 grounding; full generated/schema-dependent export inventory is not enumerable without generated client artifact)
- Last verified: 2026-10-03
- Verification scope: Client instantiation/configuration, generated model delegates and CRUD, filtering/select/include/relations, interactive and sequential transactions, lifecycle, connection pooling, and errors.
- Coverage: discovered 19 package export-map keys; documented 1 relevant root entrypoint and 37 practical API groups; verified 37 API groups; unverified 18 non-core export paths and schema-generated model/type symbols.

## Sources
- [Prisma Client API reference (ORM v6)](https://www.prisma.io/docs/orm/v6/reference/prisma-client-reference.md) — `PrismaClient`, CRUD, filters, select/include, errors, transaction options, lifecycle.
- [Instantiating Prisma Client (ORM v6)](https://www.prisma.io/docs/orm/v6/prisma-client/setup-and-configuration/instantiate-prisma-client.md) — singleton rationale and pools per client instance.
- [Connection management (ORM v6)](https://www.prisma.io/docs/orm/v6/prisma-client/setup-and-configuration/databases-connections/connection-management.md) — lazy `$connect()`, explicit `$disconnect()` guidance.
- [Connection pool (ORM v6)](https://www.prisma.io/docs/orm/v6/prisma-client/setup-and-configuration/databases-connections/connection-pool.md) — v6 pool sizing and P2024 behavior.
- [Transactions and batch queries (ORM v6)](https://www.prisma.io/docs/orm/v6/prisma-client/queries/transactions.md) — nested writes, batch and interactive transactions, options.
- [Error reference (ORM v6)](https://www.prisma.io/docs/orm/v6/reference/error-reference.md) — public error classes and codes.
- [System requirements (ORM v6)](https://www.prisma.io/docs/orm/v6/reference/system-requirements.md) — Prisma ORM v6 Node/TypeScript baseline.
- [Published package metadata](https://www.npmjs.com/package/@prisma/client/v/6.19.3) — package version `6.19.3`, Node engine `>=18.18` (confirmed via `npm view`).
- [Exact tagged package manifest](https://github.com/prisma/prisma/blob/6.19.3/packages/client/package.json) — export-map shape and engine constraint; monorepo source manifest uses workspace version placeholder, so published npm metadata is authoritative for version.
- `[Code]` `package.json:20` — requested range; `prisma/schema.prisma:4-16` — custom generator output and PostgreSQL datasource; `src/server/db.ts:1-16` — development global singleton and logging pattern.

## Refresh Triggers
- Resolved version changes in lockfile/manifest.
- The Prisma schema changes; generated model delegates/input/output types change with it.
- A task uses a client extension, driver adapter, edge/runtime entrypoint, or export path outside this scope.
- A relevant deprecation, security advisory, or migration is discovered.
- The user explicitly requests a refresh.

## Scope and caveats
`@prisma/client` exposes generic runtime entrypoints, but `PrismaClient` model delegates and exact input/output types are generated from this repository's schema during `prisma generate`. The project config uses `provider = "prisma-client-js"` and custom output `../generated/prisma`, and imports that generated client in `src/server/db.ts`; examples therefore use the generated path, not the package root import. This reference covers documented general API and current schema integration but does not claim an exhaustive generated-client type inventory.
