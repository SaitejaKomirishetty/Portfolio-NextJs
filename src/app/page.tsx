import type { Metadata } from 'next';
import HomePage from './HomePage';

export const metadata: Metadata = {
    title: 'Saiteja Komirishetty | Portfolio',
    description:
        'Portfolio of Saiteja Komirishetty — projects, skills, experience, and blog posts about web development.',
};

export default function Home() {
    return <HomePage />;
}
