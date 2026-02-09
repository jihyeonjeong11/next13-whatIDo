import '@/app/globals.css';
import Header from '../_components/Header';
import Aside from '../_components/Aside';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex flex-1 min-h-dvh">
        <Aside />
        {children}
      </div>
    </>
  );
}
