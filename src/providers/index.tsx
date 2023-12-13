"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'sonner';


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SessionProvider>
        {children}
        <Toaster position="top-right" richColors />
        </SessionProvider>
    </NextUIProvider>
  );
}
