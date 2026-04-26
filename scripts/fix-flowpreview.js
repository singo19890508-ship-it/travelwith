const fs = require("fs");
const path = require("path");

const messagesDir = path.join(process.cwd(), "messages");

const translations = {
  en: {
    step4Title: "Follow-up & Next Trip",
    step4Desc:
      "We listen to your feedback after the trip and work to make the next one even better.",
  },
  ko: {
    step4Title: "후기 & 다음 여행으로",
    step4Desc:
      "여행 후 소감을 듣고 다음에 더 좋은 여행을 만들기 위해 개선합니다.",
  },
  zh: {
    step4Title: "反馈 & 下次旅行",
    step4Desc: "旅行结束后听取您的感想，不断改善以使下次旅行更加美好。",
  },
  hi: {
    step4Title: "समीक्षा और अगली यात्रा",
    step4Desc:
      "यात्रा के बाद आपकी प्रतिक्रिया सुनते हैं और अगली यात्रा को और बेहतर बनाते हैं।",
  },
  es: {
    step4Title: "Evaluación y próximo viaje",
    step4Desc:
      "Escuchamos tus comentarios después del viaje y trabajamos para mejorar la próxima experiencia.",
  },
};

for (const [locale, trans] of Object.entries(translations)) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  data.flowPreview.step4Title = trans.step4Title;
  data.flowPreview.step4Desc = trans.step4Desc;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
  console.log(`Updated ${locale}.json`);
}
console.log("Done!");
