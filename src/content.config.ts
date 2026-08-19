import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      tags: z.array(z.string()).default([]),
      github: z.string().url().optional(),
      demo: z.string().url().optional(),
      // Cover image, optimized by Astro at build time. Path is relative to this .md file,
      // e.g. cover: "./cover.png" with cover.png sitting next to the markdown file.
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // Extra screenshots for a gallery grid on the project page.
      gallery: z
        .array(z.object({ src: image(), alt: z.string() }))
        .default([]),
      status: z.enum(['active', 'complete', 'archived']).default('complete'),
      date: z.coerce.date(),
      featured: z.boolean().default(false),
      // Build log: the chronological "here's what happened" entries
      log: z
        .array(
          z.object({
            date: z.coerce.date(),
            title: z.string(),
            // 'milestone' = things went right, 'problem' = things broke, 'fix' = how it got solved
            kind: z.enum(['milestone', 'problem', 'fix', 'note']).default('note'),
            body: z.string(),
            image: image().optional(),
            imageAlt: z.string().optional(),
          })
        )
        .default([]),
    }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().optional(),
      tags: z.array(z.string()).default([]),
      date: z.coerce.date(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

export const collections = { projects, notes };

