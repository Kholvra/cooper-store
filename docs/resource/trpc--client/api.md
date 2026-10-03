# Verified API Surface

Practical client surface for the repository's typed HTTP transport integration. Exact v11.19.0 package export-map enumeration is unverified; this is not a complete root/subpath inventory.

| API / Symbol | Signature & Options | Description & Return Values | Evidence |
|---|---|---|---|
| `createTRPCClient<R>` | `createTRPCClient<R>({ links })` | Creates a typed vanilla client from router type and link chain; returned proxy exposes router paths with `.query`, `.mutate`/`.mutation`, and `.subscribe` operations. | [Web: vanilla client](https://trpc.io/docs/client/vanilla), v11.x |
| `createTRPCProxyClient<R>` | Legacy proxy factory signature depends on v11 API surface | **Unverified**: exact status/export behavior not confirmed in this pack. Prefer documented `createTRPCClient`. | Package artifact not inspected |
| `httpLink` | `httpLink({ url, headers?, transformer?, fetch? })` | Single-operation HTTP terminating link. Option details depend on link API; verify exact patch types for custom fetch/header behavior. | [Web: httpLink](https://trpc.io/docs/client/links/httpLink), v11.x |
| `httpBatchLink` | `httpBatchLink({ url, headers?, transformer?, fetch?, maxURLLength? })` | Batches compatible operations into HTTP requests; use as terminal link. Batch options should be checked against exact installed typings before relying on less-common fields. | [Web: httpBatchLink](https://trpc.io/docs/client/links/httpBatchLink), v11.x |
| `httpBatchStreamLink` | `httpBatchStreamLink({ url, transformer?, headers?, fetch? })` | Streaming batched HTTP transport; supports progressive response streaming when paired with appropriate server adapter. | [Web: httpBatchStreamLink](https://trpc.io/docs/client/links/httpBatchStreamLink), v11.x; `[Code]` `src/trpc/react.tsx:52-61` |
| `loggerLink` | `loggerLink({ enabled?, colorMode?, console? })` | Logs operation request/result/error in link chain; `enabled` can select operations. | [Web: loggerLink](https://trpc.io/docs/client/links/loggerLink), v11.x; `[Code]` `src/trpc/react.tsx:47-51` |
| `splitLink` | `splitLink({ condition, true: link[], false: link[] })` | Routes each operation through one branch; each resulting branch must terminate. | [Web: splitLink](https://trpc.io/docs/client/links/splitLink), v11.x |
| `wsLink` | `wsLink({ client })` | WebSocket terminating link, typically for subscriptions; requires compatible ws client/adapter. | [Web: wsLink](https://trpc.io/docs/client/links/wsLink), v11.x |
| `TRPCLink<R>` | Link factory `({ op, next }) => observable` | Custom composable operation/response middleware; links execute request-direction in listed order and responses in reverse. | [Web: links](https://trpc.io/docs/client/links), v11.x |
| `Operation` / operation context | `op.path`, `op.type`, `op.input`, `op.context` | Describes operation; context is mutable metadata passed through links and can be set per call. | [Web: links](https://trpc.io/docs/client/links), v11.x |
| `TRPCClientError` | Error class; typed `data`/`shape` depend on router | Client-side structured error for failed operations. Exact fields and helper methods are not inventoried here. | [Web: error handling](https://trpc.io/docs/client/operations), v11.x (practical handling); exact type details unverified |
| `httpSubscriptionLink` | HTTP subscription terminating link | HTTP-based subscription transport; requires compatible server support. | [Web: httpSubscriptionLink](https://trpc.io/docs/client/links/httpSubscriptionLink), v11.x |
| `localLink` | Local in-process link from router/caller options | Invokes server router without HTTP, useful for same-process usage/testing; serialization/transport behavior differs from network. | [Web: localLink](https://trpc.io/docs/client/links/localLink), v11.x |
| `createWSClient` | WebSocket client options include URL and lifecycle/reconnect controls | Creates client used by `wsLink`; exact options are transport-version-sensitive and not fully inventoried. | [Web: WebSocket link](https://trpc.io/docs/client/links/wsLink), v11.x |
| Link observers | `next(value)`, `error(err)`, `complete()`; unsubscribe teardown | Observable contract used by custom links; return teardown for cancellation/resource cleanup. | [Web: links](https://trpc.io/docs/client/links), v11.x |

Exports, subpaths, and less common options beyond this practical surface: **Unverified**; inspect exact 11.19.0 package metadata/types before building on them.
