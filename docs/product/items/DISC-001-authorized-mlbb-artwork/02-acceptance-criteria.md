# DISC-001 - Authorized Game Artwork - Acceptance Criteria

Observable criteria for resolving optional game-art provenance and usage.

## AC-01 - Source and provenance evidence

- Given a supplied game-art asset is selected as a storefront candidate
- When the discovery item is resolved
- Then it records the asset's game association, source/provenance, and human authorization or other explicit usage evidence.

## AC-02 - Permitted treatment

- Given an artwork asset is approved
- When its evidence is reviewed
- Then allowed placement/crop, native-color treatment, attribution restrictions, and separation from transaction-critical data surfaces are documented.

## AC-03 - Nonblocking catalog outcome

- Given an asset has not been approved or cannot be verified
- When the catalog requirement is delivered
- Then that asset is not used, game names remain identifiable as text, and `REQ-002` delivery is not blocked by this discovery.

## AC-04 - No silent unverified fallback

- Given authorization evidence is missing or insufficient
- When the catalog artwork treatment is chosen
- Then no generic, stock, or unverified search-result image is treated as an acceptable replacement.

## Edge cases

- Authorization without crop/placement permission: record the restriction and use only a permitted treatment or exclude the candidate.
- No authorized source: record the candidate as not approved; keep the text-name catalog treatment available.
- Approved source with no official affiliation: imagery must not be accompanied by an official-logo or affiliation claim.

## Verifiability

- AC-01 and AC-02: human review of the recorded source, permission/provenance evidence, and treatment constraints.
- AC-03 and AC-04: cross-check DISC-001, REQ-002, and the epic; the discovery relation is nonblocking.
