'use client';

import { useState, useTransition, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { BlogPostMetadata } from '@/types/blog';
import BlogPostList from './BlogPostList';

interface BlogSearchProps {
    initialPosts: BlogPostMetadata[];
}

export default function BlogSearch({ initialPosts }: BlogSearchProps) {
    const [query, setQuery] = useState('');
    const [posts, setPosts] = useState<BlogPostMetadata[]>(initialPosts);
    const [isPending, startTransition] = useTransition();

    // Debounced search function
    const performSearch = useCallback(
        async (searchQuery: string) => {
            if (!searchQuery.trim()) {
                setPosts(initialPosts);
                return;
            }

            startTransition(async () => {
                try {
                    const response = await fetch(
                        `/api/blog/search?q=${encodeURIComponent(searchQuery)}`
                    );
                    if (!response.ok) {
                        throw new Error('Search failed');
                    }
                    const data = await response.json();
                    setPosts(data.posts);
                } catch (error) {
                    console.error('Search error:', error);
                    setPosts(initialPosts);
                }
            });
        },
        [initialPosts]
    );

    // Debounce effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            performSearch(query);
        }, 300); // 300ms debounce delay

        return () => clearTimeout(timeoutId);
    }, [query, performSearch]);

    const handleInputChange = (value: string) => {
        setQuery(value);
    };

    const clearSearch = () => {
        setQuery('');
        setPosts(initialPosts);
    };

    return (
        <div className='w-full max-w-2xl mx-auto'>
            {/* Search Input */}
            <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Search className='h-5 w-5 text-gray-400' />
                </div>
                <input
                    type='text'
                    placeholder='Search blog posts...'
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className='block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors'
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className='absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
                    >
                        <X className='h-5 w-5 text-gray-400' />
                    </button>
                )}
            </div>

            {/* Search Results Info */}
            {query && (
                <div className='mt-4 text-center'>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                        {isPending ? (
                            'Searching...'
                        ) : (
                            <>
                                Found {posts.length} post
                                {posts.length !== 1 ? 's' : ''}
                                {query && ` for "${query}"`}
                            </>
                        )}
                    </p>
                </div>
            )}

            {/* Blog Posts */}
            <BlogPostList posts={posts} />
        </div>
    );
}
