import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Inter, Libre_Franklin } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
const serif = Libre_Franklin({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Digital Credit Field Guide',
    template: '%s — Digital Credit Field Guide',
  },
  description:
    'A source-led systems guide to Digital Credit, with Apyx as a documented case study.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  openGraph: {
    title: 'Digital Credit Field Guide',
    description:
      'Tokenization changes the interface. It does not erase the obligation underneath.',
    type: 'article',
  },
  twitter: { card: 'summary_large_image' },
};
export const viewport: Viewport = {
  themeColor: '#f4f2ea',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className="grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:p-3"
        >
          Skip to content
        </a>
        <header className="border-b border-[#c9c7bd]">
          <div className="container flex min-h-16 items-center justify-between gap-4">
            <Link href="/" className="no-underline">
              <span className="label">DC / FIELD GUIDE</span>
            </Link>
            <nav aria-label="Primary" className="flex gap-4 text-sm sm:gap-7">
              <Link href="/#guide">Guide</Link>
              <Link href="/methodology">Method</Link>
              <Link href="/sources">Sources</Link>
              <Link href="/share">Cards</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-24 border-t border-[#c9c7bd] py-10">
          <div className="container flex flex-col justify-between gap-4 text-sm text-[#596159] sm:flex-row">
            <p>Research & engineering by Juan Torchia · 2026</p>
            <p>Educational research. Not financial advice.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
