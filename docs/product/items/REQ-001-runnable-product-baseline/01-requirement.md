# REQ-001 — Runnable Product Baseline — Requirement

## Metadata

```yaml
id: REQ-001
slug: runnable-product-baseline
epic: EPIC-001
milestone: M0
lane: active
sequence: unset
type: chore
status: ready
delivery_status: queued
priority: unset
size: unset
depends_on: []
blocks: [REQ-002, REQ-003, REQ-004]
enables: []
discovery_of: []
continuation_of: []
related_to: []
artifact_role: canonical
profile: product-app
links:
  discussion: ./00-discussion.md
  acceptance: ./02-acceptance-criteria.md
  readiness: ./03-readiness-review.md
  epic: ../../epics/EPIC-001-mlbb-top-up-store.md
```

## Summary

Establish an explicit, runnable baseline for the approved nine-game top-up storefront before feature delivery. The outcome is a documented and evidenced foundation gate, not an implementation recipe.

## Actors / consumers

- Future implementers need a discoverable runtime, local launch/check path, and quality expectations.
- Evaluators need a reliable way to identify whether the product baseline is usable.
- `repo-workflow` owns execution of repository bootstrap and delivery workflow setup.

## Scope

### In scope

- A supported application runtime and package/project baseline that is discoverable in repository documentation.
- A documented local launch path and quality-check path that a contributor can follow.
- Evidence for the repository's quality gate and architecture/guardrail expectations.
- A clear foundation status transition and handoff record for feature work.

### Explicitly out of scope

- Game catalog, account forms, voucher, checkout, receipt, or payment-simulation behavior for the storefront.
- Dependency names or versions, implementation files, command recipes, CI YAML, branch procedures, or technical task breakdown.
- Real payment, account verification, game-credit delivery, user accounts, or persistent order history.

## Constraints & invariants

- The repository must not claim foundation readiness without evidence of the runnable baseline, quality gate, architecture/guardrail expectations, and delivery workflow needed by this product.
- Feature delivery remains blocked while foundation status is `missing` or `partial`, unless a human records an explicit implementation waiver and accepts the risk. Requirement packages may be `ready` for a downstream contract handoff without unblocking implementation.
- Foundation execution belongs to `repo-workflow`; this requirement does not duplicate its implementation plan.

## Behavior / rules

1. The current foundation state is recorded as `partial`: some runtime and quality evidence exists, but local launch/build and architecture constraints remain unsatisfied.
2. When the foundation outcome is delivered, its readiness review records paths or other concrete evidence for the runtime, local launch/check path, quality gate, architecture/guardrails, and delivery workflow.
3. The foundation gate changes to `ready` only after that evidence exists; feature implementation also requires the shared selected-offer/checkout-context contract before the REQ-002 and REQ-003 branches proceed in parallel, followed by the REQ-004 join.
4. If the baseline cannot be established, feature delivery remains blocked and must not silently bypass the gate.

## Success

A contributor can locate the supported runtime and local launch/check path, the quality and architecture expectations are evidenced, and the backlog can unambiguously determine whether feature delivery may begin.

## Edge cases

- If a human explicitly waives the foundation delivery gate, the waiver, accepted risk, scope, and expiry/revisit condition must be recorded before feature implementation is unblocked. A requirement's `status: ready` alone is not a waiver.
- If only part of the baseline exists, status remains `partial`; partial evidence does not count as `ready`.

## Decision references

- Product backlog and topology: [`../../backlog.md`](../../backlog.md).
- Current-state evidence: [`../../README.md`](../../README.md).
- Downstream ownership boundary: `repo-workflow` owns setup execution; this artifact owns the desired product baseline and gate.
