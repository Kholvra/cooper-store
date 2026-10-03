# Verified API Surface (`next-auth@5.0.0-beta.25`)

Verified practical API surface for NextAuth.js v5 (Auth.js beta) in Next.js App Router.

| API / Symbol | Signature & Options | Description & Return Values | Evidence |
|---|---|---|---|
| `NextAuth()` | `const { auth, handlers, signIn, signOut } = NextAuth(AuthConfig)` | Factory function initializing Auth.js instance and exporting route handlers, server session getter, and auth helpers. | [Web] [Auth.js v5 Getting Started](https://authjs.dev/getting-started/installation?framework=next.js) & `[Code]` `src/server/auth/index.ts` |
| `handlers` | `export const { GET, POST } = handlers;` | Route Handler object exposing `GET` and `POST` handlers for `/api/auth/[...nextauth]/route.ts`. | [Web] [Auth.js v5 Route Handlers](https://authjs.dev/getting-started/installation?framework=next.js#route-handler) & `[Code]` `src/app/api/auth/[...nextauth]/route.ts` |
| `auth` | `const session = await auth()` | Server-side session getter (often wrapped with React `cache()`), returns `Session | null`. | [Web] [Auth.js v5 Session Helper](https://authjs.dev/getting-started/session-management#getsession) & `[Code]` `src/server/auth/index.ts` |
| `signIn` | `signIn("discord", { redirectTo: "/" })` | Initiates sign-in flow for specified provider. | [Web] [Auth.js v5 Authentication Actions](https://authjs.dev/getting-started/authentication/signin) |
| `signOut` | `signOut({ redirectTo: "/" })` | Signs out current user session. | [Web] [Auth.js v5 Authentication Actions](https://authjs.dev/getting-started/authentication/signout) |
| `AuthConfig` | `{ providers: [...], adapter: PrismaAdapter(db), callbacks?: {...}, ... }` | Configuration object passed to `NextAuth()`. | [Web] [Auth.js v5 Options](https://authjs.dev/reference/core#authconfig) & `[Code]` `src/server/auth/config.ts` |
| `@auth/prisma-adapter` | `PrismaAdapter(db)` | Database adapter connecting Auth.js models (User, Account, Session, VerificationToken) to Prisma ORM. | [Web] [Auth.js Prisma Adapter](https://authjs.dev/reference/adapter/prisma) & `[Code]` `src/server/auth/config.ts` |
| Module Augmentation | `declare module "next-auth" { interface Session extends DefaultSession { user: { id: string } & DefaultSession["user"] } }` | TypeScript declaration merging to add custom properties (e.g. database user ID) to session user. | [Web] [Auth.js TypeScript Guide](https://authjs.dev/getting-started/typescript) & `[Code]` `src/server/auth/config.ts` |
