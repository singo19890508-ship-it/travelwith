"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { FieldPost } from "@/lib/field-posts";

interface Props {
  post?: FieldPost;
}

export default function FieldPostForm({ post }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!post;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: fd.get("title")?.toString().trim() ?? "",
      body: fd.get("body")?.toString().trim() ?? "",
      image_url: fd.get("image_url")?.toString().trim() || null,
      published: fd.get("published") === "true",
    };

    startTransition(async () => {
      const url = isEdit
        ? `/api/admin/field-posts/${post.id}`
        : "/api/admin/field-posts";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setError("保存に失敗しました。");
        return;
      }
      router.push("/admin/field-posts");
      router.refresh();
    });
  }

  async function handleDelete() {
    if (!post || !confirm("この投稿を削除しますか？")) return;
    startTransition(async () => {
      await fetch(`/api/admin/field-posts/${post.id}`, { method: "DELETE" });
      router.push("/admin/field-posts");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          タイトル <span className="text-satsuma-600">*</span>
        </label>
        <input
          name="title"
          type="text"
          required
          defaultValue={post?.title ?? ""}
          placeholder="例：霧島温泉で、車椅子の旅"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-satsuma-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          本文 <span className="text-satsuma-600">*</span>
        </label>
        <textarea
          name="body"
          required
          rows={10}
          defaultValue={post?.body ?? ""}
          placeholder="現場で感じたこと、旅の様子、気づきなど自由に書いてください。"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-satsuma-400 resize-y"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          画像URL{" "}
          <span className="text-gray-400 font-normal text-xs">（任意）</span>
        </label>
        <input
          name="image_url"
          type="url"
          defaultValue={post?.image_url ?? ""}
          placeholder="https://..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-satsuma-400"
        />
        <p className="text-xs text-gray-400 mt-1">
          Google フォト・Cloudinary などの公開URLを貼り付けてください
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          公開設定
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="published"
              value="true"
              defaultChecked={post?.published ?? false}
              className="accent-satsuma-600"
            />
            <span className="text-sm text-gray-700">公開する</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="published"
              value="false"
              defaultChecked={!(post?.published ?? false)}
              className="accent-satsuma-600"
            />
            <span className="text-sm text-gray-700">下書き保存</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 bg-satsuma-600 text-white font-bold text-sm rounded-xl hover:bg-satsuma-700 transition-colors disabled:opacity-60"
        >
          {isPending ? "保存中…" : isEdit ? "更新する" : "投稿する"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-200 text-gray-600 text-sm rounded-xl hover:bg-gray-50 transition-colors"
        >
          キャンセル
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="ml-auto px-6 py-3 border border-red-200 text-red-600 text-sm rounded-xl hover:bg-red-50 transition-colors disabled:opacity-60"
          >
            削除
          </button>
        )}
      </div>
    </form>
  );
}
