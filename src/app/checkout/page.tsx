"use client";

import Link from "next/link";
import { ShoppingCart, Printer, CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState, useReducer, useRef } from "react";

import type { CatalogGame } from "~/server/catalog-data";
import {
  SELECTED_OFFER_SESSION_KEY,
  type SelectedOfferContext,
} from "~/shared/selected-offer";
import {
  createCheckoutState,
  checkoutReducer,
  getRequiredFields,
  paymentMethods,
  simulationOutcomes,
  type CheckoutOffer,
  type PaymentMethod,
  type SimulationOutcome,
  type GameKey,
} from "~/app/_components/checkout-model";
import { formatIdr } from "~/app/_components/checkout-catalog";
import {
  createCheckoutResultState,
  checkoutResultReducer,
  type CheckoutChoices,
  type SuccessNota as ReceiptSuccessNota,
  type SimulationProgress,
} from "~/lib/checkout-receipt";
import {
  SuccessNota,
  FailureRetry,
  SimulationProgressView,
} from "~/components/checkout-receipt";

type CatalogGameFromDatabase = Omit<CatalogGame, "offers"> & {
  id: number;
  position: number;
  offers: (CatalogGame["offers"][number] & {
    id: number;
    position: number;
  })[];
};


type HandoffState =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "invalid" }
  | { status: "error"; message: string }
  | { status: "ready"; offer: SelectedOfferContext };

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function isSelectedOffer(value: unknown): value is SelectedOfferContext {
  if (typeof value !== "object" || value === null) return false;

  const offer = value as Record<string, unknown>;
  return (
    offer.version === 1 &&
    typeof offer.gameSlug === "string" &&
    typeof offer.gameName === "string" &&
    typeof offer.currency === "string" &&
    (offer.kind === "top-up" || offer.kind === "voucher") &&
    typeof offer.offerId === "number" &&
    typeof offer.offerLabel === "string" &&
    typeof offer.price === "number"
  );
}

const paymentMethodLabels: Record<PaymentMethod, string> = {
  qris: "QRIS",
  "e-wallet": "E-Wallet",
  "virtual-account": "Virtual Account",
};
const simulationOutcomeLabels: Record<SimulationOutcome, string> = {
  success: "Berhasil",
  failure: "Gagal",
};

