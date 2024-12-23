'use client';
import { useMemo, useRef, useState } from 'react';
import { DBBCode } from '../shared/DBBCode';
import { Character } from '@/lib/shared/homestuck';

export default function ChatForm({character}: {character?: Character}) {
    const [message, setMessage] = useState('');
    const [preview, setPreview] = useState('&nbsp;');
    const previewModalRef = useRef<HTMLDialogElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    useMemo(() => {
        // Handle message preview
        if (message.length === 0) {
            setPreview(' ');
        } else {
            setPreview(message);
        }
    }, [message]);

    function handleModal() {
        previewModalRef.current?.showModal();
    }

    return (
        <div className="flex flex-col">
            <dialog ref={previewModalRef} className="modal">
                <div className="modal-box">
                    <div style={{color: character?.color ? "#" + character.color : 'black'}}>
                        <DBBCode>
                            {character?.acronym ? character.acronym + ": " : ""}
                        </DBBCode>
                        <DBBCode quirk={character?.quirk}>
                            {character?.quirk.prefix}{preview}{character?.quirk.suffix}
                        </DBBCode>
                    </div>
                    <form className="flex m-1" action={async (data: FormData) => {}}>
                        <input type="text" className="grow input input-xs" autoComplete="false" value={message} onChange={(e) => setMessage(e.target.value)}/>
                        <button type="submit" className="btn btn-xs ml-1">Send</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <div id="preview" className="input input-xs m-1 truncate cursor-pointer" style={{color: character?.color ? "#" + character.color : 'black'}} onClick={handleModal}>
                <DBBCode>
                    {character?.acronym ? character.acronym + ": " : ""}
                </DBBCode>
                <DBBCode quirk={character?.quirk}>
                    {character?.quirk.prefix}{preview}{character?.quirk.suffix}
                </DBBCode>
            </div>
            <form className="flex m-1" action={async (data: FormData) => {}}>
                <input type="text" className="grow input input-xs" autoComplete="false" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button type="submit" className="btn btn-xs ml-1">Send</button>
            </form>
        </div>
    );
}