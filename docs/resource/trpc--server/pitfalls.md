# Known Pitfalls & Gotchas

| Scenario | Risk or surprising behavior | Required handling | Evidence |
|---|---|---|---|
| Multiple `initTRPC.create()` instances | Separate builders/configuration can cause type/config inconsistencies. | Initialize once centrally and derive routers/procedures from that instance. | [Web: routers](https://trpc.io/docs/server/routers), v11.x |
| Context construction | Missing request-specific auth or incorrectly shared mutable state may leak identity/data across requests. | Build context in adapter request lifecycle; avoid process-global user/request state. | [Web: context](https://trpc.io/docs/server/context), v11.x |
| Middleware continuation | Middleware that does not return `next()` can break/short-circuit resolver execution. | Return `opts.next()` (or `opts.next({ctx})`) and preserve its result. | [Web: middlewares](https://trpc.io/docs/server/middlewares), v11.x |
| Unvalidated input | TypeScript types alone do not validate untrusted network input. | Attach runtime schema with `.input()` to every externally supplied payload. | [Web: validators](https://trpc.io/docs/server/validators), v11.x |
| Throwing arbitrary errors | Unstructured failures can be exposed as generic internal errors and lose intended client semantics. | Throw `TRPCError` with appropriate code; do not return raw secrets in messages/formatter output. | [Web: error handling](https://trpc.io/docs/server/error-handling), v11.x |
| Subscriptions | A procedure alone does not guarantee transport support, cleanup, or delivery semantics. | Configure a compatible adapter/client transport; verify unsubscribe/cleanup on the chosen transport. Delivery guarantees not established by this pack. | [Web: subscriptions](https://trpc.io/docs/server/subscriptions), v11.x |
| Server caller use | Direct caller bypasses HTTP serialization, network, and adapter behavior. | Use it for trusted in-process calls; separately exercise adapter/client for transport contracts. | [Web: server-side calls](https://trpc.io/docs/server/server-side-calls), v11.x |
| Runtime importing router on client | May pull server-only modules/secrets into browser build. | Client imports `import type { AppRouter }`, not runtime router value. | [Web: routers](https://trpc.io/docs/server/routers), v11.x |
