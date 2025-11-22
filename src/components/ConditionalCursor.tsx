'use client';

import { usePathname } from 'next/navigation';
import CustomCursor from './CustomCursor';

export default function ConditionalCursor() {
    const pathname = usePathname() ?? '';

    // Hide custom cursor on blog routes (e.g. /blog, /blog/..., etc.)
    if (pathname.startsWith('/blog')) return null;

    return <CustomCursor />;
}
