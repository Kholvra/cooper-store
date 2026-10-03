# Implementation Patterns & Recipes

Examples follow this repository's generated Prisma output, singleton, NextAuth config, and App Router handler setup.

## 1. Attach PrismaAdapter to NextAuth config

```ts
// src/server/auth/config.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { db } from "~/server/db";

export const authConfig = {
  adapter: PrismaAdapter(db),
  providers: [DiscordProvider],
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user: { ...session.user, id: user.id },
      };
    },
  },
} satisfies NextAuthConfig;
```

Construct the Prisma client once in a server module and pass the instance; `PrismaAdapter` does not own or disconnect it.

## 2. Initialize NextAuth once and expose route handlers

```ts
// src/server/auth/index.ts
import NextAuth from "next-auth";
import { authConfig } from "./config";

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
```

```ts
// app/api/auth/[...nextauth]/route.ts
import { handlers } from "~/server/auth";

export const { GET, POST } = handlers;
```

The project wraps `auth` with React `cache`; retain that behavior if using the project's existing `src/server/auth/index.ts` implementation.

## 3. Keep schema field names canonical; map database names physically

```prisma
model Account {
  id                String @id @default(cuid())
  userId            String @map("user_id")
  type              String
  provider          String
  providerAccountId String @map("provider_account_id")
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
  @@map("accounts")
}
```

The adapter addresses Prisma model and property names (`account`, `providerAccountId`, compound selector); `@map` / `@@map` change underlying database column/table names without changing that client API. Regenerate the client and migrate database changes after schema edits.

## 4. Require database-backed sessions deliberately

```ts
export const authConfig = {
  adapter: PrismaAdapter(db),
  session: { strategy: "database" },
  providers: [DiscordProvider],
} satisfies NextAuthConfig;
```

Use database strategy when server-side revocation/persistent session records are required and the schema has a compatible `Session` model. If using JWT strategy instead, make that choice explicit and understand that adapter session CRUD is not the session store.

## 5. Extend adapter behavior without replacing built-ins

```ts
import type { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "~/server/db";

const adapter: Adapter = {
  ...PrismaAdapter(db),
  // Add a custom Adapter method only if your Auth.js contract needs it.
};
```

The adapter already handles standard user/account/session/token operations. Preserve those methods when customizing and verify the Adapter type against the exact `@auth/core` version resolved with NextAuth.

## 6. Enable WebAuthn only with matching schema

The adapter includes `createAuthenticator`, `getAuthenticator`, `listAuthenticatorsByUserId`, and `updateAuthenticatorCounter`; the current project schema lacks `Authenticator`. Add the model from the package's exact-version schema fixture, ensure its unique credential key and user relation, run migration and `prisma generate`, then configure WebAuthn. Do not enable passkey flows before the generated Prisma client includes this delegate.
