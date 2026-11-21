"use client";

/**
 * next/image özel yükleyicisi (statik dışa aktarımla uyumlu).
 * - Unsplash görselleri: boyutlandırma ve AVIF/WebP dönüşümü Unsplash'in kendi
 *   CDN'inde (imgix) yapılır — Unsplash'in önerdiği kullanım budur.
 * - Yerel görseller (/public/images/...): olduğu gibi sunulur. Yüklemeden önce
 *   makul boyuta (ör. en geniş kenar 2000 px, WebP/JPG) getirmeniz önerilir.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
    return url.toString();
  }
  if (src.startsWith("/")) return `${basePath}${src}`;
  return src;
}
