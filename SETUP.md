# TravelWith セットアップガイド

## 前提条件

- Node.js 18以上
- npmまたはpnpm
- Supabaseアカウント
- Vercelアカウント（デプロイ時）

---

## 1. 依存パッケージのインストール

```bash
npm install
```

---

## 2. Supabaseのセットアップ

### 2-1. プロジェクト作成
1. [Supabase](https://supabase.com) にアクセスしてサインイン
2. 「New Project」からプロジェクトを作成

### 2-2. テーブル作成
1. Supabaseダッシュボードの「SQL Editor」を開く
2. `supabase/migrations/001_initial_schema.sql` の内容をコピー&ペースト
3. 「Run」をクリック

### 2-3. APIキーの取得
1. Supabaseダッシュボードの「Project Settings」→「API」を開く
2. 以下の値をメモ：
   - `Project URL`
   - `anon public` キー
   - `service_role` キー（非公開・サーバーサイドのみ）

---

## 3. 環境変数の設定

プロジェクトルートに `.env.local` を作成：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 4. ローカル開発

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開く。

### 各ページのURL

| ページ | URL |
|--------|-----|
| トップページ | http://localhost:3000 |
| 旅行者申込 | http://localhost:3000/traveler/apply |
| サポーター登録 | http://localhost:3000/supporter/register |
| 管理画面 | http://localhost:3000/admin |
| 申込一覧 | http://localhost:3000/admin/travelers |
| サポーター一覧 | http://localhost:3000/admin/supporters |

---

## 5. Vercelへのデプロイ

### 5-1. Vercel CLIでデプロイ
```bash
npm install -g vercel
vercel
```

### 5-2. 環境変数の設定
Vercelダッシュボードの「Settings」→「Environment Variables」に以下を追加：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 5-3. GitHubと連携（推奨）
1. GitHubにリポジトリを作成してプッシュ
2. Vercelダッシュボードで「Import Project」からGitHubリポジトリを選択
3. 環境変数を設定して「Deploy」

---

## 6. 管理画面へのアクセス

現在のMVPでは管理画面は認証なしで `/admin` にアクセスできます。

本番環境では以下のいずれかの認証を追加してください：
- **推奨**: Supabase Auth + Next.js Middleware で保護
- **簡易**: Vercel Password Protection（有料プラン）
- **簡易**: Basic認証をMiddlewareで実装

---

## 7. 技術スタック

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Next.js | 15 | フレームワーク（App Router） |
| TypeScript | 5 | 型安全 |
| Tailwind CSS | 3 | スタイリング |
| Supabase | latest | DB・認証 |
| react-hook-form | 7 | フォーム管理 |
| Zod | 3 | バリデーション |
| Vercel | - | ホスティング |

---

## 8. 今後の拡張予定（MVP以降）

- [ ] Supabase Auth による管理画面認証
- [ ] 旅行者・サポーターへの自動返信メール（Resend or SendGrid）
- [ ] 申込詳細ページ（管理画面）
- [ ] ステータス変更UI（管理画面から直接操作）
- [ ] マッチング管理機能
- [ ] 旅行者・サポーター間のメッセージ機能
- [ ] 国際化（i18n）対応
