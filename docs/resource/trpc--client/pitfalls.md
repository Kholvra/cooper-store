# Known Pitfalls & Gotchas

| Scenario | Risk or surprising behavior | Required handling | Evidence |
|---|---|---|---|
| No terminating link | Operations never reach server. | Ensure the final link in every branch sends requests (e.g. `httpBatchLink`). | [Web: links](https://trpc.io/docs/client/links), v11.x |
| Batching assumptions | Calls may be combined; endpoints, headers, and payload constraints can affect transport. | Use batch transport intentionally; choose single-operation link when batching is unsuitable. Verify exact options such as URL limits from installed types. | [Web: httpBatchLink](https://trpc.io/docs/client/links/httpBatchLink), v11.x |
| Link ordering | Requests flow through links in array order and responses in reverse. | Place logging/transforms deliberately around terminating link. | [Web: links](https://trpc.io/docs/client/links), v11.x |
| Custom link errors/events | Dropping `error`/`complete` or failing to unsubscribe can hang consumers or leak resources. | Forward next/error/complete and return teardown that unsubscribes downstream. | [Web: links](https://trpc.io/docs/client/links), v11.x |
| Server router runtime import | Can bundle server implementation or secrets into client. | Import `AppRouter` with `import type` only. | [Web: routers](https://trpc.io/docs/server/routers), v11.x |
| Transformer mismatch | Rich values may serialize differently or fail decoding. | Configure same transformer on server and client and test values crossing boundary. | [Web: transformers](https://trpc.io/docs/server/data-transformers), v11.x |
| Auth headers captured once | Long-lived client may send stale credentials. | Supply a header callback that reads current session/token when request runs. | [Web: httpBatchLink](https://trpc.io/docs/client/links/httpBatchLink), v11.x |
| Subscriptions over HTTP/WS | Transport may not support target operation or lifecycle semantics. | Pair link with compatible server adapter; implement explicit disposal and validate reconnect behavior for selected transport. | [Web: subscriptions](https://trpc.io/docs/client/subscriptions), v11.x |
| Batching + custom link | A custom link can alter context/order and interfere with link routing if it does not preserve operation. | Forward `op`/observable semantics; test with actual terminating transport. | [Web: links](https://trpc.io/docs/client/links), v11.x |
