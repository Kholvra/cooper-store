# Implementation Patterns & Recipes

## 1. Type-safe HTTP client with batching

```ts
import { createTRPCClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { AppRouter } from '../server/api/root';

export const client = createTRPCClient<AppRouter>({
  links: [
    loggerLink({ enabled: (op) => process.env.NODE_ENV === 'development' }),
    httpBatchLink({ url: 'http://localhost:3000/api/trpc' }),
  ],
});

const result = await client.post.list.query();
```

Use only a type import for the server router. At least one terminating link is required; batch links combine compatible calls. [Web: links](https://trpc.io/docs/client/links), [vanilla](https://trpc.io/docs/client/vanilla), v11.x.

## 2. Configure headers and transformer

```ts
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import SuperJSON from 'superjson';
import type { AppRouter } from '../server/api/root';

export const client = createTRPCClient<AppRouter>({
  links: [httpBatchLink({
    url: `${baseUrl}/api/trpc`,
    transformer: SuperJSON,
    headers: () => ({ 'x-client-source': 'web' }),
  })],
});
```

The server must configure the matching transformer. Use a request-time headers function where credentials may change; do not capture stale auth. [Web: data transformers](https://trpc.io/docs/server/data-transformers), [httpBatchLink](https://trpc.io/docs/client/links/httpBatchLink), v11.x.

## 3. Custom link with result and error forwarding

```ts
import type { TRPCLink } from '@trpc/client';
import { observable } from '@trpc/server/observable';
import type { AppRouter } from '../server/api/root';

export const tracingLink: TRPCLink<AppRouter> = () => ({ op, next }) =>
  observable((observer) => {
    const subscription = next(op).subscribe({
      next(value) { observer.next(value); },
      error(error) { observer.error(error); },
      complete() { observer.complete(); },
    });
    return () => subscription.unsubscribe();
  });
```

The observable helper is imported from `@trpc/server/observable` as in the official custom-link example. The link must forward all terminal events and teardown. [Web: links](https://trpc.io/docs/client/links), v11.x.
