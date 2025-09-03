import { Metadata } from 'next';

// TODO: update site config

export const siteConfig = {
    name: 'SybilFi - Your Crypto Management Solution',
    url:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/'
            : 'https://sybilfi.vercel.app/',
    ogImage: '',
    description:
        'sybilfi is a project designed to simplify the lives of sibyls by helping them manage multiple accounts, track tasks, and maintain daily activities efficiently.',
    links: {},
};

const metadataKeyWords = [
    'Crypto',
];

export const defaultMetadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: metadataKeyWords,
    authors: [
        {
            name: 'webshark.dev',
            url: 'https://github.com/websharkdev',
        },
    ],
    creator: 'webshark.dev',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    manifest: `${siteConfig.url}manifest.webmanifest`,
};