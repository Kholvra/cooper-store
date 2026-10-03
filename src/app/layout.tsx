import "~/styles/globals.css";
import { type Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Simulasi Katalog & Top-Up Game (Hanya Simulasi)",
  description: "Platform simulasi katalog dan transaksi top-up game lokal non-komersial (hanya simulasi, tanpa pembayaran nyata, jaringan, atau verifikasi akun).",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        {children}
      </body>
    </html>
  );
}
