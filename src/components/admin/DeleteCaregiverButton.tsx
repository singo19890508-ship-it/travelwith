"use client";

import { useTransition } from "react";
import { deleteCaregiver } from "@/app/admin/caregivers/actions";

interface Props {
  id: string;
  name: string;
}

export default function DeleteCaregiverButton({ id, name }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`「${name}」を削除しますか？\nこの操作は取り消せません。`)) return;
    startTransition(async () => {
      await deleteCaregiver(id);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 hover:underline text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      {isPending ? "削除中..." : "削除"}
    </button>
  );
}
