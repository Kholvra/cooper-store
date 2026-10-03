# Design Brief: Multi-Game Top-Up Store

## Visitor Mode
Operate: visitors find a game, compare a top-up or voucher package, and complete a simulated checkout.

## Problem
The current study-case documentation describes an MLBB-only flow, while the supplied 2026 price-list reference and game-asset directory cover nine games. Each game asks for different account information or uses a voucher, so visitors need a consistent store flow that does not force every game into one incorrect form.

## Solution
A responsive Indonesian-language storefront focused on top-ups for the nine games listed in `docs/list-harga-topup-2026.md`. Visitors search or browse games, compare that game's listed packages, then enter one checkout flow with the correct game-specific account fields or voucher path. An accessible order-confirmation dialog reviews the selected offer, applicable values, simulated payment method, and total before confirmation starts the clearly labelled simulated progress/result flow.

The user-provided marketplace screenshot is a visual reference for a dark charcoal interface, compact shopping navigation, game imagery, and a bright yellow commerce accent. It is not approval to reproduce the Testing.gg brand or to add its non-top-up marketplace categories.

## Experience Principles
1. **Game first, package second:** visitors identify the game before comparing its denominations; the store never mixes currencies across games.
2. **One checkout, correct details:** the selected game/package stays visible while the form adapts to that game's account-input or voucher needs; one confirmation dialog stays inside this checkout rather than opening a second checkout view.
3. **Lively, not loud:** dark surfaces and game art establish gaming context; yellow marks the purchase path, not every surface.

## Aesthetic Direction
Use the user-selected **After-hours Market** direction: a charcoal storefront with tiered dark surfaces and a restrained, high-contrast yellow accent. The supplied screenshot informs atmosphere and shopping density, not branding or page-by-page cloning. Make the nine-game top-up catalogue the first viewport's subject; avoid fabricated "popular" rankings, discounts, delivery claims, or security claims. Keep amounts and prices on opaque surfaces, separate from game artwork. No product name or approved storefront logo has been supplied; do not invent or reproduce one.

## Existing Patterns
No application source, components, or implemented design tokens are present. The user confirms supplied images intended for use are user-owned or authorized; `DISC-001` records the exact files, game mapping, and treatment. Unmapped games retain text labels. The original MLBB-only scope has been superseded by the approved nine-game product backlog. The generic normalized seed data is reference material; the user decided to use PDF inputs for PUBG Player ID and separate MLBB ID/Server fields rather than older conflicting records.

## Component Inventory

| Component | Status | Notes |
|---|---|---|
| Storefront shell and top-up navigation | New | Keep only destinations in the approved top-up scope; no accounts/login or unrelated marketplace categories. |
| Game search and game directory | New | Search/browse the nine included games; no unsupported popularity ranking. |
| Game package catalogue | New | Show only that game's currency/voucher denominations and listed IDR prices. |
| Game-specific account/voucher details | New | Fields vary by game; Roblox voucher checkout has no Player ID. Applicable account fields are required and checked for non-empty input only; do not add syntax, length, or account-validity checks. |
| Selected-offer summary, confirmation dialog, and simulated checkout | New | Retain game/package context; review applicable field values, simulated payment method, and total before one confirmed submission. |
| Simulated progress, success receipt, and failure/retry state | New | Show simulated progress, then success details; failure preserves context without a success nota. |
| Game artwork | Pending mapping | User confirms intended supplied assets are owned or authorized; DISC-001 records selected files, game association, and treatment. Text labels remain for games without a selected image. |

