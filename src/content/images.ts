import type { ImageAsset } from "./types";

/**
 * Görsel kütüphanesi — Akdeniz / sera teması.
 *
 * Tüm fotoğraflar Unsplash'ten, "Unsplash License" ile (ücretsiz, ticari
 * kullanıma açık, atıf zorunlu değil — https://unsplash.com/license)
 * seçilmiştir. Ücretli Unsplash+ görselleri kullanılmamıştır.
 *
 * Baner Tarım'ın kendi fotoğrafları (Demre seraları, ekip, depo vb.)
 * geldiğinde dosyaları /public/images altına koyup ilgili `src` değerini
 * ("/images/dosya.jpg") değiştirmeniz yeterlidir.
 */
const u = (id: string, alt: string): ImageAsset => ({
  src: `https://images.unsplash.com/photo-${id}`,
  alt,
  credit: "Unsplash License",
});

export const images = {
  // Seralar ve Akdeniz
  aerialGreenhouses: u("1794586335832-6c10d3df35b5", "Güneş ışığında uzun sıralar hâlinde beyaz plastik seraların havadan görünümü"),
  greenhouseRowsAerial: u("1781332150778-61badb352b7d", "Düzenli sıralar hâlinde seraların havadan görünümü"),
  greenhouseReflective: u("1776918570456-8df371a5ee7e", "Örtüleri ışığı yansıtan seraların havadan görünümü"),
  greenhouseTunnels: u("1769259046907-a5165e978af5", "Yan yana dizilmiş tünel seralar"),
  plasticLight: u("1777714802694-a34e78335487", "Plastik örtüsünden güneş ışığı süzülen sera"),
  greenhouseTomatoRows: u("1524486361537-8ad15938e1a3", "Büyük bir serada sıra sıra domates bitkileri"),
  greenhouseInterior: u("1627674362102-daaab5279b32", "Gün ışığında yeşil bitkilerle dolu sera içi"),
  greenhouseLush: u("1708796705570-33fd29ef67d0", "Yeşil bitkilerle dolu geniş sera"),
  greenhouseInspection: u("1624720114708-0cbd6ee41f4e", "Sera içinde bitkilerin arasında duran ve bitkileri inceleyen kişi"),
  greenhouseTeam: u("1758524052700-1f23a19b5455", "Bitkilerle dolu serada çalışan iki kişi"),
  sprayingGreenhouse: u("1758524053902-da4622ddd3e9", "Serada bitkilere püskürtme yapan ve bitkilere bakım veren kişiler"),
  greenhouseWorker: u("1762512216957-04c53ca12643", "Serada bitkilere bakım yapan çalışan"),
  seaMountains: u("1756365132674-8837f3291f49", "Akdeniz'in mavi suları ve uzakta dağlar"),
  coastCliffs: u("1753188354331-c55df2610ab5", "Akdeniz kıyısında kayalıklar ve deniz"),

  // Domates
  tomatoVine: u("1592841200221-a6898f307baa", "Dalında kırmızı ve yeşil domatesler"),
  tomatoVineMixed: u("1471194402529-8e0f5a675de6", "Bitki üzerinde olgunlaşan farklı renklerde domatesler"),
  ripeningVine: u("1785046670025-5bc0590a859b", "Yeşil yapraklar arasında olgunlaşan domatesler"),
  greenTomatoes: u("1781623958492-1083fdac8e2b", "Bitki üzerinde olgunlaşmayı bekleyen yeşil domatesler"),
  cherryVine: u("1758552219061-5148ccb5bc5d", "Dalında olgun çeri domatesler"),
  cherryTomatoes: u("1524593166156-312f362cada0", "Yakın plan kırmızı çeri domatesler"),
  trussTomato: u("1546094096-0df4bcaaa337", "Sapıyla birlikte salkım hâlinde domatesler"),
  beefTomato: u("1692737003338-f2071356a62b", "İri, yuvarlak sofralık domates"),
  pinkTomato: u("1788015856402-cb6c586889eb", "Kasada kırmızı ve pembe tonlarında domatesler"),
  colorfulTomatoes: u("1758221055853-479a0de23e66", "Farklı renk ve şekillerde domatesler"),
  tomatoesPile: u("1594057687713-5fd14eed1c17", "Kırmızı ve yeşil domatesler"),
  tomatoCrate: u("1758972574908-bc43ad077156", "Ahşap kasalarda domatesler"),
  tomatoSeedling: u("1591857177593-aec16c2d8f60", "Toprakta genç domates fidesi"),
  seedlingsTray: u("1466692476868-aef1dfb1e735", "Viyollerde yetişen genç fideler"),

  // Diğer sera ürünleri
  redPepperPlant: u("1786992618263-dfd20f1d1e78", "Bitki üzerinde olgunlaşmış kırmızı biber"),
  greenPepper: u("1763038971656-f74cb170e22a", "Dalından sarkan yeşil dolmalık biber"),
  pepperPlant: u("1655768921550-97caf11aebe5", "Bitki üzerinde yeşil biber"),
  chiliPeppers: u("1621903939304-879ea3ef5b8d", "Yeşil ve kırmızı sivri biberler"),
  eggplantHanging: u("1752934608040-c62bb712b852", "Yapraklı sapından sarkan patlıcan"),
  eggplantPlant: u("1647134619933-452c43b63970", "Bitki üzerinde yetişen patlıcan"),
  cucumberHarvest: u("1762512217258-425a45df108f", "Serada hıyar hasadı yapan üretici"),
  zucchini: u("1786460423799-50b2d895511b", "Yapraklı bitki üzerinde yetişen iki yeşil kabak"),
  greenBeans: u("1574963835594-61eede2070dc", "Taze yeşil fasulyeler"),
  stringBeans: u("1560252030-9fc63cb78dac", "Taze çalı fasulyeleri"),

  // Bitki sağlığı
  ladybug: u("1611049742877-bd705839ad6d", "Yeşil yaprak üzerinde uğur böceği"),
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
