'use client';
import { useMemo, useRef, useState, useEffect, Ref } from 'react';
import { setup, recompute, resetAndRecompute } from '@/lib/client/colorshift';


export default function MessageList({ children, theme, ref }: { children: React.ReactNode, theme: string, ref?: Ref<HTMLTableSectionElement>  }) {
    return (
        <tbody ref={ref}>
            {children}
        </tbody>
    )
}