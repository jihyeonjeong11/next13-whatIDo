// @ts-nocheck
import * as __fd_glob_27 from "../content/docs/robust-project-structure/pnpm-is-slow.mdx?collection=docs"
import * as __fd_glob_26 from "../content/docs/robust-project-structure/git-rabase-vs-git-pull.mdx?collection=docs"
import * as __fd_glob_25 from "../content/docs/robust-project-structure/fumadocs.mdx?collection=docs"
import * as __fd_glob_24 from "../content/docs/robust-project-structure/docker.mdx?collection=docs"
import * as __fd_glob_23 from "../content/docs/robust-project-structure/biome.mdx?collection=docs"
import * as __fd_glob_22 from "../content/docs/robust-project-structure/architecture.mdx?collection=docs"
import * as __fd_glob_21 from "../content/docs/projects/next-retrospective.mdx?collection=docs"
import * as __fd_glob_20 from "../content/docs/react/web-worker-clock.mdx?collection=docs"
import * as __fd_glob_19 from "../content/docs/react/tanstack-query-post.mdx?collection=docs"
import * as __fd_glob_18 from "../content/docs/nextjs/next-tab-navigation.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/nextjs/next-sitemap.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/nextjs/next-scroll-restoration.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/nextjs/next-legacy-sass.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/needsReview/claude-code-roadmap.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/html-canvas/Infinite-canvas-implementation.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/html-canvas/IMGUI-vs-RMGUI.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/data-structure/graph.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/ai/agentic-coding-vs-vibe-coding.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/index.mdx?collection=docs"
import { default as __fd_glob_8 } from "../content/docs/robust-project-structure/meta.json?collection=docs"
import { default as __fd_glob_7 } from "../content/docs/react/meta.json?collection=docs"
import { default as __fd_glob_6 } from "../content/docs/projects/meta.json?collection=docs"
import { default as __fd_glob_5 } from "../content/docs/needsReview/meta.json?collection=docs"
import { default as __fd_glob_4 } from "../content/docs/nextjs/meta.json?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/html-canvas/meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/data-structure/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/ai/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
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

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "ai/meta.json": __fd_glob_1, "data-structure/meta.json": __fd_glob_2, "html-canvas/meta.json": __fd_glob_3, "nextjs/meta.json": __fd_glob_4, "needsReview/meta.json": __fd_glob_5, "projects/meta.json": __fd_glob_6, "react/meta.json": __fd_glob_7, "robust-project-structure/meta.json": __fd_glob_8, }, {"index.mdx": __fd_glob_9, "ai/agentic-coding-vs-vibe-coding.mdx": __fd_glob_10, "data-structure/graph.mdx": __fd_glob_11, "html-canvas/IMGUI-vs-RMGUI.mdx": __fd_glob_12, "html-canvas/Infinite-canvas-implementation.mdx": __fd_glob_13, "needsReview/claude-code-roadmap.mdx": __fd_glob_14, "nextjs/next-legacy-sass.mdx": __fd_glob_15, "nextjs/next-scroll-restoration.mdx": __fd_glob_16, "nextjs/next-sitemap.mdx": __fd_glob_17, "nextjs/next-tab-navigation.mdx": __fd_glob_18, "react/tanstack-query-post.mdx": __fd_glob_19, "react/web-worker-clock.mdx": __fd_glob_20, "projects/next-retrospective.mdx": __fd_glob_21, "robust-project-structure/architecture.mdx": __fd_glob_22, "robust-project-structure/biome.mdx": __fd_glob_23, "robust-project-structure/docker.mdx": __fd_glob_24, "robust-project-structure/fumadocs.mdx": __fd_glob_25, "robust-project-structure/git-rabase-vs-git-pull.mdx": __fd_glob_26, "robust-project-structure/pnpm-is-slow.mdx": __fd_glob_27, });