import type { Metadata } from "next";
import { Geist, Noto_Sans_Thai } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

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

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "itgg-2025",
    description: "itgg-2025",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geist.variable} ${notoSansThai.variable}  antialiased`}
                style={{
                    background:
                        "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                }}
            >
                <Navbar />
                {children}
            </body>
        </html>
    );
}
