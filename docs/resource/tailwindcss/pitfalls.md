# Known Pitfalls & Gotchas

| Scenario | Risk or surprising behavior | Required handling | Evidence |
|---|---|---|---|
| Dynamically interpolated utility names | Scanner cannot infer runtime class fragments; styles may be absent. | Map runtime choices to complete literal class strings or safelist/source explicit tokens. | [Web] [Detecting classes](https://tailwindcss.com/docs/detecting-classes) |
| Source file outside detected paths | Utilities are not emitted because file is not scanned. | Configure `@source` for external/ignored source locations. | [Web] [Detecting classes](https://tailwindcss.com/docs/detecting-classes) |
| Following v3 setup instructions in v4 | v4 CSS-first configuration and package integration differ; legacy directives/configuration may not apply. | Follow v4-specific installation docs; verify legacy config migration separately. | [Web] [Installation](https://tailwindcss.com/docs/installation/using-postcss) |
| Incorrect plugin package | Tailwind v4 PostCSS plugin is `@tailwindcss/postcss`, not `tailwindcss` directly as plugin. | Configure PostCSS with dedicated package. | [Web] [Using PostCSS](https://tailwindcss.com/docs/installation/using-postcss) |
| Overusing arbitrary values | Repeated one-off values bypass cohesive design tokens and make maintenance harder. | Prefer theme tokens/utilities; use arbitrary values for true exceptions. | [Web] [Theme](https://tailwindcss.com/docs/theme), [custom styles](https://tailwindcss.com/docs/adding-custom-styles) |
| CSS import/build not included | Utilities exist in markup but generated stylesheet is absent. | Ensure the imported CSS entry participates in framework build and emitted CSS is loaded. | [Web] [Installation](https://tailwindcss.com/docs/installation/using-postcss) |
