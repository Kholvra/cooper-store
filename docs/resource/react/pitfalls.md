# Known Pitfalls & Gotchas

| Scenario | Risk or surprising behavior | Required handling | Evidence |
|---|---|---|---|
| Calling hooks conditionally or in callbacks | Breaks hook call ordering. | Call hooks only at top level of components/custom hooks. | [Web] [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks) |
| Mutating state objects | Same reference can prevent expected updates and obscure state transitions. | Replace objects/arrays immutably; use functional updater when based on prior state. | [Web] [useState](https://react.dev/reference/react/useState) |
| Missing effect cleanup/dependencies | Stale values, duplicate subscriptions, leaked work. | Declare reactive dependencies and return cleanup for subscriptions/timers/requests. | [Web] [useEffect](https://react.dev/reference/react/useEffect) |
| Strict Mode development render | Extra render and setup-cleanup-setup checks can expose impure logic. | Keep render pure and effects symmetrically clean up; do not suppress checks. | [Web] [StrictMode](https://react.dev/reference/react/StrictMode) |
| `useMemo`/`useCallback` | Cache is performance optimization, not semantic guarantee. | Correctness must not depend on cache persistence. | [Web] [useMemo](https://react.dev/reference/react/useMemo) |
| Suspense/lazy/promise reads | Pending promise suspends; rejection requires error handling boundary. | Place Suspense and Error Boundary at appropriate UI boundaries. | [Web] [Suspense](https://react.dev/reference/react/Suspense), [use](https://react.dev/reference/react/use) |
| Server/client component boundary | Browser APIs and event handlers cannot run in server components; client props must serialize across framework boundary. | Mark client entry points and pass supported serializable values. | [Web] [Directives](https://react.dev/reference/rsc/directives) |
| `useId` as list key | IDs are not intended for stable data identity. | Use data-derived keys for lists. | [Web] [useId](https://react.dev/reference/react/useId) |
| Hydration mismatch | Initial client output differs from server HTML. | Make initial render deterministic and defer browser-only state to client lifecycle. | [Web] [hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot) |
