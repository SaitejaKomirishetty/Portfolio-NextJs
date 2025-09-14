'use client';
import AboutSection from '@/components/AboutSection';
import CustomCursor from '@/components/CustomCursor';
import ProfessionalExperience from '@/components/Experience';
import HeroSection from '@/components/HeroSection';
import Projects from '@/components/Projects';
import SkillsSection from '@/components/SkillsSection';
import { FloatingDock } from '@/components/ui/floating-dock';
import { IconBrandGithub, IconBrandInstagram } from '@tabler/icons-react';
import { IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

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
    return (
        <div>
            <div className='pt-20 p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 mx-5 md:mx-10 lg:mx-20 space-y-5  md:space-y-10 lg:space-y-16 xl:space-y-20 2xl:space-y-32'>
                <HeroSection />
                <div className='w-full  mx-auto px-4 sm:px-6 lg:px-8 space-y-5  md:space-y-10 lg:space-y-16 xl:space-y-20 2xl:space-y-32'>
                    <section id='about'>
                        <AboutSection />
                    </section>
                    <section id='skills'>
                        <SkillsSection />
                    </section>
                    <section id='experience'>
                        <ProfessionalExperience />
                    </section>
                    <section id='projects'>
                        <Projects />
                    </section>
                    <div className=''>
                        <FloatingDock
                            items={links}
                            desktopClassName={
                                'fixed bottom-5 left-1/2 transform -translate-x-1/2'
                            }
                            mobileClassName={'!fixed bottom-5 right-5'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
