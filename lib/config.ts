import { Metadata } from 'next';

export const siteConfig = {
    name: 'SpecGauge',
    url:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://specgauge.com',
    ogImage: '/main-devices.png',
    description:
        'SpecGauge helps oil distributors monitor tank levels in real time, reduce emergency deliveries, and plan more profitable refill routes.',
};

const metadataKeyWords = [
    'SpecGauge',
    'oil tank monitoring',
    'fuel delivery optimization',
    'real-time tank telemetry',
    'oil distribution software',
    'pressure sensor',
    'delivery route planning',
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
    metadataBase: new URL(siteConfig.url),
    alternates: {
        canonical: '/',
    },
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
    },
    robots: {
        index: true,
        follow: true,
    },
};
