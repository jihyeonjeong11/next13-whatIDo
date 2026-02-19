// @ts-nocheck
import * as __fd_glob_7 from "../content/docs/robust-project-structure/fumadocs.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/robust-project-structure/docker.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/robust-project-structure/architecture.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/react/web-worker-clock.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/data-structure/graph.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/nextjs/next-tab-navigation.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/nextjs/next-sitemap.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
    docs: {
      /**
       * extracted references (e.g. hrefs, paths), useful for analyzing relationships between pages.
       */
      extractedReferences: import("fumadocs-mdx").ExtractedReference[];
    },
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {}, {"index.mdx": __fd_glob_0, "nextjs/next-sitemap.mdx": __fd_glob_1, "nextjs/next-tab-navigation.mdx": __fd_glob_2, "data-structure/graph.mdx": __fd_glob_3, "react/web-worker-clock.mdx": __fd_glob_4, "robust-project-structure/architecture.mdx": __fd_glob_5, "robust-project-structure/docker.mdx": __fd_glob_6, "robust-project-structure/fumadocs.mdx": __fd_glob_7, });