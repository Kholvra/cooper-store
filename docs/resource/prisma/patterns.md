# Implementation Patterns & Recipes

## 1. Local schema evolution

```sh
# Edit prisma/schema.prisma, then create and apply a named development migration
pnpm exec prisma migrate dev --name add_feature
# Regenerate client explicitly when needed
pnpm exec prisma generate
```

## 2. Production deployment

```sh
# CI/release step after migrations have been committed
pnpm exec prisma migrate deploy
```

Do not use `migrate dev` against production. Commit generated migration SQL and deploy migrations in release pipeline.

## 3. Prototyping without migration history

```sh
pnpm exec prisma db push
pnpm exec prisma generate
```

Use `db push` only where direct schema sync without migration history is intended; it is not a replacement for committed production migrations.

## 4. Inspect data locally

```sh
pnpm exec prisma studio
```

Evidence: [Prisma CLI reference](https://www.prisma.io/docs/orm/tools/prisma-cli), [development/production workflows](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production), `[Code]` `package.json:8-16`.
