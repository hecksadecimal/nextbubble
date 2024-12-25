import { createSession, createChannel } from "better-sse"
import { MessageSchema, MessageSendSchema } from "@/app/_components/client/Message";
import { NextApiRequest, NextApiResponse } from "next";
import { characters } from "@/lib/shared/homestuck";
import { channels, broadcastSessionCount } from "@/lib/server/channels";
import { decancer } from "@/lib/shared/decancer";

export const dynamic = "force-dynamic";

let counter = 0

// TODO: Transition to App route (src/app/api/chat/[chatUrl]/stream/route.ts)
// when https://github.com/MatthewWid/better-sse/issues/79 is resolved.
// better-sse currently only supports Page routes.
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const session = await createSession(req, res)
        const channel = channels[req.query.chatUrl as string] ?? createChannel()
        if (!channels[req.query.chatUrl as string]) {
            channels[req.query.chatUrl as string] = channel
        }
        channel.setMaxListeners(0)
        channel.register(session)
    
        channel.on("session-registered", () => {
            broadcastSessionCount(channel)
        }).on("session-deregistered", () => {
            broadcastSessionCount(channel)
        });
    }

    if (req.method === "POST") {
        const message: MessageSendSchema = JSON.parse(req.body)
        message.content = decancer(message.content)
        const channel = channels[req.query.chatUrl as string]
        channel.broadcast({
            id: counter++,
            content: message.content,
            sentAt: new Date(),
            user: {
                id: 0,
                counter: 0,
                name: message.user.name,
                color: message.user.color,
                character: message.user.character
            }
        })
        res.status(200).end()
    }

}