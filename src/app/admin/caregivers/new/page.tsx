import Link from "next/link";
import CaregiverForm from "@/components/admin/CaregiverForm";
import { createCaregiver } from "../actions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "介助者 新規追加 | 管理画面" };

export default function NewCaregiverPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/caregivers" className="text-sm text-gray-500 hover:text-gray-700">
          ← 介助者一覧に戻る
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">介助者 新規追加</h1>
      </div>
      <CaregiverForm action={createCaregiver} />
    </div>
  );
}
