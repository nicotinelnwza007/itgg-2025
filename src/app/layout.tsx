// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Kanit, Kalnia, Agbalumo } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";
import Footer from "./components/Footer";
import DessertBackground from "./components/bg/DessertBackground";


// Fonts
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai", "latin"],
  weight: ["200"], // ExtraLight
  display: "swap",
});

const kalnia = Kalnia({
  variable: "--font-kalnia",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const agbalumo = Agbalumo({
  variable: "--font-agbalumo",
  subsets: ["latin"],
  weight : "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "itgg-2025",
  description: "itgg-2025",
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
        {/* <Navbar /> */}
        <main className="relative z-10">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
