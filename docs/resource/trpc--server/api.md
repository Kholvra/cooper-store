# Verified API Surface

Scope is the v11 server package's application-facing router/procedure contract used in this repo. Full root export and subpath symbol inventory is not verified; see README. Evidence links are official tRPC v11 documentation unless noted.

| API / Symbol | Signature & Options | Description & Return Values | Evidence |
|---|---|---|---|
| `initTRPC` | `initTRPC.context<Ctx>().meta<Meta>().create(opts?)` | Creates the application's typed tRPC builder/configuration. Initialize once; resulting builder exposes `router`, `procedure`, middleware and caller factories. | [Web: routers](https://trpc.io/docs/server/routers), v11.x |
| `t.router` | `router(record)` | Builds a router from procedures and nested router/object records; its inferred type is the API contract. | [Web: routers](https://trpc.io/docs/server/routers), v11.x |
| `t.mergeRouters` | `mergeRouters(...routers)` | Combines compatible routers into a router. Exact conflict behavior not verified here. | [Web: routers](https://trpc.io/docs/server/routers), v11.x |
| `t.procedure` | `procedure.input(parser).use(middleware).query(resolver)` | Base procedure builder; chain input parsers and middleware before terminal procedure kind. | [Web: procedures](https://trpc.io/docs/server/procedures), v11.x |
| `.input()` | `.input(parser)` | Validates/transforms input and infers resolver input type from schema (e.g. Zod). | [Web: inputs](https://trpc.io/docs/server/validators), v11.x |
| `.query()` | `.query(({ctx,input}) => output)` | Read operation; resolver may be sync or async. Output is serialized by adapter/transformer configuration. | [Web: procedures](https://trpc.io/docs/server/procedures), v11.x |
| `.mutation()` | `.mutation(({ctx,input}) => output)` | Write operation with inferred input and output types. | [Web: procedures](https://trpc.io/docs/server/procedures), v11.x |
| `.subscription()` | `.subscription(({ctx,input}) => observable)` | Long-lived event operation; adapter/client transport must support subscriptions. | [Web: subscriptions](https://trpc.io/docs/server/subscriptions), v11.x |
| `.use()` | `.use(async opts => opts.next({ctx?}))` | Adds typed middleware; `next()` continues resolution and returns an `{ok,...}` result for post-processing. Context additions can be narrowed for downstream middleware/resolver. | [Web: middlewares](https://trpc.io/docs/server/middlewares), v11.x |
| `TRPCError` | `new TRPCError({ code, message?, cause? })` | Structured procedure error, mapped by tRPC to protocol error response; common codes include `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `BAD_REQUEST`, `INTERNAL_SERVER_ERROR`. | [Web: error handling](https://trpc.io/docs/server/error-handling), v11.x |
| `inferRouterInputs<R>` | `type Inputs = inferRouterInputs<R>` | Maps router paths to their inferred procedure input types. | [Web: infer types](https://trpc.io/docs/server/infer-types), v11.x; `[Code]` `src/trpc/react.tsx:6,32` |
| `inferRouterOutputs<R>` | `type Outputs = inferRouterOutputs<R>` | Maps router paths to inferred procedure output types. | [Web: infer types](https://trpc.io/docs/server/infer-types), v11.x; `[Code]` `src/trpc/react.tsx:6,39` |
| `t.createCallerFactory` | `createCallerFactory(router)` then `factory(ctx)` | Creates a typed in-process caller for server-side calls; does not use network adapter. | [Web: server-side calls](https://trpc.io/docs/server/server-side-calls), v11.x |
| `t.middleware` | `middleware(({ctx,input,path,type,next}) => ...)` | Constructs reusable typed middleware. Must call/return `next()` unless intentionally terminating via error. | [Web: middlewares](https://trpc.io/docs/server/middlewares), v11.x |
| Context factory | application-defined async `createTRPCContext({ headers })` | Supplies request-scoped dependencies/authentication to procedures; context creation is adapter/request lifecycle-specific. | [Web: context](https://trpc.io/docs/server/context), v11.x; `[Code]` `src/server/api/trpc.ts:29-37` |
| Router type export | `export type AppRouter = typeof appRouter` | Export type only to clients; avoid runtime importing server implementation into client bundles. | [Web: routers](https://trpc.io/docs/server/routers), v11.x; `[Code]` `src/server/api/root.ts` |

Package root and documented public subpaths: exact v11.19.0 export-map inventory was not inspected from a published artifact. **Unverified:** symbols and subpaths beyond this practical server integration scope; do not treat this table as a complete package export inventory.
