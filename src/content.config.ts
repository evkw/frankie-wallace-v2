import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  published: z.date(),
  updated: z.date().optional(),
  tags: z.array(z.string()),
  author: z.string(),
  draft: z.boolean(),
});


const galleryScehma = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  additionalImages: z.array(z.object({
    src: z.string(),
    alt: z.string(),
  })),
  category: z.enum(['childrensBooks', 'venues', 'surfacePattern']),
  categoryTitle: z.string().optional(),
  license: z.enum(['non-exclusive', 'exclusive']),
  techniques: z.array(z.string()),
  tags: z.array(z.string()),
  protected: z.boolean(),
  dateCreated: z.string(),
});


const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
  schema: postSchema
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.json', base: "./src/data/gallery" }),
  schema: galleryScehma
});

export const collections = {
  gallery,
  blog
}; 

export type PostSchema = z.infer<typeof postSchema>;
export type ProjectSchema = z.infer<typeof galleryScehma>;