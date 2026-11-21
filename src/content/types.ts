/**
 * İçerik tipleri.
 * Tüm içerikler bu tiplere uyan düz veri olarak tutulur. İleride bir CMS
 * (Sanity, Strapi, Payload, Contentful vb.) bağlandığında yalnızca
 * `src/lib/content.ts` içindeki getter fonksiyonlarının veri kaynağı değişir;
 * bileşenler aynı kalır.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  /** Görselin kaynağı / lisansı — gerçek fotoğraflar eklendiğinde güncelleyin. */
  credit?: string;
};

export type ActivityArea = {
  slug: string;
  title: string;
  /** Kısa üst başlık (ör. "Tarla"), kartlarda küçük etiket olarak görünür. */
  kicker: string;
  summary: string;
  body: string[];
  scope: string[];
  image: ImageAsset;
  gallery: ImageAsset[];
  /** true ise içerik örnektir, gerçek bilgilerle değiştirilmelidir. */
  sample?: boolean;
};

export type ProductSpec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  summary: string;
  description: string[];
  usage: string[];
  specs: ProductSpec[];
  image: ImageAsset;
  sample?: boolean;
};

/** Bitki koruma ürün grubu (ör. Fungisitler). */
export type ProductCategory = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  /** Bu grubun hedeflediği tipik sorunlar (hastalık, zararlı vb.). */
  targets: string[];
  /** İlgili sera ürünlerinin slug'ları (src/content/crops.ts). */
  crops: string[];
  image: ImageAsset;
  /** Gruptaki ürünler. Boşsa sayfada "ürün listesi için bize ulaşın" gösterilir. */
  products: Product[];
  sample?: boolean;
};

/** Sera ürünü rehberi (ör. Domates). */
export type CropVariety = { name: string; text: string; image?: ImageAsset };

export type CropIssue = { name: string; kind: "Hastalık" | "Zararlı"; text: string };

export type Crop = {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  intro: string[];
  image: ImageAsset;
  varieties: CropVariety[];
  issues: CropIssue[];
  /** Genel iyi uygulama notları. */
  notes: string[];
  /** İlgili bitki koruma ürün gruplarının slug'ları (src/content/products.ts). */
  protection: string[];
};

export type NewsBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; image: ImageAsset; caption?: string };

export type NewsItem = {
  slug: string;
  title: string;
  /** ISO tarih: YYYY-MM-DD */
  date: string;
  category: "Haber" | "Duyuru" | "Etkinlik" | "Fuar";
  excerpt: string;
  cover: ImageAsset;
  body: NewsBlock[];
  sample?: boolean;
};

export type Value = { title: string; text: string };

export type Chapter = {
  kicker: string;
  title: string;
  text: string;
  image: ImageAsset;
};

export type SocialLink = {
  platform: "instagram" | "linkedin" | "youtube" | "facebook" | "x";
  label: string;
  href: string;
};
