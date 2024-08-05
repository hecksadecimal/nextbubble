import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { dark } from '@clerk/themes';

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
      baseTheme: dark
    }}>
      <html lang="en" className={`dark ${GeistSans.variable}`}>
        <body>
          <TRPCReactProvider>
            {children}
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
