# Baner Tarım — Kurumsal Web Sitesi

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion · Lenis

Kurumsal tanıtım sitesi. **Online satış yoktur:** sepet, ödeme, üyelik veya fiyat alanı bulunmaz. Ürün sayfaları bilgi talebi için iletişim formuna yönlendirir.

## Çalıştırma

```bash
npm install
npm run dev        # geliştirme: http://localhost:3000
npm run build      # statik site derlemesi → out/ klasörü
npm run preview    # derlenmiş siteyi http://localhost:4000 adresinde önizler
```

`.env.example` dosyasını `.env.local` olarak kopyalayıp doldurun (site adresi ve form yönlendirme adresi).

### VS Code ile

1. VS Code'da **Dosya → Klasör Aç** ile `baenr tarım` klasörünü açın (üst klasörü değil).
2. Sağ altta çıkan öneriyle **Tailwind CSS IntelliSense** eklentisini kurun.
3. İlk seferde **Terminal → Yeni Terminal** menüsünden açılan terminalde `npm install` çalıştırın (`node_modules` zaten varsa gerekmez).
4. **F5'e basın** → "▶ Siteyi çalıştır" sunucuyu başlatır ve siteyi Chrome'da açar. Kodda kırmızı nokta (breakpoint) koyarak hem sunucu hem tarayıcı kodunu adım adım izleyebilirsiniz.
   - Hata ayıklama gerekmiyorsa: `Ctrl+Shift+B` → geliştirme sunucusu başlar, siteyi http://localhost:3000 adresinden açın.
   - Diğer işler (derleme, tip kontrolü): `Ctrl+Shift+P` → "Tasks: Run Task".
5. Dosyayı kaydettiğiniz anda tarayıcı kendini günceller. İlk açılışta sayfaların derlenmesi birkaç saniye (bazen yarım dakikaya kadar) sürebilir; sonrakiler hızlıdır.

## ⚠️ Yayından önce doldurulması gerekenler

Firma: **Baner Tarım — Demre / Antalya.** Sera üreticilerine (domates, biber vb.) bitki koruma ürünleri (zirai ilaçlar) ve zirai teknik destek sunar. Bu bilgiler siteye işlendi. Telefon, adres, rakam, sertifika veya ticari ürün (marka) adı **uydurulmadı**; aşağıdakiler hâlâ yer tutucudur:

| Ne | Nerede |
|---|---|
| Resmî ünvan, telefon, e-posta, WhatsApp, açık adres, harita adresi, sosyal medya | `src/content/site.ts` |
| Kuruluş yılı (boş satırlar sitede gizlenir) | `src/content/site.ts` → `facts` |
| Slogan ("Sağlıklı sera, bereketli hasat.") | `src/content/site.ts` → `slogan` |
| Şirket hikâyesi, vizyon, misyon | `src/content/company.ts` |
| Bitki koruma ürün grupları ve **ürünler** (şu an boş: "güncel liste için bize ulaşın") | `src/content/products.ts` |
| "Biyolojik ve Biyoteknik Ürünler" grubu — portföyde olup olmadığını teyit edin | `src/content/products.ts` |
| Haberler (2 örnek kayıt `sample: true`) | `src/content/news.ts` |
| KVKK ve gizlilik metinleri (şablon — hukuk danışmanına kontrol ettirin) | `src/app/kvkk`, `src/app/gizlilik-politikasi` |
| Logo (geçici işaret) | `src/components/ui/Logo.tsx`, `src/app/icon.svg` |

**Sera ürünleri rehberi** (`src/content/crops.ts`): domates (7 tip), biber, patlıcan, hıyar, kabak ve fasulye için tipler, sık görülen hastalık/zararlılar ve iyi uygulama notları. Bilgiler genel tarımsal bilgidir; firmanın ziraat mühendisinin gözden geçirmesi önerilir.

Hepsi bittiğinde `src/content/site.ts` içinde `showSampleNotice: false` yapın; sayfanın altındaki "Önizleme" şeridi kalkar.

## İçerik nasıl eklenir?

İçerikler bileşenlerin içine gömülü değildir; `src/content/` altındaki tipli veri dosyalarındadır.

