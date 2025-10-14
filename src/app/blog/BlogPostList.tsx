import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { BlogPostMetadata } from '@/types/blog';

interface BlogPostListProps {
    posts: BlogPostMetadata[];
}

export default function BlogPostList({ posts }: BlogPostListProps) {
    if (posts.length === 0) {
        return (
            <div className='text-center py-12'>
                <p className='text-gray-600 dark:text-gray-400'>
                    No blog posts found. Try a different search term.
                </p>
            </div>
        );
    }

    return (
        <div className='space-y-8 mt-8'>
            {posts.map((post) => (
                <article
                    key={post.slug}
                    className='border border-gray-200 rounded-lg dark:border-gray-800 transition-all duration-500 ease-out transform-gpu hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/15 dark:hover:border-amber-500 hover:border-amber-500/30'
                >
                    {post.image && (
                        <div className='aspect-video relative'>
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className='aspect-video'
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

                        <h2 className='text-2xl text-start font-bold text-gray-900 dark:text-white mb-3'>
                            <Link
                                href={`/blog/${post.slug}`}
                                className='hover:text-amber-600 dark:hover:text-amber-400 transition-colors'
                            >
                                {post.title}
                            </Link>
                        </h2>

                        <p className='text-gray-600 text-start dark:text-gray-300 mb-4 line-clamp-3'>
                            {post.excerpt}
                        </p>

                        <div className='flex items-center justify-between'>
                            <div className='flex flex-wrap gap-2'>
                                {post.tags.map((tag) => (
                                    <p
                                        key={tag}
                                        className='text-xs flex items-baseline-last justify-center bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full'
                                    >
                                        #<span>{tag}</span>
                                    </p>
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
    );
}
