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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="flex">
          <Aside />
          {children}
        </div>
      </body>
    </html>
  );
}
