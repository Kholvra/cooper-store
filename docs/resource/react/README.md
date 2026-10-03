# Resource: react

- Ecosystem: npm / JavaScript UI library
- Requested version: Unspecified in package manifest (`^19.0.0`)
- Resolved version: 19.3.0 (paired `react-dom` 19.3.0)
- Runtime/platform: JavaScript; project framework Next.js 15.5.27, browser and server rendering
- Status: PARTIAL
- Last verified: 2026-10-03
- Verification scope: public React package families, core component APIs/hooks, React DOM integration and server/client rendering. Exact-version complete export inventory remains unverified.
- Coverage: discovered 27 practical API groups; documented 27; verified 27; unverified 0 groups (complete export inventory unavailable)

## Sources
- [React Reference Overview](https://react.dev/reference/react) — React, React DOM, hooks, components, APIs, directives, legacy APIs; accessed 2026-10-03. Current docs are not pinned to 19.3.0; see caveat.
- [React Hooks](https://react.dev/reference/react/hooks) — built-in hook index.
- `[Code]` `package.json:26-29` — Next and paired React/React DOM package versions.

## Refresh Triggers
- Resolved version changes in lockfile/manifest
- A task uses an API or feature outside the verification scope
- A relevant deprecation, security advisory, or migration is discovered
- The user explicitly requests a refresh
