-- お問い合わせテーブル
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  inquiry_type text NOT NULL DEFAULT 'use',
  travel_plan text,
  support_needs text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- RLS有効化
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- service_roleのみアクセス可（管理者のみ閲覧）
CREATE POLICY "Service role full access" ON contact_inquiries
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- 匿名ユーザーはINSERTのみ可（フォーム送信）
CREATE POLICY "Anon insert only" ON contact_inquiries
  FOR INSERT TO anon
  WITH CHECK (true);
