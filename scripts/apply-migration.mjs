// contact_inquiries テーブルを作成するスクリプト
// 実行: node scripts/apply-migration.mjs

const SUPABASE_URL = 'https://fdvcadbdgxuwpmkzhvjy.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkdmNhZGJkZ3h1d3Bta3podmp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg4MzU2NCwiZXhwIjoyMDkwNDU5NTY0fQ.WmeVZaLAZTQRocrBCHqkqelLct0Aqf7eQN3ZlcR6xo8';

// Supabase Edge Functions を使って SQL を実行（pg_graphql 経由）
// SupabaseのREST APIを通じてPostgres関数を使いテーブル作成

async function checkTableExists() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_inquiries?limit=1`, {
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    }
  });
  return res.status !== 404 && res.status !== 406;
}

async function main() {
  console.log('Checking if contact_inquiries table exists...');

  // テーブルが既に存在するか確認
  const exists = await checkTableExists();
  if (exists) {
    console.log('✅ Table contact_inquiries already exists!');
    return;
  }

  console.log('Table does not exist. Please run the following SQL in Supabase SQL Editor:');
  console.log('');
  console.log('Go to: https://supabase.com/dashboard/project/fdvcadbdgxuwpmkzhvjy/sql/new');
  console.log('');
  console.log('--- SQL START ---');
  console.log(`CREATE TABLE IF NOT EXISTS contact_inquiries (
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

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON contact_inquiries
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anon insert only" ON contact_inquiries
  FOR INSERT TO anon
  WITH CHECK (true);`);
  console.log('--- SQL END ---');
}

main().catch(console.error);
