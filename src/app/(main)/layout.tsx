import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getCurrentSession } from "@/lib/server/lucia";
import LogoutButton from "../_components/client/LogoutButton";
import "./globals.css";
import Logo from "../_components/shared/Logo";
import Link from "next/link";

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
    <html lang="en" className="overflow-y-auto h-full m-auto p-0" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-base-100 text-base-content font-bold font-mono overflow-auto m-auto p-0`}
      >
        <div id="container" className="bg-base-300 box-border w-[98%] max-w-[1500px] relative min-h-[94%] overflow-hidden mt-[1.5%] mb-[0.5%] mr-auto ml-auto p-5 rounded-box">
          <div className="logo float-none p-0 m-0">
            <div>
              <Link href="/">
                <Logo />
              </Link>
            </div>
          </div>
          <div id="charbar" className="h-[10px] w-full block overflow-hidden p-0 m-0 -mb-px bg-base-100"></div>
          <nav id="nav" className="bg-base-100 text-base-content before:text-base-content w-full min-h-5 m-0 block pt-px">
            <li className="inline-block">
              <Link href="/rules" target="_blank">Rules</Link>
            </li>
            <li className="inline-block">
              <Link href="/chats">Groups</Link>
            </li>
            <li className="inline-block">
              <a href="https://www.etsy.com/ca/shop/HSRPUniverseMerch" target="_blank">Merch</a>
            </li>
            {user !== null && (
              <li className="inline-block float-right">
                <LogoutButton/>
              </li>
            )}
            {user === null && (
              <>
              <li className="inline-block float-right">
                <Link href="/login">Login</Link>
              </li>
              <li className="inline-block float-right">
                <Link href="/register">Register</Link>
              </li>
              </>
            )}
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
