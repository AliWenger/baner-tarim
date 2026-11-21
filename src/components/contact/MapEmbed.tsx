import { site } from "@/content/site";
import { LogoMark } from "@/components/ui/Logo";

/**
 * Google Maps gömme. API anahtarı gerektirmez. Adres `site.contact.mapQuery`
 * alanına yazıldığında harita otomatik görünür; boşken şık bir yer tutucu çıkar.
 */
export function MapEmbed() {
  const q = site.contact.mapQuery.trim();

  if (!q) {
    return (
      <div className="relative flex aspect-[16/9] min-h-[320px] w-full items-center justify-center overflow-hidden bg-forest text-bone md:aspect-[21/8]">
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-bone/[0.07]" preserveAspectRatio="none">
          <defs>
            <pattern id="harita-grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M56 0H0v56" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#harita-grid)" />
        </svg>
        <div className="relative text-center">
          <LogoMark className="mx-auto h-10 w-10 text-wheat" />
          <p className="mt-5 font-display text-2xl">Harita yakında</p>
          <p className="mt-2 text-sm text-bone/60">Adres bilgisi eklendiğinde konum burada görünecek.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] min-h-[320px] w-full overflow-hidden bg-sand md:aspect-[21/8]">
      <iframe
        title={`${site.name} konumu — Google Haritalar`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`}
        className="absolute inset-0 h-full w-full grayscale-[0.6] sepia-[0.15]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
