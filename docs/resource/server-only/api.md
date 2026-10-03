# Verified API Surface

| API / Symbol | Signature & Options | Description & Return Values | Evidence |
|---|---|---|---|
| `server-only` package entry | `import 'server-only'` | Side-effect marker with no callable exports. In supported React Server Components bundlers, importing it marks a module as server-only; a client-graph import is intended to fail at build time. No runtime value is returned. Exact conditional export implementation was not inspected; failure mechanics are Unverified. | [Web] [npm package description](https://www.npmjs.com/package/server-only), version 0.0.1; [Web] [React directives](https://react.dev/reference/rsc/directives) |

This intentionally small package has one practical API group. It provides no functions, hooks, components, configuration options, events, or cleanup lifecycle.
