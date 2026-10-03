# Implementation Patterns & Recipes

## 1. CSS-first theme and utilities

```css
@import "tailwindcss";

@theme {
  --color-brand: oklch(0.62 0.18 250);
  --font-display: "Inter", sans-serif;
}
```

```tsx
export function Callout({ children }: { children: React.ReactNode }) {
  return <aside className="rounded-lg bg-brand p-4 font-display text-white">{children}</aside>;
}
```

## 2. Responsive and state variants

```tsx
<button className="w-full rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto">
  Continue
</button>
```

## 3. Dynamic values without hiding class tokens

```tsx
const colorClasses = {
  success: 'bg-green-700 text-white',
  warning: 'bg-amber-300 text-black',
} as const;
export function Badge({ tone }: { tone: keyof typeof colorClasses }) {
  return <span className={`rounded px-2 py-1 ${colorClasses[tone]}`}>{tone}</span>;
}
```

Keep full class names statically detectable; do not construct `bg-${color}-500`. Evidence: [Tailwind install](https://tailwindcss.com/docs/installation/using-postcss), [theme](https://tailwindcss.com/docs/theme), [source detection](https://tailwindcss.com/docs/detecting-classes).
