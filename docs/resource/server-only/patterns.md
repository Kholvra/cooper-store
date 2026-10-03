# Implementation Patterns & Recipes

## 1. Guard a server-only utility

```ts
import 'server-only';

export async function readPrivateConfig() {
  return process.env.PRIVATE_CONFIG ?? '';
}
```

## 2. Consume utility from a server component

```tsx
import { readPrivateConfig } from './private-config';

export default async function ServerPage() {
  const config = await readPrivateConfig();
  return <pre>{config}</pre>;
}
```

Place the marker in a module that must never enter a client dependency graph. A marker cannot make an otherwise client-compatible API usable on the server; it only enforces the boundary when framework tooling supports it. Evidence: [npm package](https://www.npmjs.com/package/server-only), [React directives](https://react.dev/reference/rsc/directives).
