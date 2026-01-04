// [id]/layout.tsx
export default async function Layout({
  params,
  tabs,
}: {
  params: any;
  tabs: React.ReactNode;
}) {
  // 중략
  return (
    <article>
      {tabs}
    </article>
  );
}
