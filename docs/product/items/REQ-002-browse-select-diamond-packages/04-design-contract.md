# Design Contract: Nine-Game Catalog Browse/Select and Shared Selected-Offer Context

- Source: [`01-requirement.md`](01-requirement.md) (`REQ-002`); shared-context consumer side aligned with [`../REQ-003-simulated-checkout/01-requirement.md`](../REQ-003-simulated-checkout/01-requirement.md) (`REQ-003`)
- Status: `Proposed`
- Profile: `product-app`
- Scope: nine-game directory rendering, search, single-product selection, and the selected-offer context handed from catalog to checkout
- Owner: `design-contracts` (contract); user decisions C-004–C-009 in [`00-discussion.md`](00-discussion.md) (scope)

IDs below (`PRE-`, `POST-`, `INV-`, `STATE-`, `ARCH-`) are pack-scoped and do not replace guardrail IDs such as `ARCH-SCO-002`.

## Intent and non-goals

Intent: state observable rules for the catalog and for the selected-offer/checkout-context handoff so the REQ-002 and REQ-003 implementation branches can proceed in parallel without guessing shared behavior.

Non-goals: transport/state mechanism for the context (route, store, session) is an implementation choice; checkout field validation, confirmation dialog, and payment simulation belong to the REQ-003 contract; receipt/failure/retry belong to REQ-004; per-file artwork mapping belongs to DISC-001; code and tests are out of scope for this document.

## Trust boundary

| Boundary | Input/source | Validation or parse | Trusted representation | Rejection/failure |
|---|---|---|---|---|
| Catalog data | [`docs/list-harga-topup-2026.md`](../../../list-harga-topup-2026.md) transcription (repo content) | Provenance checked at transcription time: only legible listed rows are recorded | Catalog entries (game, label, denomination/composition, listed price) | Entry omitted; never guessed or backfilled at runtime |
| Search query | Visitor-typed text (untrusted) | Matched only against displayed game/product labels | Query used for filtering | No match → empty state; directory scope unchanged |
| Selection action | Visitor input referencing a catalog entry (untrusted) | MUST resolve to a listed offer of the nine-game catalog | Selected-offer context | Unresolvable input produces no context and no handoff |
| Game artwork | Files under `docs/Game Assets/` (untrusted until mapped) | MUST be mapped in DISC-001 and covered by the user confirmation | Mapped-and-confirmed image for one game | Text-name fallback; unmapped/unconfirmed image is never displayed |
| Selected-offer context (catalog → checkout) | Internal handoff from REQ-002 | Consumer MUST verify presence and referential integrity to a listed offer (PRE-02) | Session-only selected-offer context | Checkout does not proceed with absent or unresolvable context |
| Roblox identifier data | Not collected in catalog | n/a | n/a | Any player-identifier input in catalog is out of contract |

## Preconditions

| ID | Trigger | MUST be true | Owner | Violation behavior |
|---|---|---|---|---|
| PRE-01 | Visitor activates the continue action | A single selection exists and resolves to a listed offer of the nine-game catalog | Catalog (REQ-002) | Continue does not run; no context handed off |
| PRE-02 | Checkout entry with a handed-off context (shared consumer rule) | Context is present and resolves to a listed offer of the nine-game catalog | Checkout (REQ-003) | Checkout does not proceed with invented context; visitor returns to catalog |
| PRE-03 | Rendering a game image in the directory | The asset is mapped in DISC-001 and covered by the user's authorization confirmation | Catalog (REQ-002) | Render the game's text name instead; not an error state |

## Postconditions

| ID | On success, MUST guarantee | Preserved values/state | Side effects |
|---|---|---|---|
| POST-01 | Selection applied → exactly one offer is selected, shown with a non-color cue, with game, product/denomination, and listed price visible and clear to the continue action | Catalog scope, other entries, search query | None beyond selection state |
| POST-02 | Continue → checkout receives the same game, product/denomination, and listed price; no cart and no pre-checkout review step is inserted | Selected-offer context values unchanged in transit | Hands off to REQ-003 flow |
| POST-03 | Search → matching games/products are findable with labels unchanged; no match → clear empty state with a way to clear/change the query; empty query → full directory | Game/currency/voucher meanings; approved scope | Filter view only; no data mutation |
| POST-04 | Directory rendered → exactly nine approved games, entry counts driven by catalog content (no fixed six-slot cap) | Source-backed rows | None |
| POST-05 | MLBB presented → the 632→1,220 Diamond interval contains no invented rows and a visible disclosure states the transcription is incomplete there | Transcription contents | None |

