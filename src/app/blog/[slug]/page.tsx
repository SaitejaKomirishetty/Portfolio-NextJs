// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { getBlogPost, getBlogSlugs } from '@/lib/blog';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import ShareButton from '@/components/ShareButton';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
    const slugs = getBlogSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | Saiteja Komirishetty`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.image ? [{ url: post.image }] : [],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className='max-w-4xl mx-auto px-4 py-8 pt-20'>
            {/* Back to blog link */}
            <Link
                href='/blog'
                className='inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 mb-8 transition-colors'
            >
                <ArrowLeft className='w-4 h-4' />
                Back to blog
            </Link>

            {/* Featured image */}
            {post.image && (
                <div className='aspect-video relative rounded-lg overflow-hidden mb-8'>
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className='object-cover'
                    />
                </div>
            )}

            {/* Post header */}
            <header className='mb-8'>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
                    {post.title}
                </h1>

                <div className='flex items-center gap-6 text-gray-600 dark:text-gray-400 mb-6'>
                    <div className='flex items-center gap-2'>
                        <Calendar className='w-5 h-5' />
                        <time dateTime={post.date}>
                            {format(new Date(post.date), 'MMMM dd, yyyy')}
                        </time>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Clock className='w-5 h-5' />
                        <span>{post.readingTime}</span>
                    </div>
                    <ShareButton title={post.title} />
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2 mb-6'>
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className='text-sm bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 px-3 py-1 rounded-full'
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* Post content */}
            <div
                className='prose prose-lg max-w-none 
                    prose-headings:text-gray-900 dark:prose-headings:text-white
                    prose-p:text-gray-700 dark:prose-p:text-gray-300
                    prose-a:text-amber-600 dark:prose-a:text-amber-400
                    prose-strong:text-gray-900 dark:prose-strong:text-white
                    prose-code:text-gray-800 dark:prose-code:text-gray-200
                    prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                    prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800
                    prose-pre:text-gray-100 dark:prose-pre:text-gray-200
                    prose-blockquote:border-amber-500
                    prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400'
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Post footer */}
            <footer className='mt-12 pt-8 border-t border-gray-200 dark:border-gray-700'>
                <div className='text-center'>
                    <p className='text-gray-600 dark:text-gray-400 mb-4'>
                        Enjoyed this post? Share it with others!
                    </p>
                    <Link
                        href='/blog'
                        className='inline-flex items-center gap-2 bg-amber-600 dark:bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors'
                    >
                        <ArrowLeft className='w-4 h-4' />
                        View all posts
                    </Link>
                </div>
            </footer>
        </article>
    );
}
