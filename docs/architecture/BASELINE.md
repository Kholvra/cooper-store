# Architecture Guardrails Baseline Exceptions

## Purpose

This document records approved pre-existing exceptions to architecture guardrails (`docs/architecture/GUARDRAILS.json`).

## Current Status

- **Foundation Status**: Partial and blocked (`REQ-001`).
- **Source Code (`src/`)**: Foundation source is runnable but still scaffold-level; the nine-game storefront is not implemented.
- **Observed Quality Evidence**: `pnpm typecheck` and `pnpm build` pass. Controlled local production smoke returned HTTP 200 at `/`; representative `/api/auth/*` requests returned ordinary 404 responses. The app started without auth credentials using a disposable localhost `DATABASE_URL`; no database feature query was exercised. Node `v25.2.1` is locally observed, but the project does not declare a supported Node version. No automated test runner or `.github` delivery workflow is configured.
- **Persistence Boundary**: Auth, identity, and sample Post models/routes are absent from current source/schema/generated client. The current root schema has no catalog models, so REQ-002 catalog persistence is not implemented here. Legacy database tables may remain because the deployment target is unverified and no migration was applied.
- **Active Baseline Exceptions**: None (`0` exceptions).

## Outstanding Foundation Gaps

The source-level `ARCH-SCO-002` conflict is resolved: NextAuth, its route/provider, and `User`, `Account`, `Session`, `VerificationToken`, and `Post` models have been removed. `ARCH-SCO-002` is still a source-pattern rule with limited semantic coverage; the schema/client absence was verified separately. No waiver or exception was created.

Foundation remains `partial` and delivery stays queued. The supported Node.js baseline and delivery workflow are unspecified, the actual catalog feature is not implemented in this worktree, and potential legacy database tables were not changed. Keep REQ-002/003/004 delivery blocked until the foundation acceptance evidence and shared contract are independently complete. Do not treat this document as approval to mutate an unverified database.

When code is introduced during foundation setup (`REQ-001`) and subsequent tasks (`REQ-002`, `REQ-003`, `REQ-004`), any pre-existing legacy violations that cannot be immediately refactored must be listed here with an exact fingerprint, reason, approver, and expiry date.
