# Resource: `@tanstack/react-query`

- Ecosystem: npm / React / Asynchronous State Management
- Requested version: `^5.69.0` (from `package.json`)
- Resolved version: `5.104.1` (user-provided lockfile resolution)
- Runtime/platform: React 18 & 19; client-side and SSR environments (Next.js App Router)
- Status: VERIFIED (initial grounding; complete practical query client, hooks, and SSR hydration surface verified)
- Last verified: 2026-10-03
- Verification scope: `QueryClient`, `QueryClientProvider`, `useQuery`, `useSuspenseQuery`, `useMutation`, `useQueryClient`, SSR dehydration/hydration (`dehydrate`, `hydrate`, `defaultShouldDehydrateQuery`), and tRPC integration (`@trpc/react-query`).
- Coverage: discovered 1 package export-map key and 18 practical API groups; documented 18; verified 18; unverified 0.

## Sources
- [@tanstack/react-query v5.104.1 package manifest](https://github.com/TanStack/query/blob/v5.104.1/packages/react-query/package.json) — exports, dependencies (`@tanstack/query-core@5.104.1`), peer dependencies (`react@^18 || ^19`).
- [TanStack Query v5 Documentation](https://tanstack.com/query/v5/docs/framework/react/overview) — core concepts, queries, mutations, SSR, and hydration.
- Project codebase usage (`src/trpc/query-client.ts`, `src/trpc/react.tsx`, `src/trpc/server.ts`) — QueryClient singleton configuration, SuperJSON integration, and provider setup.

## Refresh Triggers
- Resolved version changes in lockfile/manifest.
- Upgrades to subsequent TanStack Query major versions.
- A relevant deprecation, performance optimization, or SSR caching strategy update.
- The user explicitly requests a refresh.

## Scope and caveats
This pack covers `@tanstack/react-query` version `5.104.1` as integrated with React 19 and tRPC v11 in the current T3 stack application. Experimental or niche persistence plugins (`@tanstack/react-query-persist-client`) outside the main package exports are out of scope.
