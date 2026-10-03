# Version Compatibility

| Resource version | Runtime/framework | Platform | Status | Notes | Evidence |
|---|---|---|---|---|---|
| `4.3.3` | Next.js `15.5.27`, PostCSS `^8.5.3` | Node.js build, browser CSS | Partial | Current v4.3 docs provide installation model; exact Next.js 15.5.27 integration/build compatibility not tested. Project includes `@tailwindcss/postcss` range `^4.0.15`. | [Web] [PostCSS installation](https://tailwindcss.com/docs/installation/using-postcss); [Code] `package.json:26,35-42`; [Code] `docs/resource/INDEX.md` |

Browser support matrix and exact 4.3.3 engine constraints are **Unverified** in this pack. Confirm framework/PostCSS integration against pinned versions if build errors arise.
