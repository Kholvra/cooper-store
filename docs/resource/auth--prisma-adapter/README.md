# Resource: `@auth/prisma-adapter`

- Ecosystem: npm / TypeScript; Auth.js adapter for Prisma ORM
- Requested version: `^2.7.2` (from `package.json`)
- Resolved version: `2.11.3` (user-provided lockfile resolution)
- Runtime/platform: Auth.js v5 / Next.js App Router, Node.js, Prisma Client
- Status: PARTIAL (initial adapter API grounded; project Auth.js core versions differ)
- Last verified: 2026-10-03
- Verification scope: Exact package export/factory, all 19 Prisma adapter methods, required model fields and keys, NextAuth integration, Prisma and Auth.js compatibility.
- Coverage: discovered 20 scoped symbols (factory plus 19 methods); documented 20; verified 20 from exact version source; unverified 0 API symbols. Project compatibility is PARTIAL because `@auth/prisma-adapter@2.11.3` depends on `@auth/core@0.41.3` while `next-auth@5.0.0-beta.25` depends on `@auth/core@0.37.2`; type/runtime interoperability was not verified by a compile/run.

## Sources
- [Adapter package metadata](https://github.com/nextauthjs/next-auth/blob/@auth/prisma-adapter@2.11.3/packages/adapter-prisma/package.json) — exact `2.11.3`, sole root export, Prisma peer range and `@auth/core` dependency.
- [Adapter implementation](https://github.com/nextauthjs/next-auth/blob/@auth/prisma-adapter@2.11.3/packages/adapter-prisma/src/index.ts) — exact factory and method-to-Prisma mapping.
- [Auth.js adapter contract](https://github.com/nextauthjs/next-auth/blob/@auth/prisma-adapter@2.11.3/packages/core/src/adapters.ts) — adapter model and method signatures at dependency core version `0.41.3`.
- [Prisma adapter setup guide](https://authjs.dev/getting-started/adapters/prisma) — singleton integration, custom output, schema, generation and runtime notes (current guide; versioned adapter source used for exact methods).
- [Prisma adapter schema fixture](https://github.com/nextauthjs/next-auth/blob/@auth/prisma-adapter@2.11.3/packages/adapter-prisma/prisma/schema.prisma) — expected user/account/session/verification-token/authenticator fields and constraints.
- [Published package metadata](https://www.npmjs.com/package/@auth/prisma-adapter/v/2.11.3) — resolved package release and peer/dependency metadata (confirmed via `npm view`).
- `[Code]` `package.json:19,27` — requested adapter and NextAuth ranges; `src/server/auth/config.ts:1-56` — adapter setup and callback; `src/server/auth/index.ts:1-10` — NextAuth initialization; `prisma/schema.prisma:30-75` — project Auth.js models.
- `[Code]` `pnpm-lock.yaml:84-114,925-946,737-741,1413-1416` — exact `@auth/core` resolutions/dependency links for adapter and NextAuth.

## Refresh Triggers
- Resolved package or peer dependency versions change.
- Auth.js adapter interface or Prisma schema changes.
- A task uses WebAuthn authenticators, a non-default Prisma Client extension, or custom model mappings beyond this scope.
- A relevant deprecation, security advisory, or migration is discovered.
- The user explicitly requests a refresh.

## Scope and caveats
The package exports only `PrismaAdapter` from its root. Its implementation returns user, account, session, verification-token, and authenticator methods; method coverage is grounded in exact tag `@auth/prisma-adapter@2.11.3`. The repository schema supports standard user/account/session/verification-token methods, but lacks `Authenticator`, so WebAuthn methods are not usable with the current generated client without adding the documented model and regenerating Prisma Client. The project's `User.email` is nullable while the exact adapter fixture and adapter user contract use a non-null string; this difference needs a provider-appropriate typecheck/auth-flow check. A separate core-version skew exists: the adapter depends on `@auth/core@0.41.3` while locked NextAuth depends on `0.37.2`. See `version-compat.md`; do not assume static type compatibility without a project typecheck.
