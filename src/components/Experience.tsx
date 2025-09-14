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
    description: string;
    technologies: string[];
    icon: React.ReactNode;
}

const experiences: Experience[] = [
    {
        id: 1,
        jobTitle: 'Senior Full Stack Developer',
        company: 'TechCorp Solutions',
        duration: '2022 - Present',
        location: 'San Francisco, CA',
        description:
            'Led development of scalable web applications serving 100k+ users. Architected microservices infrastructure and mentored junior developers.',
        technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
        icon: <Rocket className='w-5 h-5' />,
    },
    {
        id: 2,
        jobTitle: 'Frontend Developer',
        company: 'StartupXYZ',
        duration: '2020 - 2022',
        location: 'Remote',
        description:
            'Built responsive user interfaces and improved application performance by 40%. Collaborated with design team to implement pixel-perfect designs.',
        technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Redux', 'Jest'],
        icon: <Code className='w-5 h-5' />,
    },
    {
        id: 3,
        jobTitle: 'Web Developer',
        company: 'Digital Agency Pro',
        duration: '2019 - 2020',
        location: 'New York, NY',
        description:
            'Developed custom websites for clients across various industries. Optimized site performance and implemented SEO best practices.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress'],
        icon: <Globe className='w-5 h-5' />,
    },
    {
        id: 4,
        jobTitle: 'Junior Developer',
        company: 'CodeBootcamp Inc',
        duration: '2018 - 2019',
        location: 'Austin, TX',
        description:
            'Started career building internal tools and learning modern development practices. Participated in code reviews and agile development processes.',
        technologies: ['JavaScript', 'Python', 'SQL', 'Git', 'Docker'],
        icon: <Database className='w-5 h-5' />,
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
                    <div className='md:hidden absolute left-8 w-1 bg-gray-300 dark:bg-gray-600 h-full'>
                        <div className='absolute top-0 w-1 h-full bg-gradient-to-b from-gray-700 to-gray-200 dark:from-amber-500  dark:to-amber-200 opacity-60'></div>
                    </div>

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
                                    <div className='absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-x-1/2 z-10'>
                                        <div
                                            className={`w-12 h-12 rounded-full dark:bg-amber-500 bg-gray-500  border-4 dark:border-amber-200 border-gray-200 shadow-lg flex items-center justify-center text-white transition-all duration-500 ${
                                                isVisible
                                                    ? 'scale-110 shadow-amber-500/25'
                                                    : 'scale-100'
                                            }`}
                                        >
                                            {experience.icon}
                                        </div>
                                    </div>

                                    {/* Experience Card */}
                                    <div
                                        className={`w-full md:w-[48%] ml-20 md:ml-0 ${
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
                                                <p className='text-gray-600 dark:text-gray-400 mb-4 dark:group-hover:text-white leading-relaxed text-pretty group-hover:text-gray-700  transition-colors duration-300'>
                                                    {experience.description}
                                                </p>

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
