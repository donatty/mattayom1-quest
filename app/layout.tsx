import type { Metadata, Viewport } from "next";
import { Chakra_Petch, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const display = Chakra_Petch({
  subsets: ["thai", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "ฐานภารกิจ ม.1 🚀",
  description: "แบบฝึกหัดเตรียมความพร้อม ม.1 ครบทุกวิชา สนุกแบบเกมภารกิจ",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${display.variable} ${body.variable}`}>
      <body className="font-body min-h-screen bg-base text-ink">
        {children}
      </body>
    </html>
  );
}
