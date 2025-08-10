import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.json', base: "./src/data/gallery" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    created: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    additionalImages: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })),
    category: z.enum(['childrensIllustration', 'weddingIllustration', 'surfacePattern', 'weddingStationery']),
    license: z.enum(['non-exclusive', 'exclusive']),
    techniques: z.array(z.string()),
    tags: z.array(z.string())
  }),
});

export const collections = {
  gallery,
}; 