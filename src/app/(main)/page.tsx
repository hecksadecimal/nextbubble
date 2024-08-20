import Link from "next/link";

import { api, HydrateClient } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { db } from "@/server/db";

export default async function Home() {
  const session = await currentUser();

  return (
    <main className="flex flex-col grow">
      <div className="flex flex-wrap">
        {session &&
          <small>{session.id}</small>  
        }
      </div>
    </main>
  );
}
