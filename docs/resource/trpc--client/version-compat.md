# Version Compatibility

| Resource version | Runtime/framework | Platform | Status | Notes | Evidence |
|---|---|---|---|---|---|
| `11.19.0` | TypeScript `5.9.3`; tRPC server `11.19.0` | Browser and Node.js clients | Partial | Lockfile pins matching client/server 11.19.0 and TS 5.9.3. Official docs describe v11 contract. Exact package engines, complete peer matrix, and patch-specific export map were not checked. | `[Code]` `pnpm-lock.yaml:23-31,75-77`; [tRPC links](https://trpc.io/docs/client/links), v11.x |
| `11.19.0` | `@trpc/client` with server version other than `11.19.0` | Network transport | Unverified | Keep client/server on matching tRPC major and preferably aligned versions; the compatibility matrix for mixed patch/minor versions was not independently verified here. | Package artifact/release compatibility metadata not inspected |
