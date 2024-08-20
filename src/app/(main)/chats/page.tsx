import Link from "next/link";

import { api, HydrateClient } from "@/trpc/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { db } from "@/server/db";

export default async function Chats() {
  const session = await currentUser();
    if (!auth().userId) {
        auth().redirectToSignIn({returnBackUrl: "/settings"});
    }
  const channels = await db.channel.findMany({
    orderBy: {updatedAt: "desc"}
  });

  return (
    <main className="flex flex-col grow">
      <div className="grid grid-cols-4">
      {channels.map((channel) => {
        return <div>
          {channel.id}
        </div>
      })}
      </div>
    </main>
  );
}
