import Image from "next/image";

interface PageHeaderProps {
  title: string;
  description?: string;
  color?: "blue" | "teal" | "green";
  imageUrl?: string;
}

const colorMap = {
  blue: "bg-satsuma-700",
  teal: "bg-teal-700",
  green: "bg-teal-700",
};

export default function PageHeader({
  title,
  description,
  color = "blue",
  imageUrl,
}: PageHeaderProps) {
  if (imageUrl) {
    return (
      <div className="relative text-white py-20 md:py-28 overflow-hidden">
        {/* 背景画像 */}
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-r from-satsuma-900/85 via-satsuma-800/70 to-satsuma-700/50" />

        {/* コンテンツ */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-satsuma-200 text-sm font-semibold tracking-widest uppercase mb-3">
            How It Works
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-xl">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${colorMap[color]} text-white py-12 md:py-16`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-white/80 text-lg leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
