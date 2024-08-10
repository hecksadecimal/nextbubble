"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

import { api } from "@/trpc/react";
import { parser } from "@/lib/bbcode";
import { useThrottledIsTypingMutation, useWhoIsTyping } from "@/app/(chat)/chat/[chat]/hooks";
import React from "react";
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import BBCodeView from "../BBCode/BBCode";
import { MessageType } from "@prisma/client";

export function ChannelInput({ channel }: { channel: string }) {
    const currentlyTyping = useWhoIsTyping(channel);
    const isTypingMutation = useThrottledIsTypingMutation(channel);
    
    const utils = api.useUtils();
    const [content, setContent] = useState("");
    const bbcodePreviewRef = useRef<HTMLParagraphElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [inputHtml, setInputHtml] = useState({html: ""})
    
    const createPost = api.message.add.useMutation({
        onSuccess: async () => {
            await utils.message.invalidate();
            setContent("");
            setInputHtml({html: ""})
            isTypingMutation(false);
            const input = document.getElementById("channelInput")
            if (input) {
                input.innerText = ""
            }
        },
    });

    function change(event: ContentEditableEvent) {
        setInputHtml({html: event.target.value})
        setContent(event.target.value.replaceAll("<br>", "\n").replaceAll('&nbsp;', " ").trim())
        isTypingMutation(true)
    }

    function keydown(event: KeyboardEvent<HTMLDivElement>) {
        if (!event.shiftKey && (event.key == "Enter")) {
            event.preventDefault()
            buttonRef.current?.click()
        }
    }

    return (
        <>
        <div className="w-full min-h-4 max-h-24 overflow-y-auto my-2 ml-4 pb-2">
            <BBCodeView content={content} />
        </div>
        <div className="w-full">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    let target = document.getElementById("channelInput") as HTMLDivElement
                    createPost.mutate({
                        text: target.innerHTML.replaceAll("<br>", "\n").replaceAll('&nbsp;', " ").trim(),
                        channelId: channel
                    });
                }}
                className="flex flex-row gap-2"
            >
                <ContentEditable
                    innerRef={inputRef}
                    html={inputHtml.html}
                    onKeyDown={(e) => keydown(e)}
                    onChange={change}
                    onBlur={() => isTypingMutation(false)}
                    id="channelInput"
                    className="textarea textarea-bordered py-1 overflow-y-scroll bg-transparent w-full max-h-72" />
                <button
                    ref={buttonRef}
                    type="submit"
                    id="submitButton"
                    className="rounded-lg bg-white/10 px-10 py-3 w-28 font-semibold transition hover:bg-white/20"
                    disabled={createPost.isPending}
                >
                    {createPost.isPending ? <span className="loading loading-dots loading-xs"></span> : "==>"}
                </button>
            </form>
        </div>
        </>
    );
}