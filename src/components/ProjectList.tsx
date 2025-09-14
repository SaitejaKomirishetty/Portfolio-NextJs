import React from 'react';
import Image from 'next/image';
import ProjectCard from './ProjectCard';
import {
    IconBrandCss3,
    IconBrandHtml5,
    IconBrandReact,
    IconBrandTypescript,
} from '@tabler/icons-react';

interface Project {
    title: string;
    description: string;
    techStack: React.ReactNode[];
    imageLink: React.ReactNode;
    liveDemoLink: string;
    codeLink: string;
}

const ProjectList: React.FC = () => {
    const projectList: Project[] = [
        {
            title: 'COMFY SLOTH',
            description: `This is a modern and responsive E-commerce website website for a furniture shops, built with React and authenticated using auth0. The website features a sleek design with smooth animations, easy navigation.`,
            techStack: [
                <IconBrandHtml5 key='html5' />,
                <IconBrandCss3 key='css3' />,
                <IconBrandReact key='react' />,
            ],
            imageLink: (
                <Image
                    src='https://raw.githubusercontent.com/SaitejaKomirishetty/ECommerceWebsite/refs/heads/main/Images/HomePage.png'
                    alt='coffee website'
                    width={500}
                    height={300}
                    className='w-full h-auto'
                />
            ),
            liveDemoLink:
                'https://saitejakomirishetty.github.io/ECommerceWebsite/',
            codeLink: 'https://github.com/SaitejaKomirishetty/ECommerceWebsite',
        },
        {
            title: 'Alowishus coffee',
            description: `This is a modern and responsive website for a coffee shop, built with React, ShadCN, and Tailwind CSS. The website features a sleek design with smooth animations, easy navigation, and a focus on showcasing the coffee shop's offerings and atmosphere.`,
            techStack: [
                <IconBrandHtml5 key='html5' />,
                <IconBrandCss3 key='css3' />,
                <IconBrandReact key='react' />,
            ],
            imageLink: (
                <Image
                    src='https://raw.githubusercontent.com/SaitejaKomirishetty/coffee-website/refs/heads/main/Images/home.png.png'
                    alt='coffee website'
                    width={500}
                    height={300}
                    className='w-full h-auto'
                />
            ),
            liveDemoLink:
                'https://saitejakomirishetty.github.io/coffee-website/',
            codeLink: 'https://github.com/SaitejaKomirishetty/coffee-website',
        },
        {
            title: 'Note Taking App',
            description:
                'This is a simple yet powerful note-taking application built with React and React Router. It allows users to create, read, update, and delete notes, and manage tags associated with the notes. The app persists data using local storage, ensuring that your notes and tags are available even after refreshing the page or closing the browser.',
            techStack: [
                <IconBrandHtml5 key='html5' />,
                <IconBrandCss3 key='css3' />,
                <IconBrandTypescript key='typescript' />,
                <IconBrandReact key='react' />,
            ],
            imageLink: (
                <Image
                    src='https://raw.githubusercontent.com/SaitejaKomirishetty/Note-taking-app/refs/heads/main/Images/ViewNote.png'
                    alt='Note taking app screenshot'
                    width={500}
                    height={300}
                    className='w-full h-auto'
                />
            ),
            liveDemoLink:
                'https://saitejakomirishetty.github.io/Note-taking-app/',
            codeLink: 'https://github.com/SaitejaKomirishetty/Note-taking-app',
        },
        {
            title: 'Hang Man',
            description:
                'This is a simple Hangman game built with React. The game randomly selects a word from a list, and the player has to guess the letters of the word. The player wins if they guess the word correctly and loses if they make six incorrect guesses',
            techStack: [
                <IconBrandHtml5 key='html5' />,
                <IconBrandCss3 key='css3' />,
                <IconBrandReact key='react' />,
            ],
            imageLink: (
                <Image
                    src='https://raw.githubusercontent.com/SaitejaKomirishetty/Hangman/refs/heads/main/Images/image.png'
                    alt='Hangman game screenshot'
                    width={500}
                    height={300}
                    className='w-full h-auto'
                />
            ),
            liveDemoLink: 'https://saitejakomirishetty.github.io/Hangman/',
            codeLink: 'https://github.com/SaitejaKomirishetty/Hangman',
        },
    ];

    return (
        <div className='grid grid-cols-1 md:grid-cols-2  gap-4 space-y-2 md:space-y-0'>
            {projectList.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </div>
    );
};

export default ProjectList;
