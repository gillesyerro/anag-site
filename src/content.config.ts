import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: ({ image }) =>
    z.object({
      date: z.string(),
      dateSort: z.date().optional(),
      type: z.string(),
      title: z.string(),
      lieu: z.string(),
      featured: z.boolean().default(false),
      href: z.string().optional(),
      cta: z.string().optional(),
      affiche: z.string().optional(),
      afficheAlt: z.string().optional(),
    }),
});

const galerie = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/galerie" }),
  schema: z.object({
    image: z.string(),
    caption: z.string(),
    ordre: z.number().default(100),
  }),
});

export const collections = { events, galerie };
