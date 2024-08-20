import { api } from "@/trpc/server";
import Announcement from "./Announcement";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { AccountType } from "@prisma/client";
import Link from "next/link";


export default async function Announcements() {
    const user = await currentUser();

    const account = await db.account.findFirstOrThrow({
        where: {
            id: user?.id,
        },
    });

    const announcements = await api.announcement.getAnnouncements({
        page: 1,
        perPage: 10,
    })

    return (
        <main className="flex flex-col grow">
            <div className="grid grid-cols-4">
                {account.type == AccountType.ADMIN &&
                    <Link href="/announcements/new" className="btn btn-primary">Create Announcement</Link>
                }
                {announcements.map((announcement) => {
                    return <Announcement announcement={announcement} />
                })}
                {!announcements.length && <div className="card bordered col-span-4">No announcements found</div>}
            </div>
        </main>
    );
}
