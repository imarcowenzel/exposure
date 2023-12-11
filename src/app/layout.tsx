import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import Footer from "@/components/footer";
import MobileNavbar from "@/components/mobile-navbar";
import Sidebar from "@/components/sidebar";
import { Providers } from "@/providers";
import "./globals.css";

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
          <main className="flex">
            <Sidebar />
            <section className="flex min-h-[100dvh] flex-1 flex-col">
              <MobileNavbar />
              <div className="h-full">{children}</div>
              <Footer />
            </section>
          </main>
        </Providers>
      </body>
    </html>
  );
}
