import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_TO = "daifuku@corekara-support.com";
const FROM = "FUKU-TABI <noreply@fuku-tabi.com>";

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  inquiry_type: string;
  message: string;
  travel_plan?: string;
  support_needs?: string;
}) {
  const typeLabel: Record<string, string> = {
    use: "旅行のご相談・利用",
    join: "サポーターとして参加",
    other: "その他",
  };

  await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    subject: `【お問い合わせ】${data.name}様より（${typeLabel[data.inquiry_type] ?? data.inquiry_type}）`,
    text: `
お問い合わせがありました。

■ お名前：${data.name}
■ メール：${data.email}
■ 電話番号：${data.phone || "未入力"}
■ お問い合わせ種別：${typeLabel[data.inquiry_type] ?? data.inquiry_type}
■ 旅行プラン：${data.travel_plan || "未入力"}
■ 必要なサポート：${data.support_needs || "未入力"}
■ メッセージ：
${data.message}

---
FUKU-TABI 管理システム
`.trim(),
  });
}

export async function sendTravelerNotification(data: {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travel_start_date: string;
  travel_end_date: string;
  disability_types: string[];
}) {
  await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    subject: `【旅行申込】${data.name}様より`,
    text: `
旅行サポートの申込がありました。

■ お名前：${data.name}
■ メール：${data.email}
■ 電話番号：${data.phone}
■ 旅行先：${data.destination}
■ 旅行期間：${data.travel_start_date} 〜 ${data.travel_end_date}
■ 障害・状況：${data.disability_types.join("、")}

管理画面で詳細を確認してください：
https://fuku-tabi.com/admin/travelers

---
FUKU-TABI 管理システム
`.trim(),
  });
}

export async function sendSupporterNotification(data: {
  name: string;
  email: string;
  phone: string;
  qualifications: string[];
  experience_years: number | string;
}) {
  await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    subject: `【サポーター登録】${data.name}様より`,
    text: `
サポーター登録がありました。

■ お名前：${data.name}
■ メール：${data.email}
■ 電話番号：${data.phone}
■ 資格：${data.qualifications.join("、") || "なし"}
■ 経験年数：${data.experience_years}

管理画面で詳細を確認してください：
https://fuku-tabi.com/admin/supporters

---
FUKU-TABI 管理システム
`.trim(),
  });
}