- **Yeni faaliyet alanı:** `activities.ts` listesine bir nesne ekleyin → `/faaliyet-alanlari/<slug>` sayfası, ana sayfa galerisi, sitemap otomatik oluşur.
- **Yeni ilaç / ürün:** `products.ts` içinde ilgili grubun `products` listesine ekleyin → `/urunler/<grup>/<urun>` sayfası otomatik oluşur.
- **Yeni sera ürünü veya domates tipi:** `crops.ts` → `/sera-urunleri/<urun>` sayfası otomatik oluşur.
- **Yeni haber:** `news.ts` listesine ekleyin; tarihe göre otomatik sıralanır. Gövde; paragraf, ara başlık, alıntı ve görsel bloklarından oluşur.

**CMS'e geçiş:** Bileşenler veriye yalnızca `src/lib/content.ts` içindeki `getActivities()`, `getProduct()`, `getNews()` gibi fonksiyonlarla ulaşır. Sanity, Strapi, Payload vb. bağlandığında sadece bu dosyanın içi değişir.

## Görseller

Tüm fotoğraflar **Unsplash License** ile (ücretsiz, ticari kullanıma açık, atıf zorunlu değil — https://unsplash.com/license) seçildi; ücretli Unsplash+ görselleri kullanılmadı. Liste ve alt metinler: `src/content/images.ts`.

Unsplash görselleri Unsplash'in kendi CDN'inde boyutlandırılır (`src/lib/image-loader.ts`). Firmanın kendi fotoğrafları geldiğinde `public/images/` altına koyup `images.ts`'deki `src` değerini `/images/dosya.jpg` yapmanız yeterlidir; yerel görseller Next.js tarafından optimize edilir.

**Hero videosu:** `public/video/hero.mp4` ekleyip `site.ts` içinde `heroVideo: "/video/hero.mp4"` yazın.

## Yayın: GitHub Pages (ücretsiz)

Site **statik** olarak derlenir (`output: "export"`) ve GitHub Pages'te yayınlanır:

- Adres: **https://aliwenger.github.io/baner-tarim/**
- `main` dalına her `git push` sonrasında `.github/workflows/deploy.yml` siteyi otomatik derleyip yayınlar (Actions sekmesinden izlenir, 1–3 dk).
- Alan adı ve alt klasör (`/baner-tarim`) Pages ayarlarından otomatik alınır.
- **Kendi alan adınızı** (ör. banertarim.com) almak isterseniz: Settings → Pages → Custom domain alanına yazın ve alan adı sağlayıcınızda GitHub'ın verdiği DNS kayıtlarını ekleyin. Site kökte yayınlanacağı için ek kod değişikliği gerekmez.

## İletişim formu

GitHub Pages sunucu kodu çalıştırmaz; form, tarayıcıdan doğrudan bir form servisine gönderilir. Doğrulama tarayıcıda yapılır (ad, e-posta, mesaj, KVKK onayı zorunlu; firma ve telefon opsiyonel; bot tuzağı var).

Kurulum (ücretsiz, ~2 dk):
1. https://formspree.io adresinde hesap açıp yeni form oluşturun, mesajların gideceği e-postayı seçin.
2. Size verilen adresi (`https://formspree.io/f/xxxxxxx`) GitHub'da **Settings → Secrets and variables → Actions → Variables** bölümüne `CONTACT_ENDPOINT` adıyla ekleyin.
3. Actions sekmesinden iş akışını yeniden çalıştırın (veya yeni bir push yapın).

Bu ayar yapılana kadar form, ziyaretçiye e-posta adresinizi gösteren bir hata mesajı verir.

## Tasarım sistemi

- Renkler (`src/app/globals.css` → `@theme`): `forest` koyu yeşil, `olive` zeytin, `clay`/`earth` toprak, `wheat` başak, `bone` kırık beyaz, `sand` açık bej.
- Yazı tipleri: Fraunces (başlıklar), Manrope (metin) — Google Fonts, Türkçe karakter destekli, `next/font` ile kendi sunucunuzdan servis edilir.
- Animasyon: Lenis (yumuşak kaydırma) + Motion (kaydırmaya bağlı animasyonlar). İşletim sisteminde "hareketi azalt" açıksa animasyonlar ve yumuşak kaydırma kapanır.

## SEO

Her sayfada başlık/açıklama, canonical URL, Open Graph; `sitemap.xml`, `robots.txt`, Organization / Product / NewsArticle yapılandırılmış verileri ve varsayılan paylaşım görseli (`/opengraph-image`) otomatik üretilir. Canlıya alırken `NEXT_PUBLIC_SITE_URL` değişkenini gerçek alan adıyla doldurun.
