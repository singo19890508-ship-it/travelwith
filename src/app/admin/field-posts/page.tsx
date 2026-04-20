import { getAllPosts, deletePost } from "@/lib/field-posts";
import Link from "next/link";

export default async function FieldPostsAdminPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">現場から 投稿管理</h1>
        <Link
          href="/admin/field-posts/new"
          className="px-4 py-2 bg-satsuma-600 text-white text-sm font-bold rounded-lg hover:bg-satsuma-700 transition-colors"
        >
          ＋ 新規投稿
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
          投稿がまだありません
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      post.published
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {post.published ? "公開中" : "下書き"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString("ja-JP")
                      : new Date(post.created_at).toLocaleDateString("ja-JP")}
                  </span>
                </div>
                <p className="font-bold text-gray-900 truncate">{post.title}</p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {post.body}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Link
                  href={`/admin/field-posts/${post.id}/edit`}
                  className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  編集
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
