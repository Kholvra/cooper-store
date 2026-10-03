# Version Compatibility

| Resource version | Runtime/framework | Platform | Status | Notes | Evidence |
|---|---|---|---|---|---|
| `11.19.0` | React `19.3.0`; TanStack React Query `5.104.1`; TypeScript `5.9.3` | Browser and Next.js `15.5.27` SSR | Partial | Lockfile resolves these versions and tRPC peer graph resolves client/server 11.19.0. Exact package peer ranges/engine metadata and exhaustive compatibility matrix not checked. | `[Code]` `pnpm-lock.yaml:20-31,38-43,75-77`; [classic React docs](https://trpc.io/docs/client/react), v11.x |
| `@trpc/react-query` 11.19.0 | React Query v4 or other React majors | Browser/SSR | Unverified | This project uses React 19 and TanStack Query 5. Do not infer compatibility outside this combination without exact peer metadata. | Package artifact peer metadata not inspected |
