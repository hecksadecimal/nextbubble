"use client";

import { useState } from "react";

export default function Spoiler({ children }: { children: React.ReactNode }) {
    const [show, setShow] = useState(false);

    // Spoiler revealed and hidden via opacity
    return (
        <span className="spoiler border border-dotted" style={{borderColor: "currentcolor", backgroundColor: show ? "transparent" : "currentcolor"}} onClick={() => {setShow(!show)}}>
            <span className="spoiler-content" style={{opacity: show ? 1 : 0}} onClick={() => setShow(!show)}>{children}</span>
        </span>
    )
}