import Image from "next/image";
import fs from "fs";
import path from "path";

type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

function loadGallery(): GalleryPhoto[] {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "src", "data", "gallery.json"),
      "utf-8",
    );
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default function TourGallery() {
  const photos = loadGallery();
  if (photos.length === 0) return null;

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
              key={photo.id ?? i}
              className="group relative overflow-hidden rounded-xl aspect-square bg-gray-200 shadow-sm"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                unoptimized
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
