# Resource: `zod`

- Ecosystem: npm / TypeScript
- Requested version: `^3.24.2` (from `package.json`)
- Resolved version: `3.25.76` (user-provided lockfile resolution)
- Runtime/platform: Node.js and modern browsers; TypeScript consumers
- Status: PARTIAL (initial grounding; practical Zod v3 surface verified, full public export/type inventory not exhaustive)
- Last verified: 2026-10-03
- Verification scope: Zod v3 schema construction, primitive/object/collection schemas, inference, parsing, refinements, transforms, errors, coercion, form/environment validation, and tRPC integration.
- Coverage: discovered 32 practical API groups; documented 32; verified 32; unverified 0 within this scoped surface. Exact package metadata identifies 9 export-map keys including `/package.json`; root/v3 behavior was documented, while six v4-family paths are explicitly out of scope.

## Sources
- [Zod v3 documentation](https://v3.zod.dev/) — v3 API reference: schemas, parsing, type inference, errors, refinements, transforms, objects and coercion.
- [Zod v3.25.76 package metadata](https://github.com/colinhacks/zod/blob/v3.25.76/packages/zod/package.json) — exact package version and conditional exports.
- [Zod v3.25.76 root export](https://github.com/colinhacks/zod/blob/v3.25.76/packages/zod/src/index.ts) — root entry re-exports v3 and `z` namespace.
- [Zod v3.25.76 public v3 export barrel](https://github.com/colinhacks/zod/blob/v3.25.76/packages/zod/src/v3/external.ts) — v3 export barrel.
- [Zod v3.25.76 README](https://github.com/colinhacks/zod/blob/v3.25.76/packages/zod/README.md) — parsing behavior, deep-clone return, async parsing, and type inference. README examples target v4; only version-independent concepts were used.
- `[Code]` `package.json` — requested Zod range `^3.24.2` and TypeScript range `^5.8.2`.

## Refresh Triggers
- Resolved version changes in lockfile/manifest.
- A task uses an API or feature outside the verification scope.
- A relevant deprecation, security advisory, or migration is discovered.
- The user explicitly requests a refresh.

## Scope and caveats
The root export in exact tag `v3.25.76` points to the v3 API; the package also exports `/v3`, `/v4`, `/v4-mini`, `/v4/mini`, `/v4/core`, `/v4/locales`, locale wildcard paths, and `/package.json`. This pack focuses on the root/v3 contract. The v4-family export paths and their full symbols are outside the requested v3 scope and remain unverified here; do not infer their API from this pack. The API table is a practical index, not an exhaustive inventory of every symbol re-exported by v3.
