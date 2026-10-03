# Implementation Patterns & Recipes (`next@15.5.27`)

## 1. Next.js 15 Async Dynamic Route Page & Search Params

In Next.js 15, dynamic route `params` and `searchParams` are asynchronous Promises. They must be awaited in Server Components.

```typescript
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SlugPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearch = await searchParams;
  const filter = resolvedSearch.filter ?? "all";

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Slug: {slug}</h1>
      <p>Filter: {filter}</p>
    </main>
  );
}
```

## 2. Server Action with Revalidation & Redirect

Server Actions executed in Server Components or Client Components can mutate state, revalidate cache tags/paths, and redirect.

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "~/server/db";

export async function createPostAction(formData: FormData) {
  const title = formData.get("title")?.toString();
  if (!title) {
    throw new Error("Title is required");
  }

  await db.post.create({
    data: { title },
  });

  revalidatePath("/");
  redirect("/");
}
```

## 3. Next.js 15 Route Handler with Async Params

Route handlers receive `request` and context with `params` as a Promise.

```typescript
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  return NextResponse.json({ id, message: "Success" });
}
```

## 4. Asynchronous Request Headers Access (`next/headers`)

In Next.js 15, `headers()` and `cookies()` return a Promise (or are async functions).

```typescript
import { headers } from "next/headers";

export async function getClientIp() {
  const hdr = await headers();
  return hdr.get("x-forwarded-for") ?? "127.0.0.1";
}
```
