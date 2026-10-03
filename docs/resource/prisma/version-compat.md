# Version Compatibility

| Resource version | Runtime/framework | Platform | Status | Notes | Evidence |
|---|---|---|---|---|---|
| `6.19.3` | Node.js / Prisma Client `6.19.3` | PostgreSQL project database; platform-specific Prisma engines | Partial | Exact resolved CLI version from batch inventory. Official CLI page currently redirects to v7; v6 documentation exists but exact 6.19.3 options/engine matrix were not retrieved. | [Code] `docs/resource/INDEX.md`; [Code] `package.json:8-16,38-42`; [Web] [Prisma v6 docs](https://www.prisma.io/docs/orm/v6) |

Do not infer Prisma ORM v7 migration/configuration advice applies unchanged to v6.19.3. Compatibility of individual database versions and Node versions is **Unverified** here.
