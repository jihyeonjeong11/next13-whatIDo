import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Aside from './_components/Aside';
import Header from './_components/Header';
// import Footer from './_components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Nextjs lab',
  description: 'Make Index!',
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-dvh bg-background text-white`}>
        <Header />
        <div className="flex flex-1 min-h-dvh">
          <Aside />
          {children}
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
