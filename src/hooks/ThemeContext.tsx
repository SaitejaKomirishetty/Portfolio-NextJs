'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext<{ theme: string; toggleTheme: () => void }>({
    theme: 'dark',
    toggleTheme: () => {},
});

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const getPreferredTheme = () => {
        // Check if we're on the client side
        if (typeof window === 'undefined') {
            return 'dark'; // Default theme for SSR
        }

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;

        const prefersDarkScheme = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;
        return prefersDarkScheme ? 'dark' : 'light';
    };

    const [theme, setTheme] = useState('dark'); // Match SSR default
    const [mounted, setMounted] = useState(false);

    // Initialize theme after component mounts (client-side only)
    useEffect(() => {
        setMounted(true);
        const preferredTheme = getPreferredTheme();
        setTheme(preferredTheme);

        // Apply theme immediately to prevent flicker
        if (preferredTheme === 'system') {
            const prefersDarkScheme = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            document.documentElement.className = prefersDarkScheme
                ? 'dark'
                : '';
        } else {
            document.documentElement.className = preferredTheme;
        }
    }, []);

    useEffect(() => {
        // Only run on client side and after component is mounted
        if (!mounted || typeof window === 'undefined') return;

        if (theme === 'system') {
            const prefersDarkScheme = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            document.documentElement.className = prefersDarkScheme
                ? 'dark'
                : '';
        } else {
            document.documentElement.className = theme; // 'dark' or 'light'
        }
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
