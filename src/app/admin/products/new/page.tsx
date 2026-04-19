import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";

export default function NewProductPage() {
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
        <h1 className="text-2xl font-bold text-gray-800">新規旅行商品を作成</h1>
      </div>
      <ProductForm />
    </div>
  );
}
