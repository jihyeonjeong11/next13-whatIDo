// source.config.ts
import { defineDocs, defineConfig, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      extractLinkReferences: true
    }
  },
  meta: {
    schema: metaSchema
  }
});
var source_config_default = defineConfig();
export {
  source_config_default as default,
  docs
};
