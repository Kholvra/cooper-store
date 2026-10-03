# DISC-001 - Authorized Game Artwork - Discussion

## Raw request

User requested an end-to-end backlog for the documented MLBB top-up storefront.

## Context

The user wants supplied game imagery in the nine-game catalog and confirms that images intended for use are user-owned or already authorized. Exact file-to-game selection and presentation constraints remain to be recorded; text labels remain the fallback where no asset is selected.

## Actor / consumer

- Human product/design decision owner who can provide or approve asset provenance and usage rights.
- `REQ-002` may consume approved source, permission, and crop constraints for optional artwork.
- Implementers need a clear answer before selecting or shipping catalog artwork.

## Problem

Game-specific imagery can help visitors identify a catalogue, but files in `docs/Game Assets/` are not authorization evidence. Proceeding without permission risks using unverified imagery or implying an affiliation that the product does not claim. The catalog must remain deliverable without image assets.

## Desired outcome

Produce reviewable evidence for any artwork asset approved for storefront use, including its allowed treatment, or explicitly exclude assets with unresolved permission. Keep the catalog available through text game names without waiting for artwork.

## Known constraints

- Artwork must have confirmed provenance and permitted use before it is shipped.
- Native artwork colors remain intact within bounded image areas.
- Package data, controls, selected state, and transaction details remain on opaque high-contrast surfaces.
- The product must not claim official game affiliation.
- This discovery item does not create a promotion surface or expand the catalog scope.
- No artwork decision blocks the catalog when the text-name treatment is used.

## Open questions

| ID | Question | Why it matters | Owner | Status |
|---|---|---|---|---|
| D-002 | Which supplied image files should be mapped to each game's catalog entry, and what treatment restrictions apply? | Determines per-game image use | User / project owner | Open; rights confirmed for intended assets by C-005; file mapping pending |
| D-006 | If no artwork permission is available, should the catalog be blocked or use text names? | Determines the delivery gate and fallback | Human project owner | Closed by C-004: text-name fallback is valid and the artwork discovery is nonblocking |

## Decisions

| ID | Decision | Date | Owner | Consequence |
|---|---|---|---|---|
| C-001 | Generic stock or unverified search-result artwork is not acceptable | 2026-09-27 | Design direction | Discovery must obtain provenance/permission evidence before any image is used |
| C-002 | Artwork is product imagery, not storefront chrome or an official-logo claim | 2026-09-27 | Design direction | Preserve native colors and avoid affiliation claims |
| C-003 | Authorization is an implementation prerequisite and is not yet confirmed | 2026-09-27 | Design direction | Historical decision for the original MLBB art-heavy concept; superseded as a catalog blocker by C-004 |
| C-004 | Use only owner-approved supplied/authorized assets; if approval is absent, use text game names; the nine-game catalog is not blocked by artwork discovery | 2026-10-03 | User-approved design direction | DISC-001 records optional art evidence and uses `enables`, not `blocks`, for REQ-002 |
| C-005 | Use supplied game imagery where mapped; user confirms intended assets are user-owned or authorized | 2026-10-03 | User / project owner | No external permission request is needed for intended assets; DISC-001 records selected files, game mapping, and treatment before use; unmapped games retain text names |

## Assumptions (agent-proposed)

- The human project owner can approve usage evidence for supplied candidate assets; a public search result alone is not permission.
- `DISC-001` remains outside the active sequence and does not consume a `REQ` number.

## Next step

Record the specific supplied image files, game mapping, and treatment in DISC-001. Use only user-confirmed intended assets; keep text names for games without a selected image.
