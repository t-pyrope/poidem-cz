import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/today", "/tomorrow", "/weekend"].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: "daily",
    priority: path === "/" ? 1 : 0.8,
  }));
}
