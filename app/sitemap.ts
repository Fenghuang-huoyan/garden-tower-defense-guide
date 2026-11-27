import type { MetadataRoute } from "next";
import { site } from "@/config/site.config";
import { getAllDocs, getNavCategories } from "@/lib/content";

/** sitemap 跟着内容自动生成，新增一个 MDX 文件即自动收录，不手写。 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.baseUrl.replace(/\/$/, "");
  return [
    { url: `${base}/`, priority: 1 },
    ...getNavCategories()
      .filter((c) => getAllDocs().filter((d) => d.category === c.slug).length > 1)
      .map((c) => ({ url: `${base}/${c.slug}`, priority: 0.8 })),
    ...getAllDocs().map((d) => ({
      url: `${base}/${d.category}/${d.slug}`,
      lastModified: d.updated || undefined,
      priority: 0.7,
    })),
  ];
}
