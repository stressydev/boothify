import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.tsx
export const metadata = {
  title: {
    default: "Boothify - Free Online Photo Booth | Create Classic 4-Photo Strips Instantly",
    template: "%s | Boothify",
  },
  description:
    "Create stunning photo booth strips for free! No sign-up required. Capture 4 photos, customize with borders and text, and download instantly. Perfect for parties, weddings, and events.",
  keywords: [
    "free photo booth",
    "online photo booth",
    "photo strip maker",
    "4 photo booth",
    "classic photo booth",
    "photobooth app",
    "event photobooth",
    "wedding photobooth",
    "party booth",
    "photo booth online free",
    "instant photo booth",
    "no download photo booth",
    "browser photo booth",
    "custom photo strips",
    "photo booth generator",
    "virtual photo booth",
    "web photo booth",
    "photo booth filter",
    "photo collage maker",
    "memory strips",
  ],
  authors: [{ name: "Boothify" }],
  creator: "Boothify",
  publisher: "Boothify",
  metadataBase: new URL("https://boothify.app"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Boothify - Free Online Photo Booth | Create Classic 4-Photo Strips",
    description:
      "Create stunning photo booth strips for free! Capture 4 photos, customize with borders & text, download instantly. No sign-up required. Perfect for parties & events.",
    url: "https://boothify.app",
    siteName: "Boothify",
    images: [
      {
        url: "/og-boothify.png",
        width: 1200,
        height: 630,
        alt: "Boothify - Free Online Photo Booth App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boothify - Free Online Photo Booth",
    description:
      "Create stunning photo booth strips for free! No sign-up. Instant download. Perfect for parties & events.",
    images: ["/og-boothify.png"],
    creator: "@boothify",
  },
  alternates: {
    canonical: "https://boothify.app",
  },
  category: "Photography",
  classification: "Photo Booth Application",
  applicationName: "Boothify",
  referrer: "origin-when-cross-origin",
  appleWebApp: {
    capable: true,
    title: "Boothify Photo Booth",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  verification: {
    // Add your verification codes when you register with search engines
    // google: 'your-google-site-verification',
    // yandex: 'your-yandex-verification',
    // bing: 'your-bing-verification',
  },
};


export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Boothify',
    applicationCategory: 'PhotographyApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free online photo booth app to create classic 4-photo strips. No sign-up required, instant download.',
    url: 'https://boothify.app',
    screenshot: 'https://boothify.app/og-boothify.png',
    featureList: [
      'Classic 4-photo booth strips',
      'Custom borders and text',
      'Instant download',
      'No sign-up required',
      'Completely free',
      'Works in browser',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '100',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}