import { docs } from '../../../.source/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];
  return {
    segments,
    url: `api/og/docs/${segments.join('/')}`,
  };
}

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon(icon) {
    // https://www.fumadocs.dev/docs/headless/source-api#icons
    if (!icon) {
      // You may set a default icon
      return;
    }
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});

export type Page = InferPageType<typeof source>;
