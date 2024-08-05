'use client';

import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";


const ClientUserButton = () => {

    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <>
            {domLoaded && (
            <UserButton />
            )}
        </>
    )
}

export default ClientUserButton