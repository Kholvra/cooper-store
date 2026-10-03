# Implementation Patterns & Recipes: `@tanstack/react-query`

## 1. QueryClient Factory with SuperJSON (`src/trpc/query-client.ts`)

```ts
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import SuperJSON from "superjson";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });
```

## 2. Client Singleton Pattern for SSR (`src/trpc/react.tsx`)

Prevent creating a new QueryClient on every render in client-side navigation while ensuring isolated instances per request on the server:

```ts
let clientQueryClientSingleton: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return createQueryClient();
  }
  clientQueryClientSingleton ??= createQueryClient();
  return clientQueryClientSingleton;
};
```

## 3. Combining QueryClientProvider with tRPC Provider

```tsx
export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() => api.createClient({...}));

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
```

## 4. Server Component Prefetching & Hydration (`src/trpc/server.ts`)

Using `@trpc/tanstack-react-query` hydration helpers to prefetch queries on the server and dehydrate them for client components.
