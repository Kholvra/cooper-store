# Pitfalls & Anti-Patterns: `@t3-oss/env-nextjs`

## 1. Destructuring `process.env` directly
- **Anti-Pattern**: Passing `process.env` wholesale as `runtimeEnv: process.env` or destructuring `process.env` inside the schema definition.
- **Why**: Next.js relies on static string replacement of `process.env.VARIABLE_NAME` during compilation. Wholesale destructuring (`const { DATABASE_URL } = process.env`) destroys static inlining, causing runtime `undefined` values on client bundles or edge runtimes.
- **Correct Approach**: Explicitly list every variable in `runtimeEnv` using direct property access (`DATABASE_URL: process.env.DATABASE_URL`).

## 2. Omitting `NEXT_PUBLIC_` prefix on client variables
- **Anti-Pattern**: Placing client-accessible environment variables under the `client` schema without the `NEXT_PUBLIC_` prefix.
- **Why**: Next.js will strip non-public environment variables from client bundles, causing validation failures or runtime reference errors when accessed in browser code.
- **Correct Approach**: Ensure all keys in the `client` schema (and their corresponding `runtimeEnv` entries) start with `NEXT_PUBLIC_`.

## 3. Not enabling `emptyStringAsUndefined`
- **Anti-Pattern**: Relying on default Zod behavior where empty environment strings (`""`) pass `z.string()`.
- **Why**: In `.env` files or hosting environments (like Vercel or Docker), unset variables are frequently injected as empty strings rather than `undefined`. Without `emptyStringAsUndefined: true`, an empty string passes `z.string()` validation instead of failing or falling back to defaults.
- **Correct Approach**: Set `emptyStringAsUndefined: true` in `createEnv`.
