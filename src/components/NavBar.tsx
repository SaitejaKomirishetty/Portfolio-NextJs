import { useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from '@/hooks/ThemeContext';
import SaitejaIcon from './SaitejaIcon';
import { IconMenu2 } from '@tabler/icons-react';

const Navbar = ({
    aboutRef,
    skillsRef,
    experienceRef,
    projectsRef,
    contactRef,
}: {
    aboutRef: React.RefObject<HTMLDivElement>;
    skillsRef: React.RefObject<HTMLDivElement>;
    experienceRef: React.RefObject<HTMLDivElement>;
    projectsRef: React.RefObject<HTMLDivElement>;
    contactRef: React.RefObject<HTMLDivElement>;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const { theme, toggleTheme } = useTheme();
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };
    const links = [
        {
            title: 'About',
            ref: aboutRef,
        },
        {
            title: 'Skills',
            ref: skillsRef,
        },
        {
            title: 'Experience',
            ref: experienceRef,
        },
        {
            title: 'Projects',
            ref: projectsRef,
        },
        {
            title: 'Contact',
            ref: contactRef,
        },
    ];

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            const offset = 80; // Your desired offset
            const elementPosition = ref.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;
            if (isOpen) {
                setIsOpen(false);
            }

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className='w-full'>
            {/* Mobile View */}
            <div className='md:hidden grid grid-cols-2 grid-rows-1 p-2'>
                <SaitejaIcon />
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
                        {links.map((section, index) => (
                            <div
                                key={index}
                                onClick={() => scrollToSection(section.ref)}
                                className='py-2 text-center'
                            >
                                {section.title}
                            </div>
                        ))}
                    </div>
                </Drawer>
            </div>

            {/* Desktop View */}
            <div className='hidden md:flex items-center justify-between px-5 md:px-10 lg:px-20 py-3'>
                <div className='flex items-center gap-2'>
                    <SaitejaIcon />
                    {/* <p className='text-nowrap text-lg'>Saiteja Komirishetty</p> */}
                </div>
                <div className='flex items-center justify-end w-full gap-10 cursor-pointer'>
                    {links.map((section, index) => (
                        <div
                            key={index}
                            onClick={() => scrollToSection(section.ref)}
                            className='hover:text-blue-500 transition-colors'
                        >
                            {section.title}
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

export default Navbar;
