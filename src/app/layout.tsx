import type { Metadata } from "next";
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
  title: "cafeco.works - Find Coworking Cafes Worldwide",
  description:
    "Discover the best cafe coworking spaces around the world. Work remotely in beautiful, coffee-fueled environments.",
  keywords: "coworking, cafes, remote work, digital nomad, workspace",
  authors: [{ name: "cafeco.works" }],
  openGraph: {
    title: "cafeco.works - Find Coworking Cafes Worldwide",
    description: "Discover the best cafe coworking spaces around the world",
    url: "https://cafeco.works",
    siteName: "cafeco.works",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cafeco.works - Find Coworking Cafes Worldwide",
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
