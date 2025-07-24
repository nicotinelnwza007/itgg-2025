// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Kanit, Kalnia, Agbalumo } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import DessertBackground from "./components/bg/DessertBackground";
import Navbar from "./components/Navbar";

// Fonts
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const kalnia = Kalnia({
  variable: "--font-kalnia",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const agbalumo = Agbalumo({
  variable: "--font-agbalumo",
  subsets: ["latin"],
  weight : "400",
  display: "swap",
});

const siteUrl = "https://itgg-2025.vercel.app";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ITGG 2025",
    template: `%s | ITGG 2025`,
  },
  openGraph: {
    title: "ITGG 2025",
    description: "ITGG 2025",
    url: siteUrl,
    siteName: "ITGG 2025",
    images: [
      {
        url: `${siteUrl}/itggbanner.png`,
        width: 5120,
        height: 2280,
        alt: "ITGG 2025",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${kanit.variable} ${kalnia.variable} ${agbalumo.variable}`}
    >
      <body className="antialiased font-kanit relative">
        <DessertBackground />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
