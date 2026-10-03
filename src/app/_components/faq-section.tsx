"use client";

import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string | string[];
}

export const generalFaqData: FaqItem[] = [
  {
    question: "Bagaimana cara melakukan top up game di Cooper Store?",
    answer: [
      "1. Pilih game favorit Anda dari katalog.",
      "2. Tentukan nominal diamond, currency, atau voucher yang diinginkan.",
      "3. Masukkan User ID atau Player ID akun tujuan sesuai petunjuk game.",
      "4. Pilih metode pembayaran simulasi (QRIS, E-Wallet, atau Virtual Account).",
      "5. Periksa detail pesanan dan selesaikan transaksi simulasi.",
    ],
  },
  {
    question: "Apakah transaksi di Cooper Store aman dan legal?",
    answer:
      "Sangat aman. Transaksi hanya membutuhkan ID game tujuan tanpa pernah meminta password akun Anda. Alur pembelian disimulasikan sesuai standar keamanan resmi.",
  },
  {
    question: "Metode pembayaran apa saja yang didukung?",
    answer:
      "Kami mendukung pembayaran instan via QRIS, E-Wallet (GoPay, DANA, OVO, ShopeePay), serta Transfer Virtual Account Bank.",
  },
  {
    question: "Berapa lama proses transaksi hingga item masuk?",
    answer:
      "Transaksi diproses secara instan dan otomatis 24 jam. Pada platform simulasi ini, status keberhasilan dan nota faktur diterbitkan langsung setelah konfirmasi.",
  },
  {
    question: "Apakah tersedia garansi jika terjadi kendala pada pesanan?",
    answer:
      "Ya, Cooper Store menyediakan perlindungan jaminan dan layanan bantuan pelanggan 24/7 untuk memastikan setiap kendala transaksi dapat ditangani dengan transparan.",
  },
];

export function FaqSection({
  title = "Pertanyaan Umum",
  description = "Hal yang sering ditanyakan seputar cara pemesanan, keamanan, dan metode pembayaran.",
}: {
  title?: string;
  description?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section aria-labelledby="faq-title" className="w-full mt-20 pt-12 border-t border-[var(--color-border)]">
      <div className="max-w-3xl mx-auto">
        {/* Clean, uncrowded header */}
        <div className="mb-10 text-center">
          <h2
            id="faq-title"
            className="text-2xl md:text-3xl font-bold font-[var(--font-heading)] text-[var(--color-text-primary)] tracking-tight"
          >
            {title}
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">
            {description}
          </p>
        </div>

        {/* Minimalist accordion with smooth grid-template-rows animation */}
        <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {generalFaqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.question} className="group transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full py-5 text-left flex items-center justify-between gap-4 font-medium text-base text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer select-none"
                >
                  <span className={`${isOpen ? "text-[var(--color-accent)] font-semibold" : ""}`}>
                    {item.question}
                  </span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-[#111216] rotate-180"
                        : "border-[var(--color-border-control)] text-[var(--color-text-tertiary)] group-hover:border-[var(--color-border-focus)] group-hover:text-[var(--color-text-primary)]"
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </span>
                </button>

                {/* CSS grid height expansion animation */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-5 pr-8 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {Array.isArray(item.answer) ? (
                        <ul className="space-y-1.5 list-none">
                          {item.answer.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{item.answer}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
