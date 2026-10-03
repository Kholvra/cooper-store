# Version Compatibility (`next-auth@5.0.0-beta.25`)

| Resource version | Runtime / Framework | Platform | Status | Notes | Evidence |
|---|---|---|---|---|---|
| `next-auth@5.0.0-beta.25` | Next.js 14 / 15 App Router | Server / Node.js | Compatible | Fully designed for Next.js App Router and Server Actions. | [Web] [Auth.js v5 Installation](https://authjs.dev/getting-started/installation?framework=next.js) |
| `next-auth@5.0.0-beta.25` | `@auth/prisma-adapter@2.x` | Prisma ORM / PostgreSQL | Compatible | Requires Prisma client and database models (`User`, `Account`, `Session`, `VerificationToken`). | [Web] [Auth.js Prisma Adapter](https://authjs.dev/reference/adapter/prisma) & `[Code]` `package.json` |
| `next-auth@5.0.0-beta.25` | TypeScript 5.x | Build / Editor | Compatible | Requires module augmentation for custom session user types. | [Web] [Auth.js TypeScript Guide](https://authjs.dev/getting-started/typescript) |
