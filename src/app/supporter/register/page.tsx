import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SupporterRegisterForm from "@/components/forms/SupporterRegisterForm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "サポーター登録 | FUKU-TABI",
  description: "介助サポーターの登録フォームです。旅行者のサポートができる方のご登録をお待ちしています。",
};

export default function SupporterRegisterPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-green-600 to-teal-500 text-white py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              サポーターとして登録する
            </h1>
            <p className="text-green-100 text-lg">
              あなたの介助スキルで、旅に出られない人の夢を一緒に叶えませんか。
              資格・経験・活動可能な地域をご登録ください。
            </p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 text-sm text-green-800">
            <strong>ご確認ください：</strong>
            ご登録後、スタッフによる審査（資格確認・面談）を行います。
            審査完了後にサポーターとして活動を開始できます（通常3〜5営業日）。
          </div>
          <SupporterRegisterForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
