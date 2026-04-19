-- ============================================================
-- FUKU-TABI - 初期スキーマ
-- Supabaseダッシュボードの SQL Editor に貼り付けて実行してください
-- ============================================================

-- updated_at 自動更新トリガー関数
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 旅行者申込テーブル
-- ============================================================
CREATE TABLE IF NOT EXISTS traveler_applications (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 基本情報
  name                  TEXT NOT NULL,
  name_kana             TEXT NOT NULL,
  email                 TEXT NOT NULL,
  phone                 TEXT NOT NULL,
  birth_date            DATE NOT NULL,
  gender                TEXT NOT NULL
                        CHECK (gender IN ('male','female','other','no_answer')),

  -- 障害・支援ニーズ
  disability_types      TEXT[] NOT NULL DEFAULT '{}',
  mobility_level        TEXT NOT NULL
                        CHECK (mobility_level IN (
                          'wheelchair_full',
                          'wheelchair_partial',
                          'walking_aid',
                          'independent'
                        )),
  required_supports     TEXT[] NOT NULL DEFAULT '{}',
  medical_notes         TEXT,

  -- 旅行情報
  destination           TEXT NOT NULL,
  travel_start_date     DATE NOT NULL,
  travel_end_date       DATE NOT NULL,
  travel_nights         INTEGER GENERATED ALWAYS AS (travel_end_date - travel_start_date) STORED,
  travel_purpose        TEXT,
  accommodation_type    TEXT
                        CHECK (accommodation_type IS NULL OR accommodation_type IN (
                          'hotel','ryokan','guesthouse','rental','undecided'
                        )),
  budget_range          TEXT
                        CHECK (budget_range IS NULL OR budget_range IN (
                          'under_30k','30k_50k','50k_100k','over_100k','undecided'
                        )),

  -- サポーター希望条件
  supporter_gender_pref TEXT
                        CHECK (supporter_gender_pref IS NULL OR supporter_gender_pref IN (
                          'male','female','no_preference'
                        )),
  supporter_age_pref    TEXT,
  message_to_supporter  TEXT,

  -- 管理情報
  status                TEXT NOT NULL DEFAULT 'pending'
                        CHECK (status IN (
                          'pending','reviewing','matched','completed','cancelled'
                        )),
  admin_memo            TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER traveler_applications_updated_at
  BEFORE UPDATE ON traveler_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS設定
ALTER TABLE traveler_applications ENABLE ROW LEVEL SECURITY;

-- 誰でもINSERT可能（フォームから投稿）
CREATE POLICY "anyone_can_insert_traveler"
  ON traveler_applications FOR INSERT
  WITH CHECK (true);

-- 認証済みユーザーのみSELECT可能（管理画面）
-- ※ MVPでは service_role key 使用のため、RLSをバイパスします
-- 本番環境では適切な認証ポリシーを設定してください
CREATE POLICY "authenticated_can_select_traveler"
  ON traveler_applications FOR SELECT
  USING (true); -- 開発用：全件参照可。本番: auth.role() = 'authenticated'

CREATE POLICY "authenticated_can_update_traveler"
  ON traveler_applications FOR UPDATE
  USING (true); -- 開発用。本番: auth.role() = 'authenticated'

-- ============================================================
-- サポーター登録テーブル
-- ============================================================
CREATE TABLE IF NOT EXISTS supporter_registrations (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 基本情報
  name                  TEXT NOT NULL,
  name_kana             TEXT NOT NULL,
  email                 TEXT NOT NULL,
  phone                 TEXT NOT NULL,
  birth_date            DATE NOT NULL,
  gender                TEXT NOT NULL
                        CHECK (gender IN ('male','female','other','no_answer')),
  prefecture            TEXT NOT NULL,
  occupation            TEXT,

  -- 資格・経験
  qualifications        TEXT[] NOT NULL DEFAULT '{}',
  experience_years      INTEGER NOT NULL DEFAULT 0,
  experience_details    TEXT,
  available_supports    TEXT[] NOT NULL DEFAULT '{}',

  -- 対応可能条件
  available_traveler_gender TEXT
                        CHECK (available_traveler_gender IS NULL OR available_traveler_gender IN (
                          'male','female','no_preference'
                        )),
  available_regions     TEXT[] NOT NULL DEFAULT '{}',
  available_period_from DATE,
  available_period_to   DATE,
  available_duration    TEXT
                        CHECK (available_duration IS NULL OR available_duration IN (
                          'day_trip','1_2_nights','3_5_nights','week_or_more','flexible'
                        )),

  -- 動機・自己PR
  motivation            TEXT NOT NULL,
  self_introduction     TEXT,
  emergency_contact     TEXT,

  -- 同意事項
  agreed_to_terms       BOOLEAN NOT NULL DEFAULT FALSE,
  agreed_at             TIMESTAMPTZ,

  -- 管理情報
  status                TEXT NOT NULL DEFAULT 'pending'
                        CHECK (status IN (
                          'pending','active','inactive','rejected'
                        )),
  admin_memo            TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER supporter_registrations_updated_at
  BEFORE UPDATE ON supporter_registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS設定
ALTER TABLE supporter_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone_can_insert_supporter"
  ON supporter_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "authenticated_can_select_supporter"
  ON supporter_registrations FOR SELECT
  USING (true); -- 開発用。本番: auth.role() = 'authenticated'

CREATE POLICY "authenticated_can_update_supporter"
  ON supporter_registrations FOR UPDATE
  USING (true); -- 開発用。本番: auth.role() = 'authenticated'

-- ============================================================
-- 動作確認用クエリ（コメントアウト）
-- ============================================================
-- SELECT * FROM traveler_applications ORDER BY created_at DESC;
-- SELECT * FROM supporter_registrations ORDER BY created_at DESC;
