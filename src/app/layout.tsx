import Footer from '@/app/_components/footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { HOME_OG_IMAGE_URL } from '@/lib/constants';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WebSite, WithContext } from 'schema-dts';
import './globals.css';

const jsonLd: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'mtseo',
  image: `${HOME_OG_IMAGE_URL}`,
  description: `Exploring Web Tech Frontiers.`,
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: `mtseo`,
    template: `%s - mtseo`,
  },
  description: `Exploring Web Tech Frontiers.`,
  metadataBase: new URL(`https://mtseo.dev`),
  twitter: {
    card: 'summary_large_image',
  },

  openGraph: {
    images: [HOME_OG_IMAGE_URL],
    siteName: 'mtseo',
    authors: 'mtseo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen">{children}</div>
        <div id="_portal"></div>
        <GoogleAnalytics gaId="GTM-NJ8BQ9FM" />
        {/* <Footer /> */}
      </body>
    </html>
  );
}
