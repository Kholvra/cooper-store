# API Reference: `@t3-oss/env-nextjs`

Version: `0.12.0`

## Core Functions

### `createEnv(opts)`
Validates and type-checks environment variables against server and client schemas.

- **Parameters**: `opts` (object)
  - `server` (Record<string, ZodType>): Zod validation schemas for server-side environment variables.
  - `client` (Record<string, ZodType>): Zod validation schemas for client-side environment variables (must be prefixed with `NEXT_PUBLIC_` in Next.js).
  - `runtimeEnv` (Record<string, string | undefined>): Explicit mapping of runtime environment sources (typically `process.env`) to ensure compatibility with Next.js build-time inlining and Edge runtimes.
  - `skipValidation` (boolean | undefined): When `true`, bypasses runtime validation (useful for Docker builds or CI).
  - `emptyStringAsUndefined` (boolean | undefined): When `true`, treats empty strings (`""`) as `undefined`, causing required string validations to fail correctly on empty inputs.
  - `onValidationError` ((error: ZodError) => never | void | undefined): Custom error handler when validation fails (defaults to logging and throwing an Error).
  - `onInvalidAccess` ((variable: string) => never | void | undefined): Custom handler when a client-side environment variable is accessed on the server or vice versa.

- **Returns**: A validated, fully typed environment object combining server and client variables.

## Package Exports (`package.json`)
- `.` — Main entry point (`./dist/index.js`, types `./dist/index.d.ts`)
- `./presets-zod` — Zod preset utilities (`./dist/presets-zod.js`)
- `./presets-valibot` — Valibot preset utilities (`./dist/presets-valibot.js`)
- `./package.json` — Package manifest export
