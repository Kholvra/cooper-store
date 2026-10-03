# Resource: `@trpc/client`

- Ecosystem: npm / TypeScript
- Requested version: `^11.0.0` (`package.json`)
- Resolved version: `11.19.0` (`pnpm-lock.yaml`)
- Runtime/platform: browser and Node.js clients; transport-dependent
- Status: PARTIAL (initial practical client API grounding; full export inventory not verified)
- Last verified: 2026-10-03
- Verification scope: typed client creation, HTTP/batched/streaming links, logger/custom/split links, WebSocket/local/subscription transport concepts, operation context and observable lifecycle.
- Coverage: discovered 15 practical API groups; documented 15; verified 12 practical groups from official v11 docs; unverified 3 groups/options noted in API reference. Full package exports/subpaths remain unverified.

## Sources
- [Vanilla client](https://trpc.io/docs/client/vanilla) — typed client operations, v11.x.
- [Links overview](https://trpc.io/docs/client/links) — link chain, context and custom observable lifecycle, v11.x.
- [HTTP batch link](https://trpc.io/docs/client/links/httpBatchLink) — batched HTTP transport, v11.x.
- [HTTP batch stream link](https://trpc.io/docs/client/links/httpBatchStreamLink) — streaming transport, v11.x.
- [Logger link](https://trpc.io/docs/client/links/loggerLink) — operation logging, v11.x.
- [Split link](https://trpc.io/docs/client/links/splitLink) — operation routing, v11.x.
- `[Code]` `src/trpc/react.tsx:4-6,47-61` — logger and streaming link configuration.
- `[Code]` `package.json:23-25` — requested range; `pnpm-lock.yaml:23-25` — exact resolution.

## Refresh Triggers
- Resolved version changes in lockfile/manifest.
- A task uses an API or feature outside the verification scope.
- A relevant deprecation, security advisory, or migration is discovered.
- The user explicitly requests a refresh.
