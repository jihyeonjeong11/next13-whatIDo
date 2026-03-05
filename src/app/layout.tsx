import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';
import ProgressBarProvider from './_components/ProgressBarProvider';
import { ThemeProvider } from 'next-themes';
import WebVitals from './_components/WebVitals';
// import Footer from './_components/Footer';

const inter = Inter({ subsets: ['latin'] });

const title = 'JIHYEON JEONG | a Web dev From Korea, Seoul.';
const description =
  "I'm a curious and dedicated Web developer with a background in full-stack development.";
const url = 'https://jihyeonjeong.com/';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  keywords: ['Web developer', 'React Native developer', 'Next.js Developer', 'AWS Engineer'],
  creator: 'JIHYEON JEONG',
  openGraph: {
    type: 'website',
    url,
    title,
    description,
    siteName: title,
    images: [
      {
        url: '/favicon.ico',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <WebVitals />
        <RootProvider
          theme={{
            defaultTheme: 'system',
            enabled: true,
          }}
        >
          <ThemeProvider>
            <ProgressBarProvider>{children}</ProgressBarProvider>
          </ThemeProvider>
        </RootProvider>
      </body>
    </html>
  );
}
