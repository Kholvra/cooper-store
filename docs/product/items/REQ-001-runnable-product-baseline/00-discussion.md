# REQ-001 — Runnable Product Baseline — Discussion

## Raw request

User requested an end-to-end backlog for the documented MLBB top-up storefront.

## Context

The repository currently contains the study-case brief and design documentation only. The design brief says no application code, components, or design tokens are present. A usable product baseline is therefore not evidenced before feature delivery.
This records the initial discovery snapshot. The product scope was later approved to cover the nine top-up/voucher games; the foundation outcome is unchanged.

## Actor / consumer

- The future implementer and evaluator need a discoverable, runnable application baseline.
- `repo-workflow` is the downstream owner for repository bootstrap, runtime/package configuration, quality gates, and delivery workflow execution.

## Problem

Feature requirements cannot be safely handed off as ready when the repository has no evidenced runtime, local run path, quality gate, architecture/guardrail baseline, or delivery workflow.

## Desired outcome

The repository has an explicit, evidenced baseline that a contributor can discover and use to run and check the product, with a clear gate indicating when feature delivery may begin.

## Known constraints

- This item defines the desired foundation outcome and handoff only; it does not prescribe dependencies, versions, files, commands, CI configuration, or technical tasks.
- Real payment, account verification, Diamond delivery, persistent history, and other product behavior remain out of scope.
- Feature delivery cannot start while foundation status is `missing` or `partial`, unless a human records an explicit implementation waiver and accepts the risk.

## Questions and closure status

| ID | Question | Why it matters | Owner | Status |
|---|---|---|---|---|
| D-001 | Is the proposed strict-sequential backlog topology accepted? | Changes active ordering and handoff semantics | Human project owner | Closed: user approved the graph topology in C-004 on 2026-10-03 |
| D-002 | Is a foundation waiver acceptable for feature work? | Changes the gate and risk posture | Human project owner | No waiver recorded |

## Decisions

| ID | Decision | Date | Owner | Consequence |
|---|---|---|---|---|
| C-001 | Create an end-to-end product backlog from the case-study and design documents | 2026-09-27 | User request | Establishes Domain 1 scope for this repository |
| C-002 | Treat the current repository baseline as missing | 2026-09-27 | Repository evidence | Create REQ-001 before feature delivery |
| C-003 | Expand the product scope from the original MLBB case study to the nine top-up/voucher games from the 2026 PDF; use the PDF for game input labels where it conflicts with generic seed data | 2026-10-03 | User | REQ-001 establishes the runnable baseline for the expanded storefront; product features remain separate active requirements |
| C-004 | Use the graph topology: REQ-001 is the common foundation gate; REQ-002 catalog and REQ-003 checkout may proceed in parallel after the gate against a shared `design-contracts` selected-offer/checkout-context contract; REQ-004 joins both branches | 2026-10-03 | User | Removes artificial sequence dependencies; true prerequisites remain represented by typed graph edges |
| C-005 | Set REQ-001 through REQ-004 to requirement `status: ready` for their named next-domain handoffs; this does not waive the foundation gate or mark feature delivery ready | 2026-10-03 | User | Keep active feature delivery `blocked` until foundation evidence and the shared selected-offer/checkout-context contract are in place |

## Delivery topology

- `REQ-001` is the common foundation gate; it is not an active sequence item.
- `REQ-002` and `REQ-003` are parallel branches after the foundation gate and shared context contract.
- `REQ-004` joins the catalog and checkout outcomes.
- `repo-workflow` owns execution of the foundation outcome.

## Next step

Hand the ready foundation requirement to `repo-workflow`; keep feature delivery gated until the acceptance evidence is available or a human waiver is recorded. After the gate and shared contract are established, the catalog and checkout branches may proceed in parallel.
