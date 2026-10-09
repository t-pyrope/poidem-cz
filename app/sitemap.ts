import { tagSlugs } from "@/lib/event-tags";
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { db } from "@/lib/db";
import { events } from "@/db/schema";

// Read Neon on every request, including changes made by the cleanup cron.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const eventRows = await db.select({ slug: events.slug }).from(events);
  const paths = [
    "/",
    "/today",
    "/tomorrow",
    "/weekend",
    ...Object.values(tagSlugs).map(
      (slug) => `/events/${encodeURIComponent(slug)}`,
    ),
    ...eventRows.map(({ slug }) => `/events/${encodeURIComponent(slug)}`),
  ];

  // Categories and events share a route; emit each canonical URL only once.
  // The schema has no modification timestamp, so omit lastModified.
  return [...new Set(paths)].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: "daily",
    priority: path === "/" ? 1 : 0.8,
  }));
}
