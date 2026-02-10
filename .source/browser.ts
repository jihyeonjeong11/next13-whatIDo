// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"architecture.mdx": () => import("../content/docs/architecture.mdx?collection=docs"), "docker.mdx": () => import("../content/docs/docker.mdx?collection=docs"), "fumadocs.mdx": () => import("../content/docs/fumadocs.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "next-sitemap.mdx": () => import("../content/docs/next-sitemap.mdx?collection=docs"), }),
};
export default browserCollections;