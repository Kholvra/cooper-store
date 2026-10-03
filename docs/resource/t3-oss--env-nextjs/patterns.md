# Implementation Patterns & Recipes: `@t3-oss/env-nextjs`

## 1. Standard T3 Environment Setup (`src/env.js`)

```js
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    AUTH_DISCORD_ID: z.string(),
    AUTH_DISCORD_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
```

## 2. Conditional Server Variables for Development vs Production

Use Zod conditional branching (ternaries or refinements) to make secrets required in production while optional or defaulted in local development:

```js
AUTH_SECRET: process.env.NODE_ENV === "production" ? z.string().min(1) : z.string().optional(),
```

## 3. Explicit `runtimeEnv` Mapping for Next.js Edge and Client Bundles

Always supply `runtimeEnv` mapping explicitly rather than passing `process.env` directly. Next.js statically replaces `process.env.FOO` references at build time via Webpack DefinePlugin; explicit property access ensures keys are preserved during static analysis.

## 4. Skipping Validation in CI / Docker Build Stages

Set `skipValidation: !!process.env.SKIP_ENV_VALIDATION` to allow building container images without requiring secret environment variables to be present at build time.
