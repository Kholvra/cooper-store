# Implementation Patterns & Recipes

Project-specific examples use `../../generated/prisma`, matching the custom output in `prisma/schema.prisma` and `src/server/db.ts`. Ensure `prisma generate` has run after schema changes.

## 1. Next.js development-safe singleton

```ts
// src/server/db.ts
import { env } from "~/env";
import { PrismaClient } from "../../generated/prisma";

const createPrismaClient = () =>
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

type PrismaClientInstance = ReturnType<typeof createPrismaClient>;
const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClientInstance;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

This is the repository's established pattern: hot reload reuses a process-global client in development, while production module initialization owns the instance. Do not disconnect per request.

## 2. Typed, bounded safe query

```ts
import { Prisma } from "../../generated/prisma";
import { db } from "~/server/db";

export async function listPosts(input: { query?: string; page: number }) {
  const pageSize = 25;
  const page = Math.max(1, Math.min(input.page, 100));
  const where: Prisma.PostWhereInput = {
    ...(input.query ? { name: { contains: input.query } } : {}),
  };

  return db.post.findMany({
    where,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: {
      id: true,
      name: true,
      createdAt: true,
      createdById: true,
    },
  });
}
```

Validate caller input at the request/procedure boundary too. `select` minimizes data retrieval and the generated return type contains only selected fields. Use cursor pagination rather than large offsets for high-volume feeds.

## 3. Nested relation write

```ts
import { db } from "~/server/db";

export async function createPost(input: { userId: string; name: string }) {
  return db.post.create({
    data: {
      name: input.name,
      createdBy: { connect: { id: input.userId } },
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      createdBy: { select: { id: true, name: true } },
    },
  });
}
```

Prisma executes nested writes atomically. The relation is required by this project's schema, so connecting a missing user fails rather than creating a dangling post.

## 4. Interactive transaction for dependent work

```ts
import { db } from "~/server/db";

export async function renameUserAndCreatePost(input: {
  userId: string;
  name: string;
  postName: string;
}) {
  return db.$transaction(async (tx) => {
    const user = await tx.user.update({
      where: { id: input.userId },
      data: { name: input.name },
      select: { id: true },
    });

    const post = await tx.post.create({
      data: {
        name: input.postName,
        createdBy: { connect: { id: user.id } },
      },
      select: { id: true, name: true, createdById: true },
    });

    return post;
  }, { maxWait: 5_000, timeout: 5_000 });
}
```

If either operation fails, the callback throws and Prisma rolls back the transaction. Keep callbacks short; never await remote HTTP calls or user interaction while holding a transaction.

## 5. Handle expected Prisma errors by code

```ts
import { Prisma } from "../../generated/prisma";

export function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

try {
  await db.user.create({ data: { email, name } });
} catch (error) {
  if (isUniqueConstraintError(error)) {
    throw new Error("An account with this email already exists.");
  }
  throw error;
}
```

Map only known expected codes; rethrow unknown errors so infrastructure failures remain observable.

## 6. Explicit lifecycle for a one-shot script

```ts
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();
try {
  const posts = await prisma.post.findMany({ take: 10 });
  console.log(posts.length);
} finally {
  await prisma.$disconnect();
}
```

Use this for finite command-line or scheduled scripts. In a long-lived Next.js server, share the client and let process shutdown own cleanup.
