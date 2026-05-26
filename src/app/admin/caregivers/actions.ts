"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseFormData(formData: FormData) {
  const qualifications = (formData.get("qualifications") as string)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const support_types = formData.getAll("support_types") as string[];
  const regions = formData.getAll("regions") as string[];

  return {
    name: (formData.get("name") as string).trim(),
    photo: (formData.get("photo") as string).trim() || null,
    gender: formData.get("gender") as "male" | "female",
    age_range: formData.get("age_range") as string,
    qualifications,
    experience_summary: (formData.get("experience_summary") as string).trim(),
    support_types,
    regions,
    training_completed: formData.get("training_completed") === "on",
    message: (formData.get("message") as string).trim(),
    detail_message: (formData.get("detail_message") as string).trim(),
    hobbies: (formData.get("hobbies") as string).trim() || null,
    notes: (formData.get("notes") as string).trim() || null,
    available: formData.get("available") === "on",
    sort_order: parseInt(formData.get("sort_order") as string, 10) || 0,
  };
}

export async function createCaregiver(formData: FormData) {
  const fields = parseFormData(formData);
  const slug = slugify(fields.name) || `caregiver-${Date.now()}`;

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("caregivers")
    .insert({ ...fields, slug });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/caregivers");
  revalidatePath("/[locale]/caregivers", "page");
  redirect("/admin/caregivers");
}

export async function updateCaregiver(id: string, formData: FormData) {
  const fields = parseFormData(formData);

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("caregivers")
    .update(fields)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/caregivers");
  revalidatePath("/[locale]/caregivers", "page");
  redirect("/admin/caregivers");
}

export async function deleteCaregiver(id: string) {
  const supabase = createServiceClient();
  const { error } = await supabase
    .from("caregivers")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/caregivers");
  revalidatePath("/[locale]/caregivers", "page");
}
