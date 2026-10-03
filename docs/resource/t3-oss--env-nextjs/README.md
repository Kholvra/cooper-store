# Resource: `@t3-oss/env-nextjs`

- Ecosystem: npm / Next.js / TypeScript
- Requested version: `^0.12.0` (from `package.json`)
- Resolved version: `0.12.0` (user-provided lockfile resolution)
- Runtime/platform: Next.js server & client runtime; Node.js
- Status: VERIFIED (initial grounding; complete public export surface verified)
- Last verified: 2026-10-03
- Verification scope: Environment schema definition (`createEnv`), server vs client separation, runtimeEnv mapping, validation skipping (`skipValidation`), empty string normalization (`emptyStringAsUndefined`), and Zod integration.
- Coverage: discovered 3 export-map keys and 5 configuration options; documented 5; verified 5; unverified 0.

## Sources
- [@t3-oss/env-nextjs v0.12.0 package manifest](https://github.com/t3-oss/t3-env/blob/v0.12.0/packages/nextjs/package.json) — exports, dependencies (`@t3-oss/env-core@0.12.0`), peer dependencies (`zod@^3.24.0`).
- [@t3-oss/env-nextjs repository documentation](https://github.com/t3-oss/t3-env) — usage with Next.js App Router, Pages Router, and Edge runtime.
- Project codebase usage (`src/env.js`) — configured singleton environment validation.

## Refresh Triggers
- Resolved version changes in lockfile/manifest.
- Migration to another runtime validation library (e.g., Valibot).
- A relevant deprecation, security advisory, or environment validation change in Next.js.
- The user explicitly requests a refresh.

## Scope and caveats
This resource pack covers `@t3-oss/env-nextjs` version `0.12.0` with Zod validation. Alternative validation presets (such as Valibot) are exported via `./presets-valibot` but are outside this project's active verification scope.
