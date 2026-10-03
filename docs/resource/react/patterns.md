# Implementation Patterns & Recipes

## 1. State and effect lifecycle

```tsx
import { useEffect, useState } from 'react';

export function Status({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState('Loading');
  useEffect(() => {
    const controller = new AbortController();
    fetch(endpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then(setStatus)
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) setStatus('Unavailable');
      });
    return () => controller.abort();
  }, [endpoint]);
  return <p>{status}</p>;
}
```

## 2. Server/client boundary in Next.js

```tsx
// Server Component (default in Next App Router)
import Counter from './counter';
export default async function Page() {
  const label = await loadLabel();
  return <Counter label={label} />;
}
```

```tsx
// counter.tsx
'use client';
import { useState } from 'react';
export default function Counter({ label }: { label: string }) {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((n) => n + 1)}>{label}: {count}</button>;
}
```

## 3. External-store subscription

```tsx
import { useSyncExternalStore } from 'react';
const subscribe = (notify: () => void) => store.subscribe(notify);
const getSnapshot = () => store.getSnapshot();
export function StoreValue() {
  const value = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return <output>{value}</output>;
}
```

Evidence: [React useEffect](https://react.dev/reference/react/useEffect), [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore), [React Server Components directives](https://react.dev/reference/rsc/directives). Examples are general React patterns, not exact-version export proof.
