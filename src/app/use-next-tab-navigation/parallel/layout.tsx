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
      <header className="flex justify-between p-5 py-8"></header>
      {tabs}
    </article>
  );
}
