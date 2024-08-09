'use client';

import Link from "next/link";

import { Message, MessageType } from "@prisma/client";
import { bbencode } from "@/lib/bbcode";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useRef } from "react";

export default function MessageView({ message }: { message: Message }) {

    let paraRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        let spoilers = paraRef.current?.querySelectorAll('span.spoiler')
        for (let spoiler of spoilers ?? []) {
            spoiler.addEventListener('click', (e) => {
                let target = e.target as HTMLSpanElement
                let css = getComputedStyle(target)
                if (css.opacity == '0') {
                    target.setAttribute("style", "opacity: 1;")
                } else {
                    target.setAttribute("style", "opacity: 0;")
                }
            })
        }
    })

    return (
        <div className={"mx-3 max-w-full text-base-content message-" + message.type + (message.type == MessageType.SYSTEM ? " p-4 m-1 bg-base-100/50 border border-info rounded-lg" : "")}>
            <p ref={paraRef} className="whitespace-pre-line" dangerouslySetInnerHTML={{__html: bbencode(DOMPurify.sanitize(message.content))}} />
        </div>
    );
}