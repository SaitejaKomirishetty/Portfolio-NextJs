import React from 'react';

interface Project {
    title: string;
    description: string;
    techStack: React.ReactNode[];
    imageLink: React.ReactNode;
    liveDemoLink: string;
    codeLink: string;
}

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div
            className={`flex flex-col items-center gap-4  rounded-lg shadow-sm `}
        >
            <div className='relative group w-full'>
                <div className='md:absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300'></div>
                <div className='hidden md:absolute inset-0 md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-4'>
                    {project.codeLink && (
                        <a
                            href={project.codeLink}
                            className='px-4 py-2 bg-white text-black rounded'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            View Code
                        </a>
                    )}
                    {project.liveDemoLink && (
                        <a
                            href={project.liveDemoLink}
                            className='px-4 py-2 bg-white text-black rounded'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            View Live
                        </a>
                    )}
                </div>
                <div className='w-full  flex-shrink-0'>{project.imageLink}</div>
            </div>
            <div className='w-full flex flex-col items-start p-4'>
                <h2 className='text-2xl md:text-3xl font-semibold'>
                    {project.title}
                </h2>
                <p className='text-sm md:text-base'>{project.description}</p>
                <div className='flex gap-2 my-2'>
                    {project.techStack.map((Icon, index) => (
                        <div key={index}>{Icon}</div>
                    ))}
                </div>
                <div className='md:hidden flex gap-4'>
                    {project.codeLink && (
                        <a
                            href={project.codeLink}
                            className='px-4 py-2 bg-gray-300 text-black rounded'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            View Code
                        </a>
                    )}
                    {project.liveDemoLink && (
                        <a
                            href={project.liveDemoLink}
                            className='px-4 py-2 bg-gray-300 text-black rounded'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            View Live
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ProjectCard;
