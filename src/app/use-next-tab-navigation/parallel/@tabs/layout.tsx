// [id]/@tabs/layout.tsx

import ContestTabs from '../_components/ContestTabs';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { id } = params;
  return (
    <>
      <ContestTabs contestId={id}></ContestTabs>
      {children}
    </>
  );
}
