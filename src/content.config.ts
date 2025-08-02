import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.json', base: "./src/data/gallery" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    category: z.enum(['childrensIllustration', 'weddingIllustration', 'surfacePattern', 'weddingStationery']),
  }),
});

export const collections = {
  gallery,
}; 