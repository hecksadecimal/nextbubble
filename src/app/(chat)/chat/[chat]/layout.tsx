import React from 'react';
import { type Metadata } from "next";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export const metadata: Metadata = {
    title: "Dreambubble",
    description: "Anonymous roleplay site",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
    params
}: Readonly<{ children: React.ReactNode, params: { chat: string } }>) {
    return (
        <div className="flex flex-col h-screen">
            <div className="grow flex bg-gradient-to-b from-base-300 to-base-100 text-white">
                {children}
            </div>
        </div>
    );
}
