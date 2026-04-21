import { MetadataRoute } from "next";

const BASE_URL = "https://fuku-tabi.com";
const LOCALES = ["ja", "en", "ko", "zh"];

const PAGES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/flow", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/caregivers", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/safety", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/training", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/field", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/join", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of PAGES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: locale === "ja" ? page.priority : page.priority * 0.9,
      });
    }
  }

  return entries;
}
