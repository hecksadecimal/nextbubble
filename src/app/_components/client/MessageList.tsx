'use client';
import { useMemo, useRef, useState, useEffect } from 'react';
import { setup } from '@/lib/client/colorshift';
import Message, { MessageSchema } from './Message';

export default function MessageList({ messages }: { messages: MessageSchema[] }) {
    const ref = useRef<HTMLTableSectionElement>(null);
    useEffect(() => {
        if (!ref) return;
        //setup(ref.current as HTMLElement);
    }, [ref]);

    return (
        <tbody ref={ref}>
            {messages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
        </tbody>
    )
}