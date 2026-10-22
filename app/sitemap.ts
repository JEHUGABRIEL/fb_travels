import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/vols", priority: 0.9, changeFrequency: "weekly" },
  { path: "/hotels", priority: 0.9, changeFrequency: "weekly" },
  { path: "/offres", priority: 0.8, changeFrequency: "weekly" },
  { path: "/circuits", priority: 0.8, changeFrequency: "monthly" },
  { path: "/visa", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/confidentialite", priority: 0.3, changeFrequency: "yearly" },
  { path: "/conditions", priority: 0.3, changeFrequency: "yearly" },
  { path: "/annulation", priority: 0.3, changeFrequency: "yearly" },
  { path: "/credits-photos", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
