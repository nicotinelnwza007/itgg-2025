// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Noto_Sans_Thai } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";
import Footer from "./components/Footer";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "itgg-2025",
  description: "itgg-2025",
  viewport: "width=device-width, initial-scale=1"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${notoSansThai.variable}`}>
      <body
        className="antialiased"
        style={{
          fontFamily: "var(--font-noto-sans-thai)",
    background: "linear-gradient(21deg,rgba(74, 53, 53, 1) 13%, rgba(153, 103, 93, 1) 69%)",
        }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
