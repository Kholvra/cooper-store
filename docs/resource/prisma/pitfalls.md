# Known Pitfalls & Gotchas

| Scenario | Risk or surprising behavior | Required handling | Evidence |
|---|---|---|---|
| Running `migrate dev` in production | Development command may create migrations and uses development workflow semantics. | Commit migrations from development and use `migrate deploy` in production. | [Web] [Development and production workflows](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production) |
| Using `db push` for production migration history | Direct schema sync does not create migration history; destructive changes may risk data loss. | Prefer migrations for tracked environments; review warnings and backups before data-loss flags. | [Web] [CLI reference](https://www.prisma.io/docs/orm/tools/prisma-cli) |
| Missing client generation after schema changes | Application may use stale generated client types/runtime. | Run `prisma generate`; project postinstall also invokes `prisma generate`. | [Web] [Generate client](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client); [Code] `package.json:12` |
| `migrate deploy` with unapplied schema changes not represented in migrations | Production state follows committed migration files, not an arbitrary schema edit. | Ensure all intended changes have checked-in migration artifacts before deployment. | [Web] [Migration workflows](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production) |
| Prisma CLI v6 vs current v7 docs | CLI/config options may differ. | Confirm every option against Prisma ORM v6.19.3 documentation before use; this pack is partial. | [Web] [v6 docs](https://www.prisma.io/docs/orm/v6); current CLI page is v7 |
