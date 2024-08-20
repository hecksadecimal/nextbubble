import { api } from "@/trpc/server";
import Announcement from "../Announcement";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { AccountType } from "@prisma/client";
import Link from "next/link";
import AnnouncementForm from "./AnnouncementForm";


export default async function NewAnnouncement() {
    const user = await currentUser();

    const account = await db.account.findFirstOrThrow({
        where: {
            id: user?.id,
        },
    });


    // Redirect if not an admin
    if (account.type != AccountType.ADMIN) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return (
        <main className="flex flex-col grow">
            <div className="grid grid-cols-4">
                <AnnouncementForm />
            </div>
        </main>
    );
}
