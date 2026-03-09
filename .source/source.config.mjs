// source.config.ts
import lastModified from "fumadocs-mdx/plugins/last-modified";
import { defineDocs, defineConfig, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";
import z from "zod";
var docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      tags: z.array(z.string()).optional()
    }),
    postprocess: {
      extractLinkReferences: true
    }
  },
  meta: {
    schema: metaSchema
  }
});
var source_config_default = defineConfig({
  plugins: [lastModified()]
});
export {
  source_config_default as default,
  docs
};
