# Resource: prisma

- Ecosystem: npm / Prisma ORM schema, migration, and client-generation CLI
- Requested version: `^6.6.0`
- Resolved version: `6.19.3`
- Runtime/platform: Node.js CLI and database engines; project uses PostgreSQL
- Status: PARTIAL
- Last verified: 2026-10-03
- Verification scope: CLI usage for project scripts: migrate dev/deploy, db push, studio, generate, version; Prisma schema/client workflow. Comprehensive command and option inventory is incomplete.
- Coverage: discovered 7 project-used command groups; documented 7; verified 7; unverified 0 groups (complete CLI command inventory unavailable)

## Sources
- [Prisma CLI reference](https://www.prisma.io/docs/orm/tools/prisma-cli) — command families; current page redirects to ORM v7 and is not exact-version proof.
- [Prisma ORM v6 docs](https://www.prisma.io/docs/orm/v6) — versioned docs index.
- `[Code]` `package.json:8-16, 38-42` — invoked Prisma scripts and dev dependency range.
- `[Code]` `docs/resource/INDEX.md` — resolved `6.19.3`.

## Refresh Triggers
- Resolved version changes in lockfile/manifest
- A task uses an API or feature outside the verification scope
- A relevant deprecation, security advisory, or migration is discovered
- The user explicitly requests a refresh
