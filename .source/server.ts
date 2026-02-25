// @ts-nocheck
import * as __fd_glob_16 from "../content/docs/react/web-worker-clock.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/react/tanstack-query-post.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/robust-project-structure/pnpm-is-slow.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/robust-project-structure/git-rabase-vs-git-pull.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/robust-project-structure/fumadocs.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/robust-project-structure/docker.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/robust-project-structure/biome.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/robust-project-structure/architecture.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/nextjs/next-tab-navigation.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/nextjs/next-sitemap.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/nextjs/next-scroll-restoration.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/nextjs/next-legacy-sass.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/projects/next-retrospective.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/data-structure/graph.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/canvas/IMGUI-vs-RMGUI.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/ai/agentic-coding-vs-vibe-coding.mdx?collection=docs"
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

export const docs = await create.docs("docs", "content/docs", {}, {"index.mdx": __fd_glob_0, "ai/agentic-coding-vs-vibe-coding.mdx": __fd_glob_1, "canvas/IMGUI-vs-RMGUI.mdx": __fd_glob_2, "data-structure/graph.mdx": __fd_glob_3, "projects/next-retrospective.mdx": __fd_glob_4, "nextjs/next-legacy-sass.mdx": __fd_glob_5, "nextjs/next-scroll-restoration.mdx": __fd_glob_6, "nextjs/next-sitemap.mdx": __fd_glob_7, "nextjs/next-tab-navigation.mdx": __fd_glob_8, "robust-project-structure/architecture.mdx": __fd_glob_9, "robust-project-structure/biome.mdx": __fd_glob_10, "robust-project-structure/docker.mdx": __fd_glob_11, "robust-project-structure/fumadocs.mdx": __fd_glob_12, "robust-project-structure/git-rabase-vs-git-pull.mdx": __fd_glob_13, "robust-project-structure/pnpm-is-slow.mdx": __fd_glob_14, "react/tanstack-query-post.mdx": __fd_glob_15, "react/web-worker-clock.mdx": __fd_glob_16, });