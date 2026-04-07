import Link from "next/link";
import { notFound } from "next/navigation";
import CaregiverForm from "@/components/admin/CaregiverForm";
import { getCaregiverById } from "@/lib/caregivers";
import { updateCaregiver } from "../actions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "介助者 編集 | 管理画面" };

export default async function EditCaregiverPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caregiver = await getCaregiverById(id);
  if (!caregiver) notFound();

  const action = updateCaregiver.bind(null, id);

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/caregivers" className="text-sm text-gray-500 hover:text-gray-700">
          ← 介助者一覧に戻る
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">
          {caregiver.name} を編集
        </h1>
      </div>
      <CaregiverForm caregiver={caregiver} action={action} />
    </div>
  );
}
