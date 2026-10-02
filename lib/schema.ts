import { z } from "zod";

const publicUrl = z.url().refine(value => value.startsWith("http://") || value.startsWith("https://"), "Use an HTTP(S) URL");
export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  client: z.string().min(1),
  category: z.enum(["Mobile", "Full stack", "Backend"]),
  period: z.string(),
  summary: z.string().min(1),
  stack: z.array(z.string()).min(1),
  highlights: z.array(z.string()).min(1),
  accent: z.enum(["lime", "lilac", "peach", "blue"]),
  featured: z.boolean(),
  source: publicUrl,
  repo: publicUrl.optional(),
  caseStudy: z.object({
    overview: z.string(),
    sections: z.array(z.object({ title: z.string(), text: z.string() })),
    delivery: z.array(z.string())
  }).optional()
});
export const experienceSchema = z.object({
  id: z.string(), role: z.string(), company: z.string(), period: z.string(),
  description: z.string(), current: z.boolean()
});
export const portfolioSchema = z.object({
  projects: z.array(projectSchema), experiences: z.array(experienceSchema)
});
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;
