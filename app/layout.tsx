import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Days",
  description: "Blockchain and Crypto Event of the Year",
  icons: [
    { rel: "icon", url: "/images/sepya-logo.jpg" },
    { rel: "apple-touch-icon", url: "/images/sepya-logo.jpg" },
    { rel: "shortcut icon", url: "/images/sepya-logo.jpg" },
  ],
  openGraph: {
    title: "Crypto Days",
    description: "Blockchain and Crypto Event of the Year",
    images: ["/images/sepya-logo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto Days",
    description: "Blockchain and Crypto Event of the Year",
    images: ["/images/sepya-logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
