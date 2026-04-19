import { createServiceClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("tour_products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-4"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          旅行商品一覧に戻る
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">旅行商品を編集</h1>
        <p className="text-gray-500 text-sm mt-1">{product.title}</p>
      </div>
      <ProductForm
        productId={id}
        initial={{
          title: product.title,
          description: product.description ?? "",
          area: product.area ?? "",
          duration_days: product.duration_days,
          price_base: product.price_base,
          price_supporter: product.price_supporter,
          max_participants: product.max_participants,
          status: product.status,
          barrier_free_info: product.barrier_free_info ?? {
            wheelchair: false,
            medical_equipment: false,
            welfare_vehicle: false,
            meal_support: false,
          },
          itinerary: product.itinerary ?? [],
        }}
      />
    </div>
  );
}
