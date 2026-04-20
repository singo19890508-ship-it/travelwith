"use server";

import { createServiceClient } from "@/lib/supabase/server";

export type TrainingRegisterState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function trainingRegisterAction(
  _prev: TrainingRegisterState,
  formData: FormData,
): Promise<TrainingRegisterState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!name || !email) {
    return { status: "error", message: "お名前とメールアドレスは必須です。" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      status: "error",
      message: "メールアドレスの形式が正しくありません。",
    };
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from("training_registrations").insert({
      name,
      email,
      phone: phone || null,
      message: message || null,
    });

    if (error) throw error;

    return { status: "success" };
  } catch (e) {
    console.error("training_register error:", e);
    return {
      status: "error",
      message: "送信に失敗しました。時間をおいて再度お試しください。",
    };
  }
}
