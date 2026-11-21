import type { SocialLink } from "./types";

/**
 * GENEL SİTE BİLGİLERİ
 * -------------------------------------------------------------
 * Köşeli parantez içindeki veya "eklenecek" yazan tüm değerler
 * YER TUTUCUDUR. Baner Tarım'ın gerçek bilgileriyle değiştirin.
 * Kamuya açık kaynaklarda doğrulanmış firma bilgisi bulunamadığı için
 * hiçbir telefon, adres, rakam veya sertifika uydurulmamıştır.
 */
export const site = {
  name: "Baner Tarım",
  /** Resmî ünvan — KVKK ve gizlilik metinlerinde kullanılır. */
  legalName: "[Baner Tarım resmî şirket ünvanı]",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "tr_TR",

  /** Örnek slogan — marka çalışmasına göre değiştirilebilir. */
  slogan: {
    lines: ["Sağlıklı sera,", "bereketli hasat."],
    sub: "Demre'den Akdeniz seralarına; bitki koruma ürünleri ve zirai teknik destekle üreticinin yanındayız.",
  },
  description:
    "Baner Tarım; Antalya Demre'de sera üreticilerine bitki koruma ürünleri ve zirai teknik destek sunar. Domates, biber ve diğer sera ürünleri hakkında bilgi alın.",

  contact: {
    phone: "+90 (000) 000 00 00",
    phoneHref: "tel:+900000000000",
    email: "info@alanadiniz.com.tr",
    /** wa.me formatı: ülke kodu + numara, boşluksuz. */
    whatsapp: "900000000000",
    address: ["[Mahalle, cadde ve no]", "Demre / Antalya"],
    /**
     * Google Maps araması. Şu an yalnızca ilçe gösteriliyor; firmanın tam
     * adresini yazın (ör. "Baner Tarım, ... Cad. No:.., Demre, Antalya").
     */
    mapQuery: "Demre, Antalya",
    workingHours: "Hafta içi 08.30 – 18.00",
  },

  social: [
    { platform: "instagram", label: "Instagram", href: "#" },
    { platform: "linkedin", label: "LinkedIn", href: "#" },
    { platform: "youtube", label: "YouTube", href: "#" },
  ] satisfies SocialLink[],

  /**
   * Şirket kimlik bilgileri — "Hakkımızda" sayfasında gösterilir.
   * Değeri boş bırakılan satırlar sitede görünmez.
   */
  facts: [
    { label: "Merkez", value: "Demre / Antalya" },
    { label: "Uzmanlık", value: "Örtü altı (sera) tarımı" },
    { label: "Kuruluş", value: "" },
  ],

  /**
   * Yayına almadan önce `false` yapın. `true` iken sitenin altında
   * içeriklerin örnek olduğunu belirten küçük bir bilgi şeridi gösterilir.
   */
  showSampleNotice: true,

  /** Hero alanında video kullanmak için /public/video altına mp4 ekleyip yolunu yazın. */
  heroVideo: "" as string,
} as const;

export const navigation = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/faaliyet-alanlari", label: "Faaliyet Alanları" },
  { href: "/sera-urunleri", label: "Sera Ürünleri" },
  { href: "/urunler", label: "Ürünler" },
  { href: "/haberler", label: "Haberler" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const legalLinks = [
  { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
  { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
] as const;
