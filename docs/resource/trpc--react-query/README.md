# Resource: `@trpc/react-query`

- Ecosystem: npm / TypeScript / React
- Requested version: `^11.0.0` (`package.json`)
- Resolved version: `11.19.0` (`pnpm-lock.yaml`)
- Runtime/platform: React 19 client components; TanStack React Query 5; Next.js SSR considerations
- Status: PARTIAL (initial practical classic React integration grounding; exhaustive hook/type/export inventory not verified)
- Last verified: 2026-10-03
- Verification scope: provider and typed client setup, query/mutation/infinite/suspense/subscription hooks, cache utilities, router input/output inference, SSR cache lifecycle.
- Coverage: discovered 13 practical API groups; documented 13; verified 10 practical groups from official v11 docs; unverified 3 groups/details noted in API reference. Full package exports and hook option/result matrix remain unverified.

## Sources
- [Classic React Query integration](https://trpc.io/docs/client/react) — provider and hook overview, v11.x.
- [useQuery](https://trpc.io/docs/client/react/useQuery) — query hook options/result, v11.x.
- [useMutation](https://trpc.io/docs/client/react/useMutation) — mutation hook, v11.x.
- [useUtils](https://trpc.io/docs/client/react/useUtils) — typed cache helpers, v11.x.
- [Suspense](https://trpc.io/docs/client/react/suspense) — suspense-specific queries, v11.x.
- [Infinite queries](https://trpc.io/docs/client/react/useInfiniteQuery) — pagination hooks, v11.x.
- `[Code]` `src/trpc/react.tsx:3-8,25-70` — installed classic integration usage and provider.
- `[Code]` `package.json:23-25` — requested range; `pnpm-lock.yaml:26-31` — exact resolution and peers.

## Refresh Triggers
- Resolved version changes in lockfile/manifest.
- A task uses an API or feature outside the verification scope.
- A relevant deprecation, security advisory, or migration is discovered.
- The user explicitly requests a refresh.

## Integration distinction
This repository uses `@trpc/react-query` classic integration. The distinct newer package `@trpc/tanstack-react-query` has different setup/API shape and is not covered by these recipes.
