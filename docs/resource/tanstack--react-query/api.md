# API Reference: `@tanstack/react-query`

Version: `5.104.1`

## Core Classes & Components

### `QueryClient`
Manages cache, configuration, and background query execution.
- **Constructor**: `new QueryClient(config?: QueryClientConfig)`
- **Key Config Options**:
  - `defaultOptions.queries`: `{ staleTime, gcTime, refetchOnWindowFocus, retry, ... }`
  - `defaultOptions.dehydrate`: `{ serializeData, shouldDehydrateQuery }`
  - `defaultOptions.hydrate`: `{ deserializeData }`

### `QueryClientProvider`
React Context Provider that supplies the `QueryClient` instance to the React tree.
- **Props**: `client: QueryClient`, `children: React.ReactNode`

## Hooks

### `useQuery(options, queryClient?)`
Fetches, caches, and synchronizes asynchronous data in React components.
- **Options**: `{ queryKey, queryFn, staleTime, gcTime, enabled, refetchOnMount, ... }`
- **Returns**: `{ data, error, isLoading, isFetching, status, fetchStatus, refetch, ... }`

### `useSuspenseQuery(options, queryClient?)`
React Suspense-compatible query hook that suspends rendering while data is fetching.

### `useMutation(options, queryClient?)`
Handles data creation, updates, and deletion with lifecycle callbacks (`onSuccess`, `onError`, `onSettled`).

### `useQueryClient()`
Returns the active `QueryClient` instance from context.

## SSR & Hydration Utilities

### `dehydrate(queryClient, options?)`
Serializes query cache state for transfer from server to client.

### `hydrate(queryClient, dehydratedState, options?)`
Restores dehydrated query state into the client query cache.

### `defaultShouldDehydrateQuery(query)`
Default predicate determining whether a query should be included in SSR dehydration.
