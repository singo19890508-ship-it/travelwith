"use client";

import { useEffect, useState } from "react";

export default function KnowledgePage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/admin/knowledge")
      .then((r) => r.json())
      .then((data) => {
        setContent(data.content ?? "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        setMessage({
          type: "success",
          text: "✅ 保存しました。次回のAI会話から反映されます。",
        });
      } else {
        const data = await res.json();
        setMessage({
          type: "error",
          text: `❌ ${data.error ?? "保存に失敗しました"}`,
        });
      }
    } catch {
      setMessage({ type: "error", text: "❌ 通信エラーが発生しました" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* ヘッダー */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          AI社員 共有知識ベース
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          このファイルはすべてのAIエージェントが会話のたびに参照します。プロジェクトの最新情報を常に反映させておきましょう。
        </p>
      </div>

      {/* 案内カード */}
      <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
        <strong>使い方：</strong>{" "}
        下のテキストエリアを編集して「保存する」を押すと、次回のAI会話（タスクモード・会議モード両方）からすぐに反映されます。Markdown形式で記述できます。
      </div>

      {/* 保存結果メッセージ */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* エディタ */}
      {loading ? (
        <div className="flex items-center justify-center h-64 text-gray-400">
          <svg
            className="animate-spin w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          読み込み中...
        </div>
      ) : (
        <textarea
          className="w-full h-[60vh] p-4 font-mono text-sm border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-800 leading-relaxed"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="# FUKU-TABI プロジェクト知識ベース&#10;> ここにプロジェクトの共有情報を記述してください"
          spellCheck={false}
        />
      )}

      {/* 保存ボタン */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-400">
          ファイル保存先: src/data/project_brief.md
        </p>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="flex items-center gap-2 px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors"
        >
          {saving ? (
            <>
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              保存中...
            </>
          ) : (
            <>
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
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              保存する
            </>
          )}
        </button>
      </div>
    </div>
  );
}
