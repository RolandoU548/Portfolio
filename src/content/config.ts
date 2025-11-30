import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    locale: z.string(),
    image: z.string(),
    tags: z.array(z.array(z.string())),
    liveUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    order: z.number(),
  }),
});

export const collections = {
  projects,
};
