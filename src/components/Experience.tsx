'use client';

import type React from 'react';

import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Briefcase,
    Calendar,
    MapPin,
    Code,
    Rocket,
    Database,
    Globe,
} from 'lucide-react';

interface Experience {
    id: number;
    jobTitle: string;
    company: string;
    duration: string;
    location?: string;
    description: string[];
    technologies: string[];
    icon: React.ReactNode;
}

const experiences: Experience[] = [
    {
        id: 4,
        jobTitle: 'Software Engineer',
        company: 'Torry Harris Integration Solutions',
        duration: '2025 Jan - Present',
        location: 'Bengaluru, Karataka',
        description: [
            'Optimized web application performance by implementing browser caching, lazy loading, code splitting, and React Query, resulting in 30–40% faster page load times and improved user experience.',
            'Led code review initiatives by establishing standardized best practices, improving code consistency and maintainability, and reducing production bugs by 25% through early detection.',
            ' Managed a cross-functional team of 5 developers to deliver a React-based marketplace portal, coordinating task allocation, providing mentorship, and ensuring on-time delivery under Agile workflows',
            'Mentored junior developers by promoting clean code practices, React design patterns, and conducting regular pair programming sessions, resulting in a 30% improvement in delivery speed and code quality',
        ],
        technologies: ['React', 'JavaScript', 'Tailwind', 'Node.js'],
        icon: <Rocket className='w-5 h-5' />,
    },
    {
        id: 3,
        jobTitle: 'Associate Software Engineer',
        company: 'Torry Harris Integration Solutions',
        duration: '2024 Feb - 2024 Dec',
        location: 'Bengaluru, Karataka',
        description: [
            'Built responsive and performant UIs with React and CSS.',
            'Evaluated and integrated optimal third-party React libraries and packages through extensive testing, which reduced development time by 15% and improved team productivity and code modularity.',
            'Added multilingual support using i18n.',
            'Integrated RESTful APIs to improve data flow and user experience.',
            'Resolved performance bottlenecks and reduced bugs by 35%.',
            'Refactored the codebase for scalability and reduced technical debt.',
        ],
        technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Redux'],
        icon: <Code className='w-5 h-5' />,
    },
    {
        id: 2,
        jobTitle: 'Associate Software Engineer - Trainee',
        company: 'Torry Harris Integration Solutions',
        duration: '2023 Aug - 2024 Feb',
        location: 'Bengaluru, Karataka',
        description: [
            'Contributed to building responsive and accessible UIs using React and CSS under senior developer guidance.',
            'Assisted in integrating RESTful APIs and resolving front-end performance issues, improving application reliability.',
            'Quickly ramped up on React, Redux, and Agile practices, supporting feature delivery in a collaborative team environment.',
        ],
        technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Redux'],
        icon: <Database className='w-5 h-5' />,
    },
    {
        id: 1,
        jobTitle: 'Intern',
        company: 'LTIMindtree',
        duration: '2023 Feb - 2023 May',
        location: 'Remote',
        description: [
            'Developed backend-focused Java and C++ apps to demonstrate core concepts in system-level programming.',
            'Deployed and managed cloud apps on AWS using EC2 and S3, gaining real-world experience in cloud deployment.',
            'Automated infrastructure provisioning using Terraform, applying Infrastructure as Code (IaC) practices.',
        ],
        technologies: ['AWS', 'Terraform', 'JAVA', 'C++'],
        icon: <Globe className='w-5 h-5' />,
    },
];

