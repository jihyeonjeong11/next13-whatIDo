
import ContestTabs from '../_components/ContestTabs';
import Header from '../_components/Header';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
