"use client";

import { useEffect, useState, useCallback } from "react";

interface ImageItem {
  filename: string;
  url: string;
  size: number;
  createdAt: string;
}

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

interface TourItem {
  id: string;
  title: string;
  imageUrl: string;
  [key: string]: unknown;
}

const GALLERY_LABELS: Record<string, string> = {
  g1: "ギャラリー①",
  g2: "ギャラリー②",
  g3: "ギャラリー③",
  g4: "ギャラリー④",
  g5: "ギャラリー⑤",
  g6: "ギャラリー⑥",
  g7: "ギャラリー⑦",
  g8: "ギャラリー⑧",
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

export default function AdminImagesPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [tours, setTours] = useState<TourItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);
  const [assigning, setAssigning] = useState<string | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const [imgRes, galRes, tourRes] = await Promise.all([
      fetch("/api/admin/images"),
      fetch("/api/admin/gallery"),
      fetch("/api/admin/tours"),
    ]);
    setImages(await imgRes.json());
    setGallery(await galRes.json());
    setTours(await tourRes.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast("URLをコピーしました");
  };

  const assignToGallery = async (imageUrl: string, slotId: string) => {
    setAssigning(imageUrl + slotId);
    const updated = gallery.map((g) =>
      g.id === slotId ? { ...g, src: imageUrl } : g,
    );
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      setGallery(updated);
      showToast(`${GALLERY_LABELS[slotId] ?? slotId} に設定しました`);
    } else {
      showToast("保存に失敗しました", "error");
    }
    setAssigning(null);
  };

  const assignToTour = async (imageUrl: string, tourId: string) => {
    setAssigning(imageUrl + tourId);
    const updated = tours.map((t) =>
      t.id === tourId ? { ...t, imageUrl } : t,
    );
    const res = await fetch("/api/admin/tours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      setTours(updated);
      const tour = tours.find((t) => t.id === tourId);
      showToast(`「${tour?.title ?? tourId}」の写真に設定しました`);
    } else {
      showToast("保存に失敗しました", "error");
    }
    setAssigning(null);
  };

  const pushToProduction = async () => {
    setAssigning("push");
    const res = await fetch("/api/admin/git-push", { method: "POST" });
    if (res.ok) {
      showToast("本番サイトに反映しました（2〜3分後に反映）");
    } else {
      showToast("git push に失敗しました", "error");
    }
    setAssigning(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">画像ライブラリ</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gemini で生成した画像を、ギャラリーやツアーに割り当てられます
          </p>
        </div>
        <button
          onClick={pushToProduction}
          disabled={assigning === "push"}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          {assigning === "push" ? "反映中…" : "本番に反映"}
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-20">読み込み中…</div>
      ) : images.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          <p>画像がありません</p>
          <p className="text-xs mt-2">
            scripts/generate-images.mjs を実行してください
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((img) => {
            // どのスロットに使われているか
            const usedInGallery = gallery
              .filter((g) => g.src === img.url)
              .map((g) => GALLERY_LABELS[g.id] ?? g.id);
            const usedInTours = tours
              .filter((t) => t.imageUrl === img.url)
              .map((t) => t.title);

            return (
              <div
                key={img.filename}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* サムネイル */}
                <div className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.filename}
                    className="w-full aspect-square object-cover"
                  />
                  {/* URLコピーオーバーレイ */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => copyUrl(img.url)}
                      className="bg-white text-gray-800 text-xs font-medium px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      URLコピー
                    </button>
                  </div>
                </div>

                {/* 情報 */}
                <div className="p-3">
                  <p
                    className="text-xs font-medium text-gray-700 truncate"
                    title={img.filename}
                  >
                    {img.filename}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatBytes(img.size)}
                  </p>

                  {/* 使用中バッジ */}
                  {(usedInGallery.length > 0 || usedInTours.length > 0) && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {usedInGallery.map((label) => (
                        <span
                          key={label}
                          className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full"
                        >
                          {label}
                        </span>
                      ))}
                      {usedInTours.map((title) => (
                        <span
                          key={title}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full truncate max-w-full"
                        >
                          ツアー
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 割当ボタン */}
                  <div className="mt-3 space-y-2">
                    {/* ギャラリー割当 */}
                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        ギャラリーに割当
                      </p>
                      <div className="grid grid-cols-4 gap-1">
                        {gallery.map((slot) => {
                          const isUsed = slot.src === img.url;
                          const key = img.url + slot.id;
                          return (
                            <button
                              key={slot.id}
                              onClick={() => assignToGallery(img.url, slot.id)}
                              disabled={assigning === key}
                              title={GALLERY_LABELS[slot.id]}
                              className={`text-xs py-1 rounded transition-colors ${
                                isUsed
                                  ? "bg-amber-500 text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-700"
                              } ${assigning === key ? "opacity-50" : ""}`}
                            >
                              {slot.id.replace("g", "")}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* ツアー割当 */}
                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        ツアー写真に割当
                      </p>
                      <select
                        className="w-full text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 bg-white"
                        value={
                          tours.find((t) => t.imageUrl === img.url)?.id ?? ""
                        }
                        onChange={(e) => {
                          if (e.target.value)
                            assignToTour(img.url, e.target.value);
                        }}
                      >
                        <option value="">選択してください</option>
                        {tours.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
