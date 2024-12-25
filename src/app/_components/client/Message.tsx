"use client";
import { recompute, resetAndRecompute, setup } from "@/lib/client/colorshift";
import { Character } from "@/lib/shared/homestuck";
import { useEffect, useRef, useState } from "react";

export type MessageSchema = {
    id: number;
    content: string;
    sentAt: Date;
    user: {
        id: number;
        name: string;
        color: string;
        character: Character;
        counter: number;
    };
};

export type MessageSendSchema = {
    content: string;
    user: {
        name: string;
        color: string;
        character: Character;
    };
};


export default function Message({ children, id, counter, color, sentAt, theme }: { children: React.ReactNode, id: number, counter: number, color: string, theme?: string, sentAt?: Date }) {
    const [resettingColours, setResettingColours] = useState(false);
    const ref = useRef<HTMLTableCellElement>(null)

    /*
    useEffect(() => {
        if (!ref) return;
        setup(ref.current as HTMLElement);
    }, [ref]);

    useEffect(() => {
        if (!ref) return;
        if (resettingColours) return;
        recompute(ref.current as HTMLElement);
    }, [ref, children]);

    useEffect(() => {
        if (!theme) return;
        if (!ref) return;
        setResettingColours(true);
        resetAndRecompute(ref.current as HTMLElement, 1000);
        setTimeout(() => {
            setResettingColours(false);
        }, 1000);
    }, [theme])
    */
    
    return (
        <tr key={id} id={`message_` + id} className="even:bg-base-200 text-start align-top">
            <td className={`px-1 -mt-2 w-12 text-end align-top border-r-2 border-base-200 text-nowrap${ counter == null ? " text-lg" : ""}`}>
                <div data-tip={sentAt?.toLocaleString()} className="tooltip tooltip-right">
                    <button className="btn btn-ghost btn-xs text-lg">{counter == null ? "∞" : counter}</button>
                </div>
            </td>
            <td ref={ref} style={{color: "#" + color}} className="pl-1 bg-base-100 transition-all duration-1000">
                {children}
            </td>
        </tr>
    )
}

