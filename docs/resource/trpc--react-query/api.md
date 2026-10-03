# Verified API Surface

This pack covers the repository's classic React integration (`@trpc/react-query`) rather than the newer `@trpc/tanstack-react-query` package. It is a practical scope; exact 11.19.0 export map and every generated proxy member are not inventoried.

| API / Symbol | Signature & Options | Description & Return Values | Evidence |
|---|---|---|---|
| `createTRPCReact<R>` | `createTRPCReact<R>(opts?)` | Creates typed React proxy and provider for router `R`; exposes hooks and `Provider`. | [Web: React integration](https://trpc.io/docs/client/react), v11.x; `[Code]` `src/trpc/react.tsx:5,25` |
| `api.Provider` | `<api.Provider client={client} queryClient={queryClient}>` | Supplies tRPC client and TanStack Query client through React context. | [Web: React integration](https://trpc.io/docs/client/react), v11.x; `[Code]` `src/trpc/react.tsx:66-70` |
| `api.createClient` | `api.createClient({ links })` | Creates underlying typed client using supplied links; same transport contract as `@trpc/client`. | [Web: React integration](https://trpc.io/docs/client/react), v11.x; `[Code]` `src/trpc/react.tsx:44-63` |
| `api.<path>.useQuery` | `useQuery(input?, options?)` | Query hook, returns TanStack Query result with inferred data/error types; `enabled`, `staleTime`, `select` and query options follow TanStack Query. | [Web: queries](https://trpc.io/docs/client/react/useQuery), v11.x |
| `api.<path>.useSuspenseQuery` | `useSuspenseQuery(input?, options?)` | Suspense query returning non-undefined data tuple/result per integration; exact shape follows library version. | [Web: suspense](https://trpc.io/docs/client/react/suspense), v11.x |
| `api.<path>.useMutation` | `useMutation(options?)` | Mutation hook; returns mutate/mutateAsync, status/error/data and callback options from TanStack Query. | [Web: mutations](https://trpc.io/docs/client/react/useMutation), v11.x |
| `api.<path>.useInfiniteQuery` | `useInfiniteQuery(input, options)` | Infinite query with cursor/page parameter and `getNextPageParam` per TanStack Query contract. | [Web: infinite queries](https://trpc.io/docs/client/react/useInfiniteQuery), v11.x |
| `api.<path>.useSubscription` | `useSubscription(input, options)` | Subscription hook; callbacks include `onData`/`onError`; unsubscribe/connection behavior depends on transport. | [Web: subscriptions](https://trpc.io/docs/client/react/useSubscription), v11.x |
| `api.useUtils()` | `const utils = api.useUtils()` | Returns typed cache utilities for query invalidation, refetch, set/get data and mutation integration; methods correspond to router paths. | [Web: useUtils](https://trpc.io/docs/client/react/useUtils), v11.x |
| `api.useContext()` | Legacy alias/context utility | **Unverified/deprecated status** in v11.19.0; use current `useUtils` docs and exact installed types. | Exact release/type evidence not inspected |
| `inferRouterInputs<R>` | type helper | Infers all router input types by path. | [Web: infer types](https://trpc.io/docs/server/infer-types), v11.x; `[Code]` `src/trpc/react.tsx:32` |
| `inferRouterOutputs<R>` | type helper | Infers all router output types by path. | [Web: infer types](https://trpc.io/docs/server/infer-types), v11.x; `[Code]` `src/trpc/react.tsx:39` |
| Query cache invalidation | `utils.path.invalidate(input?, filters?)` | Marks matching query cache entries stale/refetches according to TanStack Query semantics. | [Web: useUtils](https://trpc.io/docs/client/react/useUtils), v11.x |

The exact exhaustive export/subpath list and complete hook option/result field inventory are **Unverified**; use linked per-hook docs and installed declarations when exact options matter.
