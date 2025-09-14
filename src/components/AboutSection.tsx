const AboutSection = () => {
    return (
        <div className=''>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-center lg:text-left'>
                About Me
            </h1>
            <div className='flex flex-col lg:flex-row items-start justify-center lg:justify-start gap-4 lg:gap-6'>
                <div className='hidden lg:block lg:min-w-20 border-amber-500 border-t-4 h-20 mt-3 flex-shrink-0'></div>
                <div className='w-full lg:flex-1'>
                    <div className='space-y-4 sm:space-y-6'>
                        <p className='text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700 dark:text-gray-300'>
                            As a passionate front-end developer, I&apos;m
                            passionate about crafting elegant and user-centric
                            web experiences. My focus on creating intuitive and
                            accessible interfaces is driven by a desire to make
                            a positive impact on users&apos; lives. My expertise
                            lies in leveraging React, HTML, and CSS to build
                            dynamic, high-performance web applications that
                            captivate users.
                        </p>
                        <p className='text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700 dark:text-gray-300'>
                            I thrive on challenges and enjoy collaborating with
                            cross-functional teams to deliver innovative
                            solutions. My problem-solving mindset, combined with
                            a keen eye for detail, ensures that every project
                            meets the highest standards of quality and
                            usability.
                        </p>
                        <p className='text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700 dark:text-gray-300'>
                            Beyond coding, I&apos;m a huge Formula 1 fan. The
                            thrill of the race, the strategic mind games, and
                            the cutting-edge tech are just mind-blowing. When
                            I&apos;m not geeking out over code, you&apos;ll find
                            me out on a bike ride, clearing my head. It&apos;s a
                            great way to recharge and come back to my work with
                            a fresh perspective.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
