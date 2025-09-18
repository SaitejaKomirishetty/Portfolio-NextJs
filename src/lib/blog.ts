// src/lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';
import { BlogPost, BlogPostMetadata } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Get all blog post slugs
export function getBlogSlugs(): string[] {
    try {
        const fileNames = fs.readdirSync(postsDirectory);
        return fileNames
            .filter((name) => name.endsWith('.md'))
            .map((name) => name.replace(/\.md$/, ''));
    } catch (error) {
        console.error('Error reading blog directory:', error);
        return [];
    }
}

// Get blog post data by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Process markdown content with GitHub Flavored Markdown support
        const processedContent = await remark()
            .use(remarkGfm)
            .use(html)
            .process(content);
        const contentHtml = processedContent.toString();

        // Calculate reading time
        const readingTimeResult = readingTime(content);

        return {
            slug,
            title: data.title || '',
            date: data.date || '',
            excerpt: data.excerpt || '',
            content: contentHtml,
            tags: data.tags || [],
            featured: data.featured || false,
            image: data.image || null,
            readingTime: readingTimeResult.text,
        };
    } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return null;
    }
}

// Get all blog posts metadata
export async function getAllBlogPosts(): Promise<BlogPostMetadata[]> {
    const slugs = getBlogSlugs();
    const posts = await Promise.all(
        slugs.map(async (slug) => {
            const post = await getBlogPost(slug);
            if (!post) return null;

            // Return metadata without content
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { content, ...metadata } = post;
            return metadata;
        })
    );

    return posts
        .filter((post): post is BlogPostMetadata => post !== null)
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
}

// Get featured blog posts
export async function getFeaturedBlogPosts(): Promise<BlogPostMetadata[]> {
    const allPosts = await getAllBlogPosts();
    return allPosts.filter((post) => post.featured);
}

// Get posts by tag
export async function getBlogPostsByTag(
    tag: string
): Promise<BlogPostMetadata[]> {
    const allPosts = await getAllBlogPosts();
    return allPosts.filter((post) =>
        post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
    );
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
    const allPosts = await getAllBlogPosts();
    const tags = allPosts.flatMap((post) => post.tags);
    return [...new Set(tags)];
}

// Search blog posts by query
export async function searchBlogPosts(
    query: string
): Promise<BlogPostMetadata[]> {
    if (!query.trim()) {
        return getAllBlogPosts();
    }

    const allPosts = await getAllBlogPosts();
    const searchTerm = query.toLowerCase().trim();

    // Get all full posts for content search
    const fullPosts = await Promise.all(
        allPosts.map(async (post) => {
            try {
                const fullPost = await getBlogPost(post.slug);
                return { metadata: post, content: fullPost?.content || '' };
            } catch (error) {
                console.error(`Error reading post ${post.slug}:`, error);
                return { metadata: post, content: '' };
            }
        })
    );

    return fullPosts
        .filter(({ metadata: post, content }) => {
            // Search in title
            const titleMatch = post.title.toLowerCase().includes(searchTerm);

            // Search in excerpt
            const excerptMatch = post.excerpt
                .toLowerCase()
                .includes(searchTerm);

            // Search in tags
            const tagsMatch = post.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm)
            );

            // Search in content
            const plainTextContent = content
                .replace(/<[^>]*>/g, '')
                .toLowerCase();
            const contentMatch = plainTextContent.includes(searchTerm);

            return titleMatch || excerptMatch || tagsMatch || contentMatch;
        })
        .map(({ metadata }) => metadata);
}

// Advanced search with filters
export async function advancedSearchBlogPosts(options: {
    query?: string;
    tags?: string[];
    featured?: boolean;
    dateFrom?: string;
    dateTo?: string;
}): Promise<BlogPostMetadata[]> {
    let posts = await getAllBlogPosts();

    // Text search
    if (options.query?.trim()) {
        posts = await searchBlogPosts(options.query);
    }

    // Filter by tags
    if (options.tags && options.tags.length > 0) {
        posts = posts.filter((post) =>
            options.tags!.some((tag) =>
                post.tags.some((postTag) =>
                    postTag.toLowerCase().includes(tag.toLowerCase())
                )
            )
        );
    }

    // Filter by featured status
    if (options.featured !== undefined) {
        posts = posts.filter((post) => post.featured === options.featured);
    }

    // Filter by date range
    if (options.dateFrom) {
        const fromDate = new Date(options.dateFrom);
        posts = posts.filter((post) => new Date(post.date) >= fromDate);
    }

    if (options.dateTo) {
        const toDate = new Date(options.dateTo);
        posts = posts.filter((post) => new Date(post.date) <= toDate);
    }

    return posts;
}
