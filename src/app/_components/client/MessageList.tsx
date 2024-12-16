'use client';
import { useMemo, useRef, useState, useEffect } from 'react';
import { setup, recompute, resetAndRecompute } from '@/lib/client/colorshift';

export default function MessageList({ children, theme }: { children: React.ReactNode, theme: string }) {
    const ref = useRef<HTMLTableSectionElement>(null);
    const [resettingColours, setResettingColours] = useState(false);

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
        <tbody ref={ref}>
            {children}
        </tbody>
    )
}