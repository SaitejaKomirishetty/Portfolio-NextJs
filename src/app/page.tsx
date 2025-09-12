'use client';
import AboutSection from '@/components/AboutSection';
import CustomCursor from '@/components/CustomCursor';
import ProfessionalExperience from '@/components/Experience';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/NavBar';
import SkillsSection from '@/components/SkillsSection';
import { IconBrandGithub, IconBrandInstagram } from '@tabler/icons-react';
import { IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

const links = [
    {
        title: 'LinkedIn',
        icon: (
            <IconBrandLinkedin className='h-full w-full text-neutral-500 dark:text-neutral-300' />
        ),
        href: 'https://www.linkedin.com/in/saiteja-komirishetty',
    },
    {
        title: 'Twitter',
        icon: (
            <IconBrandX className='h-full w-full text-neutral-500 dark:text-neutral-300' />
        ),
        href: 'https://x.com/SAITEJAKOMIRIS1',
    },
    {
        title: 'GitHub',
        icon: (
            <IconBrandGithub className='h-full w-full text-neutral-500 dark:text-neutral-300' />
        ),
        href: 'https://github.com/SaitejaKomirishetty',
    },
    {
        title: 'Instagram',
        icon: (
            <IconBrandInstagram className='h-full w-full text-neutral-500 dark:text-neutral-300' />
        ),
        href: 'https://www.instagram.com/saitejakomirishetty/',
    },
];

export default function Home() {
    const aboutRef = useRef<HTMLDivElement>(null!);
    const skillsRef = useRef<HTMLDivElement>(null!);
    const experienceRef = useRef<HTMLDivElement>(null!);
    const projectsRef = useRef<HTMLDivElement>(null!);
    const contactRef = useRef<HTMLDivElement>(null!);

    const [isDesktop, setIsDesktop] = useState(false);

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
    return (
        <div>
            {isDesktop ? <CustomCursor /> : null}
            <div className='fixed top-0 bg-opacity-28 backdrop-blur-[7.6px] w-full z-50'>
                <Navbar
                    aboutRef={aboutRef}
                    skillsRef={skillsRef}
                    experienceRef={experienceRef}
                    projectsRef={projectsRef}
                    contactRef={contactRef}
                />
            </div>
            <div className=' p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 mx-5 md:mx-10 lg:mx-20 space-y-5  md:space-y-10 lg:space-y-16 xl:space-y-20 2xl:space-y-32'>
                <HeroSection />
                <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5  md:space-y-10 lg:space-y-16 xl:space-y-20 2xl:space-y-32'>
                    <section ref={aboutRef} id='about'>
                        <AboutSection />
                    </section>
                    <section ref={skillsRef} id='skills'>
                        <SkillsSection />
                    </section>
                    <section ref={experienceRef} id='experience'>
                        <ProfessionalExperience  />
                    </section>
                </div>
            </div>
        </div>
    );
}
