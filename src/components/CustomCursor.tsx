'use client';
import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const [isDesktop, setIsDesktop] = useState(false);
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const innerRef = useRef<HTMLDivElement | null>(null);

    // Variables to store the mouse position
    let mouseX = 0;
    let mouseY = 0;

    // Variables to store the smoothed cursor position
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.pageX;
        mouseY = e.pageY;
    };

    // Optimize animation loop
    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.025;
        cursorY += (mouseY - cursorY) * 0.025;

        if (cursorRef.current) {
            cursorRef.current.style.left = `${cursorX}px`;
            cursorRef.current.style.top = `${cursorY}px`;
        }

        requestAnimationFrame(animateCursor);
    };

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target) return;

        if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(target.tagName)) {
            if (cursorRef.current) {
                cursorRef.current.style.width = '50px';
                cursorRef.current.style.height = '50px';
            }
            if (innerRef.current) {
                innerRef.current.style.width = '20px';
                innerRef.current.style.height = '20px';
            }
        }

        if (
            [
                'P',
                'INPUT',
                'TEXTAREA',
                'A',
                'H1',
                'H2',
                'H3',
                'H4',
                'SPAN',
                'BUTTON',
                'LI',
            ].includes(target.tagName) ||
            target.closest('svg') !== null
        ) {
            if (cursorRef.current) {
                cursorRef.current.style.opacity = '0.05';
            }
        }
    };

    const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target) return;

        if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(target.tagName)) {
            if (cursorRef.current) {
                cursorRef.current.style.width = '40px';
                cursorRef.current.style.height = '40px';
            }
            if (innerRef.current) {
                innerRef.current.style.width = '0px';
                innerRef.current.style.height = '0px';
            }
        }

        if (
            [
                'P',
                'INPUT',
                'TEXTAREA',
                'A',
                'H1',
                'H2',
                'H3',
                'H4',
                'SPAN',
                'BUTTON',
                'LI',
            ].includes(target.tagName) ||
            target.closest('svg') !== null
        ) {
            if (cursorRef.current) {
                cursorRef.current.style.opacity = '1';
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        animateCursor();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    const cursorStyle: React.CSSProperties = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition:
            'width 0.3s ease, height 0.3s ease-out, opacity 0.3s ease-out',
    };

    const innerStyle: React.CSSProperties = {
        width: '0px',
        height: '0px',
        borderRadius: '50%',
        position: 'absolute',
        pointerEvents: 'none',
        transition: 'width 0.3s ease, height 0.3s ease-out',
    };

    useEffect(() => {
        const checkDeviceType = () => {
            const userAgent = navigator.userAgent;
            const isDesktopDevice = /windows|macintosh/i.test(userAgent);
            setIsDesktop(isDesktopDevice);
        };
        checkDeviceType();
        const handleResize = () => {
            checkDeviceType();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!isDesktop) {
        return;
    }

    return (
        <div>
            <div
                ref={cursorRef}
                style={cursorStyle}
                className='bg-black dark:bg-white'
            >
                <div
                    ref={innerRef}
                    style={innerStyle}
                    className='dark:bg-black bg-white'
                />
            </div>
        </div>
    );
};

export default CustomCursor;
