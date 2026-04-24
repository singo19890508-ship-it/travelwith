import Image from "next/image";

const photos = [
  {
    src: "/images/real/onsen-support.jpg",
    alt: "温泉での入浴介助サポートの様子",
    caption: "温泉入浴介助。笑顔で一緒に。",
  },
  {
    src: "/images/real/hotel-lobby.jpg",
    alt: "ホテルのロビーでくつろぐ旅行者",
    caption: "ホテルでのんびり過ごす",
  },
  {
    src: "/images/real/china-town.jpg",
    alt: "神戸中華街を観光する様子",
    caption: "神戸中華街を散策",
  },
  {
    src: "/images/tours/tour-shinkansen.jpg",
    alt: "新幹線の車椅子スペースに乗り込むシーン",
    caption: "新幹線でどこへでも",
  },
  {
    src: "/images/tours/tour-onsen.jpg",
    alt: "温泉を楽しむ旅行者",
    caption: "鹿児島の温泉を満喫",
  },
  {
    src: "/images/tours/tour-ryokan-dinner.jpg",
    alt: "旅館の食事を楽しむ様子",
    caption: "旅館でゆったり食事",
  },
  {
    src: "/images/tours/tour-sightseeing.jpg",
    alt: "観光地での記念撮影",
    caption: "観光地を一緒に巡る",
  },
  {
    src: "/images/tours/tour-ryokan-care.jpg",
    alt: "旅館の畳の間でケアを受ける様子",
    caption: "旅先でも丁寧なケア",
  },
];

export default function TourGallery() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest text-[#1a4a6b] uppercase mb-2">
            Tour Gallery
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            実際の旅の様子
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            これまでサポートしてきた旅の一コマです。
            <br />
            「旅なんて無理」と思っていた方が、笑顔で旅を楽しんでいます。
          </p>
        </div>

        {/* グリッド */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl aspect-square bg-gray-200 shadow-sm"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* オーバーレイキャプション */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <p className="text-white text-sm font-medium">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 補足テキスト */}
        <p className="text-center text-xs text-gray-400 mt-6">
          ※ 掲載写真はご本人の同意を得て使用しています。
        </p>
      </div>
    </section>
  );
}
