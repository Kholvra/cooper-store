# Resource Documentation Batch Index

Packages are processed sequentially in the order shown. Requested ranges and roles are recorded from `package.json`; exact resolved versions are from `pnpm-lock.yaml`.

## Included packages

| # | Package | Role | Requested range | Resolved version | Resource directory | Inclusion reason | Status | Coverage (discovered / documented / verified / unverified) |
|---:|---|---|---|---|---|---|---|---|
| 1 | `zod` | runtime | `^3.24.2` | `3.25.76` | `zod/` | Runtime schema validation/type inference; requested first package in sequential batch. | INITIAL / PARTIAL | 32 / 32 / 32 / 0 practical API groups; six v4-family paths remain out of scope |
| 2 | `@prisma/client` | runtime | `^6.6.0` | `6.19.3` | `prisma--client/` | Generated PostgreSQL ORM client used by the application; project schema and server client are present. | INITIAL / PARTIAL | 37 / 37 / 37 / 0 practical API groups; generated schema-specific symbols and 18 non-core exports outside verified scope |
| 3 | `@auth/prisma-adapter` | runtime | `^2.7.2` | `2.11.3` | `auth--prisma-adapter/` | Auth.js database adapter integrating NextAuth with the project's Prisma client and schema. | INITIAL / PARTIAL | 20 / 20 / 20 / 0 factory and adapter methods; core-version compatibility unverified |
| 4 | `@t3-oss/env-nextjs` | runtime | `^0.12.0` | `0.12.0` | `t3-oss--env-nextjs/` | Type-safe environment variable validation for Next.js and Node. | VERIFIED | 5 / 5 / 5 / 0 configuration options and exports |
| 5 | `@tanstack/react-query` | runtime | `^5.69.0` | `5.104.1` | `tanstack--react-query/` | Asynchronous state management, caching, and SSR hydration for React. | VERIFIED | 18 / 18 / 18 / 0 practical API groups and hooks |
| 6 | `@trpc/server` | runtime | `^11.0.0` | `11.19.0` | `trpc--server/` | Typed API router, procedure, middleware, and request context used by application API. | INITIAL / PARTIAL | 14 / 14 / 14 / 0 practical groups; full export/subpath inventory unverified |
| 7 | `@trpc/client` | runtime | `^11.0.0` | `11.19.0` | `trpc--client/` | Typed client and HTTP/link transport used by the frontend. | INITIAL / PARTIAL | 15 / 15 / 12 / 3 practical groups/details; full export/subpath inventory unverified |
| 8 | `@trpc/react-query` | runtime | `^11.0.0` | `11.19.0` | `trpc--react-query/` | Typed React hooks/provider integrating tRPC with TanStack Query. | INITIAL / PARTIAL | 13 / 13 / 10 / 3 practical groups/details; full export/hook option inventory unverified |
| 9 | `next` | runtime | `^15.2.3` | `15.5.27` | `next/` | Core framework for App Router, Server Actions, and routing; requested by task. | INITIAL | 35 / 35 / 35 / 0 practical API groups and modules |
| 10 | `next-auth` | runtime | `5.0.0-beta.25` | `5.0.0-beta.25` | `next-auth/` | Authentication library v5 beta with Prisma adapter support; requested by task. | INITIAL | 12 / 12 / 12 / 0 practical API groups and modules |
| 11 | `react` | runtime | `^19.0.0` | `19.3.0` (with `react-dom` `19.3.0`) | `react/` | React UI runtime paired with React DOM in Next.js app. | INITIAL / PARTIAL | 27 / 27 / 27 / 0 practical API groups; exact-version public export inventory and compatibility matrix unverified |
| 12 | `server-only` | runtime | `^0.0.1` | `0.0.1` | `server-only/` | Server-component-only module marker used to guard server code. | INITIAL / PARTIAL | 1 / 1 / 1 / 0 package API groups; bundler enforcement/versioned integration unverified |
| 13 | `superjson` | runtime | `^2.2.1` | `2.2.6` | `superjson/` | Typed JSON-compatible serialization transformer used with API transport. | INITIAL / PARTIAL | 6 / 6 / 6 / 0 practical API groups; complete export and transformer inventory unverified |
| 14 | `prisma` | dev workflow tool | `^6.6.0` | `6.19.3` | `prisma/` | Included as the Prisma schema/client-generation workflow tool. | INITIAL / PARTIAL | 7 / 7 / 7 / 0 project-used command groups; full CLI option/export inventory unverified |
| 15 | `tailwindcss` | dev build tool | `^4.0.15` | `4.3.3` | `tailwindcss/` | Included as the project styling build tool. | INITIAL / PARTIAL | 9 / 9 / 9 / 0 practical API groups; complete utility and compiler option inventory unverified |

## Excluded packages

| Package | Resolved version | Exclusion reason |
|---|---|---|
| `@tailwindcss/postcss` | Not supplied | Excluded from the explicitly enumerated included queue. |
| `@types/node` | Not supplied | Type-only `@types/*` package; excluded by batch selection rules. |
| `@types/react` | Not supplied | Type-only `@types/*` package; excluded by batch selection rules. |
| `@types/react-dom` | Not supplied | Type-only `@types/*` package; excluded by batch selection rules. |
| `postcss` | Not supplied | Excluded from the explicitly enumerated included queue; not independently requested as a workflow package. |
| `typescript` | Not supplied | Excluded from the explicitly enumerated included queue; not independently requested as a workflow package. |
