import { getPostById } from "@/lib/field-posts";
import FieldPostForm from "@/components/admin/FieldPostForm";
import { notFound } from "next/navigation";

export default async function EditFieldPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">投稿を編集</h1>
      <FieldPostForm post={post} />
    </div>
  );
}
