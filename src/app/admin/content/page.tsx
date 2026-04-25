"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// ─────────────────────────────────────────
// フィールド定義
// ─────────────────────────────────────────
type Field = {
  ns: string; // namespace (ja.json のトップキー)
  key: string; // そのキー
  label: string; // 日本語ラベル
  multi?: boolean; // true = textarea
  hint?: string; // 補足説明
};

type Section = {
  id: string;
  icon: string;
  title: string;
  fields: Field[];
};

const SECTIONS: Section[] = [
  {
    id: "top",
    icon: "🏠",
    title: "TOPページ",
    fields: [
      {
        ns: "hero",
        key: "badge",
        label: "バッジ（ヒーロー上部の小テキスト）",
        hint: "例: 鹿児島発 ユニバーサルツーリズム",
      },
      { ns: "hero", key: "title", label: "キャッチコピー（1行目）" },
      {
        ns: "hero",
        key: "titleHighlight",
        label: "キャッチコピー（強調部分）",
        hint: "金色で表示される部分",
      },
      {
        ns: "hero",
        key: "description",
        label: "ヒーロー説明文",
        multi: true,
      },
      { ns: "hero", key: "applyButton", label: "申し込みボタン文言" },
      {
        ns: "flowPreview",
        key: "title",
        label: "「ご利用の流れ」セクションタイトル",
      },
      {
        ns: "flowPreview",
        key: "subtitle",
        label: "「ご利用の流れ」サブタイトル",
      },
      { ns: "flowPreview", key: "step1Title", label: "ステップ1 タイトル" },
      {
        ns: "flowPreview",
        key: "step1Desc",
        label: "ステップ1 説明",
        multi: true,
      },
      { ns: "flowPreview", key: "step2Title", label: "ステップ2 タイトル" },
      {
        ns: "flowPreview",
        key: "step2Desc",
        label: "ステップ2 説明",
        multi: true,
      },
      { ns: "flowPreview", key: "step3Title", label: "ステップ3 タイトル" },
      {
        ns: "flowPreview",
        key: "step3Desc",
        label: "ステップ3 説明",
        multi: true,
      },
      { ns: "flowPreview", key: "step4Title", label: "ステップ4 タイトル" },
      {
        ns: "flowPreview",
        key: "step4Desc",
        label: "ステップ4 説明",
        multi: true,
      },
      {
        ns: "flowPreview",
        key: "detailLink",
        label: "「詳しく見る」リンク文言",
      },
    ],
  },
  {
    id: "flow",
    icon: "📋",
    title: "ご利用の流れ",
    fields: [
      {
        ns: "flow",
        key: "intro",
        label: "イントロ文",
        multi: true,
      },
      { ns: "flow", key: "step1Title", label: "STEP1 タイトル" },
      { ns: "flow", key: "step1Description", label: "STEP1 説明", multi: true },
      { ns: "flow", key: "step1Note", label: "STEP1 補足（青いメモ）" },
      { ns: "flow", key: "step2Title", label: "STEP2 タイトル" },
      { ns: "flow", key: "step2Description", label: "STEP2 説明", multi: true },
      { ns: "flow", key: "step2Note", label: "STEP2 補足" },
      { ns: "flow", key: "step3Title", label: "STEP3 タイトル" },
      { ns: "flow", key: "step3Description", label: "STEP3 説明", multi: true },
      { ns: "flow", key: "step3Note", label: "STEP3 補足" },
      { ns: "flow", key: "step4Title", label: "STEP4 タイトル" },
      { ns: "flow", key: "step4Description", label: "STEP4 説明", multi: true },
      { ns: "flow", key: "step4Note", label: "STEP4 補足" },
      { ns: "flow", key: "step5Title", label: "STEP5 タイトル" },
      { ns: "flow", key: "step5Description", label: "STEP5 説明", multi: true },
      { ns: "flow", key: "step5Note", label: "STEP5 補足" },
      { ns: "flow", key: "step6Title", label: "STEP6 タイトル" },
      { ns: "flow", key: "step6Description", label: "STEP6 説明", multi: true },
      { ns: "flow", key: "step6Note", label: "STEP6 補足" },
    ],
  },
  {
    id: "join",
    icon: "🤝",
    title: "介助者になる",
    fields: [
      { ns: "join", key: "intro", label: "イントロ文", multi: true },
      {
        ns: "join",
        key: "whyTitle",
        label: "「こんな方に向いています」タイトル",
      },
      { ns: "join", key: "why1Title", label: "理由1 タイトル" },
      { ns: "join", key: "why1Desc", label: "理由1 説明", multi: true },
      { ns: "join", key: "why2Title", label: "理由2 タイトル" },
      { ns: "join", key: "why2Desc", label: "理由2 説明", multi: true },
      { ns: "join", key: "why3Title", label: "理由3 タイトル" },
      { ns: "join", key: "why3Desc", label: "理由3 説明", multi: true },
      { ns: "join", key: "why4Title", label: "理由4 タイトル" },
      { ns: "join", key: "why4Desc", label: "理由4 説明", multi: true },
      { ns: "join", key: "conditionsTitle", label: "活動条件タイトル" },
      { ns: "join", key: "cond1Label", label: "条件1 ラベル" },
      { ns: "join", key: "cond1Value", label: "条件1 内容" },
      { ns: "join", key: "cond2Label", label: "条件2 ラベル" },
      { ns: "join", key: "cond2Value", label: "条件2 内容" },
      { ns: "join", key: "cond3Label", label: "条件3 ラベル" },
      { ns: "join", key: "cond3Value", label: "条件3 内容" },
      { ns: "join", key: "cond4Label", label: "条件4 ラベル" },
      { ns: "join", key: "cond4Value", label: "条件4 内容" },
      {
        ns: "join",
        key: "trainingLabel",
        label: "育成講座 ラベル（英語表記）",
        hint: "例: TRAINING PROGRAM",
      },
      { ns: "join", key: "trainingTitle", label: "育成講座 タイトル" },
      {
        ns: "join",
        key: "trainingDesc",
        label: "育成講座 説明文",
        multi: true,
      },
    ],
  },
  {
    id: "faq",
    icon: "❓",
    title: "よくある質問",
    fields: Array.from({ length: 10 }, (_, i) => [
      {
        ns: "faq",
        key: `q${i + 1}`,
        label: `Q${i + 1} 質問文`,
      },
      {
        ns: "faq",
        key: `a${i + 1}`,
        label: `A${i + 1} 回答文`,
        multi: true,
      },
    ]).flat(),
  },
  {
    id: "footer",
    icon: "🔗",
    title: "フッター・共通",
    fields: [
      {
        ns: "footer",
        key: "description",
        label: "フッター説明文",
        multi: true,
      },
      { ns: "footer", key: "contactText", label: "フッター連絡誘導文" },
      { ns: "footer", key: "copyright", label: "コピーライト" },
      { ns: "metadata", key: "title", label: "サイトタイトル（SEO）" },
      {
        ns: "metadata",
        key: "description",
        label: "サイト説明文（SEO）",
        multi: true,
        hint: "Google検索結果に表示されます。120文字以内推奨。",
      },
    ],
  },
];

