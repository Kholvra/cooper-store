# Verified API Surface

| API / Symbol | Signature & Options | Description & Return Values | Evidence |
|---|---|---|---|
| `superjson.serialize(value)` | `<T>(value: T): { json: JSONValue; meta?: Metadata }` | Encodes special values into JSON-compatible value plus metadata. | [Web] [README](https://github.com/flightcontrolhq/superjson), “Advanced Usage” |
| `superjson.deserialize(payload, options?)` | `<T>(payload: {json; meta?}, {inPlace?: boolean} = {}): T` | Restores transformed values. `inPlace` defaults false; true mutates `json` to avoid deep-copy cost. | [Web] README, “deserialize” |
| `superjson.stringify(value)` | `<T>(value: T): string` | Serializes then JSON stringifies including metadata envelope. | [Web] README, “stringify” |
| `superjson.parse<T>(text)` | `<T>(text: string): T` | Parses SuperJSON string then deserializes. | [Web] README, “parse” |
| `superjson.registerCustom<T, S>(transformer, identifier)` | Transformer with `is`, `serialize`, `deserialize`; identifier string | Adds custom bidirectional type transformer. Exact generic types/config are unverified from fetched README. | [Web] [SuperJSON docs](https://github.com/flightcontrolhq/superjson/tree/main/docs) — API docs; version not tagged |
| `superjson.registerClass(Class, options?)` | Class and registration options | Supports class instance serialization; exact option signature unverified. | [Web] [SuperJSON docs](https://github.com/flightcontrolhq/superjson/tree/main/docs) |
| Supported built-in transforms | Date, BigInt, RegExp, Map, Set (among others) | Metadata enables reconstruction of non-JSON-native values. Exact full transformer list unverified. | [Web] README basic/advanced usage |

Complete 2.2.6 export and transform registry inventory is **Unverified**; use only listed APIs without further exact-version verification.