export default function CheckoutPage() {
  const [state, setState] = useState<HandoffState>({ status: "loading" });
  const [retryNumber, setRetryNumber] = useState(0);

  // Checkout Form State from req-003
  const [formState, dispatch] = useReducer(checkoutReducer, undefined, createCheckoutState);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // Advanced Receipt State from req-004
  const [receiptState, setReceiptState] = useState<{
    active: boolean;
    status: "progress" | "success" | "failure";
    progress: SimulationProgress;
    nota?: ReceiptSuccessNota;
    failureMessage?: string;
  }>({
    active: false,
    status: "progress",
    progress: {
      status: "Pesanan dibuat",
      completedStatuses: ["Pesanan dibuat"],
      isSimulation: true,
    },
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (formState.confirmationOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
        submitButtonRef.current?.focus();
      }
    }
  }, [formState.confirmationOpen]);

  useEffect(() => {
    let isActive = true;

    async function loadHandoff() {
      try {
        const storedValue = window.sessionStorage.getItem(SELECTED_OFFER_SESSION_KEY);
        if (!storedValue) {
          if (isActive) setState({ status: "empty" });
          return;
        }

        let parsedValue: unknown;
        try {
          parsedValue = JSON.parse(storedValue);
        } catch {
          window.sessionStorage.removeItem(SELECTED_OFFER_SESSION_KEY);
          if (isActive) setState({ status: "invalid" });
          return;
        }
        if (!isSelectedOffer(parsedValue)) {
          window.sessionStorage.removeItem(SELECTED_OFFER_SESSION_KEY);
          if (isActive) setState({ status: "invalid" });
          return;
        }

        const response = await fetch("/api/catalog", { cache: "no-store" });
        const body = (await response.json()) as
          | CatalogGameFromDatabase[]
          | { error?: string };
        if (!response.ok || !Array.isArray(body)) {
          throw new Error(
            !Array.isArray(body) && body.error
              ? body.error
              : "Paket tidak dapat diverifikasi. Silakan coba lagi.",
          );
        }

        const game = body.find((item) => item.slug === parsedValue.gameSlug);
        const offer = game?.offers.find(
          (item) =>
            item.id === parsedValue.offerId &&
            item.label === parsedValue.offerLabel &&
            item.price === parsedValue.price,
        );

        if (
          !game ||
          !offer ||
          game.name !== parsedValue.gameName ||
          game.currency !== parsedValue.currency ||
          parsedValue.kind !==
            (game.slug === "roblox" ? "voucher" : "top-up")
        ) {
          window.sessionStorage.removeItem(SELECTED_OFFER_SESSION_KEY);
          if (isActive) setState({ status: "invalid" });
          return;
        }

        if (isActive) {
          setState({ status: "ready", offer: parsedValue });
          // Automatically select the handed off offer in the checkout form
          const checkoutOffer: CheckoutOffer = {
            id: String(parsedValue.offerId),
            game: parsedValue.gameSlug as GameKey,
            label: parsedValue.offerLabel,
            priceIdr: parsedValue.price,
            kind: parsedValue.kind,
          };
          dispatch({ type: "selectOffer", offer: checkoutOffer });
        }
      } catch {
        if (isActive) {
          setState({
            status: "error",
            message: "Paket tidak dapat diverifikasi. Silakan coba lagi.",
          });
        }
      }
    }

    setState({ status: "loading" });
    void loadHandoff();

    return () => {
      isActive = false;
    };
  }, [retryNumber]);

  const requiredFields =
    state.status === "ready"
      ? getRequiredFields(state.offer.gameSlug)
      : [];

  const areFieldsFilled = requiredFields.every(
    (f) => Boolean(formState.accountValues[f.key]?.trim())
  );
  const isFormValid =
    state.status === "ready" &&
    areFieldsFilled &&
    Boolean(formState.paymentMethod) &&
    Boolean(formState.outcome);

  const handleConfirmSimulation = () => {
    dispatch({ type: "confirm" });

    if (state.status !== "ready" || !formState.paymentMethod || !formState.outcome) return;

    const choices: CheckoutChoices = {
      game: state.offer.gameName,
      offerId: String(state.offer.offerId),
      offerName: state.offer.offerLabel,
      amount: 1,
      accountValues: { ...formState.accountValues },
      paymentMethod: paymentMethodLabels[formState.paymentMethod],
      choices: {},
    };

    let cur = createCheckoutResultState(choices);
    setReceiptState({
      active: true,
      status: "progress",
      progress: cur.progress,
    });

    // Animate progress steps
    setTimeout(() => {
      cur = checkoutResultReducer(cur, { type: "advance" }, choices);
      setReceiptState({
        active: true,
        status: "progress",
        progress: cur.progress,
      });

      setTimeout(() => {
        if (formState.outcome === "success") {
          const nota: ReceiptSuccessNota = {
            invoiceNumber: `INV-${Date.now().toString(36).toUpperCase()}`,
            transactionTime: new Date().toLocaleString("id-ID"),
            game: choices.game,
            offerName: choices.offerName,
            amount: 1,
            accountValues: choices.accountValues,
            paymentMethod: choices.paymentMethod,
            total: state.offer.price,
            status: "Berhasil",
          };
          cur = checkoutResultReducer(cur, { type: "succeed", nota }, choices);
          setReceiptState({
            active: true,
            status: "success",
            progress: cur.progress,
            nota,
          });
        } else {
          cur = checkoutResultReducer(
            cur,
            {
              type: "fail",
              failure: {
                message: "Pembayaran gagal atau ditolak oleh sistem.",
              },
            },
            choices
          );
          setReceiptState({
            active: true,
            status: "failure",
            progress: cur.progress,
            failureMessage: "Pembayaran gagal atau ditolak oleh sistem.",
          });
        }
      }, 600);
    }, 500);
  };

  return (
    <main className="storefront checkout-page min-h-screen pb-16">
      <header className="store-header mb-8">
        <Link className="store-name" href="/">
          cooper.gg
        </Link>
        <span className="header-note">Checkout</span>
      </header>

      <section className="checkout-content max-w-4xl mx-auto px-4" aria-labelledby="checkout-title">
        <p className="page-kicker">Konteks pilihan</p>
        <h1 id="checkout-title" className="text-2xl md:text-3xl font-bold mb-6">
          Checkout
        </h1>

        {state.status === "loading" ? (
          <p className="state-message" role="status">
            Memeriksa paket pilihan…
          </p>
        ) : state.status === "empty" ? (
          <div className="state-message empty-state" role="status">
            <h2>Belum ada paket pilihan</h2>
            <p>Pilih satu paket dari katalog untuk melanjutkan ke sini.</p>
            <Link className="secondary-button mt-4 inline-block" href="/">
              Kembali ke katalog
            </Link>
          </div>
        ) : state.status === "invalid" ? (
          <div className="state-message error-state" role="alert">
            <h2>Paket pilihan tidak tersedia</h2>
            <p>Paket tidak dapat dipastikan dari katalog saat ini. Pilih ulang dari daftar paket.</p>
            <Link className="secondary-button mt-4 inline-block" href="/">
              Pilih paket lagi
            </Link>
          </div>
        ) : state.status === "error" ? (
          <div className="state-message error-state" role="alert">
            <h2>Paket belum dapat diperiksa</h2>
            <p>{state.message}</p>
            <button
              className="secondary-button mt-4"
              type="button"
              onClick={() => setRetryNumber((attempt) => attempt + 1)}
            >
              Coba lagi
            </button>
          </div>
        ) : receiptState.active ? (
          <div className="receipt-view max-w-xl mx-auto space-y-6">
            {receiptState.status === "progress" && (
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-panel)] p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin mx-auto" />
                <h2 className="text-xl font-bold font-[var(--font-heading)]">Memproses Transaksi</h2>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Status: <span className="text-[var(--color-accent)] font-semibold">{receiptState.progress.status}</span>
                </p>
              </div>
            )}

            {receiptState.status === "success" && receiptState.nota && (
              <div className="space-y-6">
                <SuccessNota nota={receiptState.nota} />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/"
                    className="flex-1 text-center bg-[var(--color-accent)] !text-[#111216] font-bold py-3.5 px-4 rounded-[var(--radius-control)] hover:bg-[var(--color-accent-hover)] transition shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                    style={{ color: "#111216" }}
                  >
                    <span>Beli Paket Lain</span>
                    <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="sm:w-auto px-5 bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold py-3.5 rounded-[var(--radius-control)] hover:bg-[var(--color-border)] transition inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-[var(--color-text-secondary)]" aria-hidden="true" />
                    <span>Cetak / Simpan</span>
                  </button>
                </div>
              </div>
            )}

            {receiptState.status === "failure" && (
              <div className="space-y-6">
                <FailureRetry
                  failure={{ message: receiptState.failureMessage || "Simulasi gagal" }}
                  onRetry={() => {
                    setReceiptState({
                      active: false,
                      status: "progress",
                      progress: {
                        status: "Pesanan dibuat",
                        completedStatuses: ["Pesanan dibuat"],
                        isSimulation: true,
                      },
                    });
                    dispatch({ type: "retry" });
                  }}
                />
                <div className="flex gap-4">
                  <Link
                    href="/"
                    className="flex-1 text-center bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold py-3 px-4 rounded-[var(--radius-control)] hover:bg-[var(--color-border)] transition"
                  >
                    Kembali ke Beranda
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Handoff summary banner */}
            <div className="handoff-summary bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-panel)] p-6">
              <p className="panel-label text-xs uppercase tracking-wider text-[var(--color-text-tertiary)] mb-1">
                Paket diteruskan dari katalog
              </p>
              <h2 className="text-xl font-bold">{state.offer.gameName}</h2>
              <p className="selected-offer-name text-lg font-medium text-[var(--color-accent)] mt-1">
                {state.offer.offerLabel}
              </p>
              <p className="selected-offer-currency text-sm text-[var(--color-text-secondary)]">
                {state.offer.kind === "voucher"
                  ? "Jalur voucher"
                  : `Top-up · ${state.offer.currency}`}
              </p>
              <p className="selected-offer-price text-2xl font-bold mt-2">
                {currencyFormatter.format(state.offer.price)}
              </p>
              <p className="handoff-note text-xs text-[var(--color-text-tertiary)] mt-3">
                Konteks paket ini tersedia hanya selama sesi browser. Tidak ada data pesanan atau akun yang disimpan.
              </p>
              <Link className="secondary-button mt-4 inline-block text-sm" href="/">
                Ganti paket
              </Link>
            </div>

            {/* Step 2: Account identification (if required) */}
            {requiredFields.length > 0 && (
              <section
                aria-labelledby="account-fields-heading"
                className="bg-[var(--color-surface)] p-6 rounded-[var(--radius-panel)] border border-[var(--color-border)] space-y-4"
              >
                <h2 id="account-fields-heading" className="text-lg font-semibold flex items-center gap-2">
                  <span className="bg-[var(--color-surface-raised)] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[var(--color-accent)]">
                    1
                  </span>
                  Informasi Akun Game
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {requiredFields.map((field) => {
                    const hasError = Boolean(formState.errors[field.key]);
                    return (
                      <div key={field.key} className="space-y-1">
                        <label htmlFor={`account-${field.key}`} className="block text-sm font-medium text-[var(--color-text-secondary)]">
                          {field.label} <span className="text-[var(--color-accent)]">*</span>
                        </label>
                        <input
                          id={`account-${field.key}`}
                          type="text"
                          value={formState.accountValues[field.key] || ""}
                          onChange={(e) =>
                            dispatch({
                              type: "setAccountValue",
                              fieldId: field.key,
                              value: e.target.value,
                            })
                          }
                          placeholder={`Masukkan ${field.label}`}
                          aria-invalid={hasError}
                          aria-describedby={hasError ? `error-${field.key}` : undefined}
                          className={`w-full bg-[var(--color-bg-secondary)] border rounded-[var(--radius-control)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none transition min-h-[44px] ${
                            hasError
                              ? "border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-1 focus:ring-[var(--color-danger)]"
                              : "border-[var(--color-border-control)] focus:border-[var(--color-border-focus)]"
                          }`}
                        />
                        {hasError && (
                          <p id={`error-${field.key}`} className="text-xs text-[var(--color-danger)] mt-1">
                            {formState.errors[field.key]}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Step 3: Payment Method */}
            <section
              aria-labelledby="payment-heading"
              className="bg-[var(--color-surface)] p-6 rounded-[var(--radius-panel)] border border-[var(--color-border)] space-y-4"
            >
              <h2 id="payment-heading" className="text-lg font-semibold flex items-center gap-2">
                <span className="bg-[var(--color-surface-raised)] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[var(--color-accent)]">
                  {requiredFields.length > 0 ? "2" : "1"}
                </span>
                Pilih Metode Pembayaran
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {paymentMethods.map((method) => {
                  const isSelected = formState.paymentMethod === method;
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => dispatch({ type: "setPaymentMethod", method })}
                      className={`p-4 rounded-[var(--radius-control)] border text-left transition flex flex-col justify-between min-h-[48px] cursor-pointer ${
                        isSelected
                          ? "bg-[var(--color-surface-selected)] border-[var(--color-border-focus)] ring-1 ring-[var(--color-border-focus)]"
                          : "bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-border-control)]"
                      }`}
                    >
                      <span className="font-semibold text-sm">{paymentMethodLabels[method]}</span>
                      <span className="text-xs text-[var(--color-text-tertiary)] mt-1">Proses instan</span>
                    </button>
                  );
                })}
              </div>
              {formState.errors.paymentMethod && (
                <p className="text-xs text-[var(--color-danger)] mt-2">
                  {formState.errors.paymentMethod}
                </p>
              )}
            </section>

            {/* Step 4: Simulation Outcome Choice */}
            <section
              aria-labelledby="outcome-heading"
              className="bg-[var(--color-surface)] p-6 rounded-[var(--radius-panel)] border border-[var(--color-border)] space-y-4"
            >
              <h2 id="outcome-heading" className="text-lg font-semibold flex items-center gap-2">
                <span className="bg-[var(--color-surface-raised)] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[var(--color-accent)]">
                  {requiredFields.length > 0 ? "3" : "2"}
                </span>
                Pilih Hasil Transaksi
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {simulationOutcomes.map((outcome) => {
                  const isSelected = formState.outcome === outcome;
                  return (
                    <button
                      key={outcome}
                      type="button"
                      onClick={() => dispatch({ type: "setOutcome", outcome })}
                      className={`p-4 rounded-[var(--radius-control)] border text-left transition min-h-[48px] cursor-pointer ${
                        isSelected
                          ? "bg-[var(--color-surface-selected)] border-[var(--color-border-focus)] ring-1 ring-[var(--color-border-focus)]"
                          : "bg-[var(--color-bg-secondary)] border-[var(--color-border)] hover:border-[var(--color-border-control)]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {outcome === "success" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500 shrink-0" aria-hidden="true" />
                        )}
                        <span className="font-semibold text-sm">{simulationOutcomeLabels[outcome]}</span>
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                        {outcome === "success"
                          ? "Skenario transaksi berhasil dan terbitkan nota invoice."
                          : "Skenario pembayaran gagal dengan opsi coba lagi."}
                      </p>
                    </button>
                  );
                })}
              </div>
              {formState.errors.outcome && (
                <p className="text-xs text-[var(--color-danger)] mt-2">
                  {formState.errors.outcome}
                </p>
              )}
            </section>

            {/* Action Button */}
            <div className="pt-2">
              <button
                ref={submitButtonRef}
                type="button"
                onClick={() => dispatch({ type: "openConfirmation" })}
                className="primary-button !text-[#111216] font-bold text-base py-3.5 px-4 rounded-[var(--radius-control)] shadow-md active:translate-y-px transition min-h-[48px] cursor-pointer"
                style={{ color: "#111216" }}
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Confirmation Modal */}
      <dialog
        ref={dialogRef}
        onCancel={(e) => {
          e.preventDefault();
          dispatch({ type: "cancelConfirmation" });
        }}
        aria-labelledby="dialog-title"
        className="bg-[var(--color-surface)] text-[var(--color-text-primary)] p-6 md:p-8 rounded-[var(--radius-panel)] border border-[var(--color-border)] shadow-[var(--shadow-overlay)] max-w-lg w-full backdrop:bg-[var(--color-overlay)] m-auto"
      >
        <h2 id="dialog-title" className="text-xl font-bold mb-4">
          Konfirmasi Detail Pesanan
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Periksa kembali detail pesanan Anda sebelum melanjutkan.
        </p>

        {state.status === "ready" && (
          <div className="bg-[var(--color-bg-secondary)] rounded-[var(--radius-card)] p-4 space-y-3 mb-6 border border-[var(--color-border)] text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Game:</span>
              <span className="font-medium">{state.offer.gameName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Paket:</span>
              <span className="font-medium">{state.offer.offerLabel}</span>
            </div>
            {Object.entries(formState.accountValues).map(([k, v]) => {
              const fieldDef = requiredFields.find((f) => f.key === k);
              return (
                <div key={k} className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">{fieldDef?.label || k}:</span>
                  <span className="font-mono font-medium">{v || "(kosong)"}</span>
                </div>
              );
            })}
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Metode Pembayaran:</span>
              <span className="font-medium">
                {formState.paymentMethod ? paymentMethodLabels[formState.paymentMethod] : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Status Hasil:</span>
              <span className="font-medium">
                {formState.outcome ? simulationOutcomeLabels[formState.outcome] : "-"}
              </span>
            </div>
            <div className="border-t border-[var(--color-border)] pt-3 flex justify-between font-bold">
              <span>Total:</span>
              <span className="text-[var(--color-accent)]">{formatIdr(state.offer.price)}</span>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => dispatch({ type: "cancelConfirmation" })}
            className="flex-1 bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold py-3 px-4 rounded-[var(--radius-control)] hover:bg-[var(--color-border)] transition min-h-[44px] cursor-pointer"
          >
            Kembali edit
          </button>
          <button
            type="button"
            onClick={handleConfirmSimulation}
            className="primary-button flex-1 !text-[#111216] font-bold py-3 px-4 rounded-[var(--radius-control)] shadow-sm transition min-h-[44px] cursor-pointer"
            style={{ color: "#111216" }}
          >
            Konfirmasi Pembayaran
          </button>
        </div>
      </dialog>
    </main>
  );
}
