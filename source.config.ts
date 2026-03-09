import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { defineDocs, defineConfig, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import z from 'zod';


export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend({
       tags: z.array(z.string()).optional(),
    }),
    postprocess: {
      extractLinkReferences: true,
    },
  },
  meta: {
      schema: metaSchema,
    },
  
    
});

export default defineConfig({
  plugins: [lastModified()]
});