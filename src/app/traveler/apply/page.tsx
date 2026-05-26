import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TravelerApplyForm from "@/components/forms/TravelerApplyForm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "旅行者申込 | TravelWith",
  description: "介助サポートが必要な旅行者の申込フォームです。旅行先・日程・必要な介助内容をご記入ください。",
};

export default function TravelerApplyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">旅行者として申し込む</h1>
            <p className="text-blue-100 text-lg">
              旅行の計画・日程・必要なサポート内容をお知らせください。
              運営スタッフが最適なサポーターをご紹介します。
            </p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-sm text-blue-800">
            <strong>ご注意：</strong>
            お申込後、担当スタッフより3営業日以内にご登録のメールアドレスへご連絡いたします。
            入力内容に不明点がある場合はお電話する場合もございます。
          </div>
          <TravelerApplyForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
