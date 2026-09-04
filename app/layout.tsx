import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { SITE_URL } from "../lib/site-data";
import { Analytics } from "./components/Analytics";
import "./globals.css";

const displayFont = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Cleaning Services Gold Coast | LAP Cleaning Services", template: "%s | LAP Cleaning Services" },
  description: "Home, office, bond, corporate and Airbnb cleaning across the Gold Coast. Request a tailored quote from LAP Cleaning Services.",
  applicationName: "LAP Cleaning Services",
  icons: { icon: "/favicon.jpg", apple: "/favicon.jpg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "LAP Cleaning Services",
    url: "/",
    title: "Cleaning Services Gold Coast | LAP Cleaning Services",
    description: "Home, office, bond, corporate and Airbnb cleaning across the Gold Coast. Request a tailored quote.",
    images: [{ url: "/og-brand.jpg", width: 1731, height: 909, alt: "LAP Cleaning Services Gold Coast" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LAP Cleaning Services Gold Coast",
    description: "Seven cleaning options across the Gold Coast, Queensland.",
    images: ["/og-brand.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fffdf9",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>{children}<Analytics /></body>
    </html>
  );
}
