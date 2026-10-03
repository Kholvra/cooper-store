# Verified API Surface

Prisma CLI is an executable rather than an imported library. Project-use commands below; current official CLI docs are v7, so command details specific to 6.19.3 remain **Unverified** unless noted.

| API / Symbol | Signature & Options | Description & Return Values | Evidence |
|---|---|---|---|
| `prisma migrate dev` | `prisma migrate dev [--name NAME] [--create-only]` | Development migration workflow; creates/applies migration against development database. | [Web] [CLI reference](https://www.prisma.io/docs/orm/tools/prisma-cli), [v6 docs](https://www.prisma.io/docs/orm/v6); exact 6.19 options unverified |
| `prisma migrate deploy` | `prisma migrate deploy` | Applies pending migrations in deployment environments; does not create migrations. | [Web] [Migrate deploy](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production) |
| `prisma db push` | `prisma db push [--accept-data-loss] [--force-reset]` | Synchronizes schema directly without migration history. | [Web] [CLI reference](https://www.prisma.io/docs/orm/tools/prisma-cli) |
| `prisma studio` | `prisma studio [--port PORT] [--browser BROWSER]` | Starts local web data browser; process remains active until stopped. | [Web] [CLI reference](https://www.prisma.io/docs/orm/tools/prisma-cli) |
| `prisma generate` | `prisma generate [--schema PATH]` | Generates client artifacts based on generator/schema configuration. | [Web] [Generating Prisma Client](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client) |
| `prisma version` | `prisma version [--json]` | Reports CLI/client/engine/platform version information; `--json` structured output. | [Web] [CLI reference](https://www.prisma.io/docs/orm/tools/prisma-cli#version--v) |
| `prisma` config/schema | `schema.prisma`, datasource/generator/model declarations | Declarative schema consumed by CLI and client generation; full grammar not covered here. | [Web] [Prisma schema reference](https://www.prisma.io/docs/orm/reference/prisma-schema-reference) |

Project scripts map to commands at `[Code]` `package.json:8-16`. Complete exported CLI commands and all options are **Unverified**.
