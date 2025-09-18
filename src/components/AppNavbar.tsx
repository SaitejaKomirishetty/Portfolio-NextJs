'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from '@/hooks/ThemeContext';
import SaitejaIcon from './SaitejaIcon';
import { IconMenu2, IconX } from '@tabler/icons-react';

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();

    // Prevent hydration mismatch by only rendering after mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    // Navigation links - different for homepage vs other pages
    const getNavigationLinks = () => {
        if (pathname === '/') {
            // Homepage links (scroll to sections)
            return [
                { title: 'Home', href: '/' },
                { title: 'About', href: '#about' },
                { title: 'Skills', href: '#skills' },
                { title: 'Experience', href: '#experience' },
                { title: 'Projects', href: '#projects' },
                { title: 'Blog', href: '/blog' },
                { title: 'Contact', href: '#contact' },
            ];
        } else {
            // Other pages links (regular navigation)
            return [
                { title: 'Home', href: '/' },
                { title: 'About', href: '/#about' },
                { title: 'Skills', href: '/#skills' },
                { title: 'Experience', href: '/#experience' },
                { title: 'Projects', href: '/#projects' },
                { title: 'Blog', href: '/blog' },
                { title: 'Contact', href: '/#contact' },
            ];
        }
    };

    const links = getNavigationLinks();

    const handleLinkClick = (href: string) => {
        if (isOpen) {
            setIsOpen(false);
        }

        // If it's a hash link and we're on homepage, scroll to section
        if (href.startsWith('#') && pathname === '/') {
            const element = document.querySelector(href);
            if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition =
                    elementPosition + window.scrollY - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }
        }
    };

    return (
        <div
            className={`w-full ${'fixed top-0 bg-opacity-28 backdrop-blur-[7.6px] z-50'}`}
        >
            {/* Mobile View */}
            <div className='md:hidden grid grid-cols-2 grid-rows-1 p-2'>
                <Link href='/'>
                    <SaitejaIcon />
                </Link>
                <div className='flex items-center justify-end gap-2'>
                    <div
                        className='p-2 cursor-pointer bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg dark:hover:bg-[#27272a] hover:bg-[#f4f4f5] transition-shadow duration-200 hover:scale-110'
                        onClick={toggleTheme}
                    >
                        <DarkModeSwitch
                            onChange={() => console.log(theme)}
                            checked={theme === 'light'}
                            moonColor='black'
                            sunColor='#fde047'
                            size={20}
                        />
                    </div>
                    <button onClick={toggleDrawer}>
                        <IconMenu2 />
                    </button>
                </div>
                {/* Custom Drawer */}
                {isMounted && (
                    <>
                        {/* Overlay */}
                        {isOpen && (
                            <div
                                className='fixed inset-0 bg-black bg-opacity-40 z-40'
                                onClick={toggleDrawer}
                            />
                        )}

                        {/* Drawer */}
                        <div
                            className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-[#34353a] z-50 transform transition-transform duration-300 ease-in-out ${
                                isOpen ? 'translate-x-0' : 'translate-x-full'
                            }`}
                        >
                            <div className='flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700'>
                                <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
                                    Menu
                                </h2>
                                <button
                                    onClick={toggleDrawer}
                                    className='p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors'
                                >
                                    <IconX className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                                </button>
                            </div>

                            <div className='flex flex-col items-center justify-evenly h-full py-8'>
                                {links.map((link, index) => (
                                    <div
                                        key={index}
                                        className='py-2 text-center'
                                    >
                                        {link.href.startsWith('#') ? (
                                            <button
                                                onClick={() =>
                                                    handleLinkClick(link.href)
                                                }
                                                className='text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors text-lg'
                                            >
                                                {link.title}
                                            </button>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className='text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors text-lg'
                                            >
                                                {link.title}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Desktop View */}
            <div className='hidden md:flex items-center justify-between px-5 md:px-10 lg:px-20 py-3'>
                <Link href='/'>
                    <SaitejaIcon />
                </Link>
                <div className='flex items-center justify-end w-full gap-10 cursor-pointer'>
                    {links.map((link, index) => (
                        <div key={index}>
                            {link.href.startsWith('#') ? (
                                <button
                                    onClick={() => handleLinkClick(link.href)}
                                    className='hover:text-blue-500 transition-colors'
                                >
                                    {link.title}
                                </button>
                            ) : (
                                <Link
                                    href={link.href}
                                    className='hover:text-blue-500 transition-colors'
                                >
                                    {link.title}
                                </Link>
                            )}
                        </div>
                    ))}
                    <div
                        className='p-2 h-fit w-fit cursor-pointer bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg dark:hover:bg-[#27272a] hover:bg-[#f4f4f5] transition-shadow duration-200 hover:scale-110'
                        onClick={toggleTheme}
                    >
                        <DarkModeSwitch
                            onChange={() => console.log(theme)}
                            checked={theme === 'light'}
                            moonColor='black'
                            sunColor='#fde047'
                            size={25}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppNavbar;
