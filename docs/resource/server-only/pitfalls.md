# Known Pitfalls & Gotchas

| Scenario | Risk or surprising behavior | Required handling | Evidence |
|---|---|---|---|
| Import marker in a shared module used by client components | Bundler may reject the client import; exact diagnostic depends on framework/tooling. | Keep guarded module and all its imports server-only; call through a server component or server action boundary. | [Web] [npm package](https://www.npmjs.com/package/server-only) |
| Assuming marker is runtime access control | Marker is build/bundler signaling, not authorization or secret management. | Enforce authorization in server logic; never expose secrets as client props or public environment variables. | [Web] [React directives](https://react.dev/reference/rsc/directives) |
| Using unsupported bundler | Marker enforcement may not occur; behavior unverified outside supported integration. | Verify framework's server/client graph handling; do not rely on marker alone to protect data. | [Web] [npm package](https://www.npmjs.com/package/server-only); enforcement details unverified |
