'use client';

import React, { useEffect, useState } from 'react'
import { Message, MessageType } from "@prisma/client";
import { ChannelInput } from '@/app/_components/client/channel_input';
import { api } from "@/trpc/react";
import {
    useLivePosts,
    useThrottledIsTypingMutation,
    useWhoIsTyping,
} from './hooks';


const pluralize = (count: number, singular: string, plural: string) =>
    count === 1 ? singular : plural;

const listWithAnd = (list: string[]) => {
    if (list.length === 0) {
        return '';
    }
    if (list.length === 1) {
        return list[0];
    }
    if (list.length === 2) {
        return `${list[0]} and ${list[1]}`;
    }
    return `${list.slice(0, -1).join(', ')}, and ${list.at(-1)}`;
};

const Messages = ({ messages, channel }: { messages: Message[], channel: string }) => {
    const livePosts = useLivePosts(channel);
    const currentlyTyping = useWhoIsTyping(channel);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="grow h-full flex flex-col">
            <div id="messagesContainer" className="grow bg-base-100/50 p-2 overflow-y-auto">
                <div>
                    <button
                        disabled={
                            !livePosts.query.hasNextPage ||
                            livePosts.query.isFetchingNextPage
                        }
                        onClick={() => {
                            livePosts.query.fetchNextPage();
                        }}
                    >
                        {livePosts.query.isFetchingNextPage
                            ? 'Loading...'
                            : !livePosts.query.hasNextPage
                                ? 'Fetched everything!'
                                : 'Load more'}
                    </button>
                </div>
                {livePosts.messages?.map((item) => {
                    return <div className="flex" >
                        <div className={"mx-3 prose text-base-content message-" + item.type + (item.type == MessageType.SYSTEM ? " p-4 m-1 bg-base-100/50 border border-info rounded-lg" : "")}>
                            <div>
                                {item.content}
                            </div>
                        </div>
                    </div>
                })}
            </div>
            <p className="text-sm italic text-gray-400 bg-base-100/50 mb-2">
              {currentlyTyping.length ? (
                `${listWithAnd(currentlyTyping)} ${pluralize(
                  currentlyTyping.length,
                  'is',
                  'are',
                )} typing...`
              ) : (
                <>&nbsp;</>
              )}
            </p>
            <div className="h-15 p-3 rounded-xl rounded-tr-none rounded-tl-none bg-base-100/50">
                <ChannelInput channel={channel} />
            </div>
        </div>
    )
}

export default Messages