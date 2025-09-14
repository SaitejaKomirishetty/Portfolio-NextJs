// src/app/blog/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { getAllBlogPosts } from '@/lib/blog';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Blog | Saiteja Komirishetty',
    description: 'Thoughts, tutorials, and insights about web development.',
};

export default async function BlogPage() {
    const posts = await getAllBlogPosts();

    return (
        <div className='max-w-4xl mx-auto px-4 py-12 pt-20'>
            <div className='text-center mb-12'>
                <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                    Blog
                </h1>
                <p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
                    Sharing my thoughts, learnings, and experiences in web
                    development
                </p>
            </div>

            {posts.length === 0 ? (
                <div className='text-center py-12'>
                    <p className='text-gray-600 dark:text-gray-400'>
                        No blog posts yet. Check back soon!
                    </p>
                </div>
            ) : (
                <div className='space-y-8'>
                    {posts.map((post) => (
                        <article
                            key={post.slug}
                            className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/20 transition-shadow duration-200'
                        >
                            {post.image && (
                                <div className='aspect-video relative'>
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                            )}

                            <div className='p-6'>
                                <div className='flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3'>
                                    <div className='flex items-center gap-1'>
                                        <Calendar className='w-4 h-4' />
                                        <time dateTime={post.date}>
                                            {format(
                                                new Date(post.date),
                                                'MMM dd, yyyy'
                                            )}
                                        </time>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Clock className='w-4 h-4' />
                                        <span>{post.readingTime}</span>
                                    </div>
                                    {post.featured && (
                                        <span className='bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs px-2 py-1 rounded-full'>
                                            Featured
                                        </span>
                                    )}
                                </div>

                                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className='hover:text-amber-600 dark:hover:text-amber-400 transition-colors'
                                    >
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className='text-gray-600 dark:text-gray-300 mb-4 line-clamp-3'>
                                    {post.excerpt}
                                </p>

                                <div className='flex items-center justify-between'>
                                    <div className='flex flex-wrap gap-2'>
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className='text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full'
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className='inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium transition-colors'
                                    >
                                        Read more
                                        <ArrowRight className='w-4 h-4' />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
