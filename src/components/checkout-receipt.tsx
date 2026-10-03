"use client";

import type { ReactNode } from "react";

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
    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-b py-2 last:border-0">
      <dt className="font-medium">{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}

export function SuccessNota({ nota }: { nota: SuccessNota }) {
  return (
    <section aria-labelledby="nota-title" className="rounded-xl border p-5">
      <h2 id="nota-title" className="text-2xl font-bold">Nota</h2>
      <dl className="mt-3">
        <NotaRow label="Nomor simulasi">{nota.invoiceNumber}</NotaRow>
        <NotaRow label="Waktu transaksi simulasi">
          <time dateTime={nota.transactionTime}>{nota.transactionTime}</time>
        </NotaRow>
        <NotaRow label="Game">{nota.game}</NotaRow>
        <NotaRow label="Paket / voucher">{nota.offerName}</NotaRow>
        <NotaRow label="Jumlah">{nota.amount}</NotaRow>
        {nota.game !== "Roblox" && Object.entries(nota.accountValues).map(([field, value]) => (
          <NotaRow key={field} label={field}>{value}</NotaRow>
        ))}
        <NotaRow label="Metode pembayaran">{nota.paymentMethod}</NotaRow>
        <NotaRow label="Total">{nota.total}</NotaRow>
        <NotaRow label="Status"><span aria-hidden="true">✓ </span>{nota.status}</NotaRow>
      </dl>
      <p className="mt-4 rounded-lg border p-3">
        <strong>Simulasi saja.</strong> Nota ini tidak mengonfirmasi pembayaran nyata,
        verifikasi akun, atau pengiriman produk.
      </p>
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
    <section aria-labelledby="checkout-failure-title" role="alert" className="rounded-xl border p-5">
      <h2 id="checkout-failure-title" className="text-xl font-bold">Simulasi gagal</h2>
      <p>{failure.message}</p>
      {failure.reason && <p className="mt-1">{failure.reason}</p>}
      <p>Nota berhasil tidak dibuat. Data checkout Anda tetap tersedia untuk dicoba kembali.</p>
      <button type="button" onClick={onRetry} className="mt-4 rounded-lg border px-4 py-2 font-semibold">
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
