// src/app/blog/page.tsx
import { getAllBlogPosts } from '@/lib/blog';
import BlogSearch from './BlogSearch';

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
                    Blogs
                </h1>
                <p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8'>
                    Sharing my thoughts, learnings, and experiences in web
                    development
                </p>
                <BlogSearch initialPosts={posts} />
            </div>

            {posts.length === 0 && (
                <div className='text-center py-12'>
                    <p className='text-gray-600 dark:text-gray-400'>
                        No blog posts yet. Check back soon!
                    </p>
                </div>
            )}
        </div>
    );
}
