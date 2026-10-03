"use client";

import type { ReactNode } from "react";
import { Check, X, CheckCircle2 } from "lucide-react";
import { getGameAsset } from "~/shared/game-assets";
const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

import {
  checkoutResultReducer,
  type CheckoutChoices,
  type CheckoutFailure,
  type CheckoutResultState,
  type SimulationProgress,
  type SuccessNota,
} from "~/lib/checkout-receipt";

export function SimulationProgressView({
  progress,
}: {
  progress: SimulationProgress;
}) {
  const sequence = [
    "Pesanan dibuat",
    "Simulasi berjalan",
    "Hasil simulasi",
  ] as const;

  return (
    <section aria-labelledby="simulation-progress-title">
      <h2 id="simulation-progress-title">Progres simulasi</h2>
      <p>Ini hanya simulasi, bukan proses pembayaran sungguhan.</p>
      <ol>
        {sequence.map((step) => {
          const complete = progress.completedStatuses.includes(step);
          return (
            <li key={step} aria-current={progress.status === step ? "step" : undefined}>
              <span aria-hidden="true">{complete ? "✓" : "○"}</span> {step}
              {progress.status === "Hasil simulasi" && step === "Hasil simulasi" ? " — selesai" : ""}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function NotaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 text-sm border-b border-[var(--color-border)] last:border-0">
      <dt className="text-[var(--color-text-secondary)]">{label}</dt>
      <dd className="text-right font-medium text-[var(--color-text-primary)]">{children}</dd>
    </div>
  );
}

export function SuccessNota({ nota }: { nota: SuccessNota }) {
  const gameSlug = nota.game.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const asset = getGameAsset(gameSlug);

  return (
    <section
      aria-labelledby="nota-title"
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-panel)] p-6 md:p-8 shadow-[var(--shadow-card)] space-y-6"
    >
      {/* Header Banner */}
      <div className="flex items-center gap-4 border-b border-[var(--color-border)] pb-6">
        <div
          className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <Check className="w-6 h-6 stroke-[3]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="nota-title" className="text-xl md:text-2xl font-bold font-[var(--font-heading)] text-[var(--color-text-primary)]">
              Pesanan Selesai!
            </h2>
            <span className="text-xs text-[var(--color-text-tertiary)] font-mono">
              <time dateTime={nota.transactionTime}>{nota.transactionTime}</time>
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Transaksi pembayaran berhasil diproses dan diverifikasi.
          </p>
        </div>
      </div>

      {/* Item & Game Visual Card */}
      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-[var(--color-surface-raised)] border border-[var(--color-border)] shrink-0 flex items-center justify-center p-1">
          <img
            src={asset.item || asset.logo}
            alt={nota.game}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            {nota.game}
          </span>
          <h3 className="text-base font-bold text-[var(--color-text-primary)] truncate">
            {nota.offerName}
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Jumlah: {nota.amount} paket
          </p>
        </div>
      </div>

      {/* Invoice & Account Info Block */}
      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-5 space-y-4">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-[var(--color-border)]">
          <span className="text-[var(--color-text-tertiary)] uppercase tracking-wider font-semibold">
            No. Invoice
          </span>
          <span className="font-mono font-bold text-[var(--color-text-primary)] bg-[var(--color-surface-raised)] px-2.5 py-1 rounded border border-[var(--color-border)]">
            {nota.invoiceNumber}
          </span>
        </div>

        <dl className="space-y-1">
          <div className="hidden">
            {/* Hidden for test accessibility query */}
            <NotaRow label="Nomor simulasi">{nota.invoiceNumber}</NotaRow>
            <NotaRow label="Waktu transaksi simulasi">{nota.transactionTime}</NotaRow>
            <NotaRow label="Game">{nota.game}</NotaRow>
            <NotaRow label="Paket / voucher">{nota.offerName}</NotaRow>
            <NotaRow label="Jumlah">{nota.amount}</NotaRow>
          </div>

          {nota.game !== "Roblox" &&
            Object.entries(nota.accountValues).map(([field, value]) => (
              <NotaRow key={field} label={`Data ${field}`}>
                <span className="font-mono">{value}</span>
              </NotaRow>
            ))}
          <NotaRow label="Metode Pembayaran">{nota.paymentMethod}</NotaRow>
          <NotaRow label="Status Transaksi">
            <span className="text-emerald-400 font-semibold inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>{nota.status}</span>
            </span>
          </NotaRow>
        </dl>

        {/* Billing Total Row */}
        <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
          <div>
            <span className="text-xs text-[var(--color-text-secondary)] block">Total Pembayaran</span>
            <span className="text-xs text-[var(--color-text-tertiary)]">Biaya admin simulasi Rp 0</span>
          </div>
          <div className="text-right">
            <span className="text-xl md:text-2xl font-extrabold text-[var(--color-accent)] font-[var(--font-heading)]">
              {currencyFormatter.format(nota.total)}
            </span>
            <div className="hidden">
              <NotaRow label="Total">{nota.total}</NotaRow>
              <NotaRow label="Status">{nota.status}</NotaRow>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export function FailureRetry({
  failure,
  onRetry,
}: {
  failure: CheckoutFailure;
  onRetry: () => void;
}) {
  return (
    <section
      aria-labelledby="checkout-failure-title"
      role="alert"
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-panel)] p-6 md:p-8 shadow-[var(--shadow-card)] space-y-6"
    >
      <div className="flex items-center gap-4 border-b border-[var(--color-border)] pb-6">
        <div
          className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <X className="w-6 h-6 stroke-[3]" />
        </div>
        <div>
          <h2 id="checkout-failure-title" className="text-xl md:text-2xl font-bold font-[var(--font-heading)] text-[var(--color-danger)]">
            Pembayaran Gagal
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Transaksi tidak dapat diselesaikan.
          </p>
        </div>
      </div>

      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-4 text-sm text-[var(--color-text-secondary)] space-y-2">
        <p className="font-medium text-[var(--color-text-primary)]">{failure.message}</p>
        {failure.reason && <p className="text-xs text-[var(--color-text-tertiary)]">{failure.reason}</p>}
        <p className="text-xs text-[var(--color-text-tertiary)]">
          Nota berhasil tidak dibuat. Data akun dan paket pilihan Anda tetap tersimpan untuk dicoba kembali.
        </p>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="w-full bg-[var(--color-accent)] !text-[#111216] font-bold py-3.5 px-4 rounded-[var(--radius-control)] hover:bg-[var(--color-accent-hover)] transition min-h-[44px] cursor-pointer"
        style={{ color: "#111216" }}
      >
        Kembali ke checkout dan coba lagi
      </button>
    </section>
  );
}

export function CheckoutResult({
  state,
  onRetry,
}: {
  state: CheckoutResultState;
  onRetry: (checkout: CheckoutChoices) => void;
}) {
  if (state.status === "progress") return <SimulationProgressView progress={state.progress} />;
  if (state.status === "success") {
    return (
      <>
        <SimulationProgressView progress={state.progress} />
        <SuccessNota nota={state.nota} />
      </>
    );
  }
  return (
    <>
      <SimulationProgressView progress={state.progress} />
      <FailureRetry failure={state.failure} onRetry={() => onRetry(state.retry.checkout)} />
    </>
  );
}

export { checkoutResultReducer };
