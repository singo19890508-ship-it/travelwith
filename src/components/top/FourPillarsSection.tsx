import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const pillars = [
  {
    key: "license",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          x="8"
          y="6"
          width="32"
          height="36"
          rx="3"
          className="stroke-satsuma-600"
        />
        <path d="M16 18h16M16 24h16M16 30h10" className="stroke-satsuma-500" />
        <circle
          cx="36"
          cy="36"
          r="8"
          className="fill-satsuma-100 stroke-satsuma-600"
        />
        <path d="M32 36l3 3 5-5" className="stroke-satsuma-600" />
      </svg>
    ),
    href: "/about",
    color: "satsuma",
  },
  {
    key: "team",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="16" r="7" className="stroke-teal-600" />
        <path d="M4 40c0-7.7 6.3-14 14-14" className="stroke-teal-500" />
        <circle cx="34" cy="18" r="6" className="stroke-teal-600" />
        <path d="M44 40c0-6.6-4.5-12.2-10.5-13.8" className="stroke-teal-500" />
        <path d="M20 40c0-6.1 4-11.4 9.5-13.3" className="stroke-teal-500" />
      </svg>
    ),
    href: "/caregivers",
    color: "teal",
  },
  {
    key: "taxi",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          x="4"
          y="20"
          width="40"
          height="18"
          rx="3"
          className="stroke-amber-600"
        />
        <path d="M10 20l5-10h18l5 10" className="stroke-amber-600" />
        <circle
          cx="14"
          cy="38"
          r="4"
          className="fill-amber-100 stroke-amber-600"
        />
        <circle
          cx="34"
          cy="38"
          r="4"
          className="fill-amber-100 stroke-amber-600"
        />
        <path d="M20 10h8M4 28h40" className="stroke-amber-500" />
        <rect
          x="16"
          y="23"
          width="8"
          height="6"
          rx="1"
          className="stroke-amber-500"
        />
      </svg>
    ),
    href: "/partner",
    color: "amber",
  },
  {
    key: "training",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 8L6 18l18 10 18-10z" className="stroke-blue-600" />
        <path d="M6 28l18 10 18-10" className="stroke-blue-500" />
        <path d="M42 18v12" className="stroke-blue-600" />
        <circle
          cx="42"
          cy="32"
          r="3"
          className="fill-blue-100 stroke-blue-600"
        />
      </svg>
    ),
    href: "/join",
    color: "blue",
  },
];

const colorMap: Record<
  string,
  { bg: string; border: string; badge: string; badgeText: string; link: string }
> = {
  satsuma: {
    bg: "bg-satsuma-50",
    border: "border-satsuma-100",
    badge: "bg-satsuma-100",
    badgeText: "text-satsuma-700",
    link: "text-satsuma-600 hover:text-satsuma-700",
  },
  teal: {
    bg: "bg-teal-50",
    border: "border-teal-100",
    badge: "bg-teal-100",
    badgeText: "text-teal-700",
    link: "text-teal-600 hover:text-teal-700",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    badge: "bg-amber-100",
    badgeText: "text-amber-700",
    link: "text-amber-600 hover:text-amber-700",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    badge: "bg-blue-100",
    badgeText: "text-blue-700",
    link: "text-blue-600 hover:text-blue-700",
  },
};

export default async function FourPillarsSection() {
  const t = await getTranslations("pillars");

  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest text-satsuma-600 uppercase mb-3">
            Why FUKU-TABI
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 4 pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pillars.map((pillar, i) => {
            const c = colorMap[pillar.color];
            return (
              <div
                key={pillar.key}
                className={`rounded-2xl border ${c.border} ${c.bg} p-6 flex flex-col gap-4`}
              >
                {/* Number badge + icon */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-full ${c.badge} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className={`text-xs font-bold ${c.badgeText}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-shrink-0 mt-1">{pillar.icon}</div>
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1.5">
                    {t(`pill${i + 1}Title`)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(`pill${i + 1}Desc`)}
                  </p>
                </div>

                {/* Link */}
                <Link
                  href={pillar.href}
                  className={`inline-flex items-center gap-1 text-sm font-medium ${c.link} transition-colors mt-auto`}
                >
                  {t(`pill${i + 1}Link`)}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
