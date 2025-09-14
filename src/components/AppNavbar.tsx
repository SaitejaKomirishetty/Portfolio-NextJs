'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from '@/hooks/ThemeContext';
import SaitejaIcon from './SaitejaIcon';
import { IconMenu2 } from '@tabler/icons-react';

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();

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
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='right'
                    className=''
                    zIndex={50}
                >
                    <div className='dark:bg-[#34353a] h-full flex flex-col items-center justify-evenly'>
                        {links.map((link, index) => (
                            <div key={index} className='py-2 text-center'>
                                {link.href.startsWith('#') ? (
                                    <button
                                        onClick={() =>
                                            handleLinkClick(link.href)
                                        }
                                        className='hover:text-amber-500 transition-colors'
                                    >
                                        {link.title}
                                    </button>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className='hover:text-amber-500 transition-colors'
                                    >
                                        {link.title}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </Drawer>
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
