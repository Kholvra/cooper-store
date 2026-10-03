import { 
  createCheckoutResultState, 
  checkoutResultReducer, 
  type CheckoutChoices, 
  type SuccessNota, 
  type CheckoutFailure 
} from "../src/lib/checkout-receipt.ts";

console.log("=== STARTING CHECKOUT RECEIPT VERIFICATION SMOKE TEST ===");

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passedCount++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failedCount++;
    throw new Error(`Assertion failed: ${message}`);
  }
}

// Test Context 1: MLBB Checkout Choices
const mlbbCheckout: CheckoutChoices = {
  game: "Mobile Legends",
  offerId: "mlbb-weekly",
  offerName: "Weekly Diamond Pass",
  amount: 1,
  accountValues: { userId: "12345678", zoneId: "1234" },
  paymentMethod: "QRIS",
  choices: { region: "ID" },
};

// AC-01, AC-05, AC-08: Progress sequence & Success Nota
console.log("\nTesting AC-01, AC-05, AC-08: Progress sequence & Success Nota");
let state = createCheckoutResultState(mlbbCheckout);
assert(state.status === "progress", "Initial state is progress");
assert(state.progress.status === "Pesanan dibuat", "Progress starts at 'Pesanan dibuat'");
assert(state.progress.isSimulation === true, "Clearly identified as simulation");

// Advance progress
state = checkoutResultReducer(state, { type: "advance" }, mlbbCheckout);
assert(state.status === "progress", "State remains progress after advance");
if (state.status === "progress") {
  assert(state.progress.status === "Simulasi berjalan", "Progress advanced to 'Simulasi berjalan'");
}

// Success nota
const successNota: SuccessNota = {
  invoiceNumber: "INV-SIM-20261003-9999",
  transactionTime: "2026-10-03 10:00:00",
  game: "Mobile Legends",
  offerName: "Weekly Diamond Pass",
  amount: 1,
  accountValues: { userId: "12345678", zoneId: "1234" },
  paymentMethod: "QRIS",
  total: 29000,
  status: "Berhasil (simulasi)",
};

state = checkoutResultReducer(state, { type: "succeed", nota: successNota }, mlbbCheckout);
assert(state.status === "success", "State transitioned to success");
if (state.status === "success") {
  assert(
    state.progress.status === "Hasil simulasi" &&
      state.progress.completedStatuses.join(",") === "Pesanan dibuat,Simulasi berjalan,Hasil simulasi",
    "Completed progress remains available on success",
  );
  assert(state.nota.invoiceNumber === "INV-SIM-20261003-9999", "Invoice number is simulation-generated");
  assert(state.nota.game === "Mobile Legends", "Game matches Mobile Legends");
  assert(state.nota.status === "Berhasil (simulasi)", "Status indicates simulation success");
  assert(state.nota.accountValues.userId === "12345678", "MLBB account values present");
}

// AC-03: Failure without false nota
console.log("\nTesting AC-03: Failure without false nota");
let failState = createCheckoutResultState(mlbbCheckout);
const failure: CheckoutFailure = {
  message: "Simulasi Gagal",
  reason: "Account or gateway timeout",
};
failState = checkoutResultReducer(failState, { type: "fail", failure }, mlbbCheckout);
assert(failState.status === "failure", "State transitioned to failure");
if (failState.status === "failure") {
  assert(
    failState.progress.status === "Hasil simulasi" &&
      failState.progress.completedStatuses.join(",") === "Pesanan dibuat,Simulasi berjalan,Hasil simulasi",
    "Completed progress remains available on failure",
  );
  assert(failState.failure.message === "Simulasi Gagal", "Failure message present");
  assert(!("nota" in failState), "No success nota or invoice displayed on failure");
}

// AC-04: Recoverable retry with context preservation
console.log("\nTesting AC-04: Retry context preservation");
if (failState.status === "failure") {
  const retryState = checkoutResultReducer(failState, { type: "retry" }, failState.retry.checkout);
  assert(retryState.status === "progress", "Retry returns to checkout/progress state");
  if (retryState.status === "progress") {
    assert(retryState.checkout.game === "Mobile Legends", "Preserved game choice");
    assert(retryState.checkout.accountValues.userId === "12345678", "Preserved account values");
    assert(retryState.checkout.paymentMethod === "QRIS", "Preserved payment method");
  }
}

// AC-07: Roblox voucher (no Player ID required)
console.log("\nTesting AC-07: Roblox voucher game-specific context");
const robloxCheckout: CheckoutChoices = {
  game: "Roblox",
  offerId: "roblox-100",
  offerName: "100 Robux",
  amount: 100,
  accountValues: {},
  paymentMethod: "Bank Transfer",
  choices: {},
};
const robloxState = createCheckoutResultState(robloxCheckout);
if (robloxState.status === "progress") {
  assert(robloxState.checkout.game === "Roblox", "Roblox game selected");
  assert(Object.keys(robloxState.checkout.accountValues).length === 0, "No account ID required or invented for Roblox");
}


console.log(`\n=== VERIFICATION COMPLETE: ${passedCount} PASSED, ${failedCount} FAILED ===`);
if (failedCount > 0) {
  process.exit(1);
}
