import Footer from '@/app/_components/footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { HOME_OG_IMAGE_URL } from '@/lib/constants';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WebSite, WithContext } from 'schema-dts';
import './globals.css';
import Header from './_components/header/header';

const jsonLd: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'angari',
  image: `${HOME_OG_IMAGE_URL}`,
  description: `Hi I'm Angari.`,
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: `angari`,
    template: `%s - angari`,
  },
  description: `Hi I'm Angari.`,
  metadataBase: new URL(`https://angari.dev`),
  twitter: {
    card: 'summary_large_image',
  },

  openGraph: {
    images: [HOME_OG_IMAGE_URL],
    siteName: 'angari',
    authors: 'angari',
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
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#e01808"
        />
        <meta name="apple-mobile-web-app-title" content="Angari" />
        <meta name="application-name" content="Angari" />
        <meta name="msapplication-TileColor" content="#e01808" />
        <meta
          name="msapplication-TileImage"
          content="/favicon/mstile-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen">
          <Header />
          {children}
        </div>
        <div id="_portal"></div>
        <GoogleAnalytics gaId="GTM-NJ8BQ9FM" />
        {/* <Footer /> */}
      </body>
    </html>
  );
}
