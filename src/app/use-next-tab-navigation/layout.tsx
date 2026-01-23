import Link from 'next/link';

const UseNextTabNavigationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen flex-1 justify-center items-center gap-4">
      <nav className="h-8 flex items-center gap-4 justify-center">
        <Link href="/use-next-tab-navigation/catchall">catchall</Link>
        <Link href="/use-next-tab-navigation/parallel">parallel</Link>
      </nav>
      {children}
    </section>
  );
};

export default UseNextTabNavigationLayout;