export default function ProfessionalExperience() {
    const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = Number.parseInt(
                        entry.target.getAttribute('data-id') || '0'
                    );
                    if (entry.isIntersecting) {
                        setVisibleItems((prev) => new Set([...prev, id]));
                    } else {
                        setVisibleItems((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(id);
                            return newSet;
                        });
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '-50px -50px',
            }
        );

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        const elements = document.querySelectorAll('[data-id]');
        elements.forEach((el) => {
            if (observerRef.current) {
                observerRef.current.observe(el);
            }
        });

        return () => {
            if (observerRef.current) {
                elements.forEach((el) => {
                    observerRef.current?.unobserve(el);
                });
            }
        };
    }, []);

    return (
        <section className='py-20 px-4 '>
            <div className='max-w-6xl mx-auto'>
                {/* Section Header */}
                <div className='mb-16'>
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-center lg:text-left'>
                        Professional Experience
                    </h1>
                    <div className='flex flex-col lg:flex-row items-start justify-center lg:justify-start gap-4 lg:gap-6'>
                        <div className='hidden lg:block lg:min-w-20 border-amber-500 border-t-4 h-20 mt-3 flex-shrink-0'></div>
                        <div className='w-full lg:flex-1'>
                            <p className='text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-center lg:text-left'>
                                A journey through my career milestones and the
                                technologies that shaped my expertise
                            </p>
                        </div>
                    </div>
                </div>

                {/* Timeline Container */}
                <div className='relative'>
                    {/* Central Timeline Line - Hidden on mobile */}
                    <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 dark:bg-gray-600 h-full'>
                        <div className='absolute top-0 w-1 h-full bg-gradient-to-b from-gray-700 to-gray-200 dark:from-amber-500  dark:to-amber-200 opacity-60'></div>
                    </div>

                    {/* Mobile Timeline Line */}
                    {/* <div className='md:hidden absolute left-8 w-1 bg-gray-300 dark:bg-gray-600 h-full'>
                        <div className='absolute top-0 w-1 h-full bg-gradient-to-b from-gray-700 to-gray-200 dark:from-amber-500  dark:to-amber-200 opacity-60'></div>
                    </div> */}

                    {/* Experience Items */}
                    <div className='space-y-12 md:space-y-16'>
                        {experiences.map((experience, index) => {
                            const isLeft = index % 2 === 0;
                            const isVisible = visibleItems.has(experience.id);

                            return (
                                <div
                                    key={experience.id}
                                    data-id={experience.id}
                                    className={`relative flex items-center ${
                                        isLeft
                                            ? 'md:flex-row'
                                            : 'md:flex-row-reverse'
                                    } flex-row`}
                                >
                                    {/* Timeline Marker */}
                                    <div className='hidden md:block absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-x-1/2 '>
                                        <div
                                            className={`w-12 h-12 rounded-full dark:bg-amber-500 bg-gray-500  border-4 dark:border-amber-200 border-gray-200 shadow-lg flex items-center justify-center text-white transition-all duration-500 ${
                                                isVisible
                                                    ? 'scale-110 shadow-amber-500/25'
                                                    : 'scale-100'
                                            }`}
                                            style={{
                                                zIndex: -100,
                                            }}
                                        >
                                            {experience.icon}
                                        </div>
                                    </div>

                                    {/* Experience Card */}
                                    <div
                                        className={`w-full md:w-[48%] md:ml-0 ${
                                            isLeft
                                                ? 'md:mr-auto md:pr-8'
                                                : 'md:ml-auto md:pl-8'
                                        }`}
                                    >
                                        <Card
                                            className={`group relative overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-500 ease-out transform-gpu hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/15 dark:hover:border-amber-500 hover:border-amber-500/30 ${
                                                isVisible
                                                    ? 'opacity-100 translate-y-0 translate-x-0'
                                                    : `opacity-0 ${
                                                          isLeft
                                                              ? 'md:-translate-x-8'
                                                              : 'md:translate-x-8'
                                                      } translate-y-8`
                                            }`}
                                        >
                                            <div className='absolute inset-0 bg-gradient-to-br from-amber-500/3 to-amber-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                                            <CardContent className='relative p-6'>
                                                {/* Job Title & Company */}
                                                <div className='mb-4'>
                                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-200 mb-1 group-hover:text-amber-500 dark:group-hover:text-amber-500 transition-colors duration-300'>
                                                        {experience.jobTitle}
                                                    </h3>
                                                    <div className='flex items-center gap-2 text-gray-700 dark:text-gray-300 dark:group-hover:text-amber-400/90 font-semibold mb-2 group-hover:text-amber-500/80 transition-colors duration-300'>
                                                        <Briefcase className='w-4 h-4' />
                                                        {experience.company}
                                                    </div>
                                                    <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
                                                        <div className='flex items-center gap-1 group-hover:text-amber-500/70 transition-colors duration-300'>
                                                            <Calendar className='w-4 h-4' />
                                                            {
                                                                experience.duration
                                                            }
                                                        </div>
                                                        {experience.location && (
                                                            <div className='flex items-center gap-1 group-hover:text-amber-500/70 transition-colors duration-300'>
                                                                <MapPin className='w-4 h-4' />
                                                                {
                                                                    experience.location
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <ul className='text-gray-600 dark:text-gray-400 mb-4 dark:group-hover:text-white leading-relaxed text-pretty group-hover:text-gray-700 transition-colors duration-300 space-y-1'>
                                                    {experience.description.map(
                                                        (item, index) => (
                                                            <li
                                                                key={index}
                                                                className='flex items-start'
                                                            >
                                                                <span className='text-amber-500 mr-2 mt-1'>
                                                                    •
                                                                </span>
                                                                <span>
                                                                    {item}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>

                                                {/* Technologies */}
                                                <div className='flex flex-wrap gap-2'>
                                                    {experience.technologies.map(
                                                        (tech) => (
                                                            <Badge
                                                                key={tech}
                                                                variant='secondary'
                                                                className='bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/20 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-all duration-300'
                                                            >
                                                                {tech}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Spacer for desktop layout */}
                                    <div className='hidden md:block w-5/12'></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
