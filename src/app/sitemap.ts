import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getActivities, getCrops, getNews, getProductCategories } from "@/lib/content";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const [activities, categories, news, crops] = await Promise.all([
    getActivities(),
    getProductCategories(),
    getNews(),
    getCrops(),
  ]);
  const now = new Date();

  const staticRoutes = ["", "/hakkimizda", "/faaliyet-alanlari", "/sera-urunleri", "/urunler", "/haberler", "/iletisim", "/gizlilik-politikasi", "/kvkk"].map(
    (p) => ({
      url: `${base}${p}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : p.startsWith("/gizlilik") || p === "/kvkk" ? 0.3 : 0.8,
    }),
  );

  return [
    ...staticRoutes,
    ...activities.map((a) => ({ url: `${base}/faaliyet-alanlari/${a.slug}/`, lastModified: now, priority: 0.7 })),
    ...crops.map((c) => ({ url: `${base}/sera-urunleri/${c.slug}/`, lastModified: now, priority: 0.8 })),
    ...categories.map((c) => ({ url: `${base}/urunler/${c.slug}/`, lastModified: now, priority: 0.7 })),
    ...categories.flatMap((c) =>
      c.products.map((p) => ({ url: `${base}/urunler/${c.slug}/${p.slug}/`, lastModified: now, priority: 0.6 })),
    ),
    ...news.map((n) => ({ url: `${base}/haberler/${n.slug}/`, lastModified: new Date(n.date), priority: 0.6 })),
  ];
}
