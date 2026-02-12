import { baseOptions } from '@/libs/fumadocs/layout.shared';
import { source } from '@/libs/fumadocs/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  console.log('source.getPageTree()', source.getPageTree());
  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
