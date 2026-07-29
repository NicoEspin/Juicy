import type { MetadataRoute } from "next";
import { BRANCHES } from "@/data/branches";

const siteUrl = "https://juicy-burguers.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/sucursales`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...BRANCHES.map((branch) => ({
      url: `${siteUrl}/sucursales/${branch.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
