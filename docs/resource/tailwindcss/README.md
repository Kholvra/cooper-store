# Resource: tailwindcss

- Ecosystem: npm / CSS utility framework and build-time compiler
- Requested version: `^4.0.15`
- Resolved version: `4.3.3`
- Runtime/platform: build-time CSS scanning and generation; project Next.js with PostCSS integration
- Status: PARTIAL
- Last verified: 2026-10-03
- Verification scope: v4 CSS-first design, utility scanning, theme/custom CSS, variants, responsive and state utilities; complete utility/config inventory not covered.
- Coverage: discovered 9 practical API groups; documented 9; verified 9; unverified 0 groups (complete utility/option inventory unavailable)

## Sources
- [Tailwind CSS documentation](https://tailwindcss.com/docs) — v4.3 installation and CSS-driven utility generation, accessed 2026-10-03.
- [Detecting classes in source files](https://tailwindcss.com/docs/detecting-classes-in-source-files) — source scanning and dynamic class caveats.
- [Theme variables](https://tailwindcss.com/docs/theme) — CSS-first theme configuration.
- `[Code]` `package.json:35-42` — Tailwind and PostCSS toolchain ranges.

## Refresh Triggers
- Resolved version changes in lockfile/manifest
- A task uses an API or feature outside the verification scope
- A relevant deprecation, security advisory, or migration is discovered
- The user explicitly requests a refresh
