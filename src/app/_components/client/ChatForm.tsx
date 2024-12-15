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
        <form className="flex flex-col" action={async (data: FormData) => {
            // Send message to server
        }}>
            <div id="preview" className="input input-xs m-1" ref={previewRef}>&nbsp;</div>
            <div className="flex m-1">
                <input type="text" className="grow input input-xs" autoComplete="false" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button type="submit" className="btn btn-xs ml-1">Send</button>
            </div>
        </form>
    );
}