// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
    docs: {
      /**
       * extracted references (e.g. hrefs, paths), useful for analyzing relationships between pages.
       */
      extractedReferences: import("fumadocs-mdx").ExtractedReference[];
    },
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "data-structure/graph.mdx": () => import("../content/docs/data-structure/graph.mdx?collection=docs"), "nextjs/next-tab-navigation.mdx": () => import("../content/docs/nextjs/next-tab-navigation.mdx?collection=docs"), "robust-project-structure/architecture.mdx": () => import("../content/docs/robust-project-structure/architecture.mdx?collection=docs"), "robust-project-structure/docker.mdx": () => import("../content/docs/robust-project-structure/docker.mdx?collection=docs"), "robust-project-structure/fumadocs.mdx": () => import("../content/docs/robust-project-structure/fumadocs.mdx?collection=docs"), "robust-project-structure/next-sitemap.mdx": () => import("../content/docs/robust-project-structure/next-sitemap.mdx?collection=docs"), "react/web-worker-clock.mdx": () => import("../content/docs/react/web-worker-clock.mdx?collection=docs"), }),
};
export default browserCollections;