# Known Pitfalls & Gotchas

| Scenario | Risk or surprising behavior | Required handling | Evidence |
|---|---|---|---|
| JSON-only intermediary drops `meta` | Special values are reduced to JSON representation and cannot be reconstructed. | Transmit both `json` and `meta` from `serialize`, or use `stringify`/`parse`. | [Web] [README](https://github.com/flightcontrolhq/superjson), advanced usage |
| `deserialize` with `inPlace: true` | Mutates input JSON object. | Use default for immutable/shared inputs; enable only when ownership permits mutation. | [Web] README, deserialize options |
| Untrusted payload | Decoder trusts declared metadata and may produce surprising types; security validation guarantees not established. | Validate data at application boundary; do not treat deserialization as schema validation. | [Web] README; security semantics Unverified |
| Custom transformer registration mismatch | Sender/receiver cannot agree on custom representation or identifier. | Register consistent transformer implementations on each side; version wire format if changed. | [Web] [SuperJSON docs](https://github.com/flightcontrolhq/superjson/tree/main/docs); detailed compatibility not verified |
| `BigInt`/Date representability | Plain `JSON.stringify` cannot preserve these types; `BigInt` ordinarily throws. | Use SuperJSON's own envelope, not raw JSON on original object. | [Web] README |
| Error/unsupported values | Complete behavior for cycles/functions/symbols and malformed metadata was not established from source. | Treat these cases as **Unverified**; avoid relying on round-trips without exact-version tests. | [Web] README API scope incomplete |
