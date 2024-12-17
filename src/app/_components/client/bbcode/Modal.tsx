"use client";

import { useRef } from "react";

export default function Modal({ children, title, buttonText }: { children: React.ReactNode, title?: string, buttonText?: string }) {
    const modalRef = useRef<HTMLDialogElement>(null);

    function handleClick() {
        modalRef.current?.showModal();
    }

    return (
        <>
            <button className="btn" onClick={handleClick}>{buttonText ? buttonText : "open"}</button>
                <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    {title && <h3>{title}</h3>}
                    {children}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}