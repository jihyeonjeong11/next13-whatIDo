import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { getPageImage, source } from '@/libs/fumadocs/source';
import { generate as DefaultImage } from 'fumadocs-ui/og';

export const revalidate = false;
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const { title, description } = page.data;

  return new ImageResponse(
    <DefaultImage title={title} description={description} site="My Blog" />,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}
