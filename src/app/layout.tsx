import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/hooks/ThemeContext';
import AppNavbar from '@/components/AppNavbar';
import CustomCursor from '@/components/CustomCursor';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Saiteja Komirishetty',
    description: 'Portfolio',
    icons: {
        icon: '/Logo.svg', // Path to your svg in public/
    },
    metadataBase: process.env.NEXT_PUBLIC_SITE_URL
        ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
        : undefined,
    openGraph: {
        title: 'Saiteja Komirishetty',
        description: 'Portfolio',
        url: '/',
        siteName: 'Saiteja Komirishetty',
        images: [
            {
                url: '/Logo.svg',
                width: 1200,
                height: 630,
                alt: 'Saiteja Komirishetty',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Saiteja Komirishetty',
        description: 'Portfolio',
        images: ['/Logo.svg'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className='dark'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider>
                    <CustomCursor />
                    <AppNavbar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
