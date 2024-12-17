import { useState } from "react";

export default function Divider({children}: {children?: React.ReactNode}) {
    return (
        <div className="flex w-full flex-col">
            <div className="divider before:bg-current after:bg-current">{children}</div>
        </div>
    )
}