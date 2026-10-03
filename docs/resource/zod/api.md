# Verified API Surface

Practical surface for the root entry point / Zod v3 at `zod@3.25.76`. Root `zod` and `zod/v3` both resolve to the v3 family at this version. Signatures below are concise TypeScript forms; exact overloads/options are linked to the v3 reference.

| API / Symbol | Signature & Options | Description & Return Values | Evidence |
|---|---|---|---|
| `z` | `import { z } from "zod"` or `import * as z from "zod"` | Schema namespace. Root module also has default export. | [Package artifact] exact v3.25.76 root entry |
| `z.infer` | `type T = z.infer<typeof schema>` | Output type produced by parsing; equivalent to `z.output<typeof schema>`. | [Web] [Basic usage](https://v3.zod.dev/?id=basic-usage) |
| `z.input`, `z.output` | `z.input<S>`, `z.output<S>` | Extract schema input and parsed output types; differ with coercions/transforms. | [Web] [Basic usage](https://v3.zod.dev/?id=basic-usage) |
| `z.string()` | `z.string()` | String schema; base parse rejects non-strings. | [Web] [Strings](https://v3.zod.dev/?id=strings) |
| String checks | `.min(n)`, `.max(n)`, `.length(n)`, `.email()`, `.url()`, `.uuid()`, `.regex(re)`, `.startsWith(s)`, `.endsWith(s)`, `.trim()`, `.toLowerCase()`, `.toUpperCase()` | Chain validations and string transforms; immutable schema methods return a new schema. Length constraints use Unicode code points per v3 docs. | [Web] [Strings](https://v3.zod.dev/?id=strings) |
| `z.number()` | `z.number()` | Finite-number validation by default; chain `.int()`, `.positive()`, `.nonnegative()`, `.negative()`, `.nonpositive()`, `.min(n)`, `.max(n)`, `.multipleOf(n)`, `.finite()` as needed. | [Web] [Numbers](https://v3.zod.dev/?id=numbers) |
| `z.boolean()`, `z.bigint()`, `z.date()` | `z.boolean()`, `z.bigint()`, `z.date()` | Primitive validators; date schema accepts `Date` instances, not arbitrary date strings. | [Web] [Primitives](https://v3.zod.dev/?id=primitives) |
| `z.literal()` | `z.literal(value)` | Exact string/number/boolean/null literal validation; infers the literal type. | [Web] [Literals](https://v3.zod.dev/?id=literals) |
| `z.enum()` | `z.enum(["draft", "live"])` | Validates one of a tuple of strings; `.enum` exposes keyed values and `.options` the options. | [Web] [Enums](https://v3.zod.dev/?id=zod-enums) |
| `z.nativeEnum()` | `z.nativeEnum(MyEnum)` | Validates values from a TypeScript enum-like object. | [Web] [Enums](https://v3.zod.dev/?id=native-enums) |
| `z.object()` | `z.object({ key: schema })` | Object schema; default strips unknown keys. Supports `.shape`, `.pick()`, `.omit()`, `.partial()`, `.deepPartial()`, `.required()`, `.extend()`, `.merge()`, `.passthrough()`, `.strict()`, `.strip()`, `.catchall(schema)`. | [Web] [Objects](https://v3.zod.dev/?id=objects) |
| Object composition | `.extend(shape)`, `.merge(otherObject)`, `.pick(mask)`, `.omit(mask)` | Return composed object schema; merged shape follows right-hand schema on key collisions. | [Web] [Objects](https://v3.zod.dev/?id=objects) |
| Optional / nullable / default | `schema.optional()`, `.nullable()`, `.nullish()`, `.default(value)` | Wrap schema to accept `undefined`, `null`, both, or substitute default when input is `undefined`; default affects output type. | [Web] [Optionals](https://v3.zod.dev/?id=optionals) |
| `z.array()` | `z.array(item)` or `item.array()` | Array of parsed items; `.min(n)`, `.max(n)`, `.length(n)`, `.nonempty()`. Parsed output is validated data. | [Web] [Arrays](https://v3.zod.dev/?id=arrays) |
| `z.tuple()` | `z.tuple([a, b])` | Fixed positional array; optional rest schema via `.rest(schema)`. | [Web] [Tuples](https://v3.zod.dev/?id=tuples) |
| `z.record()` | `z.record(valueSchema)` or `z.record(keySchema, valueSchema)` | Validates arbitrary key/value records; output is typed record. | [Web] [Records](https://v3.zod.dev/?id=records) |
| `z.union()` | `z.union([a, b])` / `z.discriminatedUnion(key, variants)` | Union tries options; discriminated union selects by shared literal discriminator and yields clearer error paths. | [Web] [Unions](https://v3.zod.dev/?id=unions) |
| `z.intersection()` | `z.intersection(a, b)` / `a.and(b)` | Requires input to satisfy both; output combines results. Prefer object `.merge()` when composing object schemas. | [Web] [Intersections](https://v3.zod.dev/?id=intersections) |
| `z.unknown()`, `z.any()`, `z.void()`, `z.never()` | No arguments | Unknown accepts any input as `unknown`; any opts out of safety; void accepts `undefined`; never accepts no value. | [Web] [Primitives](https://v3.zod.dev/?id=primitives) |
| Coercion | `z.coerce.string()`, `.number()`, `.boolean()`, `.bigint()`, `.date()` | Converts using JavaScript constructors before validating; input type is `unknown` in v3. Use only when conversion semantics are intended. | [Web] [Coercion](https://v3.zod.dev/?id=coercion-for-primitives) |
| `schema.parse()` | `schema.parse(data)` | Synchronously returns parsed output; throws `ZodError` for invalid input. Output is a deep clone. | [Web] [Parsing](https://v3.zod.dev/?id=parse) and exact v3.25.76 README |
| `schema.safeParse()` | `schema.safeParse(data)` | Returns discriminated union `{ success: true; data } | { success: false; error: ZodError }`. | [Web] [Safe parse](https://v3.zod.dev/?id=safeparse) |
| Async parse | `.parseAsync(data)`, `.safeParseAsync(data)` | Promise variants required when schema uses async refinements/transforms. | [Web] [Parsing](https://v3.zod.dev/?id=parseasync) |
| Refinement | `.refine((value) => boolean, params?)` | Adds custom predicate; failure becomes a custom issue. Use `path` to attach issue to a field. | [Web] [Refine](https://v3.zod.dev/?id=refine) |
| Super refinement | `.superRefine((value, ctx) => void)` | Can add multiple typed issues via `ctx.addIssue`; supports cross-field validation. | [Web] [SuperRefine](https://v3.zod.dev/?id=superrefine) |
| Transform | `.transform((value, ctx) => output)` | Maps validated input to a distinct output type. Can report issues through context; async transform requires async parse. | [Web] [Transform](https://v3.zod.dev/?id=transform) |
| Pipelines | `z.pipeline(inputSchema, outputSchema)` / `.pipe(schema)` | Sequentially parses/transforms through schemas, feeding first output to second input. | [Web] [Pipelines](https://v3.zod.dev/?id=pipelines) |
| Preprocess | `z.preprocess((unknown) => value, schema)` | Normalizes raw input before target validation; resulting schema input is `unknown`. | [Web] [Preprocess](https://v3.zod.dev/?id=preprocess) |
| Catch / fallback | `.catch(fallback)` | Returns fallback when validation fails; avoid on security-sensitive input because it converts invalid data into accepted output. | [Web] [Catch](https://v3.zod.dev/?id=catch) |
| `ZodError` | `.issues`, `.errors`, `.flatten()`, `.format()`, `.toString()` | Structured validation error. Issues include `code`, `path`, and `message`; flatten/format help map nested errors. | [Web] [Error handling](https://v3.zod.dev/?id=error-handling) |
| Custom messages | schema options `{ message }`, `{ required_error, invalid_type_error }`; global `z.setErrorMap(map)` | Customizes issue text. Error maps return `{ message }`; global setting affects process-wide behavior. | [Web] [Error handling](https://v3.zod.dev/?id=error-handling) |
| `z.lazy()` | `z.lazy(() => schema)` | Defers schema construction for recursive types. | [Web] [Recursive types](https://v3.zod.dev/?id=recursive-types) |

## Package export paths

Exact `3.25.76` package metadata lists: `.`, `./v3`, `./v4`, `./v4-mini`, `./v4/mini`, `./v4/core`, `./v4/locales`, and `./v4/locales/*`, plus `./package.json`. Root and `/v3` use the v3 surface; the v4 paths are not covered in this pack. Package metadata also advertises conditional `import`, `require`, and `types` targets. See [exact package exports](https://github.com/colinhacks/zod/blob/v3.25.76/packages/zod/package.json).

> **Evidence correction:** `zod@3.25.76` v3 API documentation supports this table; the table is a practical API index, not a complete inventory of every exported helper/type. Package-level exact type inventory has not been audited.
