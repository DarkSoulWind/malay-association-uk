import { defineCollection, z } from "astro:content";

const postCategory = z.enum([
  "Events",
  "Community Support",
  "Fundraising",
  "Announcements",
  "Cultural Education",
  "Food & Cuisine",
  "Remembrance",
  "Partnerships"
]);

const sensitivity = z.enum(["standard", "welfare", "remembrance"]);
const contentType = z.enum(["event", "post", "notice", "recap"]);

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishedDate: z.coerce.date(),
    eventDate: z.coerce.date().optional(),
    category: postCategory,
    contentType,
    excerpt: z.string(),
    featuredImage: z.string(),
    imageAlt: z.string(),
    venue: z.string().optional(),
    eventStartTime: z.string().optional(),
    eventEndTime: z.string().optional(),
    entryFee: z.string().optional(),
    isPastEvent: z.boolean().default(true),
    sensitivity: sensitivity.default("standard"),
    tags: z.array(z.string()).default([]),
    sourcePath: z.string().optional()
  })
});

export const collections = { posts };
