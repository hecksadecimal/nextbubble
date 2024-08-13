import Link from "next/link";

import { Message, MessageType } from "@prisma/client";
import { parser } from "@/lib/bbcode";
import DOMPurify from "isomorphic-dompurify";
import { applyQuirk, Quirk, Replacement } from "@/lib/quirk";

export default function BBCodeView({ content, quirk }: { content: string, quirk?: Quirk }) {
    return (
        <p className="whitespace-pre overflow-hidden max-w-[90%] text-balance" dangerouslySetInnerHTML={{__html: parser.parse(quirk ? applyQuirk(DOMPurify.sanitize(content.trim()), quirk) : DOMPurify.sanitize(content.trim()))}} />
    );
}