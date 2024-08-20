import { api } from "@/trpc/server";
import Announcement from "../Announcement";


export default async function Announcements({page}: {page: number}) {

    const announcements = await api.announcement.getAnnouncements({
        page: page,
        perPage: 10,
    })

    return (
        <main className="flex flex-col grow">
            <div className="grid grid-cols-4">
                {announcements.map((announcement) => {
                    return <Announcement announcement={announcement} />
                })}
                {!announcements.length && <div className="card bordered col-span-4">No announcements found</div>}
            </div>
        </main>
    );
}
