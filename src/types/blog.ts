
export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    tags: string[];
    featured?: boolean;
    image?: string;
    readingTime: string;
}

export interface BlogPostMetadata {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    featured?: boolean;
    image?: string;
    readingTime: string;
}
