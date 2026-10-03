export const fieldProfiles = Object.freeze({
  mlbb: Object.freeze([
    Object.freeze({ key: "id", label: "ID" }),
    Object.freeze({ key: "server", label: "Server" }),
  ]),
  "free-fire": Object.freeze([Object.freeze({ key: "id", label: "ID" })]),
  "pubg-mobile": Object.freeze([
    Object.freeze({ key: "playerId", label: "Player ID" }),
  ]),
  "genshin-impact": Object.freeze([
    Object.freeze({ key: "uid", label: "UID" }),
    Object.freeze({ key: "server", label: "Server" }),
  ]),
  roblox: Object.freeze([]),
  valorant: Object.freeze([
    Object.freeze({ key: "riotIdTag", label: "Riot ID + Tag" }),
  ]),
  "call-of-duty-mobile": Object.freeze([
    Object.freeze({ key: "playerId", label: "PlayerID" }),
  ]),
  "delta-force-mobile": Object.freeze([
    Object.freeze({ key: "id", label: "ID" }),
  ]),
  "blood-strike": Object.freeze([
    Object.freeze({ key: "id", label: "ID" }),
  ]),
} as const);

export type GameKey = keyof typeof fieldProfiles;
export type AccountField = (typeof fieldProfiles)[GameKey][number];

const gameKeys = new Set<string>(Object.keys(fieldProfiles));
const emptyFields: readonly AccountField[] = Object.freeze([]);

export function getRequiredFields(game: string): readonly AccountField[] {
  return gameKeys.has(game)
    ? fieldProfiles[game as GameKey]
    : emptyFields;
}

export const paymentMethods = Object.freeze([
  "qris",
  "e-wallet",
  "virtual-account",
] as const);

export const simulationOutcomes = Object.freeze(["success", "failure"] as const);

export type PaymentMethod = (typeof paymentMethods)[number];
export type SimulationOutcome = (typeof simulationOutcomes)[number];
export type OfferKind = "top-up" | "voucher";

export interface CheckoutOffer {
  readonly id: string;
  readonly game: GameKey;
  readonly label: string;
  readonly priceIdr: number;
  readonly kind: OfferKind;
  readonly [key: string]: unknown;
}

export interface CheckoutResult {
  readonly selectedOffer: CheckoutOffer;
  readonly accountValues: Readonly<Record<string, string>>;
  readonly paymentMethod: PaymentMethod;
  readonly outcome: SimulationOutcome;
}

export interface CheckoutState {
  readonly selectedOffer: CheckoutOffer | null;
  readonly accountValues: Readonly<Record<string, string>>;
  readonly paymentMethod: PaymentMethod | null;
  readonly outcome: SimulationOutcome | null;
  readonly errors: Readonly<Record<string, string>>;
  readonly confirmationOpen: boolean;
  readonly result: CheckoutResult | null;
}

export type CheckoutAction =
  | { readonly type: "selectOffer"; readonly offer: CheckoutOffer }
  | {
      readonly type: "setAccountValue";
      readonly fieldId: string;
      readonly value: string;
    }
  | { readonly type: "setPaymentMethod"; readonly method: PaymentMethod | null }
  | { readonly type: "setOutcome"; readonly outcome: SimulationOutcome | null }
  | { readonly type: "openConfirmation" }
  | { readonly type: "cancelConfirmation" }
  | { readonly type: "confirm" }
  | { readonly type: "retry" }
  | { readonly type: "clearOffer" };

const initialState = (): CheckoutState =>
  Object.freeze({
    selectedOffer: null,
    accountValues: Object.freeze({}),
    paymentMethod: null,
    outcome: null,
    errors: Object.freeze({}),
    confirmationOpen: false,
    result: null,
  });

export function createCheckoutState(): CheckoutState {
  return initialState();
}

function nextState(
  state: CheckoutState,
  changes: Partial<CheckoutState>,
): CheckoutState {
  const next = { ...state, ...changes };
  return Object.freeze({
    ...next,
    accountValues: Object.freeze({ ...next.accountValues }),
    errors: Object.freeze({ ...next.errors }),
    result: next.result
      ? Object.freeze({
          ...next.result,
          accountValues: Object.freeze({ ...next.result.accountValues }),
        })
      : null,
  });
}

function applicableFieldIds(offer: CheckoutOffer): readonly string[] {
  return getRequiredFields(offer.game).map(({ key }) => key);
}

