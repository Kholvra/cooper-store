# Architecture Guardrails Baseline Exceptions

## Purpose

This document records approved pre-existing exceptions to architecture guardrails (`docs/architecture/GUARDRAILS.json`).

## Current Status

- **Foundation Status**: Partial and blocked (`REQ-001`).
- **Source Code (`src/`)**: Present; current app is a Create T3 scaffold, not the nine-game storefront.
- **Observed Quality Evidence**: `pnpm typecheck` passes. `pnpm build` and `pnpm dev` fail environment validation because `AUTH_DISCORD_ID` and `AUTH_DISCORD_SECRET` are unset. Node `v25.2.1` is locally observed; the project does not declare a supported Node version.
- **Active Baseline Exceptions**: None (`0` exceptions).

## Unresolved Blocking Finding

`src/server/auth/config.ts` configures `PrismaAdapter`; `prisma/schema.prisma` defines persistent `User`, `Account`, and `Session` models. This conflicts with `ARCH-SCO-002` and the session-only product boundary. No waiver or exception is recorded. Do not treat this finding as an approved baseline exception or clear the REQ-001 gate until an explicit product/architecture decision resolves it.

When code is introduced during foundation setup (`REQ-001`) and subsequent tasks (`REQ-002`, `REQ-003`, `REQ-004`), any pre-existing legacy violations that cannot be immediately refactored must be listed here with an exact fingerprint, reason, approver, and expiry date.
