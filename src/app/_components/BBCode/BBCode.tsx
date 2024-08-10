import Link from "next/link";

import { Message, MessageType } from "@prisma/client";
import { parser } from "@/lib/bbcode";
import DOMPurify from "isomorphic-dompurify";

export default function BBCodeView({ content }: { content: string }) {
    return (
        <pre className="whitespace-pre" dangerouslySetInnerHTML={{__html: parser.parse(DOMPurify.sanitize(content.trim()))}} />
    );
}