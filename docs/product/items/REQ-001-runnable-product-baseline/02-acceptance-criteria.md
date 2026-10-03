# REQ-001 — Runnable Product Baseline — Acceptance Criteria

Observable criteria for the foundation gate.

## AC-01 — Discoverable runtime baseline

- Given a contributor starts from the repository root
- When they inspect the product documentation
- Then the supported application runtime and project baseline are identified without relying on undocumented local knowledge.

## AC-02 — Discoverable launch and quality checks

- Given the baseline is declared ready
- When a contributor follows the documented local workflow
- Then the contributor can identify how to launch the product and how to run the repository's quality checks.

## AC-03 — Quality and architecture evidence

- Given feature work is waiting on the foundation gate
- When the foundation readiness review is evaluated
- Then it links concrete evidence for the quality gate, architecture/guardrail expectations, and delivery workflow rather than asserting readiness without evidence.

## AC-04 — Foundation gate protects feature delivery

- Given the foundation status is `missing` or `partial`
- When the backlog is reviewed for implementation delivery
- Then REQ-002 and REQ-003 remain `delivery_status: blocked`, and REQ-004 remains blocked until both branches deliver, even when the requirement packages are `status: ready` for `design-contracts` handoff.

## Edge cases

- A waiver changes the implementation delivery gate only when its accepted risk, scope, and expiry/revisit condition are recorded; requirement readiness alone is not a waiver.

## Verifiability

- AC-01 and AC-02 → human inspection of the repository's runtime and local workflow documentation.
- AC-03 → readiness review links to concrete repository evidence.
- AC-04 → backlog metadata and readiness reviews show foundation status and any explicit waiver.
