import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const editorial = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://domusloucis.com"),
  title: {
    default: "Domus Loucis — House of Light",
    template: "%s · Domus Loucis",
  },
  description:
    "Editorial photography rooted in intimacy and light. Weddings, portraits, commercial, and lifestyle work by Domus Loucis.",
  keywords: [
    "photography",
    "wedding photography",
    "editorial photography",
    "portrait photography",
    "commercial photography",
    "lifestyle photography",
    "House of Light",
    "Domus Loucis",
  ],
  authors: [{ name: "Domus Loucis" }],
  creator: "Domus Loucis",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://domusloucis.com",
    siteName: "Domus Loucis",
    title: "Domus Loucis — House of Light",
    description:
      "Editorial photography rooted in intimacy and light.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Domus Loucis — House of Light",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Domus Loucis — House of Light",
    description: "Editorial photography rooted in intimacy and light.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${editorial.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="grain min-h-screen bg-bone text-ink antialiased">
        <SmoothScroll>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}