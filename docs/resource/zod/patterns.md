# Implementation Patterns & Recipes

Examples target the root import at `zod@3.25.76` (v3 API). For browser forms, validate submitted values at the trust boundary even if UI controls provide client-side feedback.

## 1. Define schema once and infer output

```ts
import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(12).max(128),
  displayName: z.string().trim().min(1).max(80),
});

export type SignUpInput = z.input<typeof SignUpSchema>;
export type SignUp = z.infer<typeof SignUpSchema>;
```

`z.infer` is the parsed output type; use `z.input` when preprocess/coercion/transform makes the accepted input differ.

## 2. Form validation with safeParse

```ts
import { z } from "zod";

const ContactSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  message: z.string().trim().min(10).max(2_000),
});

type ContactResult =
  | { ok: true; value: z.infer<typeof ContactSchema> }
  | { ok: false; fieldErrors: Partial<Record<string, string[]>>; formErrors: string[] };

export function validateContact(raw: unknown): ContactResult {
  const result = ContactSchema.safeParse(raw);
  if (!result.success) {
    const errors = result.error.flatten();
    return { ok: false, fieldErrors: errors.fieldErrors, formErrors: errors.formErrors };
  }
  return { ok: true, value: result.data };
}
```

Treat request payloads as `unknown`; do not cast them to the expected type before validation.

## 3. Next.js App Router route handler

```ts
import { NextResponse } from "next/server";
import { z } from "zod";

const CreateOrder = z.object({
  sku: z.string().min(1),
  quantity: z.number().int().min(1).max(20),
});

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = CreateOrder.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  // Only validated, typed parsed.data may cross into application logic.
  return NextResponse.json({ accepted: true, order: parsed.data }, { status: 202 });
}
```

Use schema validation for shape and constraints; perform authorization and business-state checks separately.

## 4. Validate environment variables at startup

```ts
import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65_535).default(3000),
  FEATURE_CHECKOUT: z.enum(["true", "false"]).transform((v) => v === "true").default("false"),
});

const parsedEnv = EnvSchema.safeParse(process.env);
if (!parsedEnv.success) {
  // Avoid logging secret values; report paths/messages only.
  const summary = parsedEnv.error.issues
    .map(({ path, message }) => `${path.join(".")}: ${message}`)
    .join("\n");
  throw new Error(`Invalid server environment:\n${summary}`);
}

export const env = parsedEnv.data;
```

Keep this module server-only. Do not expose private environment values to client bundles; Next.js only exposes explicitly public-prefixed variables through client compilation.

## 5. tRPC input validation

```ts
import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

const ProductInput = z.object({
  id: z.string().uuid(),
});

export const productRouter = t.router({
  byId: t.procedure
    .input(ProductInput)
    .query(async ({ ctx, input }) => {
      // input is inferred as { id: string } and was parsed by the procedure.
      return ctx.db.product.findUnique({ where: { id: input.id } });
    }),
});
```

Use the same schema for server-side procedure validation; client-side validation is useful UX but never the authorization boundary.

## 6. Cross-field rule with `superRefine`

```ts
import { z } from "zod";

const PasswordChange = z.object({
  password: z.string().min(12),
  confirmPassword: z.string(),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });
  }
});
```

## 7. Normalize deliberately with preprocess / transform

```ts
import { z } from "zod";

const SearchParamsSchema = z.object({
  page: z.preprocess(
    (value) => (typeof value === "string" && value.trim() !== "" ? Number(value) : value),
    z.number().int().min(1).default(1),
  ),
  query: z.string().trim().max(100).optional(),
});

type SearchParamsInput = z.input<typeof SearchParamsSchema>;
type SearchParams = z.output<typeof SearchParamsSchema>;
```

For form/query-string coercion, define explicit blank-string behavior; generic `Number("")` becomes `0`, which is often not the intended default.
