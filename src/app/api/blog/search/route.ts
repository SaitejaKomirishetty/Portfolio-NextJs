import { NextRequest, NextResponse } from 'next/server';
import { searchBlogPosts, advancedSearchBlogPosts } from '@/lib/blog';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        const tags = searchParams.get('tags');
        const featured = searchParams.get('featured');
        const dateFrom = searchParams.get('dateFrom');
        const dateTo = searchParams.get('dateTo');

        // Simple search
        if (query && !tags && !featured && !dateFrom && !dateTo) {
            const results = await searchBlogPosts(query);
            return NextResponse.json({ posts: results });
        }

        // Advanced search
        const options: {
            query?: string;
            tags?: string[];
            featured?: boolean;
            dateFrom?: string;
            dateTo?: string;
        } = {};
        if (query) options.query = query;
        if (tags) options.tags = tags.split(',');
        if (featured !== null) options.featured = featured === 'true';
        if (dateFrom) options.dateFrom = dateFrom;
        if (dateTo) options.dateTo = dateTo;

        const results = await advancedSearchBlogPosts(options);
        return NextResponse.json({ posts: results });
    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json(
            { error: 'Failed to search blog posts' },
            { status: 500 }
        );
    }
}
