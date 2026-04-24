/**
 * 施術用英会話フレーズ集をGoogleドキュメントに保存
 * 実行: node scripts/create-phrase-doc.js
 */

const { google } = require("googleapis");
const { readFileSync } = require("fs");
const path = require("path");

const CREDENTIALS_PATH =
  "C:/Users/singo/.config/google-calendar-mcp/credentials.json";
const TOKENS_PATH = path.join(__dirname, "..", ".google-tokens.json");

const credentials = JSON.parse(readFileSync(CREDENTIALS_PATH, "utf-8"));
const { client_id, client_secret } = credentials.installed;

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  "http://localhost:3001/callback",
);

const tokens = JSON.parse(readFileSync(TOKENS_PATH, "utf-8"));
oauth2Client.setCredentials(tokens);

const sections = [
  {
    title: "1. お出迎え・カウンセリング",
    phrases: [
      [
        "担当のふくだです。よろしくお願いします。",
        "Hello, I'm Shingo Fukuda. I will be your therapist today. Nice to meet you.",
        "ハロー、アイム シンゴ フクダ。アイ ウィル ビー ユア セラピスト トゥデイ。ナイス トゥ ミート ユー。",
      ],
      [
        "マレアにお越しいただきありがとうございます。",
        "Welcome to Marea. Thank you for visiting us today.",
        "ウェルカム トゥ マレア。サンキュー フォー ビジティング アス トゥデイ。",
      ],
      [
        "お名前を伺ってもよろしいでしょうか？",
        "May I have your name, please?",
        "メイ アイ ハヴ ユア ネーム、プリーズ？",
      ],
      ["こちらへどうぞ。", "This way, please.", "ディス ウェイ、プリーズ。"],
      [
        "初めてのご利用ですか？",
        "Is this your first visit with us?",
        "イズ ディス ユア ファースト ビジット ウィズ アス？",
      ],
      [
        "お身体の辛いところはどこですか？",
        "Which areas are tight or sore?",
        "ウィッチ エリアズ アー タイト オア ソア？",
      ],
      [
        "どのようなお悩みがありますか？",
        "What are your main concerns today?",
        "ワット アー ユア メイン コンサーンズ トゥデイ？",
      ],
      [
        "アレルギーはありますか？",
        "Do you have any allergies?",
        "ドゥ ユー ハヴ エニー アラジーズ？",
      ],
      [
        "最近、手術や怪我はされましたか？",
        "Have you had any recent surgeries or injuries?",
        "ハヴ ユー ハド エニー リーセント サージャリーズ オア インジャリーズ？",
      ],
      ["妊娠中ですか？", "Are you pregnant?", "アー ユー プレグナント？"],
    ],
  },
  {
    title: "2. 施術のご説明",
    phrases: [
      [
        "本日は60分のドライマッサージです。",
        "Today's treatment is a 60-minute dry massage.",
        "トゥデイズ トリートメント イズ ア シックスティー ミニット ドライ マッサージ。",
      ],
      [
        "ドライマッサージはオイルを使わないマッサージです。",
        "Dry massage is performed without oil.",
        "ドライ マッサージ イズ パフォームド ウィザウト オイル。",
      ],
      [
        "着衣のままで受けていただけます。",
        "You can keep your clothes on.",
        "ユー キャン キープ ユア クローズ オン。",
      ],
      [
        "何かご不明な点はいつでもおっしゃってください。",
        "Please let me know if you have any questions at any time.",
        "プリーズ レット ミー ノウ イフ ユー ハヴ エニー クエスチョンズ アット エニー タイム。",
      ],
      [
        "では、はじめます。",
        "I'll begin now. Please relax.",
        "アイル ビギン ナウ。プリーズ リラックス。",
      ],
    ],
  },
  {
    title: "3. 体勢・動作のお願い",
    phrases: [
      ["座ってください。", "Please have a seat.", "プリーズ ハヴ ア シート。"],
      ["横になってください。", "Please lie down.", "プリーズ ライ ダウン。"],
      [
        "うつ伏せになってください。",
        "Please lie face down.",
        "プリーズ ライ フェイス ダウン。",
      ],
      [
        "仰向けになってください。",
        "Please lie face up.",
        "プリーズ ライ フェイス アップ。",
      ],
      [
        "逆向きになってください。",
        "Please turn over.",
        "プリーズ ターン オーバー。",
      ],
      [
        "起き上がって腰掛けてください。",
        "Please sit up.",
        "プリーズ シット アップ。",
      ],
      ["立ってください。", "Please stand up.", "プリーズ スタンド アップ。"],
      [
        "後ろに倒れて、深呼吸してください。",
        "Please lean back and take a deep breath.",
        "プリーズ リーン バック アンド テイク ア ディープ ブレス。",
      ],
      [
        "両手を挙げてください。",
        "Please raise both arms.",
        "プリーズ レイズ ボウス アームズ。",
      ],
      [
        "片手を挙げて、後ろに倒れて、力を抜いて。次は逆です。",
        "Please raise one arm, lean back, and relax. Now the other side.",
        "プリーズ レイズ ワン アーム、リーン バック、アンド リラックス。ナウ ジ アザー サイド。",
      ],
    ],
  },
  {
    title: "4. 施術中の確認",
    phrases: [
      [
        "強さはいかがでしょうか？",
        "How is the pressure?",
        "ハウ イズ ザ プレッシャー？",
      ],
      [
        "部屋の温度は大丈夫ですか？",
        "Is the room temperature okay?",
        "イズ ザ ルーム テンパレチャー オーケー？",
      ],
      ["ここは痛いですか？", "Does it hurt here?", "ダズ イット ハート ヒア？"],
      [
        "弱すぎますか？",
        "Is the pressure too soft?",
        "イズ ザ プレッシャー トゥー ソフト？",
      ],
      [
        "もっと強い方がいいですか？",
        "Would you like more pressure?",
        "ウッド ユー ライク モア プレッシャー？",
      ],
      [
        "少し強くしますね。",
        "I'll apply a little more pressure.",
        "アイル アプライ ア リトル モア プレッシャー。",
      ],
      [
        "少し弱くしますね。",
        "I'll lighten the pressure.",
        "アイル ライトゥン ザ プレッシャー。",
      ],
      [
        "いい感じです。",
        "Perfect. / That's good.",
        "パーフェクト。 / ザッツ グッド。",
      ],
      ["リラックスしてください。", "Please relax.", "プリーズ リラックス。"],
      [
        "力を抜いてください。",
        "Please let your body go loose.",
        "プリーズ レット ユア ボディ ゴー ルース。",
      ],
      [
        "この部分を重点的にやりましょうか？",
        "Would you like me to focus more on this area?",
        "ウッド ユー ライク ミー トゥ フォーカス モア オン ディス エリア？",
      ],
      [
        "少し痛いかもしれません。大丈夫ですか？",
        "This may feel a little tender. Are you okay?",
        "ディス メイ フィール ア リトル テンダー。アー ユー オーケー？",
      ],
      [
        "深呼吸してください。",
        "Please take a deep breath.",
        "プリーズ テイク ア ディープ ブレス。",
      ],
    ],
  },
  {
    title: "5. 終了後・お見送り",
    phrases: [
      [
        "はい、終わりました。ありがとうございました。",
        "All done. Thank you very much.",
        "オール ダン。サンキュー ベリー マッチ。",
      ],
      [
        "お身体、楽になってますか？",
        "How do you feel?",
        "ハウ ドゥ ユー フィール？",
      ],
      [
        "お水をどうぞ。",
        "Here is some water for you.",
        "ヒア イズ サム ウォーター フォー ユー。",
      ],
      [
        "ゆっくりお休みください。",
        "Please take your time to rest.",
        "プリーズ テイク ユア タイム トゥ レスト。",
      ],
      [
        "本日の料金は16,500円です。",
        "Your total is 16,500 yen.",
        "ユア トータル イズ シックスティーン サウザンド ファイブ ハンドレッド イェン。",
      ],
      [
        "領収書はご入り用ですか？",
        "Would you like a receipt?",
        "ウッド ユー ライク ア リシート？",
      ],
      [
        "次回のご予約はいかがですか？",
        "Would you like to schedule your next appointment?",
        "ウッド ユー ライク トゥ スケジュール ユア ネクスト アポイントメント？",
      ],
      [
        "足元にお気をつけて。",
        "Please watch your step.",
        "プリーズ ウォッチ ユア ステップ。",
      ],
      [
        "ご滞在を楽しんでいただけますように。",
        "I hope you enjoy the rest of your stay.",
        "アイ ホープ ユー エンジョイ ザ レスト オブ ユア ステイ。",
      ],
      [
        "またのご来店をお待ちしています。",
        "We look forward to seeing you again.",
        "ウィ ルック フォワード トゥ シーイング ユー アゲイン。",
      ],
      ["お大事に。", "Please take care.", "プリーズ テイク ケア。"],
      [
        "ありがとうございました。",
        "Thank you so much.",
        "サンキュー ソー マッチ。",
      ],
    ],
  },
];

