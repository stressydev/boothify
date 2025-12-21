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
    default: "Boothify | Photobooth Made Fun",
    template: "%s | Boothify",
  },
  description:
    "Boothify is a modern photobooth experience that captures memories with style, speed, and simplicity.",
  keywords: [
    "photobooth",
    "event photobooth",
    "wedding photobooth",
    "party booth",
    "Boothify",
    "photo app",
  ],
  metadataBase: new URL("https://Boothify.app"),
  openGraph: {
    title: "Boothify | Photobooth Made Fun",
    description:
      "Capture unforgettable moments with Boothify — the modern photobooth experience.",
    url: "https://Boothify.app",
    siteName: "Boothify",
    images: [
      {
        url: "/og-Boothify.png",
        width: 1200,
        height: 630,
        alt: "Boothify Photobooth Preview",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boothify | Photobooth Made Fun",
    description:
      "Capture unforgettable moments with Boothify — the modern photobooth experience.",
    images: ["/og-Boothify.png"],
  },
  alternates: {
    canonical: "https://Boothify.app",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}