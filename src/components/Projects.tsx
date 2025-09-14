import React from 'react';
import ProjectList from './ProjectList';

const Projects: React.FC = () => {
    return (
        <div className=' my-2 md:my-0'>
            <p className='text-center text-4xl font-bold mb-10'>Projects</p>
            <ProjectList />
            <div className='w-full py-10 flex items-center justify-center '>
                <a
                    href='https://github.com/SaitejaKomirishetty'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='  p-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded shadow'
                >
                    View More
                </a>
            </div>
        </div>
    );
};

export default Projects;
