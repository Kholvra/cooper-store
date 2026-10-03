import { describe, expect, it } from "vitest";

import * as checkout from "../src/app/_components/checkout-model";
import type {
  CheckoutAction,
  CheckoutOffer,
  CheckoutState,
  GameKey,
} from "../src/app/_components/checkout-model";

const { fieldProfiles, getRequiredFields, createCheckoutState, checkoutReducer } =
  checkout;

const offer = (
  game: GameKey = "mlbb",
  label = "5 Diamonds",
  id = `${game}-5`,
): CheckoutOffer => ({
  id,
  game,
  label,
  priceIdr: 1650,
  kind: game === "roblox" ? "voucher" : "top-up",
});

const send = (
  state: CheckoutState,
  type: CheckoutAction["type"],
  payload: Record<string, unknown> = {},
): CheckoutState => checkoutReducer(state, { type, ...payload } as CheckoutAction);

const fillFields = (
  state: CheckoutState,
  fields: Record<string, string>,
): CheckoutState => {
  let next = state;
  for (const [fieldId, value] of Object.entries(fields)) {
    next = send(next, "setAccountValue", { fieldId, value });
  }
  return next;
};

const completeMlbb = (outcome: "success" | "failure"): CheckoutState => {
  let state = send(createCheckoutState(), "selectOffer", { offer: offer() });
  state = fillFields(state, { id: "id-1", server: "server-1" });
  state = send(state, "setPaymentMethod", { method: "qris" });
  state = send(state, "setOutcome", { outcome });
  return send(send(state, "openConfirmation"), "confirm");
};

