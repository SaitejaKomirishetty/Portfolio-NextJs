import { MetadataRoute } from 'next';
import { getBlogSlugs, getBlogPost } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || 'https://saitejakomirishetty.com';

    // Get all blog post slugs
    const blogSlugs = getBlogSlugs();

    // Generate blog post URLs
    const blogPosts = await Promise.all(
        blogSlugs.map(async (slug) => {
            const post = await getBlogPost(slug);
            return {
                url: `${baseUrl}/blog/${slug}`,
                lastModified: post?.date ? new Date(post.date) : new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            };
        })
    );

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        ...blogPosts,
    ];
}
