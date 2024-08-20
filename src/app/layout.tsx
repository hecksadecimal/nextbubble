import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { dark, neobrutalism } from '@clerk/themes';
import { ThemeProvider } from 'next-themes'
import { api, HydrateClient } from "@/trpc/server";
import { JsonObject, JsonValue } from "@prisma/client/runtime/library";

const bgStyle = `
.bg-theme {
  background-image: var(--bg-image);
}

.bg-theme-transparent {
  background: var(--bg-image-transparent);
}

`

let customStyle = ``;


export const metadata: Metadata = {
  title: "Dreambubble",
  description: "Anonymous roleplay site",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};


export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode  }>) {
  let customTheme = await api.account.getCustomTheme()
  
  if (customTheme) {
    console.log(customTheme)
    customStyle = `[data-theme=usertheme] {`
    /*
    for (const prop of customTheme) {
      customStyle += `  ${prop}`
    }
    */
    customStyle += `}`
  }

  return (
    <ClerkProvider appearance={{
      baseTheme: neobrutalism
    }}>
      <html data-theme="msparp" lang="en" className={`light ${GeistSans.variable}`}>
        <head>
          <link rel="manifest" href="/manifest.json" />
        </head>
        <body>
          <TRPCReactProvider>
            <ThemeProvider>
              <HydrateClient>
                {children}
                <style>{bgStyle}</style>
              </HydrateClient>
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
