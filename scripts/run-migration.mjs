const TOKEN = "sbp_b729be981057520d28799bb87ba914e8497a21ca";
const PROJECT = "fdvcadbdgxuwpmkzhvjy";
const API = `https://api.supabase.com/v1/projects/${PROJECT}/database/query`;

async function runSQL(sql) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  const text = await res.text();
  if (!res.ok) return { error: text };
  return { ok: true, data: text };
}

const migrations = [
  {
    name: "tour_products テーブル作成",
    sql: `
      CREATE TABLE IF NOT EXISTS public.tour_products (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title text NOT NULL,
        description text,
        itinerary jsonb NOT NULL DEFAULT '[]',
        duration_days integer NOT NULL DEFAULT 1,
        price_base integer NOT NULL DEFAULT 0,
        price_supporter integer NOT NULL DEFAULT 0,
        barrier_free_info jsonb NOT NULL DEFAULT '{}',
        area text,
        max_participants integer DEFAULT 4,
        status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `,
  },
  {
    name: "reservations テーブル作成",
    sql: `
      CREATE TABLE IF NOT EXISTS public.reservations (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        tour_product_id uuid REFERENCES public.tour_products(id) ON DELETE SET NULL,
        traveler_name text NOT NULL,
        traveler_email text NOT NULL,
        traveler_phone text,
        travel_date date NOT NULL,
        participants integer NOT NULL DEFAULT 1,
        supporters_needed integer NOT NULL DEFAULT 1,
        special_needs text,
        status text NOT NULL DEFAULT 'inquiry' CHECK (status IN ('inquiry','confirmed','cancelled','completed')),
        notes text,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `,
  },
  {
    name: "updated_at トリガー関数",
    sql: `
      CREATE OR REPLACE FUNCTION public.set_updated_at()
      RETURNS trigger LANGUAGE plpgsql AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $$
    `,
  },
  {
    name: "tour_products トリガー",
    sql: `
      DROP TRIGGER IF EXISTS set_tour_products_updated_at ON public.tour_products;
      CREATE TRIGGER set_tour_products_updated_at
        BEFORE UPDATE ON public.tour_products
        FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()
    `,
  },
  {
    name: "reservations トリガー",
    sql: `
      DROP TRIGGER IF EXISTS set_reservations_updated_at ON public.reservations;
      CREATE TRIGGER set_reservations_updated_at
        BEFORE UPDATE ON public.reservations
        FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()
    `,
  },
  {
    name: "サンプル: 指宿砂むし温泉プラン",
    sql: `
      INSERT INTO public.tour_products (title, description, itinerary, duration_days, price_base, price_supporter, barrier_free_info, area, status)
      SELECT
        '指宿砂むし温泉 日帰りプラン',
        '鹿児島が誇る指宿の砂むし温泉を、車椅子の方も安心してお楽しみいただけます。福祉車両でのお迎えから、バリアフリー対応の温泉施設まで、専門スタッフがサポートします。',
        '[{"day":1,"time":"09:00","place":"鹿児島市内 出発（ご自宅または指定場所）","note":"福祉車両でお迎えします"},{"day":1,"time":"11:00","place":"指宿 砂むし温泉","note":"車椅子対応あり・着替えサポート可"},{"day":1,"time":"13:00","place":"昼食（バリアフリー対応食堂）","note":"食事介助が必要な方もお申し付けください"},{"day":1,"time":"15:00","place":"帰路","note":""},{"day":1,"time":"17:00","place":"鹿児島市内 解散","note":""}]',
        1, 18000, 15000,
        '{"wheelchair":true,"medical_equipment":true,"welfare_vehicle":true,"meal_support":true}',
        '鹿児島県',
        'published'
      WHERE NOT EXISTS (SELECT 1 FROM public.tour_products WHERE title = '指宿砂むし温泉 日帰りプラン')
    `,
  },
  {
    name: "サンプル: 桜島半日観光プラン",
    sql: `
      INSERT INTO public.tour_products (title, description, itinerary, duration_days, price_base, price_supporter, barrier_free_info, area, status)
      SELECT
        '桜島 半日観光プラン',
        '雄大な桜島を、安心してご見学いただけるプランです。展望台や溶岩なぎさ公園など、バリアフリー対応スポットを中心に巡ります。',
        '[{"day":1,"time":"09:00","place":"鹿児島市内 出発","note":""},{"day":1,"time":"09:30","place":"桜島フェリー乗船","note":"車椅子対応フェリーで移動"},{"day":1,"time":"10:00","place":"湯之平展望所","note":"バリアフリー駐車場あり"},{"day":1,"time":"11:00","place":"溶岩なぎさ公園","note":"舗装された遊歩道・足湯あり"},{"day":1,"time":"12:30","place":"鹿児島市内 解散","note":""}]',
        1, 12000, 15000,
        '{"wheelchair":true,"medical_equipment":false,"welfare_vehicle":true,"meal_support":false}',
        '鹿児島県',
        'published'
      WHERE NOT EXISTS (SELECT 1 FROM public.tour_products WHERE title = '桜島 半日観光プラン')
    `,
  },
];

console.log("🚀 マイグレーション開始\n");

let success = 0;
for (const m of migrations) {
  const result = await runSQL(m.sql.trim());
  if (result.error) {
    console.log(`❌ ${m.name}`);
    console.log(`   ${JSON.parse(result.error)?.message ?? result.error}\n`);
  } else {
    console.log(`✅ ${m.name}`);
    success++;
  }
}

console.log(`\n${success}/${migrations.length} 完了`);

// 確認
const check = await runSQL("SELECT count(*) FROM public.tour_products");
if (!check.error) {
  const count = JSON.parse(check.data)[0].count;
  console.log(`✅ tour_products テーブル確認OK（${count}件）`);
}
