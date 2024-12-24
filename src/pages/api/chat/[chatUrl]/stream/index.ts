import { createSession } from "better-sse"
import { MessageSchema } from "@/app/_components/shared/Message";
import { NextApiRequest, NextApiResponse } from "next";
import { characters } from "@/lib/shared/homestuck";

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
        const characterKeys = Object.keys(characters)
        const randomCharacter = characters[characterKeys[Math.floor(Math.random() * characterKeys.length)]]
        const message: MessageSchema = {
            id: counter++,
            content: randomCharacter.quote ?? "Hello, world!",
            sentAt: new Date(),
            user: {
                id: -1,
                counter: Infinity,
                name: "SYSTEM",
                color: randomCharacter.color,
                character: randomCharacter
            }
        }
        session.push(message)
    }
}