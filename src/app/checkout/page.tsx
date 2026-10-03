"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { CatalogGame } from "~/server/catalog-data";
import {
  SELECTED_OFFER_SESSION_KEY,
  type SelectedOfferContext,
} from "~/shared/selected-offer";

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

export default function CheckoutPage() {
  const [state, setState] = useState<HandoffState>({ status: "loading" });
  const [retryNumber, setRetryNumber] = useState(0);

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

        if (isActive) setState({ status: "ready", offer: parsedValue });
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

  return (
    <main className="storefront checkout-page">
      <header className="store-header">
        <Link className="store-name" href="/">
          Katalog game
        </Link>
        <span className="header-note">Checkout</span>
      </header>

      <section className="checkout-content" aria-labelledby="checkout-title">
        <p className="page-kicker">Konteks pilihan</p>
        <h1 id="checkout-title">Checkout</h1>

        {state.status === "loading" ? (
          <p className="state-message" role="status">
            Memeriksa paket pilihan…
          </p>
        ) : state.status === "empty" ? (
          <div className="state-message empty-state" role="status">
            <h2>Belum ada paket pilihan</h2>
            <p>Pilih satu paket dari katalog untuk melanjutkan ke sini.</p>
            <Link className="secondary-button" href="/">
              Kembali ke katalog
            </Link>
          </div>
        ) : state.status === "invalid" ? (
          <div className="state-message error-state" role="alert">
            <h2>Paket pilihan tidak tersedia</h2>
            <p>Paket tidak dapat dipastikan dari katalog saat ini. Pilih ulang dari daftar paket.</p>
            <Link className="secondary-button" href="/">
              Pilih paket lagi
            </Link>
          </div>
        ) : state.status === "error" ? (
          <div className="state-message error-state" role="alert">
            <h2>Paket belum dapat diperiksa</h2>
            <p>{state.message}</p>
            <button
              className="secondary-button"
              type="button"
              onClick={() => setRetryNumber((attempt) => attempt + 1)}
            >
              Coba lagi
            </button>
          </div>
        ) : (
          <div className="handoff-summary">
            <p className="panel-label">Paket diteruskan dari katalog</p>
            <h2>{state.offer.gameName}</h2>
            <p className="selected-offer-name">{state.offer.offerLabel}</p>
            <p className="selected-offer-currency">
              {state.offer.kind === "voucher"
                ? "Jalur voucher"
                : `Top-up · ${state.offer.currency}`}
            </p>
            <p className="selected-offer-price">
              {currencyFormatter.format(state.offer.price)}
            </p>
            <p className="handoff-note">
              Konteks paket ini tersedia hanya selama sesi browser. Tidak ada data pesanan atau akun yang disimpan.
            </p>
            <Link className="secondary-button" href="/">
              Kembali ke katalog
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
