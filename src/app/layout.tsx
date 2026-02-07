import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Aside from './_components/Aside';
import Header from './_components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Nextjs lab',
  description: 'Make Index!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-dvh`}>
        <Header />
        <div className="flex flex-1 min-h-dvh">
          <Aside />
          <main className="flex-1 min-h-0 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
