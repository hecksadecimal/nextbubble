import { Announcement as AnnouncementData } from "@prisma/client";




const Announcement = async ({announcement}: {announcement: AnnouncementData}) => {

    return (
        <div className="card bordered">
            <div className="card-body">
                <h2 className="card-title">{announcement.title}</h2>
                <p>{announcement.content}</p>
                <small>{announcement.createdAt.toDateString()}</small>
            </div>
        </div>
    )
}

export default Announcement;