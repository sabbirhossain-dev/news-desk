import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

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
        <ToastContainer position="bottom-right" autoClose={5000} />
        <Footer />
      </body>
    </html>
  );
}
