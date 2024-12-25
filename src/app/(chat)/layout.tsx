import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getCurrentSession } from "@/lib/server/lucia";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DREAMBUBBLE",
  description: "A Homestuck roleplaying community.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getCurrentSession();
  
  return (
    <html lang="en" data-theme="light" className="h-dvh w-dvw flex flex-col overflow-hidden">
      <head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, interactive-widget=resizes-content" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col w-full h-full overflow-hidden m-2`}
      >
        {children}
      </body>
    </html>
  );
}
