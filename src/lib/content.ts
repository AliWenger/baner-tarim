/**
 * İçerik erişim katmanı.
 * Bileşenler veriye doğrudan değil, bu fonksiyonlar üzerinden erişir.
 * CMS entegrasyonunda yalnızca bu dosyanın içi değişir (ör. fetch ile).
 */
import { activities } from "@/content/activities";
import { productCategories } from "@/content/products";
import { news } from "@/content/news";
import { crops } from "@/content/crops";

export async function getActivities() {
  return activities;
}

export async function getActivity(slug: string) {
  return activities.find((a) => a.slug === slug) ?? null;
}

export async function getProductCategories() {
  return productCategories;
}

export async function getProductCategory(slug: string) {
  return productCategories.find((c) => c.slug === slug) ?? null;
}

export async function getProduct(categorySlug: string, productSlug: string) {
  const category = await getProductCategory(categorySlug);
  const product = category?.products.find((p) => p.slug === productSlug) ?? null;
  return category && product ? { category, product } : null;
}

export async function getNews() {
  return [...news].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNewsItem(slug: string) {
  return news.find((n) => n.slug === slug) ?? null;
}


export async function getCrops() {
  return crops;
}

export async function getCrop(slug: string) {
  return crops.find((c) => c.slug === slug) ?? null;
}
