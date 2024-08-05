"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";

import { api } from "@/trpc/react";
import { useThrottledIsTypingMutation, useWhoIsTyping } from "@/app/(chat)/chat/[chat]/hooks";
import React from "react";

export function ChannelInput({ channel }: { channel: string }) {
    const currentlyTyping = useWhoIsTyping(channel);
    const isTypingMutation = useThrottledIsTypingMutation(channel);
    
    const utils = api.useUtils();
    const [name, setName] = useState("");
    const [isFocused, setIsFocused] = React.useState(false);
    
    const createPost = api.message.add.useMutation({
        onSuccess: async () => {
            await utils.message.invalidate();
            setName("");
            const input = document.getElementById("channelInput")
            if (input) {
                input.innerText = ""
            }
            const messagesContainer = document.getElementById("messagesContainer")!
            console.log(messagesContainer.scrollHeight)
            console.log(messagesContainer.scrollTop)
            if ((messagesContainer.scrollHeight - messagesContainer.scrollTop) > 535 * 4) {
                messagesContainer.scroll({ top: messagesContainer.scrollHeight, behavior: 'smooth' });

            }
        },
    });

    function keydown(event: KeyboardEvent<HTMLDivElement>) {
        isTypingMutation(true)

        if (!event.shiftKey && (event.key == "Enter")) {
            console.log(event)
            event.preventDefault()

            let target = event.target as HTMLDivElement
            setName(target.innerText)

            let formButton = target.parentNode?.querySelector("#submitButton") as HTMLButtonElement
            formButton.click()
        }
    }

    return (
        <div className="w-full">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    let target = document.getElementById("channelInput") as HTMLDivElement
                    createPost.mutate({
                        text: target.innerHTML,
                        channelId: channel
                    });
                }}
                className="flex flex-row gap-2"
            >
                <div
                    onKeyDown={(e) => keydown(e)}
                    id="channelInput"
                    className="textarea textarea-bordered py-1 overflow-y-scroll bg-transparent w-full max-h-72"
                    contentEditable={true}
                />
                <button
                    type="submit"
                    id="submitButton"
                    className="rounded-lg bg-white/10 px-10 py-3 w-28 font-semibold transition hover:bg-white/20"
                    disabled={createPost.isPending}
                >
                    {createPost.isPending ? <span className="loading loading-dots loading-xs"></span> : "==>"}
                </button>
            </form>
        </div>
    );
}