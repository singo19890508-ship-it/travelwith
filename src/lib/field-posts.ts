import { createServiceClient } from "@/lib/supabase/server";

export interface FieldPost {
  id: string;
  title: string;
  body: string;
  image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function getPublishedPosts(): Promise<FieldPost[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("field_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (error) throw error;
    return (data as FieldPost[]) ?? [];
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<FieldPost[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("field_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as FieldPost[]) ?? [];
  } catch {
    return [];
  }
}

export async function getPostById(id: string): Promise<FieldPost | null> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("field_posts")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data as FieldPost;
  } catch {
    return null;
  }
}

export async function createPost(input: {
  title: string;
  body: string;
  image_url?: string;
  published: boolean;
}): Promise<{ id: string } | null> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("field_posts")
      .insert({
        ...input,
        published_at: input.published ? new Date().toISOString() : null,
      })
      .select("id")
      .single();
    if (error) throw error;
    return data as { id: string };
  } catch {
    return null;
  }
}

export async function updatePost(
  id: string,
  input: {
    title?: string;
    body?: string;
    image_url?: string | null;
    published?: boolean;
  },
): Promise<boolean> {
  try {
    const supabase = createServiceClient();
    const updates: Record<string, unknown> = {
      ...input,
      updated_at: new Date().toISOString(),
    };
    if (input.published === true) {
      updates.published_at = new Date().toISOString();
    }
    const { error } = await supabase
      .from("field_posts")
      .update(updates)
      .eq("id", id);
    if (error) throw error;
    return true;
  } catch {
    return false;
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from("field_posts").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch {
    return false;
  }
}
