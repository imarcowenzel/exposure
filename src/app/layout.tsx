import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Footer from "@/components/footer";
import MobileNavbar from "@/components/navbar/mobile-navbar";
import Sidebar from "@/components/sidebar/sidebar";
import { Providers } from "@/providers";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "EXPOSURE | Explore",
  description: "A ficctitional website to post photographies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <div className="flex">
            <Sidebar />
            <div className="flex min-h-[100dvh] flex-1 flex-col">
              <MobileNavbar />
              <main className="h-full">{children}</main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
