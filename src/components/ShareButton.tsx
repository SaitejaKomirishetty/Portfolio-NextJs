'use client';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
    title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title }) => {
    const handleShare = () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    };

    return (
        <button
            className='flex items-center gap-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors'
            onClick={handleShare}
        >
            <Share2 className='w-5 h-5' />
            Share
        </button>
    );
};

export default ShareButton;
