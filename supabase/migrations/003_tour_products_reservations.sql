-- 旅行商品テーブル
create table if not exists public.tour_products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  itinerary jsonb not null default '[]',  -- [{day:1, time:"09:00", place:"...", note:"..."}]
  duration_days integer not null default 1,
  price_base integer not null default 0,   -- 基本料金（円）
  price_supporter integer not null default 0, -- サポーター1名あたり追加料金（円）
  barrier_free_info jsonb not null default '{}', -- {wheelchair:true, medical_equipment:true, ...}
  area text,                               -- 例: "鹿児島県"
  max_participants integer default 4,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 予約テーブル
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  tour_product_id uuid references public.tour_products(id) on delete set null,
  traveler_name text not null,
  traveler_email text not null,
  traveler_phone text,
  travel_date date not null,
  participants integer not null default 1,
  supporters_needed integer not null default 1,
  special_needs text,
  status text not null default 'inquiry' check (status in ('inquiry','confirmed','cancelled','completed')),
  assigned_caregiver_id uuid references public.caregivers(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- updated_at 自動更新トリガー
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_tour_products_updated_at on public.tour_products;
create trigger set_tour_products_updated_at
  before update on public.tour_products
  for each row execute function public.set_updated_at();

drop trigger if exists set_reservations_updated_at on public.reservations;
create trigger set_reservations_updated_at
  before update on public.reservations
  for each row execute function public.set_updated_at();

-- サンプルデータ（開発用）
insert into public.tour_products (title, description, itinerary, duration_days, price_base, price_supporter, barrier_free_info, area, status)
values (
  '指宿砂むし温泉 日帰りプラン',
  '鹿児島が誇る指宿の砂むし温泉を、車椅子の方も安心してお楽しみいただけます。福祉車両でのお迎えから、バリアフリー対応の温泉施設まで、専門スタッフがサポートします。',
  '[
    {"day":1,"time":"09:00","place":"鹿児島市内 出発（ご自宅または指定場所）","note":"福祉車両でお迎えします"},
    {"day":1,"time":"11:00","place":"指宿 砂むし温泉「砂楽」","note":"車椅子対応あり・着替えサポート可"},
    {"day":1,"time":"13:00","place":"昼食（指宿周辺のバリアフリー対応食堂）","note":"食事介助が必要な方もお申し付けください"},
    {"day":1,"time":"15:00","place":"帰路","note":""},
    {"day":1,"time":"17:00","place":"鹿児島市内 解散","note":""}
  ]',
  1,
  18000,
  15000,
  '{"wheelchair":true,"medical_equipment":true,"welfare_vehicle":true,"meal_support":true}',
  '鹿児島県',
  'published'
),
(
  '桜島 半日観光プラン',
  '雄大な桜島を、安心してご見学いただけるプランです。展望台や溶岩なぎさ公園など、バリアフリー対応スポットを中心に巡ります。',
  '[
    {"day":1,"time":"09:00","place":"鹿児島市内 出発","note":""},
    {"day":1,"time":"09:30","place":"桜島フェリー乗船","note":"車椅子対応フェリーで移動"},
    {"day":1,"time":"10:00","place":"湯之平展望所","note":"桜島最高の眺望・バリアフリー駐車場あり"},
    {"day":1,"time":"11:00","place":"溶岩なぎさ公園","note":"舗装された遊歩道・足湯あり"},
    {"day":1,"time":"12:30","place":"鹿児島市内 解散","note":""}
  ]',
  1,
  12000,
  15000,
  '{"wheelchair":true,"medical_equipment":false,"welfare_vehicle":true,"meal_support":false}',
  '鹿児島県',
  'published'
);
