import { createSession } from "better-sse"
import { MessageSchema } from "@/app/_components/shared/Message";
import { NextApiRequest, NextApiResponse } from "next";

export const dynamic = "force-dynamic";


// TODO: Transition to App route (src/app/api/chat/[chatUrl]/stream/route.ts)
// when https://github.com/MatthewWid/better-sse/issues/79 is resolved.
// better-sse currently only supports Page routes.
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await createSession(req, res)
    let counter = 0

    while (true) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const message: MessageSchema = {
            id: counter++,
            content: "Hello, world!",
            user: {
                id: -1,
                counter: Infinity,
                name: "SYSTEM",
                color: "#000000",
                character: {
                    acronym: "SYS", 
                    name: "SYSTEM",
                    color: "#000000",
                    quote: "Just an ordinary system message.",
                    quirk: {
                        case: "normal",
                        prefix: "",
                        suffix: "",
                        replacements: []
                    }
                }
            }
        }
        session.push(message)
    }
}