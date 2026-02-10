// @ts-nocheck
import * as __fd_glob_4 from "../content/docs/next-sitemap.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/fumadocs.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/docker.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/architecture.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {}, {"architecture.mdx": __fd_glob_0, "docker.mdx": __fd_glob_1, "fumadocs.mdx": __fd_glob_2, "index.mdx": __fd_glob_3, "next-sitemap.mdx": __fd_glob_4, });