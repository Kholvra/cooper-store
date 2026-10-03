# DISC-001 - Authorized Game Artwork - Requirement

## Metadata

```yaml
id: DISC-001
slug: authorized-mlbb-artwork
epic: EPIC-001
milestone: M0
lane: discovery
sequence: unset
type: spike
status: ready
delivery_status: queued
priority: unset
size: unset
depends_on: []
blocks: []
enables: [REQ-002]
discovery_of: [REQ-002]
continuation_of: []
related_to: []
artifact_role: canonical
profile: product-app
links:
  discussion: ./00-discussion.md
  acceptance: ./02-acceptance-criteria.md
  readiness: ./03-readiness-review.md
  epic: ../../epics/EPIC-001-mlbb-top-up-store.md
  target: ../REQ-002-browse-select-diamond-packages/01-requirement.md
```

## Summary

Map user-confirmed supplied game-art assets for the storefront. The user confirms that intended images are theirs or already authorized; exact file selection, game association, and treatment must be recorded before use. The nine-game catalog retains text names wherever no image is selected.

## Actors / consumers

- User / project owner, who confirmed ownership or authorization for intended assets and selects which files to use.
- `REQ-002` and its downstream design handoff, which consume the selected asset mapping and treatment constraints.

## Scope

### In scope

- Inventory which supplied logo/item artwork assets are candidates for use in the nine-game catalog.
- Record provenance/authorization evidence for each asset selected for use, sufficient for the project owner to approve it.
- Record which game each approved asset represents, allowed placement/crop, attribution requirements, and any use restrictions.
- Confirm native artwork colors remain within bounded media regions and package/price/selection/account/transaction data stay on opaque readable store surfaces.
- Update the target catalog requirement with any approved asset constraints; mark all other candidates as not approved for use.

### Explicitly out of scope

- Implementing an image component or catalog UI.
- Downloading or bundling unverified assets.
- Claiming official game affiliation, copying another top-up site's branding, or creating promotion content.
- Blocking catalog delivery because imagery is unavailable; clear text game names are the accepted fallback.
- Resolving payment, account-field validation, or receipt contracts.

## Constraints & invariants

- A file's presence in the repository or a public search result is not authorization evidence.
- The user confirms supplied images intended for storefront use are user-owned or authorized; this does not approve every file in `docs/Game Assets/`.
- If an asset is not selected or its permitted use is unclear, exclude it and retain the text-name catalog treatment; do not substitute generic or unverified imagery.
- Artwork retains native colors in bounded media regions and stays separate from transaction-critical text/data.
- `DISC-001` is nonblocking: it may enable optional authorized artwork use, but does not block `REQ-002`.

## Behavior / rules

1. The discovery owner identifies the candidate assets that are intended for the storefront, if any.
2. Record the user's ownership/authorization confirmation for each selected asset, its game association, permitted placement/crop, and attribution restrictions.
3. The human product/design owner records the selected file-to-game mapping and allowed treatment, then updates `REQ-002`; only mapped, confirmed assets may be displayed.
4. If no suitable image is selected for a game, keep its text name and the catalog remains available.

## Success

Every intended game-art asset selected for the catalog has a recorded user confirmation of ownership or authorization, a game association, and treatment restrictions. Unselected or unconfirmed assets are excluded. The catalog uses text names where no image is selected, so this discovery does not block the product outcome.

## Edge cases

- No source or permission evidence can be obtained: mark the candidate not approved; use text names and keep the catalog requirement unblocked.
- A source allows use but not the desired crop/placement: record the restriction and use a permissible treatment or exclude the image.
- The source is authorized but its relationship to a game is unclear: do not present it as that game's official artwork; escalate the product decision or exclude it.

## Decision references

- Artwork treatment: [`../../../../docs/design/DESIGN_DIRECTION.md`](../../../../docs/design/DESIGN_DIRECTION.md).
- Product visual constraint and text fallback: [`../../../../docs/design/DESIGN_BRIEF.md`](../../../../docs/design/DESIGN_BRIEF.md).
- Target catalog requirement: [`../REQ-002-browse-select-diamond-packages/01-requirement.md`](../REQ-002-browse-select-diamond-packages/01-requirement.md).
