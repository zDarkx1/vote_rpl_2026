import type { Metadata } from "next";
import { Alfa_Slab_One, Bebas_Neue, Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const alfaSlabOne = Alfa_Slab_One({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voting Kojur & Wakojur RPL 2026",
  description:
    "Pemilihan Koordinator Jurusan dan Wakil Koordinator Jurusan RPL 2026. Pilih pemimpin terbaik untuk jurusan kita!",
  keywords: ["voting", "RPL", "koordinator jurusan", "wakil koordinator", "2026"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${alfaSlabOne.variable} ${bebasNeue.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col retro-sunburst-bg retro-grain">
        <a href="#main-content" className="skip-link">
          Langsung ke konten utama
        </a>
        <main id="main-content" className="flex-1 relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
