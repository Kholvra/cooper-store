# Resource: server-only

- Ecosystem: npm / React Server Components marker package
- Requested version: `^0.0.1`
- Resolved version: `0.0.1`
- Runtime/platform: React Server Components-capable bundler/framework; project Next.js 15.5.27
- Status: PARTIAL
- Last verified: 2026-10-03
- Verification scope: package purpose and marker import usage; package is intentionally a zero-API side-effect marker.
- Coverage: discovered 1; documented 1; verified 1; unverified 0 (package API group; condition/export artifact inventory not separately verified)

## Sources
- [server-only on npm](https://www.npmjs.com/package/server-only) — description and version 0.0.1, accessed 2026-10-03.
- [React Server Components directives](https://react.dev/reference/rsc/directives) — server/client module boundary concepts.
- `[Code]` `package.json:26-30` — React/Next/server-only ranges.

## Refresh Triggers
- Resolved version changes in lockfile/manifest
- A task uses an API or feature outside the verification scope
- A relevant deprecation, security advisory, or migration is discovered
- The user explicitly requests a refresh
