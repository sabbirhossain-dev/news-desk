import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
  variable: "--font-noto-serif-bengali",
});

export const metadata: Metadata = {
  title: "News Desk",
  description: "A News Portal site",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${notoSerifBengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <Marquee />
        <main className="max-w-7xl mx-auto w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
