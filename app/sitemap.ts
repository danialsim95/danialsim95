import type { MetadataRoute } from "next";
import { getPortfolio } from "@/lib/content";
import { siteUrl } from "@/lib/profile";
export const dynamic = "force-static";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getPortfolio();
  return [{ url: siteUrl(), changeFrequency: "monthly", priority: 1 }, { url: `${siteUrl()}/resume`, changeFrequency: "monthly", priority: .5 }, ...projects.map(p => ({url: `${siteUrl()}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: .7}))];
}
