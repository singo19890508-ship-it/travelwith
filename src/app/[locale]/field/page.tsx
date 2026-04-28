import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/common/PageHeader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getPublishedPosts } from "@/lib/field-posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "field" });
  return {
    title: t("pageTitle") + " | FUKU-TABI",
    description: t("pageDescription"),
  };
}

export default async function FieldPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("field");
  const posts = await getPublishedPosts();

  return (
    <>
      <Header />
      <main>
        {/* ヘッダー */}
        <PageHeader accent="green" label={t("badge")} title={t("heading")} description={t("subheading")} />

        {/* 投稿一覧 */}
        <section className="max-w-2xl mx-auto px-4 py-14">
          {posts.length === 0 ? (
            <div className="text-center text-gray-400 py-20">
              <p className="text-lg mb-2">{t("emptyTitle")}</p>
              <p className="text-sm">{t("emptyDesc")}</p>
            </div>
          ) : (
            <div className="space-y-10">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  {post.image_url && (
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 md:p-8">
                    <p className="text-xs text-gray-400 mb-2">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString(
                            locale,
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )
                        : ""}
                    </p>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                      {post.title}
                    </h2>
                    <div
                      className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: post.body }}
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
