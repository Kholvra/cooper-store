import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * Register product routers here.
 */
export const appRouter = createTRPCRouter({});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
