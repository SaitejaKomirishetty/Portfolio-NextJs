import { FlipWords } from './ui/flip-words';
import Image from 'next/image';
const words = [
    'FrontEnd Developer',
    'Web Developer',
    'Software Engineer',
    'F1 Enthusiast',
];

const HeroSection = () => {
    return (
        <div className='w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-16 xl:gap-24'>
            {/* Text Content */}
            <div className='flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl'>
                <div className='mb-4'>
                    <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300'>
                        I&apos;m
                    </p>
                    <h1 className='dark:text-amber-500 font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight'>
                        SAITEJA
                    </h1>
                </div>
                <div className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300'>
                    <div className=' '>
                        <span className='inline-block'>I&apos;m a </span>
                        <FlipWords
                            words={words}
                            duration={2000}
                            className='text-amber-500 dark:text-amber-400 font-semibold'
                        />
                    </div>
                </div>
            </div>

            {/* Profile Image */}
            <div className='flex-shrink-0'>
                <div className='relative w-64 h-full sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem]'>
                    <Image
                        height={448}
                        width={448}
                        src={'/DSC_9370-removebg 1.png'}
                        alt='Saiteja - Frontend Developer'
                        className='object-contain w-full h-full'
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
