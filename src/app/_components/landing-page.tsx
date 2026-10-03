"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Headphones,
  Zap,
  ShoppingCart,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { getGameAsset } from "~/shared/game-assets";
import type { CatalogGame } from "~/server/catalog-data";

type CatalogGameFromDatabase = Omit<CatalogGame, "offers"> & {
  id: number;
  position: number;
  offers: { id: number; label: string; price: number; position: number }[];
};

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

interface PopularDealFromDatabase {
  id: number;
  gameSlug: string;
  title: string;
  dealName: string;
  badge: string;
  instant: boolean;
  soldCount: string;
  oldPrice: number;
  price: number;
  image: string;
  position: number;
}

export function LandingPage() {
  const [games, setGames] = useState<CatalogGameFromDatabase[]>([]);
  const [popularDeals, setPopularDeals] = useState<PopularDealFromDatabase[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/catalog", { cache: "no-store" }).then((res) => res.json()),
      fetch("/api/deals", { cache: "no-store" }).then((res) => res.json()),
    ])
      .then(([catalogData, dealsData]) => {
        if (Array.isArray(catalogData)) setGames(catalogData);
        if (Array.isArray(dealsData)) setPopularDeals(dealsData);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredGames = useMemo(() => {
    if (!query.trim()) return games;
    const lower = query.toLowerCase();
    return games.filter((g) => g.name.toLowerCase().includes(lower));
  }, [games, query]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-[var(--font-sans)]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-[var(--color-accent)] font-[var(--font-heading)]">
                COOPER<span className="text-[var(--color-text-primary)]">.GG</span>
              </span>
            </Link>

            {/* Category Nav */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-accent)] text-[var(--color-on-accent)]"
              >
                Top Ups
              </Link>
              <Link
                href="/catalog?game=roblox"
                className="px-3 py-1.5 rounded-full text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
              >
                Vouchers
              </Link>
            </nav>
          </div>

          {/* Search bar in nav */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari game, diamonds, atau voucher..."
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border-control)] rounded-full px-4 py-2 pl-10 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-border-focus)] focus:outline-none transition"
              />
              <span className="absolute left-3.5 top-2.5 text-[var(--color-text-tertiary)] flex items-center" aria-hidden="true">
                <Search className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
              <Headphones className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Layanan 24/7</span>
            </div>
            <Link
              href="/catalog"
              className="px-4 py-2 text-xs font-bold rounded-lg bg-[var(--color-accent)] text-[var(--color-on-accent)] hover:bg-[var(--color-accent-hover)] transition"
            >
              Semua Game
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-12">
        {/* Popular Deals / Carousel Section */}
        <section aria-labelledby="deals-heading">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 id="deals-heading" className="text-xl md:text-2xl font-bold tracking-tight font-[var(--font-heading)] flex items-center gap-2">
                Popular Deals <span className="text-[10px] bg-red-600 text-white font-black px-1.5 py-0.5 rounded uppercase">HOT</span>
              </h2>
            </div>
            <p className="text-xs text-[var(--color-text-tertiary)] hidden sm:block">
              Penawaran simulasi harga terpopuler minggu ini
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularDeals.map((deal) => (
              <div
                key={deal.dealName}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-card)] flex flex-col justify-between hover:border-[var(--color-accent)] transition group"
              >
                {/* Visual header with badge */}
                <div className="relative h-40 bg-[var(--color-surface-raised)] overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={deal.image}
                    alt={deal.dealName}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-emerald-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded">
                      {deal.badge}
                    </span>
                    {deal.instant && (
                      <span className="bg-[var(--color-accent)] text-black text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-current" />
                        Instant
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex justify-between items-center text-[10px] text-white bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                    <span className="font-bold uppercase tracking-wider">{deal.title}</span>
                    <span className="text-emerald-400 font-medium">{deal.soldCount}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition line-clamp-1">
                      {deal.dealName}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs line-through text-[var(--color-text-tertiary)]">
                        {currencyFormatter.format(deal.oldPrice)}
                      </span>
                      <span className="text-base font-extrabold text-[var(--color-accent)]">
                        {currencyFormatter.format(deal.price)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/catalog?game=${deal.gameSlug}`}
                    className="mt-4 w-full py-2.5 px-3 rounded-[var(--radius-control)] bg-[var(--color-accent)] text-[var(--color-on-accent)] hover:bg-[var(--color-accent-hover)] font-bold text-xs text-center flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Beli Sekarang</span>
                    <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Games Directory Grid */}
        <section aria-labelledby="games-heading">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 id="games-heading" className="text-xl md:text-2xl font-bold tracking-tight font-[var(--font-heading)]">
                Game Populer & Top-Up Terlengkap
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                Pilih game untuk melihat katalog daftar harga dan nominal top-up secara rinci.
              </p>
            </div>
            <Link
              href="/catalog"
              className="text-xs font-semibold text-[var(--color-accent)] hover:underline flex items-center gap-1"
            >
              <span>Lihat Semua Katalog</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-sm text-[var(--color-text-tertiary)]">
              Memuat daftar game...
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredGames.map((game) => {
                const asset = getGameAsset(game.slug);
                return (
                  <Link
                    key={game.slug}
                    href={`/catalog?game=${game.slug}`}
                    className="bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-[var(--radius-card)] p-4 flex flex-col items-center text-center transition group shadow-[var(--shadow-card)]"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[var(--color-surface-raised)] border border-[var(--color-border)] mb-3 group-hover:scale-105 transition-transform duration-200">
                      <img
                        src={asset.logo}
                        alt={game.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition line-clamp-1">
                      {game.name}
                    </h3>
                    <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1">
                      {game.offers.length} Nominal
                    </p>
                    <span className="mt-3 text-[11px] font-semibold text-[var(--color-accent)] px-2.5 py-1 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-border)] group-hover:border-[var(--color-accent)] transition">
                      {game.slug === "roblox" ? "Voucher" : "Top Up"}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Feature Value Props Banners (Money-Back Guarantee & 24/7 Support) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-[var(--font-heading)] text-amber-200">
                Jaminan Simulasi Transparan
              </h3>
              <p className="text-xs text-amber-200/70 mt-2 leading-relaxed">
                Platform ini menyediakan simulasi alur checkout dan kalkulasi harga transkripsi secara akurat dan aman tanpa memungut pembayaran nyata.
              </p>
            </div>
            <Link
              href="/catalog"
            >
              <span>Pelajari Alur Simulasi</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-[var(--font-heading)] text-emerald-200">
                Nota & Pelacakan Seketika
              </h3>
              <p className="text-xs text-emerald-200/70 mt-2 leading-relaxed">
                Dapatkan nota faktur otomatis langsung setelah konfirmasi simulasi selesai dengan pelacakan status bertahap secara real-time.
              </p>
            </div>
            <Link
              href="/checkout"
            >
              <span>Cek Halaman Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] mt-16 py-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[var(--color-text-secondary)]">
          <div>
            <span className="font-bold text-base text-[var(--color-accent)] font-[var(--font-heading)]">
              COOPER.GG
            </span>
            <p className="mt-1">
              Platform Simulasi Katalog & Top-Up Game 2026. Seluruh hak cipta game milik pemilik aslinya.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span>Metode: QRIS • E-Wallet • Virtual Account</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
