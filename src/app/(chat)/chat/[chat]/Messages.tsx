'use client';

import React, { useEffect, useState } from 'react'
import { Message, MessageType } from "@prisma/client";
import { ChannelInput } from '@/app/_components/client/ChannelInput';
import { api } from "@/trpc/react";
import {
    useLivePosts,
    useThrottledIsTypingMutation,
    useWhoIsTyping,
} from './hooks';
import MessageView from '@/app/_components/Message';


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
    const containerRef = React.useRef<HTMLDivElement>(null);

    const executeScroll = () => {
        if (!containerRef.current)  {
            return
        }
        if (!scrollRef.current) {
            return
        }

        let shouldScroll = containerRef.current.scrollHeight - containerRef.current.scrollTop - 500 <= scrollRef.current.clientHeight * 2

        if (shouldScroll) {
            scrollRef.current.scrollIntoView()
        }
    }

    useEffect(() => {
        executeScroll();
    }, [livePosts])

    return (
        <div className="grow h-full flex flex-col">
            <div id="messagesContainer" ref={containerRef} className="grow bg-base-100/50 p-2 overflow-y-auto">
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
                    return <div ref={scrollRef} key={item.id} className="flex max-w-full break-words" >
                        <MessageView message={item} />
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