import { source } from '@/libs/fumadocs/source';
import type { Graph } from '../_components/Graph-View';

export async function buildGraph(): Promise<Graph> {
  const graph: Graph = { links: [], nodes: [] };

  await Promise.all(
    source.getPages().map(async (page) => {
      console.log(page);
      if (page.data.type === 'openapi') return;

      graph.nodes.push({
        id: page.url,
        url: page.url,
        text: page.data.title,
        description: page.data.description,
      });

      const { extractedReferences = [] } = page.data;
      for (const ref of extractedReferences) {
        const refPage = source.getPageByHref(ref.href);
        if (!refPage) continue;

        graph.links.push({
          source: page.url,
          target: refPage.page.url,
        });
      }
    }),
  );

  return graph;
}