async function buildRequests(sections) {
  const requests = [];
  let index = 1; // Googleドキュメントは1始まり

  // ヘッダータイトル
  const titleText = "施術用 英会話フレーズ集 50\n";
  requests.push({ insertText: { location: { index }, text: titleText } });
  requests.push({
    updateParagraphStyle: {
      range: { startIndex: index, endIndex: index + titleText.length - 1 },
      paragraphStyle: { namedStyleType: "HEADING_1", alignment: "CENTER" },
      fields: "namedStyleType,alignment",
    },
  });
  index += titleText.length;

  // サブタイトル
  const subtitle =
    "English Phrases for Therapy Sessions — FUKUDA Shingo / Marea at Sheraton Kagoshima\nDry Massage 60 min. / ¥16,500\n\n";
  requests.push({ insertText: { location: { index }, text: subtitle } });
  requests.push({
    updateParagraphStyle: {
      range: { startIndex: index, endIndex: index + subtitle.length - 1 },
      paragraphStyle: { namedStyleType: "NORMAL_TEXT", alignment: "CENTER" },
      fields: "namedStyleType,alignment",
    },
  });
  requests.push({
    updateTextStyle: {
      range: { startIndex: index, endIndex: index + subtitle.length },
      textStyle: {
        foregroundColor: {
          color: { rgbColor: { red: 0.4, green: 0.4, blue: 0.4 } },
        },
        fontSize: { magnitude: 10, unit: "PT" },
      },
      fields: "foregroundColor,fontSize",
    },
  });
  index += subtitle.length;

  let phraseNum = 1;
  for (const sec of sections) {
    // セクションヘッダー
    const hText = sec.title + "\n";
    requests.push({ insertText: { location: { index }, text: hText } });
    requests.push({
      updateParagraphStyle: {
        range: { startIndex: index, endIndex: index + hText.length - 1 },
        paragraphStyle: { namedStyleType: "HEADING_2" },
        fields: "namedStyleType",
      },
    });
    requests.push({
      updateTextStyle: {
        range: { startIndex: index, endIndex: index + hText.length },
        textStyle: {
          foregroundColor: {
            color: { rgbColor: { red: 0.1, green: 0.29, blue: 0.42 } },
          },
        },
        fields: "foregroundColor",
      },
    });
    index += hText.length;

    for (const [jp, en, kana] of sec.phrases) {
      // 日本語
      const jpLine = `${phraseNum}. ${jp}\n`;
      requests.push({ insertText: { location: { index }, text: jpLine } });
      requests.push({
        updateTextStyle: {
          range: { startIndex: index, endIndex: index + jpLine.length },
          textStyle: { bold: true, fontSize: { magnitude: 10.5, unit: "PT" } },
          fields: "bold,fontSize",
        },
      });
      index += jpLine.length;

      // 英語
      const enLine = en + "\n";
      requests.push({ insertText: { location: { index }, text: enLine } });
      requests.push({
        updateTextStyle: {
          range: { startIndex: index, endIndex: index + enLine.length },
          textStyle: {
            bold: false,
            fontSize: { magnitude: 10.5, unit: "PT" },
            foregroundColor: {
              color: { rgbColor: { red: 0, green: 0.21, blue: 0.5 } },
            },
          },
          fields: "bold,fontSize,foregroundColor",
        },
      });
      index += enLine.length;

      // カタカナ
      const kanaLine = `（${kana}）\n\n`;
      requests.push({ insertText: { location: { index }, text: kanaLine } });
      requests.push({
        updateTextStyle: {
          range: { startIndex: index, endIndex: index + kanaLine.length },
          textStyle: {
            bold: false,
            fontSize: { magnitude: 8.5, unit: "PT" },
            foregroundColor: {
              color: { rgbColor: { red: 0.4, green: 0.4, blue: 0.4 } },
            },
          },
          fields: "bold,fontSize,foregroundColor",
        },
      });
      index += kanaLine.length;
      phraseNum++;
    }
  }

  // フッター
  const footer =
    "※ A4印刷・ラミネート推奨。Marea concept:「海のような大きな波で、人と人をつなぐ」\n";
  requests.push({ insertText: { location: { index }, text: footer } });
  requests.push({
    updateTextStyle: {
      range: { startIndex: index, endIndex: index + footer.length },
      textStyle: {
        fontSize: { magnitude: 8, unit: "PT" },
        foregroundColor: {
          color: { rgbColor: { red: 0.5, green: 0.5, blue: 0.5 } },
        },
        italic: true,
      },
      fields: "fontSize,foregroundColor,italic",
    },
  });

  return requests;
}

async function main() {
  const docs = google.docs({ version: "v1", auth: oauth2Client });

  console.log("📄 施術用英会話フレーズ集をGoogleドキュメントに作成中...");

  // ドキュメント作成
  const doc = await docs.documents.create({
    requestBody: {
      title: "施術用 英会話フレーズ集 50｜Marea at Sheraton Kagoshima",
    },
  });

  const docId = doc.data.documentId;
  console.log(
    `✅ ドキュメント作成: https://docs.google.com/document/d/${docId}/edit`,
  );

  // コンテンツ挿入
  const requests = await buildRequests(sections);
  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: { requests },
  });

  console.log("✅ フレーズ集の内容を挿入しました。");
  console.log(`🔗 URL: https://docs.google.com/document/d/${docId}/edit`);
}

main().catch((err) => {
  console.error("❌ エラー:", err.message);
  process.exit(1);
});
