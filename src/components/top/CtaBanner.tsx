import { Link } from "@/i18n/navigation";

export default async function CtaBanner() {
  return (
    <section className="py-16 bg-satsuma-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
          あなたにぴったりの使い方を見つけよう
        </h2>
        <p className="text-satsuma-100/80 text-base mb-10 max-w-xl mx-auto leading-relaxed">
          旅行を楽しみたい方も、誰かの旅を支えたい方も、まずは気軽にご連絡ください。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/traveler/apply"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-white text-satsuma-700 font-bold text-base rounded-xl hover:bg-satsuma-50 transition-colors shadow-md"
          >
            旅行を申し込む（無料相談）
          </Link>
          <Link
            href="/supporter/register"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-transparent border-2 border-white text-white font-bold text-base rounded-xl hover:bg-white/10 transition-colors"
          >
            介助者として登録する
          </Link>
        </div>
      </div>
    </section>
  );
}
