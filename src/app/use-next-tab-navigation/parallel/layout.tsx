import Header from './_components/Header';

//layout.tsx
export default async function Layout({ params, tabs }: { params: any; tabs: React.ReactNode }) {
  return (
    <>
      <Header />
      <article>{tabs}</article>
    </>
  );
}
