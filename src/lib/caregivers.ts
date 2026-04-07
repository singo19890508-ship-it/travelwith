import { createServiceClient } from "@/lib/supabase/server";

export type SupportType =
  | "wheelchair" | "walking" | "meal" | "restroom" | "visual"
  | "communication" | "luggage" | "transportation" | "medication";

export type Region =
  | "鹿児島市内" | "薩摩半島" | "大隅半島" | "奄美大島" | "離島・その他" | "全県対応";

export interface Caregiver {
  id: string;
  slug: string;
  name: string;
  nickname?: string | null;
  photo: string | null;
  gender: "male" | "female";
  age_range: string;
  qualifications: string[];
  experience_summary: string;
  support_types: SupportType[];
  regions: Region[];
  training_completed: boolean;
  message: string;
  detail_message: string;
  hobbies?: string | null;
  notes?: string | null;
  available: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export async function getCaregivers(): Promise<Caregiver[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("caregivers")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data as Caregiver[]) ?? [];
  } catch {
    return [];
  }
}

export async function getAvailableCaregivers(): Promise<Caregiver[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("caregivers")
      .select("*")
      .eq("available", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data as Caregiver[]) ?? [];
  } catch {
    return [];
  }
}

export async function getCaregiverBySlug(slug: string): Promise<Caregiver | null> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("caregivers")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error) throw error;
    return data as Caregiver;
  } catch {
    return null;
  }
}

export async function getCaregiverById(id: string): Promise<Caregiver | null> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("caregivers")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data as Caregiver;
  } catch {
    return null;
  }
}
