# Version Compatibility

| Resource version | Runtime/framework | Platform | Status | Notes | Evidence |
|---|---|---|---|---|---|
| `11.19.0` | TypeScript `5.9.3`; Next.js `15.5.27` integration in this repository | Node.js server; adapter-dependent | Partial | Lockfile resolves server 11.19.0 and TypeScript 5.9.3. Official docs confirm v11 API concepts, but exact patch-level engine/peer constraints and full compatibility matrix not independently verified from package artifact. | `[Code]` `pnpm-lock.yaml:29-31,75-77`; [tRPC routers](https://trpc.io/docs/server/routers), v11.x |
| `11.19.0` | Adapter/runtime variants | Node.js, edge, other platforms | Unverified | This resource does not establish adapter-specific runtime constraints; check selected adapter's exact version and runtime contract before deployment. | Exact package metadata / adapter docs not inspected |
