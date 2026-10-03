# Pitfalls & Anti-Patterns: `@tanstack/react-query`

## 1. Creating a `QueryClient` outside the component / request scope
- **Anti-Pattern**: Instantiating `const queryClient = new QueryClient()` at the module scope outside functions or component render.
- **Why**: Sharing a single `QueryClient` instance across multiple concurrent server requests in SSR environments (Next.js) leads to cross-request state pollution, leaking user data between requests.
- **Correct Approach**: Always use a factory function (`createQueryClient`) paired with request-scoped caching on the server and a singleton pattern in the browser.

## 2. Leaving `staleTime: 0` for SSR queries
- **Anti-Pattern**: Relying on the v5 default `staleTime: 0` without setting a default stale time in SSR apps.
- **Why**: Queries hydrated from the server will immediately be considered stale on the client, triggering redundant refetches on component mount.
- **Correct Approach**: Set a sensible default `staleTime` (e.g. `30 * 1000`) in `QueryClient` defaultOptions.

## 3. Dehydrating non-JSON serializable types without a transformer
- **Anti-Pattern**: Passing rich JS objects (like `Date`, `Map`, `Set`) across server/client boundaries during SSR hydration without `superjson`.
- **Why**: Standard `JSON.stringify` converts Dates to strings or drops class instances, breaking expected types on the client.
- **Correct Approach**: Integrate `superjson` serialize/deserialize functions into `dehydrate` and `hydrate` options.
