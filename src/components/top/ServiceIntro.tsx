import { getTranslations } from "next-intl/server";

const icons = [
  // wheelchair
  <svg key="1" className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4a2 2 0 100-4 2 2 0 000 4zm-1 2.5V12l-3 3m4-8.5a8 8 0 110 16 8 8 0 010-16z" />
    <circle cx="12" cy="3" r="2" strokeWidth={1.5} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10h6l1 4H8l1-4zm-1 4l-2 4h10" />
  </svg>,
  // walking
  <svg key="2" className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 5.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM9 9l-1 4 3 1 1 5m1-10l2 3-2 1" />
  </svg>,
  // eye
  <svg key="3" className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>,
  // user
  <svg key="4" className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>,
  // users
  <svg key="5" className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  // heart
  <svg key="6" className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>,
];

const bgColors = [
  "bg-blue-50",
  "bg-teal-50",
  "bg-purple-50",
  "bg-orange-50",
  "bg-green-50",
  "bg-red-50",
];

export default async function ServiceIntro() {
  const t = await getTranslations("serviceIntro");

  const items = [
    t("item1"),
    t("item2"),
    t("item3"),
    t("item4"),
    t("item5"),
    t("item6"),
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-base">{t("subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`${bgColors[i]} rounded-2xl p-5 flex flex-col items-center text-center gap-3`}
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                {icons[i]}
              </div>
              <p className="text-sm md:text-base font-medium text-gray-700 leading-snug">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
