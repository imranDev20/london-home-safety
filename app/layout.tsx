import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartProvider from "@/providers/cart-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Company Name - Professional Services",
  description:
    "We provide top-quality electrical, gas, fire safety, and health & safety services for residential and commercial properties.",

  // Basic metadata
  applicationName: "Your Company Name",
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  generator: "Next.js",
  keywords: [
    "electrical services",
    "gas services",
    "fire safety",
    "health and safety",
    "property maintenance",
  ],
  referrer: "origin-when-cross-origin",

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Open Graph metadata
  openGraph: {
    title: "Your Company Name - Professional Property Services",
    description:
      "Expert electrical, gas, fire safety, and health & safety services for your property.",
    url: "https://yourwebsite.com",
    siteName: "Your Company Name",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Company Name banner image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Your Company Name - Professional Property Services",
    description:
      "Expert electrical, gas, fire safety, and health & safety services for your property.",
    creator: "@yourtwitter",
    images: ["https://yourwebsite.com/twitter-image.jpg"],
  },

  // Verification for search engines
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Alternate languages
  alternates: {
    canonical: "https://yourwebsite.com",
    languages: {
      "en-US": "https://yourwebsite.com/en-US",
      "es-ES": "https://yourwebsite.com/es-ES",
    },
  },

  // App-specific metadata
  appleWebApp: {
    title: "Your Company App",
    statusBarStyle: "black-translucent",
    startupImage: [
      "/apple-splash-2048-2732.jpg",
      {
        url: "/apple-splash-1668-2224.jpg",
        media:
          "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },

  // Manifest file
  manifest: "/manifest.json",

  // Other metadata
  category: "business",
  classification: "Property Services",
  creator: "Your Company Name",
  publisher: "Your Company Name",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
