# Verified API Surface

Tailwind's public surface is CSS directives, utility class vocabulary, and build integrations rather than a single JS API. Utility inventory is intentionally practical, not exhaustive.

| API / Symbol | Signature & Options | Description & Return Values | Evidence |
|---|---|---|---|
| CSS entry | `@import "tailwindcss";` | Imports Tailwind base, theme, and utility layers into CSS build. | [Web] [Installation](https://tailwindcss.com/docs/installation/using-postcss) |
| Utility classes | e.g. `p-4`, `text-lg`, `font-bold`, `bg-blue-500` | Atomic styles composed directly on markup. | [Web] [Utility classes](https://tailwindcss.com/docs/styling-with-utility-classes) |
| Responsive variants | `sm:`, `md:`, `lg:`, `xl:`, `2xl:` | Conditional styles at configured breakpoints (mobile-first). | [Web] [Responsive design](https://tailwindcss.com/docs/responsive-design) |
| State variants | `hover:`, `focus:`, `active:`, `disabled:` | Styles under pseudo-class/state conditions. | [Web] [Hover/focus/other states](https://tailwindcss.com/docs/hover-focus-and-other-states) |
| Arbitrary values | `w-[37px]`, `grid-cols-[...]` | Inline one-off CSS values supported by arbitrary-value syntax. | [Web] [Adding custom styles](https://tailwindcss.com/docs/adding-custom-styles) |
| Theme variables | `@theme { --color-brand: ...; }` | Declare design tokens that expose corresponding utilities. | [Web] [Theme variables](https://tailwindcss.com/docs/theme) |
| Custom utilities | `@utility tab-4 { ... }` | Define custom utility class and enable variant behavior. | [Web] [Adding custom styles](https://tailwindcss.com/docs/adding-custom-styles) |
| Source detection | build scans source text for complete class tokens; `@source` adds explicit sources | Generates only detected classes; no runtime generation from computed expressions. | [Web] [Detecting classes](https://tailwindcss.com/docs/detecting-classes) |
| PostCSS integration | `@tailwindcss/postcss` plugin in PostCSS configuration | Build-time processing for projects using PostCSS. | [Web] [Using PostCSS](https://tailwindcss.com/docs/installation/using-postcss) |
| CLI integration | Tailwind CLI input/output/watch invocation | Standalone CSS build interface. Exact 4.3.3 CLI flag inventory not reproduced. | [Web] [Tailwind CLI](https://tailwindcss.com/docs/installation/tailwind-cli) |

Exact full utility catalog and versioned compiler options remain unverified; consult linked references for API-specific work.
