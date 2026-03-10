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
} & {
  DocData: {
    docs: {
      /**
       * Last modified date of document file, obtained from version control.
       *
       */
      lastModified?: Date;
    },
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "ai/agentic-coding-vs-vibe-coding.mdx": () => import("../content/docs/ai/agentic-coding-vs-vibe-coding.mdx?collection=docs"), "ai/claude-code-agile-workflow.mdx": () => import("../content/docs/ai/claude-code-agile-workflow.mdx?collection=docs"), "data-structure/graph.mdx": () => import("../content/docs/data-structure/graph.mdx?collection=docs"), "html-canvas/IMGUI-vs-RMGUI.mdx": () => import("../content/docs/html-canvas/IMGUI-vs-RMGUI.mdx?collection=docs"), "html-canvas/Infinite-canvas-implementation.mdx": () => import("../content/docs/html-canvas/Infinite-canvas-implementation.mdx?collection=docs"), "needsReview/claude-code-roadmap.mdx": () => import("../content/docs/needsReview/claude-code-roadmap.mdx?collection=docs"), "react/tanstack-query-post.mdx": () => import("../content/docs/react/tanstack-query-post.mdx?collection=docs"), "react/web-worker-clock.mdx": () => import("../content/docs/react/web-worker-clock.mdx?collection=docs"), "nextjs/next-legacy-sass.mdx": () => import("../content/docs/nextjs/next-legacy-sass.mdx?collection=docs"), "nextjs/next-scroll-restoration.mdx": () => import("../content/docs/nextjs/next-scroll-restoration.mdx?collection=docs"), "nextjs/next-sitemap.mdx": () => import("../content/docs/nextjs/next-sitemap.mdx?collection=docs"), "nextjs/next-tab-navigation.mdx": () => import("../content/docs/nextjs/next-tab-navigation.mdx?collection=docs"), "nextjs/zod-super-refine.mdx": () => import("../content/docs/nextjs/zod-super-refine.mdx?collection=docs"), "projects/next-retrospective.mdx": () => import("../content/docs/projects/next-retrospective.mdx?collection=docs"), "robust-project-structure/architecture.mdx": () => import("../content/docs/robust-project-structure/architecture.mdx?collection=docs"), "robust-project-structure/biome.mdx": () => import("../content/docs/robust-project-structure/biome.mdx?collection=docs"), "robust-project-structure/docker.mdx": () => import("../content/docs/robust-project-structure/docker.mdx?collection=docs"), "robust-project-structure/fumadocs.mdx": () => import("../content/docs/robust-project-structure/fumadocs.mdx?collection=docs"), "robust-project-structure/git-rabase-vs-git-pull.mdx": () => import("../content/docs/robust-project-structure/git-rabase-vs-git-pull.mdx?collection=docs"), "robust-project-structure/pnpm-is-slow.mdx": () => import("../content/docs/robust-project-structure/pnpm-is-slow.mdx?collection=docs"), }),
};
export default browserCollections;