import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import TanstackQueryClientProvider from "@/providers/query-client-provider";

const outfit = Outfit({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "London Home Safety - Comprehensive Safety Solutions",
  description:
    "Expert electrical, gas, fire safety, and health services for homes across London. Your safety is our priority.",

  // Basic metadata
  applicationName: "London Home Safety",
  authors: [
    { name: "London Home Safety Team", url: "https://londonhomesafety.co.uk" },
  ],
  generator: "Next.js",
  keywords: [
    "London home safety",
    "electrical safety London",
    "gas safety London",
    "fire prevention London",
    "health services London",
    "home safety solutions",
  ],
  referrer: "origin-when-cross-origin",

  // // Icons
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },

  // Open Graph metadata
  openGraph: {
    title: "London Home Safety - Comprehensive Safety Solutions",
    description:
      "Protecting your home with expert safety solutions. From electrical and gas safety to fire prevention and health services, we ensure peace of mind for homeowners across London.",
    url: "https://londonhomesafety.co.uk",
    siteName: "London Home Safety",
    images: [
      {
        url: "https://londonhomesafety.co.uk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "London Home Safety banner image",
      },
    ],
    locale: "en_GB",
    type: "website",
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "London Home Safety - Comprehensive Safety Solutions",
    description:
      "Expert safety solutions for your home in London. From electrical to fire safety, we've got you covered.",
    creator: "@LondonHomeSafety",
    images: ["https://londonhomesafety.co.uk/twitter-image.jpg"],
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
    canonical: "https://londonhomesafety.co.uk",
    languages: {
      "en-GB": "https://londonhomesafety.co.uk/en-GB",
      "es-ES": "https://londonhomesafety.co.uk/es-ES",
    },
  },

  // App-specific metadata
  appleWebApp: {
    title: "London Home Safety App",
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
  classification: "Home Safety Services",
  creator: "London Home Safety",
  publisher: "London Home Safety",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <TanstackQueryClientProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
            <Toaster />
          </ThemeProvider>
        </TanstackQueryClientProvider>
      </body>
    </html>
  );
}