describe("checkout model", () => {
  it("exports immutable state operations and exact required field profiles for all nine games", () => {
    expect(typeof fieldProfiles).toBe("object");
    expect(typeof getRequiredFields).toBe("function");
    expect(typeof createCheckoutState).toBe("function");
    expect(typeof checkoutReducer).toBe("function");
    expect(Object.keys(fieldProfiles)).toEqual([
      "mlbb",
      "free-fire",
      "pubg-mobile",
      "genshin-impact",
      "roblox",
      "valorant",
      "call-of-duty-mobile",
      "delta-force-mobile",
      "blood-strike",
    ]);
    expect(
      Object.fromEntries(
        Object.entries(fieldProfiles).map(([game, fields]) => [
          game,
          fields.map(({ key, label }) => [key, label]),
        ]),
      ),
    ).toEqual({
      mlbb: [["id", "ID"], ["server", "Server"]],
      "free-fire": [["id", "ID"]],
      "pubg-mobile": [["playerId", "Player ID"]],
      "genshin-impact": [["uid", "UID"], ["server", "Server"]],
      roblox: [],
      valorant: [["riotIdTag", "Riot ID + Tag"]],
      "call-of-duty-mobile": [["playerId", "PlayerID"]],
      "delta-force-mobile": [["id", "ID"]],
      "blood-strike": [["id", "ID"]],
    });
    expect(getRequiredFields("roblox")).toEqual([]);
    expect(getRequiredFields("not-a-game")).toEqual([]);
    expect(Object.isFrozen(fieldProfiles)).toBe(true);
    expect(Object.isFrozen(fieldProfiles.mlbb)).toBe(true);
  });

  it("creates frozen state and replaces an offer while clearing stale checkout values", () => {
    const initial = createCheckoutState();
    expect(Object.isFrozen(initial)).toBe(true);
    expect(Object.isFrozen(initial.accountValues)).toBe(true);
    expect(initial).toEqual({
      selectedOffer: null,
      accountValues: {},
      paymentMethod: null,
      outcome: null,
      errors: {},
      confirmationOpen: false,
      result: null,
    });

    const firstOffer = offer();
    let state = send(initial, "selectOffer", { offer: firstOffer });
    expect(state.selectedOffer).toBe(firstOffer);
    state = fillFields(state, { id: "player-1", server: "server-1" });
    state = send(state, "setPaymentMethod", { method: "qris" });
    state = send(state, "setOutcome", { outcome: "failure" });
    const secondOffer = offer("free-fire", "5 Diamonds", "ff-5");
    const next = send(state, "selectOffer", { offer: secondOffer });

    expect(next.selectedOffer).toBe(secondOffer);
    expect(next.accountValues).toEqual({});
    expect(next.paymentMethod).toBeNull();
    expect(next.outcome).toBeNull();
    expect(next.confirmationOpen).toBe(false);
    expect(next.result).toBeNull();
    expect(state.accountValues).toEqual({ id: "player-1", server: "server-1" });
  });

  it("reports every empty required field and preserves context until corrected", () => {
    let state = send(createCheckoutState(), "selectOffer", { offer: offer() });
    state = send(state, "setAccountValue", { fieldId: "server", value: "server-1" });
    state = send(state, "setPaymentMethod", { method: "qris" });
    state = send(state, "setOutcome", { outcome: "success" });
    const before = state;
    const rejected = send(state, "openConfirmation");

    expect(rejected.confirmationOpen).toBe(false);
    expect(rejected.result).toBeNull();
    expect(rejected.errors).toEqual({ id: "Wajib diisi." });
    expect(rejected.selectedOffer).toBe(before.selectedOffer);
    expect(rejected.accountValues).toEqual({ server: "server-1" });
    expect(rejected.paymentMethod).toBe("qris");
    expect(rejected.outcome).toBe("success");

    const corrected = send(rejected, "setAccountValue", {
      fieldId: "id",
      value: "  unusual # value  ",
    });
    expect(corrected.errors).toEqual({});
    expect(corrected.accountValues.id).toBe("  unusual # value  ");
    expect(send(corrected, "openConfirmation").confirmationOpen).toBe(true);
  });

  it("validates multi-field profiles independently and treats whitespace as non-empty", () => {
    let state = send(createCheckoutState(), "selectOffer", {
      offer: offer("genshin-impact", "60 Crystals", "gi-60"),
    });
    state = send(state, "setAccountValue", { fieldId: "uid", value: "  " });
    state = send(state, "setPaymentMethod", { method: "e-wallet" });
    state = send(state, "setOutcome", { outcome: "failure" });
    const rejected = send(state, "openConfirmation");

    expect(rejected.errors).toEqual({ server: "Wajib diisi." });
    expect(rejected.confirmationOpen).toBe(false);
    const corrected = send(rejected, "setAccountValue", {
      fieldId: "server",
      value: "NA",
    });
    expect(send(corrected, "openConfirmation").errors).toEqual({});
    expect(send(corrected, "openConfirmation").confirmationOpen).toBe(true);
  });

  it("allows Roblox vouchers without identifiers and blocks missing payment or outcome", () => {
    let state = send(createCheckoutState(), "selectOffer", {
      offer: offer("roblox", "200 Robux", "roblox-200"),
    });
    expect(getRequiredFields("roblox")).toEqual([]);

    state = send(state, "setOutcome", { outcome: "success" });
    let rejected = send(state, "openConfirmation");
    expect(rejected.errors).toEqual({ paymentMethod: "Pilih metode pembayaran." });
    expect(rejected.confirmationOpen).toBe(false);

    state = send(rejected, "setPaymentMethod", { method: "virtual-account" });
    state = send(state, "setOutcome", { outcome: null });
    rejected = send(state, "openConfirmation");
    expect(rejected.errors).toEqual({ outcome: "Pilih hasil simulasi." });
    expect(rejected.confirmationOpen).toBe(false);
  });

  it("replaces one selected payment method/outcome and ignores invalid choices", () => {
    let state = send(createCheckoutState(), "selectOffer", { offer: offer() });
    state = fillFields(state, { id: "user", server: "server" });
    state = send(state, "setPaymentMethod", { method: "qris" });
    state = send(state, "setPaymentMethod", { method: "e-wallet" });
    state = send(state, "setOutcome", { outcome: "failure" });
    state = send(state, "setOutcome", { outcome: "success" });

    expect(state.paymentMethod).toBe("e-wallet");
    expect(state.outcome).toBe("success");
    expect(send(state, "setPaymentMethod", { method: "real-card" })).toBe(state);
    expect(send(state, "setOutcome", { outcome: "random" })).toBe(state);
  });

  it("cancels confirmation without a result and preserves the exact offer and checkout values", () => {
    let state = send(createCheckoutState(), "selectOffer", { offer: offer() });
    state = fillFields(state, { id: "id-1", server: "server-1" });
    state = send(state, "setPaymentMethod", { method: "qris" });
    state = send(state, "setOutcome", { outcome: "failure" });
    state = send(state, "openConfirmation");
    const canceled = send(state, "cancelConfirmation");

    expect(canceled.confirmationOpen).toBe(false);
    expect(canceled.result).toBeNull();
    expect(canceled.selectedOffer).toBe(state.selectedOffer);
    expect(canceled.accountValues).toEqual(state.accountValues);
    expect(canceled.paymentMethod).toBe(state.paymentMethod);
    expect(canceled.outcome).toBe(state.outcome);
    expect(state.confirmationOpen).toBe(true);
  });

  it("creates one immutable result snapshot and makes repeated confirmation a no-op", () => {
    const selectedOffer = offer();
    let state = send(createCheckoutState(), "selectOffer", { offer: selectedOffer });
    state = fillFields(state, { id: "id-1", server: "server-1" });
    state = send(state, "setPaymentMethod", { method: "virtual-account" });
    state = send(state, "setOutcome", { outcome: "failure" });
    state = send(state, "openConfirmation");
    const confirmed = send(state, "confirm");

    expect(confirmed.confirmationOpen).toBe(false);
    expect(confirmed.result).toEqual({
      selectedOffer,
      accountValues: { id: "id-1", server: "server-1" },
      paymentMethod: "virtual-account",
      outcome: "failure",
    });
    expect(confirmed.result?.selectedOffer).toBe(selectedOffer);
    expect(Object.isFrozen(confirmed.result)).toBe(true);
    expect(Object.isFrozen(confirmed.result?.accountValues)).toBe(true);
    expect(send(confirmed, "confirm")).toBe(confirmed);
    expect(state.result).toBeNull();
  });

  it("retries failure without losing context and leaves a success result unchanged", () => {
    let state = send(createCheckoutState(), "selectOffer", { offer: offer() });
    state = fillFields(state, { id: "id-1", server: "server-1" });
    state = send(state, "setPaymentMethod", { method: "e-wallet" });
    state = send(state, "setOutcome", { outcome: "failure" });
    state = send(state, "openConfirmation");
    state = send(state, "confirm");
    const retried = send(state, "retry");

    expect(retried.result).toBeNull();
    expect(retried.confirmationOpen).toBe(false);
    expect(retried.selectedOffer).toBe(state.selectedOffer);
    expect(retried.accountValues).toEqual(state.accountValues);
    expect(retried.paymentMethod).toBe(state.paymentMethod);
    expect(retried.outcome).toBe(state.outcome);

    const success = completeMlbb("success");
    expect(send(success, "retry")).toBe(success);
  });

  it("ignores unsupported games and inapplicable account fields", () => {
    const initial = createCheckoutState();
    expect(send(initial, "selectOffer", { offer: offer("other-game" as GameKey) })).toBe(
      initial,
    );
    const selected = send(initial, "selectOffer", { offer: offer("roblox") });
    expect(
      send(selected, "setAccountValue", { fieldId: "playerId", value: "x" }),
    ).toBe(selected);
  });

  it("clears selected offer and resets state on clearOffer action", () => {
    let state = send(createCheckoutState(), "selectOffer", { offer: offer() });
    state = fillFields(state, { id: "id-1", server: "server-1" });
    const cleared = send(state, "clearOffer");
    expect(cleared.selectedOffer).toBeNull();
    expect(cleared.accountValues).toEqual({});
  });

  it("reports offer validation error when opening confirmation without a selected offer", () => {
    const state = createCheckoutState();
    const rejected = send(state, "openConfirmation");
    expect(rejected.errors).toEqual({ offer: "Pilih game dan paket terlebih dahulu." });
  });
});
