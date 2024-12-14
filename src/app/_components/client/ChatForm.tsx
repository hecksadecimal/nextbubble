'use client';
import { useMemo, useRef, useState } from 'react';

export default function ChatForm() {
    const [message, setMessage] = useState('');
    const [preview, setPreview] = useState('&nbsp;');
    const previewRef = useRef<HTMLDivElement>(null);

    useMemo(() => {
        // Handle message preview
        if (message.length === 0) {
            setPreview('&nbsp;');
        } else {
            setPreview(message);
        }
    }, [message]);

    useMemo(() => {
        // Update preview
        if (previewRef.current) {
            previewRef.current.innerHTML = preview;
        }
    }, [preview]);

    return (
        <form id="controls" action={async (data: FormData) => {
            // Send message to server
        }}>
            <div id="preview" className="min-h-full" ref={previewRef}>&nbsp;</div>
            <div className="flex w-full">
                <input type="text" className="grow w-full -mx-[3px]" autoComplete="false" value={message} onChange={(e) => setMessage(e.target.value)}/>
            </div>
            <button type="submit">Send</button>
        </form>
    );
}