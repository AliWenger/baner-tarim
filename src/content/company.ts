import { images } from "./images";
import type { Chapter, Value } from "./types";

/**
 * ŞİRKET METİNLERİ
 * Baner Tarım: Antalya / Demre — sera üreticilerine bitki koruma ürünleri ve
 * zirai teknik destek. Rakam, sertifika veya kapasite iddiası içermez;
 * firmanın kendi anlatımıyla güncelleyebilirsiniz.
 */
export const intro = {
  kicker: "Baner Tarım",
  statement:
    "Akdeniz'in seralarında üreticinin yanındayız. Doğru bilgiyi, doğru ürünü ve sahadaki deneyimi aynı masada buluşturuyoruz.",
  body:
    "Baner Tarım; Antalya'nın Demre ilçesinde, sera üreticilerine bitki koruma ürünleri ve zirai teknik destek sunar. Domates, biber ve diğer sera ürünlerinde sağlıklı bir sezon ve güvenli bir hasat için üreticiyle birlikte çalışır.",
};

export const vision = {
  title: "Vizyonumuz",
  text: "[Örnek] Akdeniz'in sera üreticileri için bilgisine ve sözüne güvenilen ilk çözüm ortağı olmak.",
};

export const mission = {
  title: "Misyonumuz",
  text: "[Örnek] Doğru ürünü, doğru bilgiyle ve doğru zamanda üreticiye ulaştırarak sağlıklı bitki ve güvenli hasada katkı sağlamak.",
};

export const story = [
  "Demre, Akdeniz kıyısında örtü altı tarımın en yoğun yapıldığı bölgelerden biridir. Baner Tarım bu bölgede, seralarda domates, biber ve diğer sebzeleri yetiştiren üreticilere bitki koruma ürünleri ve teknik destek sunar.",
  "[Şirket hikâyesi buraya eklenecek] Kuruluş yılı, kurucuların tarımla bağı ve şirketin bugüne kadarki yolculuğu bu bölümde anlatılacaktır.",
];

/** Neden Baner Tarım? — kurumsal değerler. */
export const values: Value[] = [
  { title: "Sahada deneyim", text: "Seradaki sorunu masa başında değil, bitkinin yanında konuşuruz." },
  { title: "Doğru ürün, doğru zaman", text: "Her uygulamada sorunun teşhisini, bitkinin dönemini ve hasat zamanını birlikte değerlendiririz." },
  { title: "Güvenilirlik", text: "Söz verdiğimiz zamanda, söz verdiğimiz şekilde. Üreticiyle ilişkimizin temeli budur." },
  { title: "Bilgiyle hareket", text: "Etiket, doz ve bekleme süresi bilgisini her üreticiyle açıkça paylaşırız." },
  { title: "Üreticiye yakınlık", text: "Demre'de, üreticinin ulaşabileceği mesafedeyiz; sezon boyu yanındayız." },
  { title: "Çözüm odaklılık", text: "Sorunu değil, serada işe yarayan çözümü konuşuruz." },
];

/** Bitki sağlığı yaklaşımı — doğrulanmamış iddia içermez. */
export const chapters: Chapter[] = [
  {
    kicker: "01 — Fide",
    title: "Sağlıklı sezon, sağlıklı fideyle başlar.",
    text: "Dikim öncesinde fidenin sağlığı ve sera toprağının durumu, sezon boyunca karşılaşılacak sorunların önemli bir kısmını belirler.",
    image: images.tomatoSeedling,
  },
  {
    kicker: "02 — İklim",
    title: "Serada nem, hem dost hem düşmandır.",
    text: "Nemin ve sıcaklığın kontrolü, havalandırma ve sulama düzeni; mantari hastalıkların önlenmesinde ilaç kadar önemlidir.",
    image: images.greenhouseInterior,
  },
  {
    kicker: "03 — Bitki sağlığı",
    title: "Erken teşhis, en etkili korumadır.",
    text: "Düzenli gözlem ve tuzaklarla izleme, zararlıları ve hastalıkları yayılmadan fark etmeyi sağlar.",
    image: images.ladybug,
  },
  {
    kicker: "04 — Hasat",
    title: "Güvenli hasat, bekleme süresine uyumla başlar.",
    text: "Bitki koruma ürünlerinin etiketinde belirtilen hasat öncesi bekleme sürelerine uyulması, sofraya güvenle ulaşan ürünün ön koşuludur.",
    image: images.cherryVine,
  },
];
