import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
      <body
        className={`${spaceGrotesk.variable} antialiased font-[family-name:var(--font-space-grotesk)]`}
        suppressHydrationWarning
      >
        <Header />
        {children}
        <Footer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#2c1810",
              color: "#fffef9",
              borderRadius: "0.75rem",
            },
          }}
        />
      </body>
    </html>
  );
}
