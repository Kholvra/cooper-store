import "~/styles/globals.css";
import { type Metadata } from "next";
export const metadata: Metadata = {
  title: {
    default: "cooper.gg — Simulasi Top-Up & Voucher Game",
    template: "%s | cooper.gg",
  },
  description: "Platform simulasi katalog dan transaksi top-up game lokal non-komersial (hanya simulasi, tanpa pembayaran nyata, jaringan, atau verifikasi akun).",
  applicationName: "cooper.gg",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        {children}
      </body>
    </html>
  );
}