## Key Interactions
- Visitors open a game directory, search/browse the nine included games, and choose one.
- Visitors compare the chosen game's available package denominations and IDR prices, then select a package.
- Checkout retains game/package and displays the account fields defined for that game; Roblox is a voucher path with no player-ID input.
- A visitor enters the requested account data where applicable and chooses one simulated payment method.
- An evaluator chooses simulated success or failure.
- Before submission, an accessible dialog summarizes game, package/voucher, applicable account values, simulated payment method, and total; `Kembali edit` returns without losing context, and `Konfirmasi simulasi` submits.
- The flow then shows `Pesanan dibuat` → `Simulasi berjalan` → `Hasil simulasi`, clearly as simulation, before the success nota or recoverable failure. If simulation resolves immediately, keep the completed sequence visible with the result instead of adding a wait; use no QR, countdown, or payment-pending status.
- Receipt and failure state exist only within the current session; no real payment, account lookup, game-credit delivery, or order history occurs.

## Data and Interaction States
- Game list or package data loading: announce the specific catalogue being loaded only when content is not immediately available; avoid a spinner for an instant local response.
- Empty game search: explain that no game matches the query and provide an operable clear-search action.
- Empty game/package catalogue: explain that there are no listed offers for the selected game and provide a real return path to the game directory.
- Catalogue data error: identify which list failed and provide a retry action; do not show stale/mismatched prices as if current.
- Checkout validation error: identify the exact required game field and how to correct it; keep the selected game/package and other entered fields.
- Simulated progress is visibly identified as simulation and resolves to the evaluator-selected success/failure; if it resolves immediately, show the completed sequence with the result rather than adding a fixed delay or fake payment-pending state.
- No active session result after refresh/leave: explain that the session-only result is unavailable and provide a link back to the game directory.

## Responsive Behavior
Responsive web experience. The supplied reference is a desktop composition; desktop keeps the compact horizontal shell and scannable game/package rows. At narrow widths, navigation collapses accessibly, search remains reachable, game tiles reflow, and selected package plus checkout action remain easy to find. No horizontal overflow at 200% zoom or on-screen keyboard obstruction of focused fields.

## Accessibility Requirements
- Use semantic landmarks/headings, explicit form labels, keyboard-operable controls, and visible focus on every interactive element; the confirmation dialog is keyboard-operable and returns focus to its opening action when closed.
- Meet WCAG 2.2 AA text contrast (4.5:1 normal, 3:1 large) and 3:1 non-text contrast for actionable boundaries/focus. Status and selection never depend on color alone.
- Associate field errors with the relevant field and explain how to recover. Keep mobile touch targets at least 44px.
- Support 200% text zoom and `prefers-reduced-motion`; text over variable game artwork is prohibited.
- Indonesian is the initial UI language, inherited from the Indonesian study brief. Keep text flexible for approximately 30% expansion; RTL support is not required initially.

## Out of Scope
- Accounts, account listings, boosting, standalone game items, broad gift-card marketplace, user login, or any Testing.gg-only category. Roblox voucher products in the supplied list remain in scope.
- Real payment processing, real account verification, automatic delivery, refunds, customer support, or claims of official game affiliation.
- Persistent invoice/order history, saved payment details, user accounts, cart, promotion archive, or checkout review steps beyond one confirmation dialog inside the existing checkout.
- Unauthorized game artwork, invented store logo/name, invented popularity/rankings, and unsupported discount or trust claims.

## Product Decision References
- Canonical scope and delivery index: [`../product/backlog.md`](../product/backlog.md) and [`../product/epics/EPIC-001-mlbb-top-up-store.md`](../product/epics/EPIC-001-mlbb-top-up-store.md).
- Game/package browsing and source gaps: [`../product/items/REQ-002-browse-select-diamond-packages/01-requirement.md`](../product/items/REQ-002-browse-select-diamond-packages/01-requirement.md).
- Required-field-only checkout and simulation: [`../product/items/REQ-003-simulated-checkout/01-requirement.md`](../product/items/REQ-003-simulated-checkout/01-requirement.md).
- Session-only result and retry behavior: [`../product/items/REQ-004-receipt-and-retry/01-requirement.md`](../product/items/REQ-004-receipt-and-retry/01-requirement.md).
- Artwork permission and text fallback: [`../product/items/DISC-001-authorized-mlbb-artwork/01-requirement.md`](../product/items/DISC-001-authorized-mlbb-artwork/01-requirement.md).
