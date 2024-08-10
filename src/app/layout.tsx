import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { dark, neobrutalism } from '@clerk/themes';
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: "Dreambubble",
  description: "Anonymous roleplay site",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode  }>) {
  return (
    <ClerkProvider appearance={{
      baseTheme: neobrutalism
    }}>
      <html suppressHydrationWarning data-theme="msparp" lang="en" className={`light ${GeistSans.variable}`}>
        <body>
          <TRPCReactProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
