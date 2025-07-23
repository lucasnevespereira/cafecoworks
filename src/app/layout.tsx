import type { Metadata } from "next";
import Head from "next/head";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cafecoworks.com"),
  title: "cafecoworks - Find Coworking Cafes",
  description:
    "Discover the best cafe coworking spaces around the world. Work remotely in beautiful, coffee-fueled environments.",
  keywords: "coworking, cafes, remote work, digital nomad, workspace",
  authors: [{ name: "cafecoworks" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "cafecoworks - Find Coworking Cafes",
    description: "Discover the best cafe coworking spaces around the world",
    url: "https://cafecoworks.com",
    siteName: "cafecoworks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cafecoworks - Find Coworking Cafes",
    description: "Discover the best cafe coworking spaces around the world",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cafeco" suppressHydrationWarning>
      <Head>
        <link rel="canonical" href="https://cafecoworks.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body
        className={`${spaceGrotesk.variable} antialiased font-[family-name:var(--font-space-grotesk)]`}
        suppressHydrationWarning
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
