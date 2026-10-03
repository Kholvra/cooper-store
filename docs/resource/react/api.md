# Verified API Surface

Practical core surface (20 groups). Exact symbol inventory is **Unverified**: official reference index is broad but not a version-tagged package-export list. React DOM is a separate paired package.

| API / Symbol | Signature & Options | Description & Return Values | Evidence |
|---|---|---|---|
| `createElement` | `createElement(type, props, ...children): ReactElement` | Creates element description; does not render. | [Web] [React APIs](https://react.dev/reference/react/createElement) |
| `cloneElement` | `cloneElement(element, props, ...children)` | Shallowly clones element, overriding props/children. | [Web] React APIs |
| `isValidElement` | `isValidElement(value): boolean` | Tests React element identity. | [Web] React APIs |
| `Children` | `map`, `forEach`, `count`, `only`, `toArray` | Utilities over opaque children structure. | [Web] [Children](https://react.dev/reference/react/Children) |
| `memo` | `memo(Component, arePropsEqual?)` | Memoized component; optional comparator. | [Web] [memo](https://react.dev/reference/react/memo) |
| `lazy` | `lazy(load: () => Promise<{default: Component}>)` | Deferred component load; must be rendered under Suspense. | [Web] [lazy](https://react.dev/reference/react/lazy) |
| `createContext` | `createContext(defaultValue)` | Context object with `Provider` (and current React context syntax). | [Web] [createContext](https://react.dev/reference/react/createContext) |
| `use` | `use(context\|promise)` | Reads context or promise during render; promise suspension/error routed to Suspense/Error Boundary. | [Web] [use](https://react.dev/reference/react/use) |
| `useState` | `useState(initialState): [state, setState]` | State setter accepts value or updater. | [Web] [useState](https://react.dev/reference/react/useState) |
| `useReducer` | `useReducer(reducer, initialArg, init?)` | Reducer-managed state, returns state and dispatch. | [Web] [useReducer](https://react.dev/reference/react/useReducer) |
| `useContext` | `useContext(Context)` | Reads nearest provider value. | [Web] [useContext](https://react.dev/reference/react/useContext) |
| `useRef` | `useRef(initialValue)` | Stable mutable ref object; mutation does not render. | [Web] [useRef](https://react.dev/reference/react/useRef) |
| `useEffect` | `useEffect(setup, dependencies?)` | Synchronizes external systems after commit; cleanup before rerun/unmount. | [Web] [useEffect](https://react.dev/reference/react/useEffect) |
| `useLayoutEffect` | `useLayoutEffect(setup, dependencies?)` | Layout synchronization before browser repaint. | [Web] [useLayoutEffect](https://react.dev/reference/react/useLayoutEffect) |
| `useInsertionEffect` | `useInsertionEffect(setup, dependencies?)` | CSS-in-JS insertion lifecycle; library-oriented. | [Web] [useInsertionEffect](https://react.dev/reference/react/useInsertionEffect) |
| `useMemo` | `useMemo(calculate, dependencies)` | Caches calculation result as optimization. | [Web] [useMemo](https://react.dev/reference/react/useMemo) |
| `useCallback` | `useCallback(fn, dependencies)` | Caches function identity as optimization. | [Web] [useCallback](https://react.dev/reference/react/useCallback) |
| `useTransition` | `useTransition(): [isPending, startTransition]` | Marks updates as non-blocking transition. | [Web] [useTransition](https://react.dev/reference/react/useTransition) |
| `useDeferredValue` | `useDeferredValue(value, initialValue?)` | Defers part of UI update; not a debounce. | [Web] [useDeferredValue](https://react.dev/reference/react/useDeferredValue) |
| `useId` | `useId(): string` | Stable accessibility ID; not list key generation. | [Web] [useId](https://react.dev/reference/react/useId) |
| `useSyncExternalStore` | `(subscribe, getSnapshot, getServerSnapshot?)` | Consistent subscription to external stores. | [Web] [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore) |
| `useDebugValue` | `(value, format?)` | DevTools hook-library label. | [Web] [useDebugValue](https://react.dev/reference/react/useDebugValue) |
| React DOM client | `createRoot`, `hydrateRoot` | Client rendering and server-markup hydration. | [Web] [Client APIs](https://react.dev/reference/react-dom/client) |
| React DOM server | `renderToPipeableStream`, `renderToReadableStream`, `renderToString`, `renderToStaticMarkup` | Streaming and non-streaming server HTML render APIs. | [Web] [Server APIs](https://react.dev/reference/react-dom/server) |
| Built-in components | `Fragment`, `StrictMode`, `Suspense`, `Profiler`, `Activity` | Structural, diagnostics, suspense and lifecycle UI. | [Web] [Components](https://react.dev/reference/react) |
| React DOM APIs/hooks | `createPortal`, `flushSync`, `useFormStatus`, `useFormState` | DOM integration, sync flushing, form status/action state. | [Web] [React DOM reference](https://react.dev/reference/react-dom) |
| React directives | `'use client'`, `'use server'` | Bundler/server-component boundary directives; framework integration required. | [Web] [Directives](https://react.dev/reference/rsc/directives) |
| Legacy exports | `Children` utilities etc. as marked by official legacy page | Compatibility surface; avoid for new design where documented. | [Web] [Legacy APIs](https://react.dev/reference/react/legacy) |
