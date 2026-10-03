# Version Compatibility

| Resource version | Runtime/framework | Platform | Status | Notes | Evidence |
|---|---|---|---|---|---|
| `zod@3.25.76` root (`v3`) | Node.js (exact project runtime version not established here) | Node.js | Compatible, runtime version caveat | Package describes support for Node.js and modern browsers; package metadata does not declare an `engines` constraint. Verify the deployment Node runtime against project Next.js requirements separately. | [Package artifact](https://github.com/colinhacks/zod/blob/v3.25.76/packages/zod/package.json); [README](https://github.com/colinhacks/zod/blob/v3.25.76/packages/zod/README.md) |
| `zod@3.25.76` root (`v3`) | TypeScript `^5.8.2` requested by this project | TypeScript | Compatible, not separately compiled here | Zod is TypeScript-first and publishes declaration files. The project manifest's requested compiler range is recorded, but no exact compiler runtime or targeted typecheck was run for this resource pack. | [Package artifact](https://github.com/colinhacks/zod/blob/v3.25.76/packages/zod/package.json); [Code] `package.json` devDependency `typescript` |
| `zod@3.25.76` | Next.js 15.5 App Router | Node.js server / browser client | Partial | Zod is platform-agnostic, but choose server/client boundary deliberately: server-only secrets must not be included in client modules. No exact Next.js integration test was run. | [README](https://github.com/colinhacks/zod/blob/v3.25.76/packages/zod/README.md); [Code] `package.json` Next.js range |
| `zod@3.25.76` package exports | Root / `zod/v3` vs v4-family paths | ESM and CommonJS condition maps | Verified export mapping; v4 APIs not covered | Exact package exports include root, `/v3`, `/v4`, `/v4-mini`, `/v4/mini`, `/v4/core`, `/v4/locales`, locale wildcard, and `/package.json`. Root and `/v3` resolve to v3 in this release; do not mix v4 docs/import paths into v3 examples. | [Package artifact](https://github.com/colinhacks/zod/blob/v3.25.76/packages/zod/package.json), [root export](https://github.com/colinhacks/zod/blob/v3.25.76/packages/zod/src/index.ts) |

## Operational compatibility notes

- This pack documents the v3 API selected by the package's root export in exact `3.25.76`, not APIs imported from `zod/v4`.
- The project manifest requests `zod: ^3.24.2` and TypeScript `^5.8.2`; lockfile exact dependency version was supplied by the user as `3.25.76`.
- No minimum supported Node.js version was found in the exact package metadata consulted. Treat an exact minimum as **Unverified**; confirm against the project deployment runtime before relying on newer JS/TS runtime features.
