import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ja", "en", "ko", "zh", "hi", "es"],
  defaultLocale: "ja",
});

export type Locale = (typeof routing.locales)[number];
