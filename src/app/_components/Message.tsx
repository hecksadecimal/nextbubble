import Link from "next/link";

import { Message, MessageType } from "@prisma/client";
import BBCodeView from "./BBCode/BBCode";

export default function MessageView({ message }: { message: Message }) {
    return (
        <>
        <div className={"mx-3 max-w-full text-base-content message-" + message.type + (message.type == MessageType.SYSTEM ? " p-4 m-1 bg-base-200/50 border border-info rounded-lg" : "")}>
            <BBCodeView content={message.content} quirk={{
                prefix: message.prefix ?? undefined,
                color: message.color ?? undefined,
                suffix: message.suffix ?? undefined,
                acronym: message.acronym ?? undefined,
                replacements: message.replacements as [[string,string]] ?? []
            }} />
        </div>
        </>
    );
}