function validate(state: CheckoutState): Record<string, string> {
  const errors: Record<string, string> = {};
  const offer = state.selectedOffer;

  if (!offer) {
    errors.offer = "Pilih game dan paket terlebih dahulu.";
    return errors;
  }

  for (const { key } of getRequiredFields(offer.game)) {
    if ((state.accountValues[key] ?? "").length === 0) {
      errors[key] = "Wajib diisi.";
    }
  }
  if (!state.paymentMethod) {
    errors.paymentMethod = "Pilih metode pembayaran.";
  }
  if (!state.outcome) {
    errors.outcome = "Pilih hasil simulasi.";
  }
  return errors;
}

function isPaymentMethod(value: unknown): value is PaymentMethod {
  return paymentMethods.some((method) => method === value);
}

function isOutcome(value: unknown): value is SimulationOutcome {
  return simulationOutcomes.some((outcome) => outcome === value);
}

function clearError(
  errors: Readonly<Record<string, string>>,
  key: string,
): Record<string, string> {
  if (!(key in errors)) return { ...errors };
  const next = { ...errors };
  delete next[key];
  return next;
}

export function checkoutReducer(
  state: CheckoutState,
  action: CheckoutAction,
): CheckoutState {
  switch (action.type) {
    case "selectOffer": {
      if (!action.offer || !gameKeys.has(action.offer.game)) return state;
      if (state.selectedOffer === action.offer) return state;
      return nextState(state, {
        selectedOffer: action.offer,
        accountValues: {},
        paymentMethod: null,
        outcome: null,
        errors: {},
        confirmationOpen: false,
        result: null,
      });
    }

    case "setAccountValue": {
      const offer = state.selectedOffer;
      if (
        !offer ||
        state.confirmationOpen ||
        state.result ||
        typeof action.value !== "string" ||
        !applicableFieldIds(offer).includes(action.fieldId)
      ) {
        return state;
      }
      if (state.accountValues[action.fieldId] === action.value) return state;
      const accountValues = {
        ...state.accountValues,
        [action.fieldId]: action.value,
      };
      const errors =
        action.value.length > 0
          ? clearError(state.errors, action.fieldId)
          : { ...state.errors };
      return nextState(state, { accountValues, errors });
    }

    case "setPaymentMethod": {
      if (
        state.confirmationOpen ||
        state.result ||
        (action.method !== null && !isPaymentMethod(action.method))
      ) {
        return state;
      }
      if (state.paymentMethod === action.method) return state;
      const errors = action.method
        ? clearError(state.errors, "paymentMethod")
        : { ...state.errors };
      return nextState(state, { paymentMethod: action.method, errors });
    }

    case "setOutcome": {
      if (
        state.confirmationOpen ||
        state.result ||
        (action.outcome !== null && !isOutcome(action.outcome))
      ) {
        return state;
      }
      if (state.outcome === action.outcome) return state;
      const errors = action.outcome
        ? clearError(state.errors, "outcome")
        : { ...state.errors };
      return nextState(state, { outcome: action.outcome, errors });
    }

    case "openConfirmation": {
      if (state.confirmationOpen || state.result) return state;
      const errors = validate(state);
      return nextState(state, {
        errors,
        confirmationOpen: Object.keys(errors).length === 0,
      });
    }

    case "cancelConfirmation":
      return state.confirmationOpen
        ? nextState(state, { confirmationOpen: false })
        : state;

    case "confirm": {
      if (!state.confirmationOpen || state.result || !state.selectedOffer) {
        return state;
      }
      const errors = validate(state);
      if (Object.keys(errors).length > 0) {
        return nextState(state, { errors, confirmationOpen: false });
      }
      const accountValues: Record<string, string> = {};
      for (const fieldId of applicableFieldIds(state.selectedOffer)) {
        accountValues[fieldId] = state.accountValues[fieldId] ?? "";
      }
      const result: CheckoutResult = Object.freeze({
        selectedOffer: state.selectedOffer,
        accountValues: Object.freeze(accountValues),
        paymentMethod: state.paymentMethod as PaymentMethod,
        outcome: state.outcome as SimulationOutcome,
      });
      return nextState(state, { confirmationOpen: false, result });
    }

    case "retry":
      return state.result?.outcome === "failure"
        ? nextState(state, { result: null, errors: {}, confirmationOpen: false })
        : state;

    case "clearOffer":
      return nextState(state, {
        selectedOffer: null,
        accountValues: {},
        paymentMethod: null,
        outcome: null,
        errors: {},
        confirmationOpen: false,
        result: null,
      });
  }
}
