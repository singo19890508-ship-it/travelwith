import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/traveler/apply", "/supporter/register"],
      },
    ],
    sitemap: "https://fuku-tabi.com/sitemap.xml",
  };
}
