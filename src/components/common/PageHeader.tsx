type Accent = "amber" | "teal" | "coral" | "green" | "silver";

interface PageHeaderProps {
  title: string;
  description?: string;
  label?: string;
  accent?: Accent;
  // 旧prop（後方互換・無視）
  color?: string;
  imageUrl?: string;
}

const accentColors: Record<
  Accent,
  { bar: string; label: string; line: string }
> = {
  amber: { bar: "#f59e0b", label: "#fcd34d", line: "#f59e0b" },
  teal: { bar: "#2dd4bf", label: "#5eead4", line: "#2dd4bf" },
  coral: { bar: "#fb923c", label: "#fdba74", line: "#fb923c" },
  green: { bar: "#4ade80", label: "#86efac", line: "#4ade80" },
  silver: { bar: "#cbd5e1", label: "#e2e8f0", line: "#cbd5e1" },
};

export default function PageHeader({
  title,
  description,
  label,
  accent = "silver",
}: PageHeaderProps) {
  const ac = accentColors[accent];

  return (
    <section className="relative text-white py-16 md:py-24 overflow-hidden">
      {/* ── 背景グラデーション ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d2540] via-[#1a3a5c] to-[#1e4976]" />

      {/* ── アクセントカラーの微細グロー（左側） ── */}
      <div
        className="absolute left-0 inset-y-0 w-1/3 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at left center, ${ac.bar}18 0%, transparent 70%)`,
        }}
      />

      {/* ── 青海波パターン（SVG） ── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`seigaiha-${accent}`}
            x="0"
            y="0"
            width="56"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="28"
              cy="28"
              r="27"
              stroke="white"
              strokeWidth="1.2"
              fill="none"
            />
            <circle
              cx="28"
              cy="28"
              r="20"
              stroke="white"
              strokeWidth="0.9"
              fill="none"
            />
            <circle
              cx="28"
              cy="28"
              r="13"
              stroke="white"
              strokeWidth="0.6"
              fill="none"
            />
            <circle
              cx="0"
              cy="28"
              r="27"
              stroke="white"
              strokeWidth="1.2"
              fill="none"
            />
            <circle
              cx="0"
              cy="28"
              r="20"
              stroke="white"
              strokeWidth="0.9"
              fill="none"
            />
            <circle
              cx="56"
              cy="28"
              r="27"
              stroke="white"
              strokeWidth="1.2"
              fill="none"
            />
            <circle
              cx="56"
              cy="28"
              r="20"
              stroke="white"
              strokeWidth="0.9"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#seigaiha-${accent})`} />
      </svg>

      {/* ── 桜島シルエット（右側） ── */}
      <svg
        viewBox="0 0 480 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 bottom-0 h-full w-auto opacity-[0.12] pointer-events-none"
        preserveAspectRatio="xMaxYMax meet"
        aria-hidden="true"
      >
        <path
          d="M0 265 Q80 252 160 260 Q240 268 320 255 Q400 242 480 258 L480 300 L0 300 Z"
          fill="white"
          fillOpacity="0.4"
        />
        <path d="M220 300 L316 105 L412 300 Z" fill="white" fillOpacity="0.5" />
        <path d="M268 300 L348 138 L428 300 Z" fill="white" fillOpacity="0.3" />
        <path
          d="M306 110 Q316 102 326 110"
          stroke="white"
          strokeWidth="3"
          strokeOpacity="0.65"
          strokeLinecap="round"
        />
        <path
          d="M316 100 Q309 82 318 64 Q327 46 314 28"
          stroke="white"
          strokeWidth="2.5"
          strokeOpacity="0.4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="430" cy="60" r="28" fill="white" fillOpacity="0.1" />
        <circle
          cx="430"
          cy="60"
          r="20"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.35"
          fill="none"
        />
      </svg>

      {/* ── コンテンツ ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex gap-6 items-start">
          {/* アクセントカラーの縦バー */}
          <div
            className="hidden sm:block w-1 rounded-full flex-shrink-0 mt-1 self-stretch"
            style={{ backgroundColor: ac.bar, minHeight: "60px" }}
          />

          <div>
            {/* ラベル行 */}
            <div className="flex items-center gap-3 mb-4">
              <p
                className="text-xs font-bold tracking-[0.3em] uppercase"
                style={{ color: ac.label }}
              >
                {label ?? "FUKU-TABI"}
              </p>
            </div>

            {/* タイトル */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 tracking-tight">
              {title}
            </h1>

            {/* 区切り線 */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className="block h-0.5 w-12 rounded-full"
                style={{ backgroundColor: ac.line, opacity: 0.8 }}
              />
              <span
                className="block h-0.5 w-5 rounded-full"
                style={{ backgroundColor: ac.line, opacity: 0.45 }}
              />
              <span
                className="block h-0.5 w-2 rounded-full"
                style={{ backgroundColor: ac.line, opacity: 0.2 }}
              />
            </div>

            {/* 説明文 */}
            {description && (
              <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
