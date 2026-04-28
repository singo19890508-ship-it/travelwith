interface PageHeaderProps {
  title: string;
  description?: string;
  label?: string;
  // 旧prop（後方互換・無視）
  color?: string;
  imageUrl?: string;
}

export default function PageHeader({
  title,
  description,
  label,
}: PageHeaderProps) {
  return (
    <section className="relative text-white py-16 md:py-24 overflow-hidden">
      {/* ── 背景グラデーション ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d2540] via-[#1a3a5c] to-[#1e4976]" />

      {/* ── 青海波パターン（SVG） ── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.09]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="seigaiha"
            x="0"
            y="0"
            width="56"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            {/* スケール1（左列） */}
            <clipPath id="clip-l">
              <rect x="-28" y="0" width="56" height="28" />
            </clipPath>
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
              cx="0"
              cy="28"
              r="13"
              stroke="white"
              strokeWidth="0.6"
              fill="none"
            />

            {/* スケール2（中央） */}
            <clipPath id="clip-c">
              <rect x="0" y="0" width="56" height="28" />
            </clipPath>
            <circle
              cx="28"
              cy="28"
              r="27"
              stroke="white"
              strokeWidth="1.2"
              fill="none"
              clipPath="url(#clip-c)"
            />
            <circle
              cx="28"
              cy="28"
              r="20"
              stroke="white"
              strokeWidth="0.9"
              fill="none"
              clipPath="url(#clip-c)"
            />
            <circle
              cx="28"
              cy="28"
              r="13"
              stroke="white"
              strokeWidth="0.6"
              fill="none"
              clipPath="url(#clip-c)"
            />

            {/* スケール3（右端） */}
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
            <circle
              cx="56"
              cy="28"
              r="13"
              stroke="white"
              strokeWidth="0.6"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#seigaiha)" />
      </svg>

      {/* ── 桜島シルエット（右側） ── */}
      <svg
        viewBox="0 0 480 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 bottom-0 h-full w-auto opacity-[0.13] pointer-events-none"
        preserveAspectRatio="xMaxYMax meet"
        aria-hidden="true"
      >
        {/* 海面 */}
        <path
          d="M0 265 Q80 252 160 260 Q240 268 320 255 Q400 242 480 258 L480 300 L0 300 Z"
          fill="white"
          fillOpacity="0.4"
        />
        {/* 桜島（奥） */}
        <path
          d="M220 300 L316 105 L412 300 Z"
          fill="white"
          fillOpacity="0.55"
        />
        {/* 桜島（手前・北岳） */}
        <path
          d="M268 300 L348 138 L428 300 Z"
          fill="white"
          fillOpacity="0.35"
        />
        {/* 火口縁 */}
        <path
          d="M306 110 Q316 102 326 110"
          stroke="white"
          strokeWidth="3"
          strokeOpacity="0.7"
          strokeLinecap="round"
        />
        {/* 噴煙 */}
        <path
          d="M316 100 Q309 82 318 64 Q327 46 314 28"
          stroke="white"
          strokeWidth="2.5"
          strokeOpacity="0.45"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M325 106 Q334 88 328 70 Q322 52 333 36"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.3"
          strokeLinecap="round"
          fill="none"
        />
        {/* 太陽 */}
        <circle cx="430" cy="60" r="28" fill="white" fillOpacity="0.12" />
        <circle
          cx="430"
          cy="60"
          r="20"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          fill="none"
        />
      </svg>

      {/* ── 左上の装飾ドット ── */}
      <div
        className="absolute top-6 left-6 w-16 h-16 opacity-10 pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 64 64" fill="white">
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <circle
                key={`${row}-${col}`}
                cx={8 + col * 16}
                cy={8 + row * 16}
                r="2"
              />
            )),
          )}
        </svg>
      </div>

      {/* ── コンテンツ ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        {/* ラベル行 */}
        <div className="flex items-center gap-3 mb-5">
          <span className="block h-px w-10 bg-amber-400 opacity-80" />
          <p className="text-amber-300 text-xs font-semibold tracking-[0.3em] uppercase">
            {label ?? "FUKU-TABI"}
          </p>
        </div>

        {/* タイトル */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 tracking-tight">
          {title}
        </h1>

        {/* 区切り線 */}
        <div className="flex items-center gap-2 mb-5">
          <span className="block h-0.5 w-12 bg-amber-400 opacity-70 rounded-full" />
          <span className="block h-0.5 w-4 bg-amber-400 opacity-40 rounded-full" />
          <span className="block h-0.5 w-2 bg-amber-400 opacity-20 rounded-full" />
        </div>

        {/* 説明文 */}
        {description && (
          <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
