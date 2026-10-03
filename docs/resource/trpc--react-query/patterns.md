# Implementation Patterns & Recipes

## 1. Classic React provider using AppRouter

```tsx
'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';
import type { AppRouter } from '../server/api/root';

export const api = createTRPCReact<AppRouter>();
export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [client] = useState(() => api.createClient({
    links: [httpBatchLink({ url: '/api/trpc' })],
  }));
  return <QueryClientProvider client={queryClient}>
    <api.Provider client={client} queryClient={queryClient}>{children}</api.Provider>
  </QueryClientProvider>;
}
```

SSR frameworks must avoid sharing a server QueryClient across requests; use a fresh instance on server and stable browser instance. This simplified snippet shows provider wiring only. [Web: React integration](https://trpc.io/docs/client/react), [TanStack SSR](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr), v11.x.

## 2. Query and mutation with cache invalidation

```tsx
function PostActions({ id }: { id: string }) {
  const utils = api.useUtils();
  const post = api.post.byId.useQuery({ id });
  const update = api.post.update.useMutation({
    onSuccess: async () => {
      await utils.post.byId.invalidate({ id });
    },
  });
  if (post.isPending) return <p>Loading…</p>;
  if (post.error) return <p role="alert">{post.error.message}</p>;
  return <button onClick={() => update.mutate({ id, title: 'Updated' })}>
    {update.isPending ? 'Saving…' : post.data.title}
  </button>;
}
```

Hook input and output types derive from `AppRouter`; mutation payload here must match actual router schema. [Web: useQuery](https://trpc.io/docs/client/react/useQuery), [useMutation](https://trpc.io/docs/client/react/useMutation), [useUtils](https://trpc.io/docs/client/react/useUtils), v11.x.

## 3. Infer router types for reusable UI contracts

```ts
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../server/api/root';
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
type Post = RouterOutputs['post']['byId'];
```

Use `import type` to keep server implementation out of client bundles. [Web: infer types](https://trpc.io/docs/server/infer-types), v11.x; `[Code]` `src/trpc/react.tsx:6,32-39`.
