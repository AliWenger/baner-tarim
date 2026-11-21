import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Activities } from "@/components/home/Activities";
import { Products } from "@/components/home/Products";
import { TomatoTypes } from "@/components/home/TomatoTypes";
import { ProtectionGroups } from "@/components/home/ProtectionGroups";
import { Nature } from "@/components/home/Nature";
import { Values } from "@/components/home/Values";
import { LatestNews } from "@/components/home/LatestNews";
import { ContactCta } from "@/components/home/ContactCta";
import { getActivities, getCrops, getNews, getProductCategories } from "@/lib/content";
import { chapters, values } from "@/content/company";

export default async function HomePage() {
  const [activities, crops, groups, news] = await Promise.all([
    getActivities(),
    getCrops(),
    getProductCategories(),
    getNews(),
  ]);
  const tomato = crops.find((c) => c.slug === "domates");

  return (
    <>
      <Hero />
      <Intro />
      <Activities items={activities} />
      <Products
        items={crops.map((c) => ({
          key: c.slug,
          href: `/sera-urunleri/${c.slug}`,
          title: c.name,
          summary: c.summary,
          image: c.image,
        }))}
      />
      {tomato && <TomatoTypes crop={tomato} />}
      <ProtectionGroups groups={groups} />
      <Nature chapters={chapters} />
      <Values values={values} index="07" />
      <LatestNews items={news.slice(0, 3)} />
      <ContactCta />
    </>
  );
}
