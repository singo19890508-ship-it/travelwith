import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "整体院だいふく｜出張・イベント専門 鹿児島",
  description:
    "施術歴18年。頭痛・肩こり・腰痛・疲労感・手足の冷えにお悩みの方へ。他で良くならなかった方を、ピンポイントで改善します。全額返金保証あり。",
};

export default function SeitaiPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-800">

      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-20 px-6 text-center">
        <p className="text-sm tracking-widest text-amber-600 font-medium mb-4">
          出張・イベント専門｜鹿児島
        </p>
        <h1 className="text-3xl md:text-5xl font-bold leading-snug mb-6">
          他で良くならなかった方へ。<br />
          <span className="text-amber-600">施術歴18年</span>の整体で、<br />
          その日に変化を実感してください。
        </h1>
        <p className="text-gray-500 text-base md:text-lg mb-10 max-w-xl mx-auto">
          整体院だいふくは、出張・イベント専門の整体院です。<br />
          身体の歪みやコリをピンポイントで改善。効果を感じなければ<strong>全額返金</strong>いたします。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.instagram.com/singo_58?igsh=ZHFrbjk1eHBhcDhz"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-500 to-amber-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:opacity-90 transition"
          >
            Instagramから予約する
          </a>
          <a
            href="https://lin.ee/QRuQHRF"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:opacity-90 transition"
          >
            公式LINEから予約する
          </a>
        </div>
      </section>

      {/* こんな症状に */}
      <section className="py-16 px-6 bg-amber-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            こんなお悩み、ありませんか？
          </h2>
          <p className="text-gray-500 mb-10">当てはまる方はぜひ一度ご相談ください。</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "🤕", label: "頭痛が続く" },
              { icon: "😣", label: "肩こりが取れない" },
              { icon: "🔻", label: "腰痛で動きづらい" },
              { icon: "😴", label: "慢性的な疲労感" },
              { icon: "🥶", label: "手足の冷え" },
              { icon: "🏥", label: "病院・他の院で\n良くならなかった" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl shadow-sm py-6 px-4 text-center"
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <p className="text-sm font-medium whitespace-pre-line text-gray-700">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 選ばれる理由 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">整体院だいふくが選ばれる理由</h2>
          <p className="text-gray-500 mb-10">3つの安心をお届けします。</p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-amber-50 rounded-2xl p-6">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold text-lg mb-2">施術歴18年の経験</h3>
              <p className="text-gray-600 text-sm">
                長年の実績から、身体の歪みやコリの原因をピンポイントで特定。1回の施術で変化を実感していただけます。
              </p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-6">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-lg mb-2">即効性のある施術</h3>
              <p className="text-gray-600 text-sm">
                「やっと楽になった」と感じていただけるよう、効果を実感できる施術にこだわっています。長引かせません。
              </p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-6">
              <div className="text-4xl mb-3">💯</div>
              <h3 className="font-bold text-lg mb-2">全額返金保証</h3>
              <p className="text-gray-600 text-sm">
                効果を全く感じなかった場合は全額返金いたします。それだけ施術に自信があります。安心してお越しください。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* メニュー・料金 */}
      <section className="py-16 px-6 bg-stone-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">メニュー・料金</h2>
          <p className="text-gray-500 mb-10">施術時間：約40分（状態に応じて前後します）</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-8 border-t-4 border-amber-400">
              <h3 className="text-xl font-bold mb-2">全身整体</h3>
              <p className="text-gray-500 text-sm mb-4">
                全身の歪みをリセット。肩こり・腰痛・疲労感に。
              </p>
              <p className="text-3xl font-bold text-amber-600">
                ¥5,000
                <span className="text-base text-gray-400 font-normal ml-1">（税込）</span>
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-8 border-t-4 border-pink-400">
              <h3 className="text-xl font-bold mb-2">小顔矯正</h3>
              <p className="text-gray-500 text-sm mb-4">
                顔の歪みを整え、むくみやフェイスラインを改善。
              </p>
              <p className="text-3xl font-bold text-pink-500">
                ¥5,000
                <span className="text-base text-gray-400 font-normal ml-1">（税込）</span>
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            ※ 出張・イベント専門のため、サロンへのご来店はできません。
          </p>
        </div>
      </section>

      {/* こんな方へ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">こんな方に来てほしい</h2>
          <p className="text-gray-500 mb-10">あきらめないでください。まず一度、ご相談を。</p>
          <div className="bg-amber-50 rounded-2xl p-8 text-left space-y-4">
            {[
              "病院に行っても「異常なし」と言われた",
              "マッサージに通っても、すぐに戻ってしまう",
              "他の整体・治療院で良くならなかった",
              "身体のだるさや疲れが取れない",
              "頭痛・肩こり・腰痛が慢性化している",
            ].map((text) => (
              <div key={text} className="flex items-start gap-3">
                <span className="text-amber-500 text-xl mt-0.5">✓</span>
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-gray-600 text-sm md:text-base">
            「どうせ良くならない」と思っていませんか？<br />
            そんな方ほど、施術後に「こんなに変わるんだ」と驚いていただけます。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-amber-50 to-amber-100 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          まずは気軽にご相談ください
        </h2>
        <p className="text-gray-600 mb-10 max-w-md mx-auto">
          予約はInstagramまたは公式LINEから。<br />
          定休日は不定休のため、お早めにご確認ください。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.instagram.com/singo_58?igsh=ZHFrbjk1eHBhcDhz"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-500 to-amber-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:opacity-90 transition"
          >
            📷 Instagramから予約
          </a>
          <a
            href="https://lin.ee/QRuQHRF"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:opacity-90 transition"
          >
            💬 公式LINEから予約
          </a>
        </div>
        <p className="mt-8 text-xs text-gray-400">
          整体院だいふく｜鹿児島｜出張・イベント専門
        </p>
      </section>

    </main>
  );
}
