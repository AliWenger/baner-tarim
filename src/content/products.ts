import { images } from "./images";
import type { ProductCategory } from "./types";

/**
 * BİTKİ KORUMA ÜRÜN GRUPLARI
 * Baner Tarım'ın sunduğu zirai ilaçlar ürün gruplarına göre listelenir.
 * Marka / ticari ürün adı uydurulmamıştır: `products` dizileri boştur ve
 * sayfada "güncel ürün listesi için bize ulaşın" çağrısı gösterilir.
 * Ürün eklemek için ilgili grubun `products` dizisine kayıt ekleyin;
 * ürün detay sayfaları (/urunler/<grup>/<urun>) otomatik oluşur.
 *
 * Bu bir katalogdur: fiyat, sepet veya satın alma alanı bulunmaz.
 */
export const productCategories: ProductCategory[] = [
  {
    slug: "fungisitler",
    title: "Fungisitler",
    summary: "Mantari hastalıklara karşı koruyucu ve tedavi edici ürünler.",
    description:
      "Fungisitler; mildiyö, külleme, kurşuni küf ve yaprak yanıklıkları gibi mantar kaynaklı hastalıkların önlenmesi ve kontrolünde kullanılır. Sera içindeki yüksek nem bu hastalıkların gelişimini kolaylaştırdığı için doğru zamanda yapılan uygulama büyük önem taşır.",
    targets: ["Mildiyö", "Külleme", "Kurşuni küf (Botrytis)", "Erken yaprak yanıklığı", "Kök ve kökboğazı çürüklükleri"],
    crops: ["domates", "biber", "patlican", "hiyar", "kabak", "fasulye"],
    image: images.greenhouseInterior,
    products: [],
  },
  {
    slug: "insektisitler",
    title: "İnsektisitler",
    summary: "Böcek zararlılarına karşı kullanılan ürünler.",
    description:
      "İnsektisitler; domates güvesi, beyaz sinek, thrips ve yaprak biti gibi sera ürünlerinde verim ve kaliteyi düşüren böcek zararlılarının kontrolünde kullanılır. Direnç gelişimini önlemek için farklı etki mekanizmalarına sahip ürünlerin dönüşümlü kullanımı önerilir.",
    targets: ["Domates güvesi (Tuta absoluta)", "Beyaz sinek", "Thrips", "Yaprak biti", "Yeşilkurt"],
    crops: ["domates", "biber", "patlican", "hiyar", "kabak", "fasulye"],
    image: images.tomatoVineMixed,
    products: [],
  },
  {
    slug: "akarisitler",
    title: "Akarisitler",
    summary: "Kırmızı örümcek ve diğer akarlara karşı ürünler.",
    description:
      "Akarisitler, sıcak ve kuru dönemlerde hızla çoğalan kırmızı örümcek ve pas akarı gibi akarların kontrolünde kullanılır. Yumurta, larva ve ergin dönemlerine etkisi farklı olan ürünler sorunun aşamasına göre seçilir.",
    targets: ["Kırmızı örümcek", "Domates pas akarı", "Diğer akar türleri"],
    crops: ["domates", "patlican", "fasulye", "biber"],
    image: images.eggplantPlant,
    products: [],
  },
  {
    slug: "nematisitler",
    title: "Nematisitler",
    summary: "Kök-ur nematodlarına karşı toprak uygulamalı ürünler.",
    description:
      "Nematisitler, köklerde ur oluşturarak bitkinin su ve besin alımını zayıflatan kök-ur nematodlarına karşı kullanılır. Sera topraklarında nematod yoğunluğu dikim öncesinde değerlendirilmelidir.",
    targets: ["Kök-ur nematodları (Meloidogyne spp.)"],
    crops: ["domates", "hiyar"],
    image: images.tomatoSeedling,
    products: [],
  },
  {
    slug: "herbisitler",
    title: "Herbisitler",
    summary: "Yabancı ot kontrolüne yönelik ürünler.",
    description:
      "Herbisitler, kültür bitkisiyle su, ışık ve besin için rekabet eden ve bazı zararlılara konukçuluk eden yabancı otların kontrolünde kullanılır. Sera içinde ve çevresinde kullanım koşulları etiket talimatlarına göre belirlenmelidir.",
    targets: ["Tek ve çok yıllık yabancı otlar", "Sera çevresi ot kontrolü"],
    crops: [],
    image: images.greenhouseTunnels,
    products: [],
  },
  {
    slug: "biyoteknik-urunler",
    title: "Biyolojik ve Biyoteknik Ürünler",
    summary: "Feromon tuzakları, yapışkan tuzaklar ve biyolojik mücadele ürünleri.",
    description:
      "Feromon ve yapışkan tuzaklar zararlıların izlenmesi ve popülasyonun azaltılmasında; biyolojik ürünler ise entegre mücadele programlarında kimyasal uygulamaları tamamlayıcı olarak kullanılır. [Bu grubun Baner Tarım portföyünde olup olmadığını teyit edin.]",
    targets: ["Domates güvesi izleme", "Beyaz sinek ve thrips izleme", "Entegre mücadele"],
    crops: ["domates", "biber"],
    image: images.ladybug,
    products: [],
    sample: true,
  },
];