## Invariants and state transitions

| ID | Owner | Invariant or legal transition | Forbidden case |
|---|---|---|---|
| INV-01 | Catalog (REQ-002) | Directory contains all and only MLBB, Free Fire, PUBG Mobile, Genshin Impact, Roblox, Valorant, Call of Duty Mobile, Delta Force Mobile, Blood Strike | Any tenth game, marketplace category, or missing approved game |
| INV-02 | Catalog (REQ-002) | Every displayed row maps 1:1 to a legible transcription entry (label, composition, listed price) | Inferred, interpolated, or backfilled rows |
| INV-03 | Catalog (REQ-002) | At most one offer is selected at a time; selecting another offer replaces the current selection | Two simultaneous selections; selection of a non-listed offer |
| INV-04 | Catalog (REQ-002) | Roblox products are presented as the listed Robux/Gift Card voucher path with no Player ID input | Player-ID collection or direct top-up implication for Roblox |
| INV-05 | Catalog (REQ-002) | Product labels preserve game currency semantics: MLBB Diamonds (base+bonus as transcribed), Free Fire Diamonds, PUBG Mobile UC, Genshin Impact Crystals, Valorant VP, Call of Duty Mobile CP, Delta Force Mobile Delta Coins, Blood Strike Gold, Roblox Robux/Gift Card IDR | Relabeled or genericized product meanings |
| INV-06 | Catalog (REQ-002) | The game name is always visible as text, with or without artwork | Image-only identity; unconfirmed artwork shown |
| INV-07 | Catalog + handoff | Selected-offer context is session-only; no selection, order, or user data is persisted | Persistence violating `ARCH-SCO-002` |
| INV-08 | Catalog (REQ-002) | The MLBB gap stays undisclosed-as-complete never: no rows fill it and the disclosure remains visible | Implied complete MLBB coverage |
| INV-09 | Catalog (REQ-002) | Controls expose visible keyboard focus; selection is conveyed beyond color alone, at narrow and wide viewports | Color-only or pointer-only selection cue; lost focus indicator |
| INV-10 | Catalog (REQ-002) | Copy makes no official-affiliation claim and no official/current price claim; the transcription is presented as reference only | Wording implying official status, price validity, or freshness |
| STATE-01 | Catalog (REQ-002) | Selection lifecycle: `none → selected(A) → selected(B) (replace) → handed off` | Handoff from `none`; handoff of an unresolvable offer |
| STATE-02 | Catalog (REQ-002) | Search lifecycle: `idle(empty) ↔ filtered(query) → empty-state(no match) → idle(cleared)`; clearing restores the full directory | Empty state altering approved scope or the MLBB disclosure |
| STATE-03 | Catalog (REQ-002) | Gap rows are unreachable states: no transition creates a product inside the MLBB 632→1,220 interval | Any transition producing a gap row |

## Failure and recovery semantics

- No-match search: visible empty state; clearing or changing the query restores the full directory. No error state, no scope change, no data loss.
- Selection input that does not resolve to a listed offer: treated as no selection; nothing is handed off (PRE-01).
- Missing or unconfirmed artwork: silent fallback to the game's text name (PRE-03); catalog behavior is unaffected.
- Missing or unresolvable context at checkout entry: checkout does not proceed and no defaults are fabricated; the visitor returns to the catalog (PRE-02, shared consumer rule).
- All failure paths are recoverable within the session; no failure writes persistent state (INV-07).

## Architecture boundaries

