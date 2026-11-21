import type { NextConfig } from "next";

/**
 * GitHub Pages için statik dışa aktarım (output: "export").
 * `npm run build` sonucu `out/` klasörüne düz HTML/CSS/JS üretir.
 *
 * NEXT_PUBLIC_BASE_PATH: site bir alt klasörde yayınlanıyorsa (ör.
 * kullanici.github.io/baner-tarim → "/baner-tarim"). Kök alan adında boş bırakın.
 * GitHub Actions iş akışı bu değeri otomatik ayarlar.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Unsplash görselleri Unsplash CDN'inde boyutlandırılır (bkz. src/lib/image-loader.ts)
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
