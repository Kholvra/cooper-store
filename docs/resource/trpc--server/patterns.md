# Implementation Patterns & Recipes

## 1. Initialize once, export typed router

```ts
// server/api/trpc.ts
import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';

type Context = { user: { id: string } | null };
const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx: { user: ctx.user } });
});

export const appRouter = router({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => `Hello ${input.name}`),
  me: protectedProcedure.query(({ ctx }) => ctx.user),
});
export type AppRouter = typeof appRouter;
```

Keep initialization centralized and export `AppRouter` as a type. Context creation belongs to the adapter/request boundary and should construct request-specific auth/dependencies. [Web: routers](https://trpc.io/docs/server/routers), [context](https://trpc.io/docs/server/context), v11.x.

## 2. Validate at boundaries and keep resolver types inferred

```ts
import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from './trpc';

const postInput = z.object({ id: z.string().cuid() });
export const postRouter = router({
  byId: publicProcedure.input(postInput).query(async ({ ctx, input }) => {
    const post = await ctx.db.post.findUnique({ where: { id: input.id } });
    if (!post) throw new TRPCError({ code: 'NOT_FOUND' });
    return post;
  }),
});
```

Import `TRPCError` from `@trpc/server`; substitute your actual context database contract. The schema is the runtime validator and inferred TS input source. [Web: validators](https://trpc.io/docs/server/validators), [error handling](https://trpc.io/docs/server/error-handling), v11.x.

## 3. Typed in-process server call

```ts
const caller = createCallerFactory(appRouter)(await createTRPCContext({ headers }));
const value = await caller.greeting({ name: 'Ada' });
```

Use a server-side caller when code needs procedure behavior without HTTP; it still runs the procedure/middleware pipeline, but is not a substitute for testing the transport adapter. [Web: server-side calls](https://trpc.io/docs/server/server-side-calls), v11.x.