- `ARCH-01`: The catalog (REQ-002) MUST NOT own checkout account fields, payment method, simulation outcome, confirmation dialog, receipt, or retry behavior (REQ-003/REQ-004). Data flows one way: catalog → selected-offer context → checkout → result.
- `ARCH-02`: The selected-offer/checkout-context shape has one owner — this contract. REQ-002 and REQ-003 MUST NOT define divergent copies of the shared fields (game, offer label/denomination, listed price, voucher-vs-top-up kind).
- `ARCH-03`: No cart, multi-product selection, or separate review route exists between catalog selection and `/checkout`.
- `ARCH-04`: Session-only state. No persistent user, selection, or order storage — enforced by guardrail `ARCH-SCO-002` (`block`, `src/**/*`).
- `ARCH-05`: Catalog data comes only from the transcription document; runtime code MUST NOT fetch external price sources or invent rows.
- `ARCH-06`: Artwork displayed in the catalog MUST come only from DISC-001-mapped, user-confirmed assets; presence in `docs/Game Assets/` alone is not approval.

## Verification mapping

| Contract ID | Observable oracle | Check type/owner | Evidence | Status |
|---|---|---|---|---|
| INV-01, INV-05 | Compare rendered directory and labels against the nine transcription sections | Manual walkthrough / evaluator | None yet (no implementation) | `Unverified` |
| INV-02, POST-04 | Compare every displayed row to `docs/list-harga-topup-2026.md`; confirm no six-slot cap | Manual row-by-row comparison | None yet | `Unverified` |
| POST-03, STATE-02 | Search walkthrough: match, no-match, clear; check empty state and restored directory | Manual walkthrough | None yet | `Unverified` |
| POST-01, POST-02, STATE-01 | Select one product, continue, confirm checkout shows the same game/offer/price | Manual walkthrough | None yet | `Unverified` |
| POST-05, INV-08, STATE-03 | Inspect MLBB listing for the 632→1,220 interval and visible disclosure | Manual inspection | None yet | `Unverified` |
| PRE-03, INV-06, ARCH-06 | Inspect artwork provenance against DISC-001 mapping and text-name fallback | Manual inspection | DISC-001 mapping pending (nonblocking) | `Unverified` |
| INV-10 | Inspect catalog copy for affiliation/price-validity claims (AC-02, AC-08) | Manual copy review | None yet | `Unverified` |
| INV-04, INV-09, AC-09 | Keyboard walkthrough and narrow/wide viewport inspection | Manual accessibility walkthrough | None yet | `Unverified` |
| INV-07, ARCH-04 | Guardrail `ARCH-SCO-002` run against `src/**/*` | Executable checker / `architecture-guardrails` | Checker exists in `docs/architecture/GUARDRAILS.json`; no catalog code yet | `Unverified` |
| ARCH-01, ARCH-02, ARCH-03, PRE-02 | Implementation review against this pack; PRE-02 observable at checkout entry | Review + walkthrough (candidate for `compile`) | None yet | `Unverified` |

No rule is reported as `PASS`; no implementation or checker evidence exists yet.

## Open decisions and assumptions

- Human approval of this pack moves Status `Proposed` → `Approved`; delivery remains gated by REQ-001 regardless (no waiver recorded).
- DISC-001 file-to-game mapping is pending and nonblocking; INV-06/INV-01 fallback (text names) covers unmapped games.
- Assumption awaiting confirmation: an active search filter does not clear an existing selection (STATE-02). The requirement does not state this interaction; if wrong, revise STATE-02 before implementation.
- Context transport mechanism (route params, store, session) is deliberately unspecified — left to `implementation-plan`; only the observable guarantees above are binding.
- `priority` and `size` remain `unset` (human triage).

## Links

- Canonical backlog: [`../../backlog.md`](../../backlog.md)
- Requirement: [`01-requirement.md`](01-requirement.md)
- Acceptance criteria: [`02-acceptance-criteria.md`](02-acceptance-criteria.md)
- Readiness review: [`03-readiness-review.md`](03-readiness-review.md)
- Shared-context consumer: [`../REQ-003-simulated-checkout/01-requirement.md`](../REQ-003-simulated-checkout/01-requirement.md)
- Catalog source: [`../../../list-harga-topup-2026.md`](../../../list-harga-topup-2026.md)
