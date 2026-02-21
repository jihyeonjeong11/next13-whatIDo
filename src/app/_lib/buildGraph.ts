import { source } from '@/libs/fumadocs/source';
import type { Graph } from '@/app/_components/graphView/GraphView';

export async function buildGraph(): Promise<Graph> {
  const graph: Graph = { links: [], nodes: [] };

  await Promise.all(
    source.getPages().map(async (page) => {
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
