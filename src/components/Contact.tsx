import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
    const [state, handleSubmit] = useForm('mwpkvjwa');
    return (
        <section className=' flex items-center justify-center '>
            <div className='max-w-lg w-full'>
                {/* Contact Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold mb-4'>Contact</h1>
                    <p className='text-gray-400'>
                        I`&lsquo;`m always looking to collaborate on interesting
                        projects with great people. Need a supportive hand? I
                        have two!
                    </p>
                    <a
                        href='mailto:komirishettysaiteja@gmail.com'
                        className='icon-button'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <button className='mt-6 px-4 py-2 bg-gray-800  hover:bg-gray-700 text-white font-semibold rounded shadow inline-flex items-center'>
                            E-Mail
                        </button>
                    </a>
                </div>

                {/* Send a Message Form */}
                <div>
                    {state.succeeded ? (
                        <p className='text-center'>Thanks for Your Message!</p>
                    ) : (
                        <>
                            <h2 className='text-xl font-semibold mb-4'>
                                Send a message
                            </h2>
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div className='flex space-x-4'>
                                    <input
                                        type='text'
                                        placeholder='Name'
                                        name='name'
                                        id='name'
                                        required
                                        className='w-1/2 p-2 dark:bg-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-600'
                                    />
                                    <ValidationError
                                        prefix='Name'
                                        field='name'
                                        errors={state.errors}
                                    />
                                    <input
                                        type='email'
                                        name='email'
                                        id='email'
                                        placeholder='Email'
                                        required
                                        className='w-1/2 p-2 dark:bg-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-600'
                                    />
                                    <ValidationError
                                        prefix='Email'
                                        field='email'
                                        errors={state.errors}
                                    />
                                </div>
                                <textarea
                                    name='message'
                                    placeholder='Message'
                                    id='message'
                                    required
                                    className='w-full p-2 dark:bg-gray-800 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 h-32'
                                ></textarea>
                                <ValidationError
                                    prefix='Message'
                                    field='message'
                                    errors={state.errors}
                                />

                                <button
                                    type='submit'
                                    disabled={state.submitting}
                                    className='w-full py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded shadow'
                                >
                                    Send now
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
