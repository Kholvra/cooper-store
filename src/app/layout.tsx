import "~/styles/globals.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulasi Katalog & Top-Up Game (Hanya Simulasi)",
  description: "Platform simulasi katalog dan transaksi top-up game lokal non-komersial (hanya simulasi, tanpa pembayaran nyata, jaringan, atau verifikasi akun).",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