// ─────────────────────────────────────────
// 型
// ─────────────────────────────────────────
type Messages = Record<string, Record<string, string>>;
type DirtyMap = Record<string, boolean>; // `ns.key` → true

type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

// ─────────────────────────────────────────
// コンポーネント
// ─────────────────────────────────────────
export default function ContentEditorPage() {
  const [activeTab, setActiveTab] = useState("top");
  const [messages, setMessages] = useState<Messages>({});
  const [dirty, setDirty] = useState<DirtyMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  // ギャラリー
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [gallerySaving, setGallerySaving] = useState(false);

  // 初回ロード
  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch(() => {
        setToast({ type: "error", msg: "コンテンツの読み込みに失敗しました" });
        setLoading(false);
      });
    fetch("/api/admin/gallery")
      .then((r) => r.json())
      .then(setGallery)
      .catch(() => {});
  }, []);

  const getValue = (ns: string, key: string): string =>
    messages[ns]?.[key] ?? "";

  const setValue = useCallback((ns: string, key: string, val: string) => {
    setMessages((prev) => ({
      ...prev,
      [ns]: { ...prev[ns], [key]: val },
    }));
    setDirty((prev) => ({ ...prev, [`${ns}.${key}`]: true }));
  }, []);

  const hasDirty = Object.keys(dirty).length > 0;

  const save = async () => {
    setSaving(true);
    try {
      // 変更されたフィールドのみ送信
      const updates: Messages = {};
      for (const compositeKey of Object.keys(dirty)) {
        const [ns, key] = compositeKey.split(".");
        if (!updates[ns]) updates[ns] = {};
        updates[ns][key] = messages[ns]?.[key] ?? "";
      }
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "保存失敗");
      setDirty({});
      setToast({
        type: "success",
        msg: "✅ 保存しました！git push で本番に反映されます。",
      });
    } catch (err) {
      setToast({
        type: "error",
        msg: err instanceof Error ? err.message : "保存に失敗しました",
      });
    } finally {
      setSaving(false);
    }
  };

  // ギャラリー保存
  const saveGallery = async () => {
    setGallerySaving(true);
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gallery),
    });
    setGallerySaving(false);
    if (res.ok) {
      setToast({ type: "success", msg: "✅ ギャラリーを保存しました！" });
    } else {
      setToast({ type: "error", msg: "保存に失敗しました" });
    }
  };

  const updatePhoto = (id: string, key: keyof GalleryPhoto, val: string) => {
    setGallery((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [key]: val } : p)),
    );
  };

  const movePhoto = (i: number, dir: -1 | 1) => {
    const next = [...gallery];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    setGallery(next);
  };

  const addPhoto = () => {
    setGallery((prev) => [
      ...prev,
      { id: `g${Date.now()}`, src: "", alt: "", caption: "" },
    ]);
  };

  const removePhoto = (id: string) => {
    if (!confirm("この写真を削除しますか？")) return;
    setGallery((prev) => prev.filter((p) => p.id !== id));
  };

  const currentSection = SECTIONS.find((s) => s.id === activeTab);
  const dirtyCount = Object.keys(dirty).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-800">コンテンツ編集</h1>
            <p className="text-xs text-gray-500">
              サイトの文章をここから変更できます
            </p>
          </div>
          <div className="flex items-center gap-3">
            {dirtyCount > 0 && (
              <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full">
                {dirtyCount}件 未保存
              </span>
            )}
            <button
              onClick={save}
              disabled={saving || !hasDirty}
              className="px-5 py-2 bg-satsuma-700 text-white font-bold rounded-lg text-sm disabled:opacity-40 hover:bg-satsuma-800 transition-colors"
            >
              {saving ? "保存中..." : "変更を保存"}
            </button>
          </div>
        </div>

        {/* タブ */}
        <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto pb-0">
          {SECTIONS.map((s) => {
            const sectionDirty = s.fields.some(
              (f) => dirty[`${f.ns}.${f.key}`],
            );
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === s.id
                    ? "border-satsuma-600 text-satsuma-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <span>{s.icon}</span>
                {s.title}
                {sectionDirty && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                )}
              </button>
            );
          })}
          {/* ギャラリータブ */}
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "gallery"
                ? "border-satsuma-600 text-satsuma-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>📸</span>
            ギャラリー写真
          </button>
        </div>
      </div>

      {/* トースト通知 */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium max-w-sm ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.msg}
          <button
            onClick={() => setToast(null)}
            className="ml-3 opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* コンテンツ */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20 text-gray-400">読み込み中...</div>
        ) : activeTab === "gallery" ? (
          /* ─── ギャラリー写真エディター ─── */
          <>
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3 mb-6 flex items-start gap-3">
              <span className="text-2xl">📸</span>
              <div>
                <p className="font-bold text-blue-800 text-sm">
                  ギャラリー写真（TOPページ）
                </p>
                <p className="text-blue-600 text-xs mt-0.5">
                  写真のURLを貼り付けて「保存する」を押してください。保存後{" "}
                  <code className="bg-blue-100 px-1 rounded">git push</code>{" "}
                  で本番反映。
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {gallery.map((photo, i) => (
                <div
                  key={photo.id}
                  className="bg-white border border-gray-100 rounded-xl p-5 flex gap-4"
                >
                  {/* サムネイル */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                    {photo.src ? (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    ) : (
                      <span className="text-gray-400 text-xs text-center px-1">
                        URL未設定
                      </span>
                    )}
                  </div>

                  {/* フィールド */}
                  <div className="flex-1 space-y-2">
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-satsuma-300"
                      placeholder="写真URL（https://...）"
                      value={photo.src}
                      onChange={(e) =>
                        updatePhoto(photo.id, "src", e.target.value)
                      }
                    />
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-satsuma-300"
                      placeholder="キャプション（ホバー時に表示）"
                      value={photo.caption}
                      onChange={(e) =>
                        updatePhoto(photo.id, "caption", e.target.value)
                      }
                    />
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-satsuma-300"
                      placeholder="代替テキスト（SEO・アクセシビリティ用）"
                      value={photo.alt}
                      onChange={(e) =>
                        updatePhoto(photo.id, "alt", e.target.value)
                      }
                    />
                  </div>

                  {/* 操作 */}
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <button
                      onClick={() => movePhoto(i, -1)}
                      disabled={i === 0}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-2 py-1 rounded-lg disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => movePhoto(i, 1)}
                      disabled={i === gallery.length - 1}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-2 py-1 rounded-lg disabled:opacity-30"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="text-xs bg-red-50 hover:bg-red-100 text-red-500 font-medium px-2 py-1 rounded-lg mt-1"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={addPhoto}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-xl transition-colors"
              >
                ＋ 写真を追加
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={saveGallery}
                disabled={gallerySaving}
                className="px-8 py-2.5 bg-satsuma-700 text-white font-bold rounded-lg text-sm disabled:opacity-40 hover:bg-satsuma-800 transition-colors"
              >
                {gallerySaving ? "保存中..." : "ギャラリーを保存する"}
              </button>
            </div>
          </>
        ) : currentSection ? (
          /* ─── テキスト編集（通常タブ） ─── */
          <>
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3 mb-6 flex items-start gap-3">
              <span className="text-2xl">{currentSection.icon}</span>
              <div>
                <p className="font-bold text-blue-800 text-sm">
                  {currentSection.title}
                </p>
                <p className="text-blue-600 text-xs mt-0.5">
                  変更後「変更を保存」→
                  ローカルのファイルに書き込まれます。本番に反映するには{" "}
                  <code className="bg-blue-100 px-1 rounded">git push</code>{" "}
                  が必要です。
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {currentSection.fields.map((field) => {
                const fieldKey = `${field.ns}.${field.key}`;
                const isDirty = !!dirty[fieldKey];
                const value = getValue(field.ns, field.key);
                return (
                  <div
                    key={fieldKey}
                    className={`bg-white rounded-xl border p-5 transition-colors ${
                      isDirty ? "border-amber-300 shadow-sm" : "border-gray-100"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">
                        {field.label}
                        {isDirty && (
                          <span className="ml-2 text-xs text-amber-500 font-normal">
                            ● 変更あり
                          </span>
                        )}
                      </label>
                      <span className="text-xs text-gray-300 font-mono">
                        {field.ns}.{field.key}
                      </span>
                    </div>
                    {field.hint && (
                      <p className="text-xs text-gray-400 mb-2">{field.hint}</p>
                    )}
                    {field.multi ? (
                      <textarea
                        value={value}
                        onChange={(e) =>
                          setValue(field.ns, field.key, e.target.value)
                        }
                        rows={Math.max(
                          3,
                          (value.match(/\n/g) || []).length + 2,
                        )}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-satsuma-300 resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          setValue(field.ns, field.key, e.target.value)
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-satsuma-300"
                      />
                    )}
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-gray-300">
                        {value.length} 文字
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end gap-3">
              {hasDirty && (
                <button
                  onClick={() => {
                    if (confirm("未保存の変更を破棄しますか？"))
                      window.location.reload();
                  }}
                  className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  変更を破棄
                </button>
              )}
              <button
                onClick={save}
                disabled={saving || !hasDirty}
                className="px-8 py-2.5 bg-satsuma-700 text-white font-bold rounded-lg text-sm disabled:opacity-40 hover:bg-satsuma-800 transition-colors"
              >
                {saving
                  ? "保存中..."
                  : `変更を保存${dirtyCount > 0 ? ` (${dirtyCount}件)` : ""}`}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
