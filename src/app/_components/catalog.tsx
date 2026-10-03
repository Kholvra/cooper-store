"use client";

import { useEffect, useMemo, useState } from "react";

import { OfferCard } from "~/app/_components/offer-card";
import { catalogMetadata } from "~/shared/catalog-metadata";
import type { CatalogGame } from "~/server/catalog-data";
import {
  SELECTED_OFFER_SESSION_KEY,
  type SelectedOfferContext,
} from "~/shared/selected-offer";

type CatalogOfferFromDatabase = CatalogGame["offers"][number] & {
  id: number;
  position: number;
};

type CatalogGameFromDatabase = Omit<CatalogGame, "offers"> & {
  id: number;
  position: number;
  offers: CatalogOfferFromDatabase[];
};


const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function Catalog() {
  const [games, setGames] = useState<CatalogGameFromDatabase[]>([]);
  const [query, setQuery] = useState("");
  const [selectedOffer, setSelectedOffer] =
    useState<SelectedOfferContext | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryNumber, setRetryNumber] = useState(0);
  const [handoffError, setHandoffError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    setIsLoading(true);
    setLoadError(null);

    fetch("/api/catalog", { cache: "no-store" })
      .then(async (response) => {
        const body = (await response.json()) as
          | CatalogGameFromDatabase[]
          | { error?: string };

        if (!response.ok || !Array.isArray(body)) {
          throw new Error(
            !Array.isArray(body) && body.error
              ? body.error
              : "Katalog tidak dapat dimuat. Silakan coba lagi.",
          );
        }

        if (isActive) setGames(body);
      })
      .catch((error: unknown) => {
        if (isActive) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Katalog tidak dapat dimuat. Silakan coba lagi.",
          );
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [retryNumber]);

  const filteredGames = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("id-ID");
    if (!normalizedQuery) return games;

    return games.flatMap((game) => {
      const gameSearchLabels = [
        game.name,
        game.slug === "roblox" ? "Voucher Robux Gift Card IDR" : game.currency,
        ...(game.slug === "mlbb" ? ["MLBB"] : []),
      ];
      const gameMatches = gameSearchLabels.some((label) =>
        label.toLocaleLowerCase("id-ID").includes(normalizedQuery),
      );
      if (gameMatches) return [game];

      const matchingOffers = game.offers.filter((offer) =>
        offer.label.toLocaleLowerCase("id-ID").includes(normalizedQuery),
      );
      return matchingOffers.length > 0
        ? [{ ...game, offers: matchingOffers }]
        : [];
    });
  }, [games, query]);

  function continueToCheckout() {
    if (!selectedOffer) return;

    try {
      window.sessionStorage.setItem(
        SELECTED_OFFER_SESSION_KEY,
        JSON.stringify(selectedOffer),
      );
      window.location.assign("/checkout");
    } catch {
      setHandoffError(
        "Pilihan tidak dapat diteruskan di sesi browser ini. Periksa pengaturan browser lalu coba lagi.",
      );
    }
  }

  return (
    <main className={`storefront${selectedOffer ? " has-selection" : ""}`}>
      <header className="store-header">
        <a className="store-name" href="/" aria-label="Katalog game">
          Katalog game
        </a>
        <span className="header-note">Top-up dan voucher game</span>
      </header>

      <div className="catalog-heading">
        <div>
          <p className="page-kicker">Pilih game, lalu bandingkan paket</p>
          <h1>Temukan paket yang sesuai</h1>
          <p className="heading-description">
            Sembilan pilihan game dengan paket dari transkripsi daftar harga.
          </p>
        </div>
        <p className="price-disclaimer">
          Harga adalah referensi transkripsi, bukan konfirmasi harga resmi atau terbaru.
        </p>
      </div>

      <label className="search-field">
        <span>Cari game atau paket</span>
        <span className="search-control">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Contoh: Free Fire, UC, atau Robux"
            autoComplete="off"
          />
          {query && (
            <button
              className="clear-search"
              type="button"
              onClick={() => setQuery("")}
            >
              Hapus pencarian
            </button>
          )}
        </span>
      </label>

      <div className="catalog-layout">
        <section className="game-directory" aria-label="Daftar game dan paket">
          {isLoading ? (
            <p className="state-message" role="status">
              Memuat daftar game dan paket…
            </p>
          ) : loadError ? (
            <div className="state-message error-state" role="alert">
              <p>{loadError}</p>
              <button
                className="secondary-button"
                type="button"
                onClick={() => setRetryNumber((attempt) => attempt + 1)}
              >
                Coba muat ulang
              </button>
            </div>
          ) : filteredGames.length === 0 ? (
            <div className="state-message empty-state" role="status">
              <h2>Tidak ada paket yang cocok</h2>
              <p>Ubah kata pencarian atau tampilkan kembali semua game.</p>
              <button
                className="secondary-button"
                type="button"
                onClick={() => setQuery("")}
              >
                Tampilkan semua game
              </button>
            </div>
          ) : (
            <div className="game-list">
              {filteredGames.map((game) => (
                <section className="game-section" key={game.slug}>
                  <div className="game-heading">
                    <div>
                      <h2>
                        {game.name}
                        {game.slug === "mlbb" && <span> (MLBB)</span>}
                      </h2>
                      <p>
                        {game.slug === "roblox"
                          ? "Voucher: Robux / Gift Card IDR"
                          : game.currency}
                      </p>
                    </div>
                    <span className="offer-count">
                      {game.offers.length} paket
                    </span>
                  </div>

                  {game.slug === "mlbb" && (
                    <p className="source-gap">
                      {catalogMetadata.mlbbGapDisclosure}
                    </p>
                  )}

                  <div className="offer-list">
                    {game.offers.map((offer) => {
                      const isSelected =
                        selectedOffer !== null &&
                        selectedOffer.gameSlug === game.slug &&
                        selectedOffer.offerId === offer.id;
                      return (
                        <OfferCard
                          key={offer.id}
                          label={offer.label}
                          currency={game.slug === "roblox" ? "Voucher" : game.currency}
                          price={offer.price}
                          selected={isSelected}
                          onSelect={() => {
                            setSelectedOffer({
                              version: 1,
                              gameSlug: game.slug,
                              gameName: game.name,
                              currency: game.currency,
                              kind: game.slug === "roblox" ? "voucher" : "top-up",
                              offerId: offer.id,
                              offerLabel: offer.label,
                              price: offer.price,
                            });
                            setHandoffError(null);
                          }}
                        />
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </section>

        <aside
          className="selection-panel"
          data-selected={selectedOffer ? "true" : "false"}
          aria-label="Paket pilihan"
        >
          <p className="panel-label">Paket pilihan</p>
          {selectedOffer ? (
            <>
              <h2>
                {selectedOffer.gameName}
                {selectedOffer.gameSlug === "mlbb" && <span> (MLBB)</span>}
              </h2>
              <p className="selected-offer-name">{selectedOffer.offerLabel}</p>
              <p className="selected-offer-currency">
                {selectedOffer.kind === "voucher"
                  ? "Jalur voucher · Robux / Gift Card IDR"
                  : selectedOffer.currency}
              </p>
              <p className="selected-offer-price">
                {currencyFormatter.format(selectedOffer.price)}
              </p>
            </>
          ) : (
            <p className="selection-prompt">
              Pilih satu paket untuk melihat ringkasannya di sini.
            </p>
          )}
          {handoffError && (
            <p className="handoff-error" role="alert">
              {handoffError}
            </p>
          )}
          <button
            className="primary-button"
            type="button"
            disabled={!selectedOffer}
            onClick={continueToCheckout}
          >
            Lanjut ke checkout
          </button>
        </aside>
      </div>

      <footer className="store-footer">
        <p>Daftar paket mengikuti entri yang terbaca pada dokumen sumber.</p>
      </footer>
    </main>
  );
}
