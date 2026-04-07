-- caregivers テーブル作成
CREATE TABLE IF NOT EXISTS caregivers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  nickname text,
  photo text,
  gender text NOT NULL DEFAULT 'female' CHECK (gender IN ('male', 'female')),
  age_range text NOT NULL DEFAULT '30代',
  qualifications text[] DEFAULT '{}',
  experience_summary text DEFAULT '',
  support_types text[] DEFAULT '{}',
  regions text[] DEFAULT '{}',
  training_completed boolean DEFAULT false,
  message text DEFAULT '',
  detail_message text DEFAULT '',
  hobbies text,
  notes text,
  available boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- updated_at 自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER caregivers_updated_at
  BEFORE UPDATE ON caregivers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 既存データの投入
INSERT INTO caregivers (slug, name, photo, gender, age_range, qualifications, experience_summary, support_types, regions, training_completed, message, detail_message, hobbies, notes, available, sort_order) VALUES
(
  'tanaka-hanako', '田中 花子', null, 'female', '30代',
  ARRAY['介護福祉士', '普通自動車免許'],
  '介護施設での勤務経験7年。車椅子ユーザーの方との旅行同行実績あり。',
  ARRAY['wheelchair', 'walking', 'meal', 'restroom', 'luggage', 'transportation'],
  ARRAY['鹿児島市内', '薩摩半島'],
  true,
  '旅行をあきらめていた方の「行けた！」という笑顔が、私の一番の喜びです。',
  '介護施設での7年間の経験をもとに、旅行同行のサービスに携わっています。「旅をしたいけど、一人では不安」という方のそばに寄り添い、安心して旅を楽しんでいただけるよう丁寧にサポートします。旅行前の打ち合わせをしっかり行い、ご本人のペースに合わせた旅を一緒に作ります。',
  '国内旅行、料理',
  '医療的ケアが必要な場合は事前にご相談ください。',
  true, 1
),
(
  'yamamoto-kenji', '山本 健二', null, 'male', '40代',
  ARRAY['ホームヘルパー2級', '普通自動車免許'],
  '訪問介護10年以上。高齢者・肢体不自由の方の外出支援に多数携わってきた。',
  ARRAY['wheelchair', 'walking', 'luggage', 'transportation', 'medication'],
  ARRAY['鹿児島市内', '薩摩半島', '大隅半島'],
  true,
  '長年の外出支援の経験で、どんな場所でも安全にサポートできます。一緒に新しい景色を見に行きましょう。',
  '訪問介護の現場で10年以上、高齢者や肢体不自由の方の外出支援をしてきました。バリアフリー情報の調査も得意で、旅先での動きやすいルートを事前に確認して安心の旅をご提供します。体力には自信があり、長距離の移動も安心してお任せください。',
  'ドライブ、登山',
  null,
  true, 2
),
(
  'nakamura-yuki', '中村 由紀', null, 'female', '20代',
  ARRAY['看護師', '普通自動車免許'],
  '病院での看護師経験3年。医療的な観点からのサポートが得意。',
  ARRAY['walking', 'meal', 'medication', 'communication', 'restroom'],
  ARRAY['鹿児島市内'],
  true,
  '医療の知識を活かして、健康面が心配な方も安心してご旅行いただけるよう全力でサポートします。',
  '看護師として病院勤務の経験があり、健康管理や緊急時の対応に安心感をお伝えできます。「持病があるから旅行は難しい」とあきらめている方も、ぜひご相談ください。体調管理をしながら、無理のない旅程を一緒に考えます。',
  '温泉めぐり、読書',
  '医療的ケアの同行については事前相談が必要です。',
  true, 3
),
(
  'sato-hiroshi', '佐藤 大', null, 'male', '50代',
  ARRAY['介護福祉士', '社会福祉士', '普通自動車免許'],
  '社会福祉の現場20年。多様な障がいのある方の外出・旅行支援の豊富な経験。',
  ARRAY['wheelchair', 'walking', 'visual', 'communication', 'luggage', 'transportation'],
  ARRAY['鹿児島市内', '薩摩半島', '大隅半島', '全県対応'],
  true,
  'どんな状況でも「旅を楽しむ権利」はすべての人にある、と信じています。一緒に素敵な旅を作りましょう。',
  '社会福祉の現場で20年間、さまざまな障がいをお持ちの方の生活・外出支援に携わってきました。視覚障がいや重度肢体不自由の方の旅行同行も経験豊富です。鹿児島県内であればどこでも対応可能で、離島への旅行同行の実績もあります。旅を通じて「できた」という経験を一緒に積み重ねましょう。',
  '写真撮影、鹿児島の郷土料理',
  null,
  true, 4
),
(
  'kawano-miho', '川野 美穂', null, 'female', '30代',
  ARRAY['手話通訳士', '普通自動車免許'],
  '手話通訳士として聴覚障がいのある方のコミュニケーション支援に特化。',
  ARRAY['communication', 'luggage', 'transportation', 'walking'],
  ARRAY['鹿児島市内', '薩摩半島'],
  true,
  '聴覚に障がいのある方が旅先でも安心してコミュニケーションできるよう、丁寧に通訳・サポートします。',
  '手話通訳士として10年、聴覚障がいのある方のさまざまな場面でのコミュニケーション支援を行ってきました。旅行中は観光地でのガイド通訳・ホテルでのやりとり・交通機関での案内など、あらゆる場面でスムーズにコミュニケーションが取れるよう支援します。',
  '手話劇、旅行',
  null,
  true, 5
),
(
  'ishida-tomoko', '石田 友子', null, 'female', '40代',
  ARRAY['ホームヘルパー1級', '普通自動車免許'],
  '15年の介護経験。奄美大島在住で離島旅行の同行が得意。',
  ARRAY['wheelchair', 'walking', 'meal', 'restroom', 'luggage'],
  ARRAY['奄美大島', '離島・その他'],
  true,
  '奄美の自然の中でゆったりとした旅を。離島特有の移動も熟知しています。',
  '奄美大島在住で、島内の地理・バリアフリー情報・フェリーの利用方法など、離島旅行に必要な知識を豊富に持っています。「離島に行きたいけど難しそう」という方も、事前にしっかり準備してご案内します。奄美の海・自然・食を、一緒に楽しみましょう。',
  'シュノーケリング、三線',
  null,
  true, 6
)
ON CONFLICT (slug) DO NOTHING;

-- RLS（Row Level Security）設定 — 読み取りは全員、書き込みはサービスロールのみ
ALTER TABLE caregivers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "caregivers_read_all" ON caregivers
  FOR SELECT USING (true);

CREATE POLICY "caregivers_write_service" ON caregivers
  FOR ALL USING (auth.role() = 'service_role');
