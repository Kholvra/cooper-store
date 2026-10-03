# Implementation Patterns & Recipes

## 1. Round-trip values through JSON transport

```ts
import superjson from 'superjson';

const payload = superjson.stringify({ createdAt: new Date(), total: 12n });
const restored = superjson.parse<{ createdAt: Date; total: bigint }>(payload);
```

## 2. Keep transport JSON-compatible and carry metadata

```ts
const encoded = superjson.serialize({ at: new Date(), tags: new Set(['a', 'b']) });
const body = JSON.stringify(encoded);
// At the receiving boundary:
const decoded = superjson.deserialize(JSON.parse(body) as typeof encoded);
```

## 3. tRPC transformer

```ts
import superjson from 'superjson';
// Configure both server and client with the same transformer instance:
const transformer = superjson;
// tRPC initTRPC.create({ transformer });
// createTRPCClient({ transformer });
```

Evidence: [SuperJSON README](https://github.com/flightcontrolhq/superjson), [serialize/deserialize docs](https://github.com/flightcontrolhq/superjson/tree/main/docs). The tRPC example is a generic integration recipe; align with installed tRPC API version.
