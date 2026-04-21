import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");

  return {
    title: {
      default: title,
      template: "%s | FUKU-TABI",
    },
    description,
    openGraph: {
      title,
      description,
      url: `https://fuku-tabi.com/${locale}`,
      siteName: "FUKU-TABI",
      locale: locale === "ja" ? "ja_JP" : locale,
      type: "website",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "FUKU-TABI｜鹿児島ユニバーサルツーリズム",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image.jpg"],
    },
    alternates: {
      canonical: `https://fuku-tabi.com/${locale}`,
      languages: {
        ja: "https://fuku-tabi.com/ja",
        en: "https://fuku-tabi.com/en",
        ko: "https://fuku-tabi.com/ko",
        zh: "https://fuku-tabi.com/zh",
      },
    },
  };
}

export const dynamic = "force-dynamic";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "FUKU-TABI",
    description:
      "障害がある方・高齢者・医療的ケアが必要な方とご家族の旅を専門スタッフがサポートします。",
    url: "https://fuku-tabi.com",
    areaServed: {
      "@type": "Place",
      name: "鹿児島県",
    },
    founder: {
      "@type": "Person",
      name: "福田真悟",
      jobTitle: "鍼灸師・介護福祉士・国内旅行業務取扱管理者",
    },
    serviceType: "ユニバーサルツーリズム・バリアフリー旅行サポート",
    telephone: "",
    sameAs: ["https://fuku-tabi.com"],
  };

  return (
    <html lang={locale} translate="no" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
