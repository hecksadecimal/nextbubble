import Link from "next/link";

import { api, HydrateClient } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { db } from "@/server/db";

export default async function Home() {
  const session = await currentUser();
  const channels = await db.channel.findMany({
    orderBy: {updatedAt: "desc"}
  });

  return (
    <HydrateClient>
      <main className="flex flex-col grow">
        <div className="flex flex-wrap">
        {channels.map((channel) => {
          return <div>
            {channel.id}
          </div>
        })}
        </div>
      </main>
    </HydrateClient>
  );
}
