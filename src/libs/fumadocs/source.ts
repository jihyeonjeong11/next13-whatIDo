import { docs } from '../../../.source/server';
import { type InferPageType, loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

export type Page = InferPageType<typeof source>;
