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
  const [selectedGameSlug, setSelectedGameSlug] = useState<string | null>(null);
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

  const activeGame = useMemo(() => {
    if (!selectedGameSlug) return null;
    return games.find((g) => g.slug === selectedGameSlug) || null;
  }, [games, selectedGameSlug]);

  function handleSelectGame(slug: string) {
    setSelectedGameSlug(slug);
    setSelectedOffer(null);
    setHandoffError(null);
  }

  function handleBackToGames() {
    setSelectedGameSlug(null);
    setSelectedOffer(null);
    setHandoffError(null);
  }

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
          <p className="page-kicker">
            {activeGame ? `Katalog Paket · ${activeGame.name}` : "Pilih Game Terlebih Dahulu"}
          </p>
          <h1>{activeGame ? `Pilih Nominal ${activeGame.slug === "roblox" ? "Voucher" : activeGame.currency}` : "Katalog Top-Up Game"}</h1>
          <p className="heading-description">
            {activeGame
              ? `Pilih paket ${activeGame.name} untuk melanjutkan ke simulasi pembayaran.`
              : "Pilih game favorit Anda untuk melihat daftar paket dan nominal harga."}
          </p>
        </div>
        <p className="price-disclaimer">
          Harga adalah referensi transkripsi, bukan konfirmasi harga resmi atau terbaru.
        </p>
      </div>

      {activeGame && (
        <div className="game-nav-back mb-6">
          <button
            type="button"
            onClick={handleBackToGames}
            className="back-game-button secondary-button inline-flex items-center gap-2"
          >
            <span aria-hidden="true">←</span> Ganti Pilihan Game
          </button>
        </div>
      )}

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
              Memuat katalog game…
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
          ) : !activeGame ? (
            /* STAGE 1: GAME GRID SELECTION */
            <div className="game-selection-stage">
              {filteredGames.length === 0 ? (
                <div className="state-message empty-state" role="status">
                  <h2>Tidak ada game yang cocok</h2>
                  <p>Ubah kata pencarian atau tampilkan kembali semua game.</p>
                  <button
                    className="secondary-button mt-4"
                    type="button"
                    onClick={() => setQuery("")}
                  >
                    Tampilkan semua game
                  </button>
                </div>
              ) : (
                <div className="game-tiles-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredGames.map((game) => (
                    <button
                      key={game.slug}
                      type="button"
                      onClick={() => handleSelectGame(game.slug)}
                      className="game-tile-card group p-5 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-[var(--radius-card)] text-left transition flex flex-col justify-between min-h-[140px] shadow-[var(--shadow-card)] cursor-pointer"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition">
                            {game.name}
                          </h2>
                          <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-surface-raised)] text-[var(--color-text-tertiary)] border border-[var(--color-border)] whitespace-nowrap">
                            {game.offers.length} paket
                          </span>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                          {game.slug === "roblox"
                            ? "Jalur voucher (Gift Card / Robux)"
                            : `Mata uang: ${game.currency}`}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[var(--color-accent)]">
                        <span>Pilih Game</span>
                        <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* STAGE 2: OFFERS / DIAMONDS FOR SELECTED GAME */
            <div className="game-offers-stage">
              <div className="game-selected-banner bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-5 mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold">
                    Game Terpilih
                  </span>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mt-0.5">
                    {activeGame.name}
                  </h2>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {activeGame.slug === "roblox"
                      ? "Voucher: Robux / Gift Card IDR"
                      : `Top-Up · ${activeGame.currency}`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleBackToGames}
                  className="secondary-button text-sm"
                >
                  Ganti Game Lain
                </button>
              </div>

              {activeGame.slug === "mlbb" && (
                <p className="source-gap mb-6 p-4 rounded-[var(--radius-control)] bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-sm text-[var(--color-warning)]">
                  {catalogMetadata.mlbbGapDisclosure}
                </p>
              )}

              <div className="offers-grid-container">
                <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
                  Pilih Nominal {activeGame.slug === "roblox" ? "Voucher" : activeGame.currency}
                </h3>
                <div className="offer-list">
                  {activeGame.offers.map((offer) => {
                    const isSelected =
                      selectedOffer !== null &&
                      selectedOffer.gameSlug === activeGame.slug &&
                      selectedOffer.offerId === offer.id;
                    return (
                      <OfferCard
                        key={offer.id}
                        label={offer.label}
                        currency={activeGame.slug === "roblox" ? "Voucher" : activeGame.currency}
                        price={offer.price}
                        selected={isSelected}
                        onSelect={() => {
                          setSelectedOffer({
                            version: 1,
                            gameSlug: activeGame.slug,
                            gameName: activeGame.name,
                            currency: activeGame.currency,
                            kind: activeGame.slug === "roblox" ? "voucher" : "top-up",
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
              </div>
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
