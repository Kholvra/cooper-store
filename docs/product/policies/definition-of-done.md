# Definition of Done

An item may move to `delivery_status: done` only when:

- The observable behavior in every applicable acceptance criterion is evidenced by the downstream delivery workflow.
- The item’s documented scope and non-scope remain unchanged, or an approved decision is recorded in `00-discussion.md` and reflected in the requirement and backlog.
- User-visible success, invalid-input, boundary, failure, retry, and session behavior covered by the item is available for evaluation.
- Accessibility, responsive, language, visual, and simulation constraints linked by the item are respected where applicable.
- No real-payment, account-verification, Diamond-delivery, or persistent-history behavior has been introduced outside this case-study scope.
- The readiness review links the delivery evidence and records any accepted limitation or follow-up.
- The backlog row, item metadata, and handoff state agree.

This policy defines product outcome completion. Test-level strategy and execution evidence belong to `test-verification`; repository setup and CI evidence belong to `repo-workflow`; formal state and architecture contracts belong to `design-contracts`.
