import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import { Providers } from "@/providers";
import "./globals.css";
import MobileNavbar from "@/components/mobile-navbar";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

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
          <main className="flex flex-col lg:flex-row">
            <Sidebar />
            <MobileNavbar />
            <section className="flex w-full min-h-[100dvh] flex-1 flex-col">
              <div className="h-full w-full">
                {children}
                </div>
              <Footer />
            </section>
          </main>
        </Providers>
      </body>
    </html>
  );
}
