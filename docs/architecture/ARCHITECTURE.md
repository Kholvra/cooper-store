# Architecture & Design Boundaries: Nine-Game Top-Up Storefront (`product-app`)

## Purpose

This document defines the architectural boundaries, design constraints, and rule mappings for the nine-game top-up storefront case study (`product-app`), derived from `docs/product/`, `docs/design/`, and foundational product backlog requirements (`REQ-001` through `REQ-004`).

## Architectural Boundaries

### 1. Simulation Boundary (`ARCH-SCO-001`, `ARCH-SCO-002`)
- **Principle**: The storefront is strictly a simulated top-up experience for the nine approved games.
- **Constraints**: 
  - Real payment processing, live payment gateway integrations, and production credit card charges are prohibited (`ARCH-SCO-001`).
  - Persistent user account databases, server-side user authentication, and persistent order history tables are prohibited; ordering and checkout receipts operate purely within session-only state (`ARCH-SCO-002`, REQ-003, REQ-004).
- **Source**: `docs/product/backlog.md` (Milestone M0 Stop/Rethink Conditions).

### 2. Security & Secrets Boundary (`ARCH-SEC-001`)
- **Principle**: No credentials, environment files, private keys, or secret stores may be committed to version control.
- **Constraints**: Prohibited paths include `.env`, `*.pem`, `*.key`, and secret files (`ARCH-SEC-001`).
- **Source**: Security Baseline & Repository Governance.

### 3. Catalog & Data Boundary (`REQ-002`)
- **Principle**: Catalog offers and pricing must adhere to the 2026 price-list reference (`docs/list-harga-topup-2026.md`) and are persisted in Neon-hosted PostgreSQL per REQ-002 C-010.
- **Constraints**: Any omitted or cropped pricing entries must be explicitly disclosed rather than fabricated or guessed. Catalog persistence does not permit persistent user accounts or order history; checkout and receipts remain session-only (`ARCH-SCO-002`).
### 4. Design & Information Architecture Boundary
- **Principle**: UI implementation must adhere to approved design tokens (`docs/design/DESIGN_TOKENS.md`), information architecture (`docs/design/INFORMATION_ARCHITECTURE.md`), and user-confirmed authorized artwork (`DISC-001`).

## Guardrail Traceability Matrix

| Rule ID | Title | Kind | Severity | Source | Target Scope |
|---|---|---|---|---|---|
| `ARCH-SEC-001` | Keep secrets and private keys out of source control | `forbidden-path` | `block` | Security Baseline | `**/.env`, `**/*.pem`, `**/*.key`, `**/secrets.*` |
| `ARCH-SCO-001` | Prevent real payment gateway integrations outside simulated scope | `forbidden-pattern` | `block` | Backlog Stop Conditions | `src/**/*` |
| `ARCH-SCO-002` | Prevent persistent user account storage outside session-only scope | `forbidden-pattern` | `block` | Backlog Stop Conditions | `src/**/*` |
