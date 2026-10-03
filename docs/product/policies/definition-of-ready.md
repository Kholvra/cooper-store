# Definition of Ready

An item can be handed to its named next domain only when the following evidence is recorded in its `03-readiness-review.md`:

- The problem and desired observable outcome are concrete.
- The actor, consumer, operator, or affected system is named.
- In-scope and explicitly out-of-scope behavior are recorded.
- Product constraints and important invariants are linked to their source.
- Acceptance criteria cover the main path and applicable invalid, boundary, state-transition, failure, retry, and recovery behavior.
- Unresolved behavior is represented as a decision or blocker; it is not hidden in an assumption.
- Typed relationships, predecessor sequence, and discovery/deferred lane placement are valid.
- Foundation evidence is ready, or the item is itself the foundation outcome, or a human waiver is recorded.
- The package is one coherent vertical outcome rather than a frontend/backend/database task split.
- Metadata agrees with the canonical backlog row.
- The next domain and required input artifacts are named.
- Priority and size are human-approved when they affect delivery decisions; otherwise they remain `unset`.

`Ready` means the requirement package is clear enough for the next domain. It does not mean repository setup, formal contracts, implementation, or tests are complete.
