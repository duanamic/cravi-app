export interface User {
  id: string;
  instagram_handle: string | null;
  created_at: string;
}

export interface Recipe {
  id: string;
  user_id: string;
  title: string;
  image_url: string | null;
  source_url: string | null;
  platform: "instagram" | "tiktok" | "other" | null;
  ingredients: string[] | null;
  steps: string[] | null;
  tags: string[] | null;
  prep_time: string | null;
  created_at: string;
}
