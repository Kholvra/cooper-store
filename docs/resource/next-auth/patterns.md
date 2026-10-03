# Implementation Patterns & Recipes (`next-auth@5.0.0-beta.25`)

## 1. NextAuth v5 Configuration & Prisma Adapter Setup

```typescript
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [DiscordProvider],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
```

## 2. NextAuth v5 Instance Export with Request Memoization (`src/server/auth/index.ts`)

```typescript
import NextAuth from "next-auth";
import { cache } from "react";
import { authConfig } from "./config";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
```

## 3. NextAuth Route Handler Setup (`src/app/api/auth/[...nextauth]/route.ts`)

```typescript
import { handlers } from "~/server/auth";

export const { GET, POST } = handlers;
```

## 4. Accessing Session in Server Components (`src/app/page.tsx`)

```typescript
import { auth } from "~/server/auth";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <div>Not signed in</div>;
  }

  return <div>Welcome {session.user.name}</div>;
}
```
