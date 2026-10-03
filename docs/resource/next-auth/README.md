# Resource: `next-auth`

- Ecosystem: npm / Auth.js (NextAuth.js v5 beta) / Next.js App Router
- Requested version: `5.0.0-beta.25` (from `package.json`)
- Resolved version: `5.0.0-beta.25` (user-provided lockfile resolution)
- Runtime/platform: Next.js 15 App Router, Node.js, Prisma Adapter (`@auth/prisma-adapter`)
- Status: INITIAL (comprehensive grounding for Auth.js v5 beta in Next.js 15)
- Last verified: 2026-10-03
- Verification scope: NextAuth v5 `NextAuth()` initialization, `auth()` helper, `handlers` (`GET`, `POST`), `signIn`, `signOut`, `AuthConfig` structure, Prisma Adapter integration, and module augmentation for session user types.
- Coverage: discovered 12 practical API groups/modules; documented 12; verified 12; unverified 0 within scoped surface.

## Sources
- [Auth.js v5 Documentation](https://authjs.dev/) — Official NextAuth.js v5 beta guide, configuration, handlers, and adapters.
- [NextAuth v5.0.0-beta.25 package metadata & typings](https://github.com/nextauthjs/next-auth) — Exact beta release API signatures.
- `[Code]` `package.json` — requested `next-auth` version `5.0.0-beta.25` and `@auth/prisma-adapter`.
- `[Code]` `src/server/auth/config.ts`, `src/server/auth/index.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/app/page.tsx` — local T3 App Router usage and configuration.

## Refresh Triggers
- Resolved version changes in lockfile/manifest (e.g. final v5 release).
- A task uses an auth provider or callback outside the verification scope.
- A relevant deprecation, security advisory, or migration is discovered.
- The user explicitly requests a refresh.
