import Link from "next/link";

import { Message, MessageType } from "@prisma/client";
import { parser } from "@/lib/bbcode";
import DOMPurify from "isomorphic-dompurify";
import BBCodeView from "./BBCode/BBCode";

export default function MessageView({ message }: { message: Message }) {
    return (
        <>
        <div className={"mx-3 max-w-full text-base-content message-" + message.type + (message.type == MessageType.SYSTEM ? " p-4 m-1 bg-base-100/50 border border-info rounded-lg" : "")}>
            <BBCodeView content={message.content} />
        </div>
        </>
    );
}