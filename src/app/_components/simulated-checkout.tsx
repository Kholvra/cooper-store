"use client";

import React, { useReducer, useState, useRef, useEffect } from "react";
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
} from "./checkout-model";
import { games, getOffersForGame, getGame, formatIdr } from "./checkout-catalog";

const paymentMethodLabels: Record<PaymentMethod, string> = {
  qris: "QRIS",
  "e-wallet": "E-Wallet",
  "virtual-account": "Virtual Account",
};

const simulationOutcomeLabels: Record<SimulationOutcome, string> = {
  success: "Simulasi berhasil",
  failure: "Simulasi gagal",
};

export function SimulatedCheckout() {
  const [state, dispatch] = useReducer(checkoutReducer, undefined, createCheckoutState);
  const [selectedGameId, setSelectedGameId] = useState<GameKey>("mlbb");

  const dialogRef = useRef<HTMLDialogElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (state.confirmationOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
        submitButtonRef.current?.focus();
      }
    }
  }, [state.confirmationOpen]);

  const activeGame = games.find((g) => g.id === selectedGameId) || games[0]!;
  const offers = getOffersForGame(selectedGameId);
  const requiredFields = getRequiredFields(selectedGameId);

  const handleGameSelect = (gameId: GameKey) => {
    if (gameId === selectedGameId) return;
    setSelectedGameId(gameId);
    dispatch({ type: "clearOffer" });
  };

  const handleOfferClick = (offer: CheckoutOffer) => {
    dispatch({ type: "selectOffer", offer });
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] px-4 py-8 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8 border-b border-[var(--color-border)] pb-6">
        <h1 className="text-3xl md:text-[32px] font-bold tracking-tight text-[var(--color-text-primary)]">
          Simulasi Katalog & Top-Up Game 2026
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-2 text-base">
          Catatan: Ini adalah platform simulasi katalog dan transaksi lokal (tanpa jaringan, pembayaran nyata, verifikasi akun, atau pengiriman item). Harga didasarkan pada transkripsi referensi visual tahun 2026 dan bukan merupakan harga resmi atau penawaran komersial yang dijamin.
        </p>
      </header>

      {/* Result / Receipt View */}
      {state.result ? (
        <section aria-labelledby="result-heading" className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-panel)] p-6 md:p-8 shadow-[var(--shadow-card)] max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            {state.result.outcome === "success" ? (
              <div className="w-10 h-10 rounded-full bg-[var(--color-success-subtle)] text-[var(--color-success)] flex items-center justify-center font-bold text-xl" aria-hidden="true">
                ✓
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-[var(--color-danger-subtle)] text-[var(--color-danger)] flex items-center justify-center font-bold text-xl" aria-hidden="true">
                ✕
              </div>
            )}
            <div>
              <h2 id="result-heading" className="text-xl font-semibold">
                {state.result.outcome === "success" ? "Simulasi berhasil" : "Simulasi gagal"}
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {state.result.outcome === "success"
                  ? "Hasil simulasi menunjukkan status berhasil."
                  : "Hasil simulasi menunjukkan status gagal."}
              </p>
            </div>
          </div>

          <div className="bg-[var(--color-bg-secondary)] rounded-[var(--radius-card)] p-4 space-y-3 mb-6 border border-[var(--color-border)]">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-text-secondary)]">Game:</span>
              <span className="font-medium">{getGame(state.result.selectedOffer.game)?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-text-secondary)]">Produk / Paket:</span>
              <span className="font-medium">{state.result.selectedOffer.label} ({state.result.selectedOffer.kind === "voucher" ? "Voucher" : "Top-Up"})</span>
            </div>
            {Object.entries(state.result.accountValues).map(([k, v]) => {
              const fieldDef = getRequiredFields(state.result!.selectedOffer.game).find(f => f.key === k);
              return (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">{fieldDef?.label || k}:</span>
                  <span className="font-mono">{v || "(kosong)"}</span>
                </div>
              );
            })}
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-text-secondary)]">Metode Pembayaran:</span>
              <span className="font-medium">{paymentMethodLabels[state.result.paymentMethod]}</span>
            </div>
            <div className="flex justify-between text-sm font-bold border-t border-[var(--color-border)] pt-2">
              <span>Total:</span>
              <span className="text-[var(--color-accent)]">{formatIdr(state.result.selectedOffer.priceIdr)}</span>
            </div>
          </div>

          <div className="bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-[var(--color-text-secondary)] p-3 rounded-[var(--radius-control)] text-xs mb-6">
            Pernyataan simulasi saja: Tidak ada pembayaran aktual, verifikasi akun, atau pengiriman item yang dilakukan.
          </div>

          <div className="flex gap-4">
            {state.result.outcome === "failure" && (
              <button
                type="button"
                onClick={() => dispatch({ type: "retry" })}
                className="flex-1 bg-[var(--color-accent)] text-[var(--color-on-accent)] font-semibold py-3 px-6 rounded-[var(--radius-control)] hover:bg-[var(--color-accent-hover)] transition min-h-[44px]"
              >
                Coba Lagi
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                dispatch({ type: "retry" });
                dispatch({ type: "clearOffer" });
              }}
              className="flex-1 bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] font-semibold py-3 px-6 rounded-[var(--radius-control)] hover:bg-[var(--color-border)] transition min-h-[44px]"
            >
              Transaksi Baru
            </button>
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / Main Column: Game & Offer Selection */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Select Game */}
            <section aria-labelledby="game-selection-heading" className="bg-[var(--color-bg-secondary)] p-6 rounded-[var(--radius-panel)] border border-[var(--color-border)]">
              <h2 id="game-selection-heading" className="text-lg font-semibold mb-4 text-[var(--color-text-primary)] flex items-center gap-2">
                <span className="bg-[var(--color-surface-raised)] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[var(--color-accent)]">1</span>
                Pilih Game / Layanan
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {games.map((g) => {
                  const isSelected = g.id === selectedGameId;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => handleGameSelect(g.id)}
                      className={`p-3 rounded-[var(--radius-card)] text-left transition min-h-[44px] flex flex-col justify-between border ${
                        isSelected
                          ? "bg-[var(--color-surface-selected)] border-[var(--color-accent)] shadow-sm"
                          : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-border-control)]"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="font-medium text-sm text-[var(--color-text-primary)]">{g.name}</span>
                      <span className="text-xs text-[var(--color-text-secondary)] mt-1">
                        {getOffersForGame(g.id).length} produk ({g.id === "roblox" ? "Voucher" : "Top-up"})
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 2. Select Offer / Package */}
            <section aria-labelledby="offer-selection-heading" className="bg-[var(--color-bg-secondary)] p-6 rounded-[var(--radius-panel)] border border-[var(--color-border)]">
              <h2 id="offer-selection-heading" className="text-lg font-semibold mb-4 text-[var(--color-text-primary)] flex items-center gap-2">
                <span className="bg-[var(--color-surface-raised)] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[var(--color-accent)]">2</span>
                Pilih Nominal / Produk ({activeGame.name})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1">
                {offers.map((offer) => {
                  const isSelected = state.selectedOffer?.id === offer.id;
                  return (
                    <button
                      key={offer.id}
                      type="button"
                      onClick={() => handleOfferClick(offer)}
                      className={`p-3 rounded-[var(--radius-card)] text-left transition min-h-[44px] flex flex-col justify-between border ${
                        isSelected
                          ? "bg-[var(--color-surface-selected)] border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]"
                          : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-border-control)]"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">{offer.label}</span>
                      <span className="text-sm font-bold text-[var(--color-accent)] mt-2">
                        {formatIdr(offer.priceIdr)}
                      </span>
                    </button>
                  );
                })}
              </div>
              {state.errors.offer && (
                <p id="error-offer" className="text-sm text-[var(--color-danger)] mt-3 flex items-center gap-1">
                  <span>⚠️</span> {state.errors.offer}
                </p>
              )}
            </section>

            {/* 3. Account / Player Fields */}
            {requiredFields.length > 0 ? (
              <section aria-labelledby="account-fields-heading" className="bg-[var(--color-bg-secondary)] p-6 rounded-[var(--radius-panel)] border border-[var(--color-border)]">
                <h2 id="account-fields-heading" className="text-lg font-semibold mb-4 text-[var(--color-text-primary)] flex items-center gap-2">
                  <span className="bg-[var(--color-surface-raised)] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[var(--color-accent)]">3</span>
                  Masukkan Data Akun
                </h2>
                <div className="space-y-4">
                  {requiredFields.map((field) => {
                    const value = state.accountValues[field.key] || "";
                    const error = state.errors[field.key];
                    return (
                      <div key={field.key} className="space-y-1">
                        <label htmlFor={`field-${field.key}`} className="block text-sm font-medium text-[var(--color-text-secondary)]">
                          {field.label} <span className="text-[var(--color-danger)]">*</span>
                        </label>
                        <input
                          id={`field-${field.key}`}
                          type="text"
                          value={value}
                          onChange={(e) =>
                            dispatch({
                              type: "setAccountValue",
                              fieldId: field.key,
                              value: e.target.value,
                            })
                          }
                          placeholder={`Masukkan ${field.label}`}
                          aria-invalid={Boolean(error)}
                          aria-describedby={error ? `error-${field.key}` : undefined}
                          className={`w-full bg-[var(--color-surface)] border rounded-[var(--radius-control)] px-3 py-2 text-[var(--color-text-primary)] focus:outline-none min-h-[44px] ${
                            error
                              ? "border-[var(--color-danger)] focus:ring-1 focus:ring-[var(--color-danger)]"
                              : "border-[var(--color-border-control)] focus:border-[var(--color-border-focus)]"
                          }`}
                        />
                        {error && (
                          <p id={`error-${field.key}`} className="text-xs text-[var(--color-danger)] mt-1 flex items-center gap-1">
                            <span>⚠️</span> {error}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : (
              <section className="bg-[var(--color-bg-secondary)] p-6 rounded-[var(--radius-panel)] border border-[var(--color-border)]">
                <h2 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
                  3. Informasi Jalur (Voucher)
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Roblox menggunakan jalur voucher (tanpa input ID akun). Kode voucher akan disimulasikan setelah konfirmasi.
                </p>
              </section>
            )}

            {/* 4. Payment Method */}
            <section aria-labelledby="payment-method-heading" className="bg-[var(--color-bg-secondary)] p-6 rounded-[var(--radius-panel)] border border-[var(--color-border)]">
              <h2 id="payment-method-heading" className="text-lg font-semibold mb-4 text-[var(--color-text-primary)] flex items-center gap-2">
                <span className="bg-[var(--color-surface-raised)] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[var(--color-accent)]">
                  {requiredFields.length > 0 ? "4" : "3"}
                </span>
                Metode Pembayaran
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {paymentMethods.map((method) => {
                  const isSelected = state.paymentMethod === method;
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => dispatch({ type: "setPaymentMethod", method })}
                      className={`p-3 rounded-[var(--radius-card)] text-left transition min-h-[44px] flex flex-col justify-between border ${
                        isSelected
                          ? "bg-[var(--color-surface-selected)] border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]"
                          : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-border-control)]"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">{paymentMethodLabels[method]}</span>
                      <span className="text-xs text-[var(--color-text-secondary)] mt-1">Simulasi</span>
                    </button>
                  );
                })}
              </div>
              {state.errors.paymentMethod && (
                <p id="error-paymentMethod" className="text-sm text-[var(--color-danger)] mt-3 flex items-center gap-1">
                  <span>⚠️</span> {state.errors.paymentMethod}
                </p>
              )}
            </section>

            {/* 5. Simulation Outcome Selector */}
            <section aria-labelledby="simulation-outcome-heading" className="bg-[var(--color-bg-secondary)] p-6 rounded-[var(--radius-panel)] border border-[var(--color-border)]">
              <h2 id="simulation-outcome-heading" className="text-lg font-semibold mb-4 text-[var(--color-text-primary)] flex items-center gap-2">
                <span className="bg-[var(--color-surface-raised)] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[var(--color-accent)]">
                  {requiredFields.length > 0 ? "5" : "4"}
                </span>
                Uji Hasil Simulasi
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {simulationOutcomes.map((outcome) => {
                  const isSelected = state.outcome === outcome;
                  return (
                    <button
                      key={outcome}
                      type="button"
                      onClick={() => dispatch({ type: "setOutcome", outcome })}
                      className={`p-3 rounded-[var(--radius-card)] text-left transition min-h-[44px] flex flex-col justify-between border ${
                        isSelected
                          ? "bg-[var(--color-surface-selected)] border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]"
                          : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-border-control)]"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">{simulationOutcomeLabels[outcome]}</span>
                    </button>
                  );
                })}
              </div>
              {state.errors.outcome && (
                <p id="error-outcome" className="text-sm text-[var(--color-danger)] mt-3 flex items-center gap-1">
                  <span>⚠️</span> {state.errors.outcome}
                </p>
              )}
            </section>
          </div>

          {/* Right / Summary Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-[var(--radius-panel)] p-6 shadow-[var(--shadow-card)] space-y-6">
              <h2 className="text-lg font-semibold border-b border-[var(--color-border)] pb-3 text-[var(--color-text-primary)]">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Game:</span>
                  <span className="font-medium text-right">{activeGame.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Produk:</span>
                  <span className="font-medium text-right">{state.selectedOffer ? state.selectedOffer.label : "Belum dipilih"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Metode Pembayaran:</span>
                  <span className="font-medium text-right">
                    {state.paymentMethod ? paymentMethodLabels[state.paymentMethod] : "Belum dipilih"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Simulasi Hasil:</span>
                  <span className="font-medium text-right">
                    {state.outcome ? simulationOutcomeLabels[state.outcome] : "Belum dipilih"}
                  </span>
                </div>

                <div className="border-t border-[var(--color-border)] pt-4 flex justify-between items-center">
                  <span className="font-semibold text-[var(--color-text-primary)]">Total:</span>
                  <span className="text-xl font-bold text-[var(--color-accent)]">
                    {state.selectedOffer ? formatIdr(state.selectedOffer.priceIdr) : "Rp 0"}
                  </span>
                </div>
              </div>

              {Object.keys(state.errors).length > 0 && (
                <div className="bg-[var(--color-danger-subtle)] border border-[var(--color-danger)] text-[var(--color-danger)] p-3 rounded-[var(--radius-control)] text-xs">
                  Mohon lengkapi pilihan dan data wajib.
                </div>
              )}

              <button
                ref={submitButtonRef}
                type="button"
                onClick={() => dispatch({ type: "openConfirmation" })}
                disabled={!state.selectedOffer || !state.paymentMethod || !state.outcome}
                className={`w-full font-semibold py-3 px-4 rounded-[var(--radius-control)] transition min-h-[44px] ${
                  state.selectedOffer && state.paymentMethod && state.outcome
                    ? "bg-[var(--color-accent)] text-[var(--color-on-accent)] hover:bg-[var(--color-accent-hover)] cursor-pointer"
                    : "bg-[var(--color-surface-raised)] text-[var(--color-text-tertiary)] opacity-60 cursor-not-allowed"
                }`}
              >
                Buat pesanan
              </button>
            </div>
          </div>
        </div>
      )}

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
        <h2 id="dialog-title" className="text-xl font-bold mb-4">Konfirmasi Detail Pesanan</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Periksa kembali detail pesanan simulasi Anda.
        </p>

        {state.selectedOffer && (
          <div className="bg-[var(--color-bg-secondary)] rounded-[var(--radius-card)] p-4 space-y-3 mb-6 border border-[var(--color-border)] text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Game:</span>
              <span className="font-medium">{getGame(state.selectedOffer.game)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Produk:</span>
              <span className="font-medium">{state.selectedOffer.label}</span>
            </div>
            {Object.entries(state.accountValues).map(([k, v]) => {
              const fieldDef = getRequiredFields(state.selectedOffer!.game).find(f => f.key === k);
              return (
                <div key={k} className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">{fieldDef?.label || k}:</span>
                  <span className="font-mono font-medium">{v || "(kosong)"}</span>
                </div>
              );
            })}
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Metode Pembayaran:</span>
              <span className="font-medium">{state.paymentMethod ? paymentMethodLabels[state.paymentMethod] : "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Simulasi Hasil:</span>
              <span className="font-medium">{state.outcome ? simulationOutcomeLabels[state.outcome] : "-"}</span>
            </div>
            <div className="border-t border-[var(--color-border)] pt-3 flex justify-between font-bold">
              <span>Total:</span>
              <span className="text-[var(--color-accent)]">{formatIdr(state.selectedOffer.priceIdr)}</span>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => dispatch({ type: "cancelConfirmation" })}
            className="flex-1 bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] font-semibold py-3 px-4 rounded-[var(--radius-control)] hover:bg-[var(--color-border)] transition min-h-[44px]"
          >
            Kembali edit
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "confirm" })}
            className="flex-1 bg-[var(--color-accent)] text-[var(--color-on-accent)] font-semibold py-3 px-4 rounded-[var(--radius-control)] hover:bg-[var(--color-accent-hover)] transition min-h-[44px]"
          >
            Konfirmasi simulasi
          </button>
        </div>
      </dialog>
    </main>
  );
}
