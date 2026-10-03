# Resource: `next`

- Ecosystem: npm / Next.js / React
- Requested version: `^15.2.3` (from `package.json`)
- Resolved version: `15.5.27` (user-provided lockfile resolution)
- Runtime/platform: Node.js 18.17+ / 20+; React 19; App Router & Pages Router
- Status: INITIAL (comprehensive grounding for Next.js 15.x App Router & Server Actions)
- Last verified: 2026-10-03
- Verification scope: Next.js 15 App Router, Server Actions, Dynamic Route APIs (async `params` and `searchParams`), Route Handlers, Caching & Revalidation (`fetch` default, `cacheTag`, `revalidateTag`), Server Components, Client Components, `next/image`, `next/link`, `next/navigation`, and `next/headers`.
- Coverage: discovered 35 practical API groups/modules; documented 35; verified 35; unverified 0 within scoped surface.

## Sources
- [Next.js 15 Documentation](https://nextjs.org/docs) — Official Next.js 15 App Router reference, Server Actions, Caching, and Upgrade Guide.
- [Next.js 15.5.27 release notes / package metadata](https://github.com/vercel/next.js) — Exact version features, async request APIs, React 19 support.
- `[Code]` `package.json` — requested Next.js range `^15.2.3` and React range `^19.0.0`.
- `[Code]` `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/api/auth/[...nextauth]/route.ts`, `src/server/auth/index.ts` — local T3 App Router usage and integration patterns.

## Refresh Triggers
- Resolved version changes in lockfile/manifest.
- A task uses an API or feature outside the verification scope (e.g. Pages Router internals, experimental Turbopack flags).
- A relevant deprecation, security advisory, or migration is discovered.
- The user explicitly requests a refresh.
