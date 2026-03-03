import type { Metadata } from "next";
import { Syne, Outfit, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rohan Salunkhe — AI Engineer & Systems Builder",
  description:
    "I engineer systems that think, scale, and ship. AI Engineer building intelligent systems at Kpoint Technologies.",
  keywords: [
    "AI Engineer",
    "Systems Architecture",
    "Full Stack Developer",
    "Machine Learning",
    "Distributed Systems",
  ],
  authors: [{ name: "Rohan Salunkhe" }],
  openGraph: {
    title: "Rohan Salunkhe — AI Engineer & Systems Builder",
    description: "I engineer systems that think, scale, and ship.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Salunkhe — AI Engineer & Systems Builder",
    description: "I engineer systems that think, scale, and ship.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${syne.variable} ${outfit.variable} ${ibmPlexMono.variable}`}
    >
      <body className="noise">{children}</body>
    </html>
  );
}
