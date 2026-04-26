#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const messagesDir = path.join(process.cwd(), "messages");

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      typeof source[key] === "object" &&
      source[key] !== null &&
      !Array.isArray(source[key]) &&
      typeof target[key] === "object" &&
      target[key] !== null
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

const additions = {
  ja: {
    metadata: {
      toursTitle: "ツアー一覧 | FUKU-TABI",
      partnerTitle: "連携パートナー | FUKU-TABI",
      fieldTitle: "サポート日記 | FUKU-TABI",
      toursDescription:
        "車椅子・介護が必要な方向けの鹿児島バリアフリーツアー。福祉タクシー＋介助サポーター付きで、安心して旅を楽しめます。",
      partnerDescription:
        "FUKU-TABIが連携する福祉タクシー会社をご紹介します。車椅子対応車両・有資格ドライバーで、移動の不安をゼロにします。",
    },
    hero: {
      strength1: "鍼灸師・介護福祉士が運営",
      strength2: "旅行保険に加入",
      strength3: "鹿児島に特化・旅行業登録",
    },
    taxi: {
      badge: "福祉タクシー会社と正式連携",
      heading: "移動の不安を、ゼロにする。",
      description:
        "「車椅子で旅行できるか不安」「乗り換えが多くて諦めた」——FUKU-TABIは、鹿児島の福祉タクシー会社と連携し、移動のすべてをサポートします。",
      feature1Title: "リフト付き専用車両",
      feature1Desc:
        "車椅子のまま乗り降りできる福祉車両を完備。電動車椅子にも対応しています。",
      feature2Title: "空港・駅から直送迎",
      feature2Desc:
        "鹿児島空港・鹿児島中央駅からホテルまで、ドア to ドアでお迎えします。",
      feature3Title: "介護資格を持つドライバー",
      feature3Desc:
        "乗降介助・移乗サポートができる有資格ドライバーが対応。緊急時も安心です。",
      ctaLink: "連携パートナーについて詳しく見る",
    },
    field: {
      pageTitle: "サポート日記",
      pageDescription:
        "旅を諦めてきた方と一緒に旅してきた、現場からの記録。写真と言葉で綴ります。",
      badge: "SUPPORT DIARY",
      heading: "サポート日記",
      subheading:
        "旅を諦めてきた方と一緒に旅してきた、現場からの記録。写真と言葉で、ありのままを綴ります。",
      emptyTitle: "まだ投稿はありません",
      emptyDesc: "もうしばらくお待ちください。",
    },
    tours: {
      pageTitle: "バリアフリーツアー",
      pageDescription:
        "福祉タクシー＋介助サポーターがセットになった、鹿児島のバリアフリーツアーをご用意しています。「移動」「介助」「観光」すべてお任せください。",
      preparingBanner: "現在ツアーを準備中です。詳細・予約は",
      preparingLink: "まずご相談",
      noPhoto: "写真（準備中）",
      applyButton: "申し込む・相談する",
      customTitle: "希望のツアーが見当たらない方へ",
      customDesc:
        "行きたい場所・泊まりたい宿・必要な介助内容をお聞かせください。オーダーメイドのプランをご提案します。",
      customButton: "お問い合わせ・ご相談",
    },
    partner: {
      pageTitle: "連携パートナー",
      pageDescription:
        "FUKU-TABIは、鹿児島の福祉タクシー会社と正式に連携しています。旅のすべての移動を、安心してお任せください。",
      whyTitle: "なぜ福祉タクシーとの連携が重要なのか",
      whyDesc1:
        "旅行を諦める理由の多くは「移動できるか不安」という一点につきます。介護タクシーを個人で手配するのは複雑で、旅先での急な変更にも対応しにくい。",
      whyDesc2:
        "FUKU-TABIは旅行計画の段階から移動手段を確保し、サポーター・ドライバー・旅行者の三者が連携して旅を実現します。「移動」は旅の入り口です。ここを安心に変えることが、私たちの使命です。",
      photosTitle: "実際のサポートの様子",
      photosNote: "※ 掲載写真はご本人の同意を得て使用しています。",
      photo1Alt: "温泉での入浴介助サポート",
      photo1Caption: "温泉入浴介助",
      photo2Alt: "ホテルでくつろぐ旅行者",
      photo2Caption: "ホテルでひと休み",
      photo3Alt: "中華街を観光する様子",
      photo3Caption: "神戸中華街を散策",
      featuredAlt: "温泉での入浴介助。サポーターと旅行者の笑顔。",
      featuredQuote: "「温泉に入れると思っていなかった。」",
      featuredQuoteCredit:
        "— 小牧様（80代・車椅子ご利用）/ 旅行サポート実績より",
      taxiTitle: "連携タクシー会社",
      taxiAreaBadge: "鹿児島市内・近郊対応",
      taxiName: "（タクシー会社名 掲載予定）",
      taxiDesc:
        "鹿児島市内を中心に、空港・駅・観光地間の福祉輸送を行う専門会社です。FUKU-TABIのツアーに合わせた専属対応が可能です。",
      taxiLogoPlaceholder: "ロゴ・写真（準備中）",
      vehicle1: "車椅子リフト付き（電動車椅子対応）",
      vehicle2: "ストレッチャー対応車両あり",
      vehicle3: "乗降介助・移乗サポート",
      vehicle4: "鹿児島空港・鹿児島中央駅からの直接送迎",
      vehicle5: "観光地間のチャーター運行",
      vehicle6: "緊急時の対応マニュアル整備済み",
      driverTitle: "ドライバーの資格・研修",
      driver1: "介護福祉士",
      driver2: "介護職員初任者研修（旧ヘルパー2級）修了",
      driver3: "福祉有償運送運転者講習修了",
      driver4: "普通・大型第二種運転免許",
      ctaTitle: "まずはご相談ください",
      ctaDesc:
        "移動手段・送迎エリア・車両の空き状況など、お気軽にお問い合わせください。",
      ctaApply: "旅行を申し込む",
      ctaTours: "ツアーを見る",
    },
    join: {
      ch1Title: "使命と哲学",
      ch2Title: "知識の基礎",
      ch3Title: "実践スキル",
      ch3Highlight: "★ 核心スキル",
      ch4Title: "旅行サポート実践",
      ch5Title: "働き方・コミュニティ",
      highlightBadge: "鹿児島ならではの核心スキル",
      highlightTitle: "温泉入浴介助",
      highlightDesc:
        "「温泉に入りたいけど、一人では無理」——そんな方が鹿児島にはたくさんいます。福田が鹿児島県内全域で積み上げた入浴介助の実績を直接学べるのは、このプログラムだけです。",
      highlightSub: "第03章にて実技演習",
      fmt1Label: "全体時間",
      fmt1Value: "約12時間（半日×3回 または 1日×2回）",
      fmt2Label: "場所",
      fmt2Value: "鹿児島市内＋ オンライン録画視聴",
      fmt3Label: "初回開催",
      fmt3Value: "2026年11月（法人設立後・先着順）",
      fmt4Label: "参加費",
      fmt4Value: "有料（説明会にて詳細案内）",
      fmt5Label: "修了後",
      fmt5Value: "FUKU-TABI 認定旅行サポーターとして活動可",
      registerBtn: "仮登録する（無料）",
      detailBtn: "カリキュラム詳細を見る",
    },
  },
  en: {
    metadata: {
      toursTitle: "Tours | FUKU-TABI",
      partnerTitle: "Partner | FUKU-TABI",
      fieldTitle: "Support Diary | FUKU-TABI",
      toursDescription:
        "Kagoshima barrier-free tours for wheelchair users and those needing care. Travel with confidence with welfare taxis and support staff.",
      partnerDescription:
        "Meet the welfare taxi partners of FUKU-TABI. Wheelchair-accessible vehicles and qualified drivers eliminate travel worries.",
    },
    hero: {
      strength1: "Operated by licensed acupuncturist & care workers",
      strength2: "Travel insurance included",
      strength3: "Kagoshima specialist, licensed travel agency",
    },
    taxi: {
      badge: "Official partnership with welfare taxi company",
      heading: "Zero worries about getting around.",
      description:
        "Worried about traveling in a wheelchair? Cannot handle all the transfers? FUKU-TABI partners with Kagoshima welfare taxi companies to support all your transportation needs.",
      feature1Title: "Lift-equipped vehicles",
      feature1Desc:
        "Welfare vehicles with wheelchair lifts for easy boarding. Electric wheelchairs fully supported.",
      feature2Title: "Direct pickup from airport and stations",
      feature2Desc:
        "Door-to-door service from Kagoshima Airport and Kagoshima-Chuo Station to your hotel.",
      feature3Title: "Drivers with care qualifications",
      feature3Desc:
        "Qualified drivers who assist with boarding, alighting, and transfers. Safe even in emergencies.",
      ctaLink: "Learn more about our partner",
    },
    field: {
      pageTitle: "Support Diary",
      pageDescription:
        "Field notes from journeys with travelers who had given up on travel.",
      badge: "SUPPORT DIARY",
      heading: "Support Diary",
      subheading:
        "Field notes from our journeys together. Stories told through photos and words.",
      emptyTitle: "No posts yet",
      emptyDesc: "Please check back soon.",
    },
    tours: {
      pageTitle: "Barrier-Free Tours",
      pageDescription:
        "Kagoshima barrier-free tours combining welfare taxis and support staff. Leave all transportation, care, and sightseeing to us.",
      preparingBanner:
        "Tours are currently being prepared. For details and reservations,",
      preparingLink: "contact us first",
      noPhoto: "Photo (coming soon)",
      applyButton: "Apply / Inquire",
      customTitle: "Cannot find the tour you are looking for?",
      customDesc:
        "Tell us where you want to go, where to stay, and what care you need. We will create a custom plan.",
      customButton: "Inquire / Consult",
    },
    partner: {
      pageTitle: "Partner",
      pageDescription:
        "FUKU-TABI officially partners with Kagoshima welfare taxi companies. Trust us with all your travel transportation needs.",
      whyTitle: "Why our welfare taxi partnership matters",
      whyDesc1:
        "The main reason people give up on travel is anxiety about transportation. Arranging care taxis personally is complicated, and handling last-minute changes during travel is difficult.",
      whyDesc2:
        "FUKU-TABI secures transportation from the planning stage, with supporters, drivers, and travelers working together. Transportation is the gateway to travel. Making it worry-free is our mission.",
      photosTitle: "Actual support in action",
      photosNote: "Photos used with the consent of the individuals shown.",
      photo1Alt: "Onsen bathing assistance support",
      photo1Caption: "Onsen bathing assistance",
      photo2Alt: "Traveler relaxing at hotel",
      photo2Caption: "Relaxing at the hotel",
      photo3Alt: "Sightseeing in Chinatown",
      photo3Caption: "Strolling in Kobe Chinatown",
      featuredAlt:
        "Onsen bathing assistance. Smiles of supporter and traveler.",
      featuredQuote: "I never thought I could get into an onsen.",
      featuredQuoteCredit:
        "— Mr./Ms. Komaki (80s, wheelchair user) / from travel support record",
      taxiTitle: "Partner Taxi Company",
      taxiAreaBadge: "Kagoshima city and suburbs",
      taxiName: "(Taxi company name - coming soon)",
      taxiDesc:
        "A specialized welfare transport company serving Kagoshima city. Dedicated service tailored to FUKU-TABI tours.",
      taxiLogoPlaceholder: "Logo / Photo (coming soon)",
      vehicle1: "Wheelchair lift equipped (electric wheelchair compatible)",
      vehicle2: "Stretcher-compatible vehicles available",
      vehicle3: "Boarding assistance and transfer support",
      vehicle4:
        "Direct pickup from Kagoshima Airport and Kagoshima-Chuo Station",
      vehicle5: "Charter service between sightseeing spots",
      vehicle6: "Emergency response manual in place",
      driverTitle: "Driver qualifications and training",
      driver1: "Certified Care Worker",
      driver2: "Introductory Care Worker Training completed",
      driver3: "Welfare Transportation Driver Training completed",
      driver4: "Standard / Large Second-class Driver License",
      ctaTitle: "Contact us first",
      ctaDesc:
        "Feel free to inquire about transportation options, pickup areas, and vehicle availability.",
      ctaApply: "Apply for a trip",
      ctaTours: "View tours",
    },
    join: {
      ch1Title: "Mission & Philosophy",
      ch2Title: "Knowledge Basics",
      ch3Title: "Practical Skills",
      ch3Highlight: "★ Core Skill",
      ch4Title: "Travel Support Practice",
      ch5Title: "Work Style & Community",
      highlightBadge: "Kagoshima-exclusive core skill",
      highlightTitle: "Onsen Bathing Assistance",
      highlightDesc:
        "Many people in Kagoshima want to visit an onsen but cannot do it alone. This is the only program where you learn directly from Fukuda, who has extensive onsen bathing assistance experience throughout Kagoshima.",
      highlightSub: "Practical exercise in Chapter 03",
      fmt1Label: "Total time",
      fmt1Value: "Approx. 12 hours (3 half-days or 2 full days)",
      fmt2Label: "Location",
      fmt2Value: "Kagoshima city + online recorded sessions",
      fmt3Label: "First session",
      fmt3Value:
        "November 2026 (after company establishment, first-come basis)",
      fmt4Label: "Fee",
      fmt4Value: "Paid (details at info session)",
      fmt5Label: "After completion",
      fmt5Value: "Active as FUKU-TABI certified travel supporter",
      registerBtn: "Pre-register (free)",
      detailBtn: "View curriculum details",
    },
  },
  ko: {
    metadata: {
      toursTitle: "투어 목록 | FUKU-TABI",
      partnerTitle: "제휴 파트너 | FUKU-TABI",
      fieldTitle: "서포트 일기 | FUKU-TABI",
      toursDescription:
        "휠체어 사용자와 간호가 필요한 분을 위한 가고시마 배리어프리 투어.",
      partnerDescription: "FUKU-TABI의 복지택시 파트너를 소개합니다.",
    },
    hero: {
      strength1: "침구사·개호복지사 운영",
      strength2: "여행보험 가입",
      strength3: "가고시마 전문·여행업 등록",
    },
    taxi: {
      badge: "복지택시 회사와 공식 제휴",
      heading: "이동 걱정 제로.",
      description:
        "휠체어로 여행이 걱정되시나요? FUKU-TABI는 가고시마 복지택시와 제휴하여 모든 이동을 지원합니다.",
      feature1Title: "리프트 장착 차량",
      feature1Desc:
        "휠체어 그대로 탑승 가능한 복지 차량. 전동 휠체어도 대응합니다.",
      feature2Title: "공항·역에서 직접 픽업",
      feature2Desc: "가고시마 공항·중앙역에서 호텔까지 도어 투 도어 서비스.",
      feature3Title: "자격증 보유 드라이버",
      feature3Desc:
        "승하차 보조·이승 서포트 가능한 유자격 드라이버가 대응합니다.",
      ctaLink: "제휴 파트너 자세히 보기",
    },
    field: {
      pageTitle: "서포트 일기",
      pageDescription: "여행을 포기했던 분들과 함께한 현장 기록.",
      badge: "SUPPORT DIARY",
      heading: "서포트 일기",
      subheading:
        "여행을 포기했던 분들과 함께 여행한 현장 기록. 사진과 글로 전합니다.",
      emptyTitle: "아직 게시물이 없습니다",
      emptyDesc: "조금만 기다려 주세요.",
    },
    tours: {
      pageTitle: "배리어프리 투어",
      pageDescription:
        "복지택시 + 서포트 스태프가 함께하는 가고시마 배리어프리 투어.",
      preparingBanner: "현재 투어를 준비 중입니다. 자세한 내용과 예약은",
      preparingLink: "먼저 상담",
      noPhoto: "사진 (준비 중)",
      applyButton: "신청·상담하기",
      customTitle: "원하시는 투어가 없으신가요?",
      customDesc:
        "가고 싶은 곳, 숙박 희망, 필요한 케어 내용을 알려주세요. 맞춤 플랜을 제안합니다.",
      customButton: "문의·상담하기",
    },
    partner: {
      pageTitle: "제휴 파트너",
      pageDescription:
        "FUKU-TABI는 가고시마 복지택시와 공식 제휴하고 있습니다.",
      whyTitle: "복지택시 제휴가 중요한 이유",
      whyDesc1:
        "여행을 포기하는 가장 큰 이유는 이동 불안입니다. 개인적으로 케어택시를 예약하는 것은 복잡하고 현지에서의 변경 대응도 어렵습니다.",
      whyDesc2:
        "FUKU-TABI는 계획 단계부터 이동 수단을 확보하여 서포터·드라이버·여행자가 함께 여행을 실현합니다.",
      photosTitle: "실제 서포트 현장",
      photosNote: "※ 게재 사진은 본인 동의를 받아 사용합니다.",
      photo1Alt: "온천 입욕 서포트",
      photo1Caption: "온천 입욕 서포트",
      photo2Alt: "호텔에서 휴식",
      photo2Caption: "호텔에서 휴식",
      photo3Alt: "차이나타운 관광",
      photo3Caption: "고베 차이나타운 산책",
      featuredAlt: "온천 입욕 서포트 현장",
      featuredQuote: "온천에 들어갈 수 있을 거라고 생각하지 못했어요.",
      featuredQuoteCredit: "— 코마키 님 (80대·휠체어 이용) / 여행 서포트 실적",
      taxiTitle: "제휴 택시 회사",
      taxiAreaBadge: "가고시마 시내·근교 대응",
      taxiName: "(택시 회사명 게재 예정)",
      taxiDesc:
        "가고시마 시내 중심으로 공항·역·관광지 간 복지 수송을 전문으로 합니다.",
      taxiLogoPlaceholder: "로고·사진 (준비 중)",
      vehicle1: "휠체어 리프트 장착 (전동 휠체어 대응)",
      vehicle2: "스트레처 대응 차량 있음",
      vehicle3: "승하차 보조·이승 서포트",
      vehicle4: "가고시마 공항·중앙역에서 직접 픽업",
      vehicle5: "관광지 간 전세 운행",
      vehicle6: "긴급 대응 매뉴얼 정비 완료",
      driverTitle: "드라이버 자격·연수",
      driver1: "개호복지사",
      driver2: "개호직원 초임자 연수 수료",
      driver3: "복지 유상 운송 운전자 강습 수료",
      driver4: "보통·대형 제2종 운전면허",
      ctaTitle: "먼저 상담해 주세요",
      ctaDesc: "이동 수단·픽업 지역·차량 상황 등 언제든지 문의해 주세요.",
      ctaApply: "여행 신청하기",
      ctaTours: "투어 보기",
    },
    join: {
      ch1Title: "사명과 철학",
      ch2Title: "지식의 기초",
      ch3Title: "실천 스킬",
      ch3Highlight: "★ 핵심 스킬",
      ch4Title: "여행 서포트 실천",
      ch5Title: "일하는 방식·커뮤니티",
      highlightBadge: "가고시마만의 핵심 스킬",
      highlightTitle: "온천 입욕 서포트",
      highlightDesc:
        "온천에 혼자 들어가기 어려운 분이 가고시마에는 많습니다. 후쿠다가 가고시마 현내 전역에서 쌓아온 입욕 서포트 실적을 직접 배울 수 있는 것은 이 프로그램뿐입니다.",
      highlightSub: "제03장 실기 연습",
      fmt1Label: "전체 시간",
      fmt1Value: "약 12시간 (반일×3회 또는 1일×2회)",
      fmt2Label: "장소",
      fmt2Value: "가고시마 시내 + 온라인 녹화 시청",
      fmt3Label: "첫 개최",
      fmt3Value: "2026년 11월 (법인 설립 후·선착순)",
      fmt4Label: "참가비",
      fmt4Value: "유료 (설명회에서 상세 안내)",
      fmt5Label: "수료 후",
      fmt5Value: "FUKU-TABI 인정 여행 서포터로 활동 가능",
      registerBtn: "가예약하기 (무료)",
      detailBtn: "커리큘럼 상세 보기",
    },
  },
  zh: {
    metadata: {
      toursTitle: "旅游套餐 | FUKU-TABI",
      partnerTitle: "合作伙伴 | FUKU-TABI",
      fieldTitle: "支援日记 | FUKU-TABI",
      toursDescription: "面向轮椅用户和需要护理人士的鹿儿岛无障碍旅游。",
      partnerDescription: "介绍FUKU-TABI的福祉出租车合作伙伴。",
    },
    hero: {
      strength1: "由针灸师·介护福祉士运营",
      strength2: "已加入旅行保险",
      strength3: "专注鹿儿岛·持旅行业执照",
    },
    taxi: {
      badge: "与福祉出租车公司正式合作",
      heading: "出行无忧。",
      description:
        "担心坐轮椅旅行？FUKU-TABI与鹿儿岛福祉出租车合作，全面支持您的出行需求。",
      feature1Title: "配备升降机的专用车辆",
      feature1Desc: "配备轮椅升降机的福祉车辆，支持电动轮椅。",
      feature2Title: "机场·车站直接接送",
      feature2Desc: "从鹿儿岛机场·中央站到酒店的门对门服务。",
      feature3Title: "持护理资格的驾驶员",
      feature3Desc: "持有资格、可协助上下车及转移的驾驶员为您服务。",
      ctaLink: "详细了解合作伙伴",
    },
    field: {
      pageTitle: "支援日记",
      pageDescription: "与曾经放弃旅行的朋友们一起旅行的现场记录。",
      badge: "SUPPORT DIARY",
      heading: "支援日记",
      subheading:
        "与曾经放弃旅行的朋友们一起旅行的现场记录。用照片和文字如实记录。",
      emptyTitle: "暂无文章",
      emptyDesc: "请稍后再来查看。",
    },
    tours: {
      pageTitle: "无障碍旅游套餐",
      pageDescription: "融合福祉出租车和支援人员的鹿儿岛无障碍旅游套餐。",
      preparingBanner: "旅游套餐正在筹备中。详细·预约请",
      preparingLink: "先咨询",
      noPhoto: "照片（筹备中）",
      applyButton: "申请·咨询",
      customTitle: "找不到心仪的套餐？",
      customDesc:
        "请告诉我们您想去的地方、住宿需求和所需护理内容，我们将为您定制方案。",
      customButton: "咨询·商谈",
    },
    partner: {
      pageTitle: "合作伙伴",
      pageDescription:
        "FUKU-TABI与鹿儿岛福祉出租车公司正式合作，安心委托所有旅行交通。",
      whyTitle: "为何福祉出租车合作至关重要",
      whyDesc1:
        "放弃旅行的主要原因大多是对出行的不安。个人预约护理出租车很复杂，在旅途中临时变更也很困难。",
      whyDesc2:
        "FUKU-TABI从旅行计划阶段就确保交通手段，让支援者、驾驶员和旅行者三方协作实现旅行。",
      photosTitle: "实际支援现场",
      photosNote: "※ 刊载照片已获当事人同意使用。",
      photo1Alt: "温泉入浴支援",
      photo1Caption: "温泉入浴支援",
      photo2Alt: "在酒店休息",
      photo2Caption: "在酒店休息",
      photo3Alt: "游览中华街",
      photo3Caption: "神户中华街散步",
      featuredAlt: "温泉入浴支援现场",
      featuredQuote: "没想到我能进温泉。",
      featuredQuoteCredit: "— 小牧先生/女士（80多岁·轮椅用户）/ 旅行支援实绩",
      taxiTitle: "合作出租车公司",
      taxiAreaBadge: "鹿儿岛市内·近郊对应",
      taxiName: "（出租车公司名称待定）",
      taxiDesc:
        "以鹿儿岛市内为中心，专门从事机场·车站·景点间福祉运输的专业公司。",
      taxiLogoPlaceholder: "Logo·照片（筹备中）",
      vehicle1: "配备轮椅升降机（支持电动轮椅）",
      vehicle2: "可使用担架车辆",
      vehicle3: "上下车协助·转移支援",
      vehicle4: "从鹿儿岛机场·中央站直接接送",
      vehicle5: "景点间包车运行",
      vehicle6: "紧急应对手册完备",
      driverTitle: "驾驶员资格·研修",
      driver1: "介护福祉士",
      driver2: "介护职员初任者研修结业",
      driver3: "福祉有偿运送驾驶员讲习结业",
      driver4: "普通·大型第二种驾驶执照",
      ctaTitle: "请先咨询",
      ctaDesc: "欢迎随时咨询交通方式、接送地区、车辆空闲状况等。",
      ctaApply: "申请旅行",
      ctaTours: "查看套餐",
    },
    join: {
      ch1Title: "使命与理念",
      ch2Title: "知识基础",
      ch3Title: "实践技能",
      ch3Highlight: "★ 核心技能",
      ch4Title: "旅行支援实践",
      ch5Title: "工作方式·社区",
      highlightBadge: "鹿儿岛独有核心技能",
      highlightTitle: "温泉入浴支援",
      highlightDesc:
        "鹿儿岛有很多想泡温泉却独自难以做到的朋友。在这个项目中，您可以直接向积累了大量入浴支援经验的福田老师学习。",
      highlightSub: "第03章实技演习",
      fmt1Label: "总时长",
      fmt1Value: "约12小时（半天×3次 或 1天×2次）",
      fmt2Label: "地点",
      fmt2Value: "鹿儿岛市内 + 在线录播",
      fmt3Label: "首次开办",
      fmt3Value: "2026年11月（法人成立后·先到先得）",
      fmt4Label: "参加费",
      fmt4Value: "有偿（说明会详细告知）",
      fmt5Label: "结业后",
      fmt5Value: "可作为FUKU-TABI认定旅行支援者活动",
      registerBtn: "预登记（免费）",
      detailBtn: "查看课程详情",
    },
  },
  hi: {
    metadata: {
      toursTitle: "टूर सूची | FUKU-TABI",
      partnerTitle: "साझेदार | FUKU-TABI",
      fieldTitle: "सपोर्ट डायरी | FUKU-TABI",
      toursDescription:
        "व्हीलचेयर उपयोगकर्ताओं और देखभाल जरूरतमंद लोगों के लिए कागोशिमा बैरियर-फ्री टूर।",
      partnerDescription: "FUKU-TABI के कल्याण टैक्सी साझेदारों से मिलें।",
    },
    hero: {
      strength1:
        "针灸師・介護士运营 / एक्यूपंक्चरिस्ट और देखभाल कर्मी द्वारा संचालित",
      strength2: "यात्रा बीमा शामिल",
      strength3: "कागोशिमा विशेषज्ञ, लाइसेंस प्राप्त यात्रा एजेंसी",
    },
    taxi: {
      badge: "कल्याण टैक्सी कंपनी के साथ आधिकारिक साझेदारी",
      heading: "आवागमन की चिंता शून्य।",
      description:
        "व्हीलचेयर पर यात्रा को लेकर चिंतित हैं? FUKU-TABI कागोशिमा की कल्याण टैक्सी के साथ साझेदारी में आपके सभी परिवहन का समर्थन करता है।",
      feature1Title: "लिफ्ट युक्त वाहन",
      feature1Desc:
        "व्हीलचेयर लिफ्ट वाले कल्याण वाहन। इलेक्ट्रिक व्हीलचेयर भी समर्थित।",
      feature2Title: "हवाई अड्डे और स्टेशन से सीधी पिकअप",
      feature2Desc:
        "कागोशिमा हवाई अड्डे और मुख्य स्टेशन से होटल तक डोर-टू-डोर सेवा।",
      feature3Title: "देखभाल योग्यता वाले चालक",
      feature3Desc:
        "चढ़ने-उतरने में सहायता करने में सक्षम योग्य चालक। आपातकाल में भी सुरक्षित।",
      ctaLink: "साझेदार के बारे में और जानें",
    },
    field: {
      pageTitle: "सपोर्ट डायरी",
      pageDescription: "यात्रा छोड़ चुके लोगों के साथ यात्रा की फील्ड रिपोर्ट।",
      badge: "SUPPORT DIARY",
      heading: "सपोर्ट डायरी",
      subheading:
        "यात्रा छोड़ चुके लोगों के साथ की गई यात्राओं की फील्ड रिपोर्ट।",
      emptyTitle: "अभी कोई पोस्ट नहीं है",
      emptyDesc: "कृपया बाद में देखें।",
    },
    tours: {
      pageTitle: "बैरियर-फ्री टूर",
      pageDescription:
        "कल्याण टैक्सी और सपोर्ट स्टाफ के साथ कागोशिमा बैरियर-फ्री टूर।",
      preparingBanner: "टूर अभी तैयार हो रहे हैं। विवरण और बुकिंग के लिए,",
      preparingLink: "पहले संपर्क करें",
      noPhoto: "फोटो (जल्द आ रही है)",
      applyButton: "आवेदन / पूछताछ",
      customTitle: "पसंदीदा टूर नहीं मिला?",
      customDesc:
        "हमें बताएं कहां जाना है, कहां रुकना है और किस देखभाल की जरूरत है। हम अनुकूलित योजना बनाएंगे।",
      customButton: "पूछताछ / परामर्श",
    },
    partner: {
      pageTitle: "साझेदार",
      pageDescription:
        "FUKU-TABI कागोशिमा कल्याण टैक्सी कंपनियों के साथ आधिकारिक साझेदारी में है।",
      whyTitle: "कल्याण टैक्सी साझेदारी क्यों महत्वपूर्ण है",
      whyDesc1:
        "यात्रा छोड़ने का मुख्य कारण परिवहन की चिंता है। व्यक्तिगत रूप से केयर टैक्सी बुक करना जटिल है।",
      whyDesc2:
        "FUKU-TABI योजना के चरण से परिवहन सुनिश्चित करता है, जिससे सपोर्टर, चालक और यात्री मिलकर यात्रा सफल बनाते हैं।",
      photosTitle: "वास्तविक सपोर्ट दृश्य",
      photosNote: "फोटो संबंधित व्यक्तियों की सहमति से उपयोग की गई हैं।",
      photo1Alt: "ऑनसेन स्नान सहायता",
      photo1Caption: "ऑनसेन स्नान सहायता",
      photo2Alt: "होटल में आराम",
      photo2Caption: "होटल में आराम",
      photo3Alt: "चाइनाटाउन भ्रमण",
      photo3Caption: "कोबे चाइनाटाउन भ्रमण",
      featuredAlt: "ऑनसेन स्नान सहायता दृश्य",
      featuredQuote: "मुझे नहीं लगा था कि मैं ऑनसेन में प्रवेश कर सकता हूं।",
      featuredQuoteCredit:
        "— कोमाकी जी (80 वर्ष, व्हीलचेयर उपयोगकर्ता) / यात्रा सपोर्ट रिकॉर्ड",
      taxiTitle: "साझेदार टैक्सी कंपनी",
      taxiAreaBadge: "कागोशिमा शहर और आसपास",
      taxiName: "(टैक्सी कंपनी का नाम शीघ्र आएगा)",
      taxiDesc:
        "कागोशिमा शहर में हवाई अड्डे, स्टेशन और पर्यटन स्थलों के बीच कल्याण परिवहन की विशेषज्ञ कंपनी।",
      taxiLogoPlaceholder: "लोगो / फोटो (जल्द आ रहा है)",
      vehicle1: "व्हीलचेयर लिफ्ट युक्त (इलेक्ट्रिक व्हीलचेयर संगत)",
      vehicle2: "स्ट्रेचर संगत वाहन उपलब्ध",
      vehicle3: "चढ़ने-उतरने और स्थानांतरण सहायता",
      vehicle4: "कागोशिमा हवाई अड्डे और मुख्य स्टेशन से सीधी पिकअप",
      vehicle5: "पर्यटन स्थलों के बीच चार्टर सेवा",
      vehicle6: "आपातकालीन प्रतिक्रिया मैनुअल तैयार",
      driverTitle: "चालक योग्यता और प्रशिक्षण",
      driver1: "प्रमाणित देखभाल कर्मी",
      driver2: "प्रारंभिक देखभाल कर्मी प्रशिक्षण पूर्ण",
      driver3: "कल्याण परिवहन चालक प्रशिक्षण पूर्ण",
      driver4: "मानक / बड़ा द्वितीय श्रेणी ड्राइविंग लाइसेंस",
      ctaTitle: "पहले संपर्क करें",
      ctaDesc:
        "परिवहन विकल्पों, पिकअप क्षेत्रों और वाहन उपलब्धता के बारे में बेझिझक पूछें।",
      ctaApply: "यात्रा के लिए आवेदन करें",
      ctaTours: "टूर देखें",
    },
    join: {
      ch1Title: "मिशन और दर्शन",
      ch2Title: "ज्ञान की नींव",
      ch3Title: "व्यावहारिक कौशल",
      ch3Highlight: "★ मुख्य कौशल",
      ch4Title: "यात्रा सपोर्ट अभ्यास",
      ch5Title: "कार्य शैली और समुदाय",
      highlightBadge: "कागोशिमा-अनन्य मुख्य कौशल",
      highlightTitle: "ऑनसेन स्नान सहायता",
      highlightDesc:
        "कागोशिमा में कई लोग ऑनसेन जाना चाहते हैं लेकिन अकेले नहीं जा सकते। यह एकमात्र कार्यक्रम है जहां आप फुकुदा से सीधे सीख सकते हैं।",
      highlightSub: "अध्याय 03 में व्यावहारिक अभ्यास",
      fmt1Label: "कुल समय",
      fmt1Value: "लगभग 12 घंटे (3 अर्ध-दिन या 2 पूर्ण दिन)",
      fmt2Label: "स्थान",
      fmt2Value: "कागोशिमा शहर + ऑनलाइन रिकॉर्डेड सत्र",
      fmt3Label: "पहला सत्र",
      fmt3Value: "नवंबर 2026 (कंपनी स्थापना के बाद, पहले आएं पहले पाएं)",
      fmt4Label: "शुल्क",
      fmt4Value: "सशुल्क (जानकारी सत्र में विवरण)",
      fmt5Label: "समापन के बाद",
      fmt5Value: "FUKU-TABI प्रमाणित यात्रा सपोर्टर के रूप में सक्रिय",
      registerBtn: "पूर्व-पंजीकरण (निःशुल्क)",
      detailBtn: "पाठ्यक्रम विवरण देखें",
    },
  },
  es: {
    metadata: {
      toursTitle: "Lista de Tours | FUKU-TABI",
      partnerTitle: "Socio | FUKU-TABI",
      fieldTitle: "Diario de Apoyo | FUKU-TABI",
      toursDescription:
        "Tours sin barreras en Kagoshima para usuarios de silla de ruedas y personas que necesitan cuidados.",
      partnerDescription:
        "Conoce a los socios de taxi de bienestar de FUKU-TABI.",
    },
    hero: {
      strength1: "Operado por acupunturista y trabajadores de cuidado",
      strength2: "Seguro de viaje incluido",
      strength3: "Especialista en Kagoshima, agencia de viajes con licencia",
    },
    taxi: {
      badge: "Asociación oficial con empresa de taxi de bienestar",
      heading: "Cero preocupaciones por el transporte.",
      description:
        "¿Te preocupa viajar en silla de ruedas? FUKU-TABI se asocia con empresas de taxi de bienestar de Kagoshima para apoyar todos tus desplazamientos.",
      feature1Title: "Vehículos con rampa elevadora",
      feature1Desc:
        "Vehículos de bienestar con rampas para silla de ruedas. Compatible con sillas de ruedas eléctricas.",
      feature2Title: "Recogida directa en aeropuerto y estaciones",
      feature2Desc:
        "Servicio puerta a puerta desde el aeropuerto y la estación central de Kagoshima a tu hotel.",
      feature3Title: "Conductores con calificaciones de cuidado",
      feature3Desc:
        "Conductores calificados que asisten en el embarque, desembarque y traslados. Seguros incluso en emergencias.",
      ctaLink: "Conocer más sobre nuestro socio",
    },
    field: {
      pageTitle: "Diario de Apoyo",
      pageDescription:
        "Notas de campo de viajes con personas que habían renunciado a viajar.",
      badge: "SUPPORT DIARY",
      heading: "Diario de Apoyo",
      subheading:
        "Notas de campo de nuestros viajes juntos. Historias contadas con fotos y palabras.",
      emptyTitle: "Aun no hay publicaciones",
      emptyDesc: "Por favor, vuelve pronto.",
    },
    tours: {
      pageTitle: "Tours Sin Barreras",
      pageDescription:
        "Tours sin barreras en Kagoshima combinando taxis de bienestar y personal de apoyo.",
      preparingBanner:
        "Los tours se estan preparando. Para detalles y reservas,",
      preparingLink: "contactanos primero",
      noPhoto: "Foto (proximamente)",
      applyButton: "Aplicar / Consultar",
      customTitle: "No encuentras el tour que buscas?",
      customDesc:
        "Cuentanos donde quieres ir, donde hospedarte y que cuidados necesitas. Crearemos un plan personalizado.",
      customButton: "Consultar / Solicitar",
    },
    partner: {
      pageTitle: "Socio",
      pageDescription:
        "FUKU-TABI se asocia oficialmente con empresas de taxi de bienestar de Kagoshima.",
      whyTitle:
        "Por que nuestra asociacion con taxi de bienestar es importante",
      whyDesc1:
        "La principal razon por la que la gente renuncia a viajar es la ansiedad por el transporte. Organizar taxis de cuidado personalmente es complicado.",
      whyDesc2:
        "FUKU-TABI asegura el transporte desde la etapa de planificacion, con colaboradores, conductores y viajeros trabajando juntos para hacer el viaje realidad.",
      photosTitle: "Apoyo real en accion",
      photosNote:
        "Fotos usadas con consentimiento de las personas que aparecen.",
      photo1Alt: "Asistencia en bano de onsen",
      photo1Caption: "Asistencia en bano de onsen",
      photo2Alt: "Descansando en el hotel",
      photo2Caption: "Descansando en el hotel",
      photo3Alt: "Paseo por el barrio chino",
      photo3Caption: "Paseo por el barrio chino de Kobe",
      featuredAlt: "Asistencia en bano de onsen",
      featuredQuote: "Nunca pense que podria entrar a un onsen.",
      featuredQuoteCredit:
        "— Sr./Sra. Komaki (80 anos, usuario de silla de ruedas) / registro de apoyo de viaje",
      taxiTitle: "Empresa de Taxi Asociada",
      taxiAreaBadge: "Ciudad de Kagoshima y alrededores",
      taxiName: "(Nombre de empresa de taxi - proximamente)",
      taxiDesc:
        "Empresa especializada en transporte de bienestar entre el aeropuerto, estaciones y atracciones turisticas en Kagoshima.",
      taxiLogoPlaceholder: "Logo / Foto (proximamente)",
      vehicle1:
        "Rampa elevadora para silla de ruedas (compatible con silla electrica)",
      vehicle2: "Vehiculos compatibles con camilla disponibles",
      vehicle3: "Asistencia en embarque y traslado",
      vehicle4:
        "Recogida directa en aeropuerto y estacion central de Kagoshima",
      vehicle5: "Servicio charter entre atracciones turisticas",
      vehicle6: "Manual de respuesta de emergencia establecido",
      driverTitle: "Calificaciones y formacion de conductores",
      driver1: "Trabajador de cuidado certificado",
      driver2: "Formacion introductoria de trabajador de cuidado completada",
      driver3: "Formacion de conductor de transporte de bienestar completada",
      driver4: "Licencia de conducir segunda clase estandar / grande",
      ctaTitle: "Contactanos primero",
      ctaDesc:
        "Consulta sobre opciones de transporte, zonas de recogida y disponibilidad de vehiculos.",
      ctaApply: "Solicitar un viaje",
      ctaTours: "Ver tours",
    },
    join: {
      ch1Title: "Mision y Filosofia",
      ch2Title: "Conocimientos Basicos",
      ch3Title: "Habilidades Practicas",
      ch3Highlight: "★ Habilidad Central",
      ch4Title: "Practica de Apoyo de Viaje",
      ch5Title: "Estilo de Trabajo y Comunidad",
      highlightBadge: "Habilidad central exclusiva de Kagoshima",
      highlightTitle: "Asistencia en Bano de Onsen",
      highlightDesc:
        "Muchas personas en Kagoshima quieren visitar un onsen pero no pueden hacerlo solos. Este es el unico programa donde aprendes directamente de Fukuda.",
      highlightSub: "Ejercicio practico en Capitulo 03",
      fmt1Label: "Tiempo total",
      fmt1Value: "Aprox. 12 horas (3 medios dias o 2 dias completos)",
      fmt2Label: "Ubicacion",
      fmt2Value: "Ciudad de Kagoshima + sesiones grabadas en linea",
      fmt3Label: "Primera sesion",
      fmt3Value:
        "Noviembre 2026 (tras establecimiento de empresa, por orden de llegada)",
      fmt4Label: "Tarifa",
      fmt4Value: "De pago (detalles en sesion informativa)",
      fmt5Label: "Tras completar",
      fmt5Value: "Activo como colaborador de viaje certificado FUKU-TABI",
      registerBtn: "Pre-registrarse (gratis)",
      detailBtn: "Ver detalles del plan de estudios",
    },
  },
};

const locales = ["ja", "en", "ko", "zh", "hi", "es"];

for (const locale of locales) {
  const filePath = path.join(messagesDir, `${locale}.json`);
  let existing = {};
  try {
    existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (e) {
    console.error(`Could not read ${filePath}:`, e.message);
    continue;
  }
  const merged = deepMerge(existing, additions[locale] || {});
  fs.writeFileSync(filePath, JSON.stringify(merged, null, 2) + "\n", "utf-8");
  console.log(`Updated ${locale}.json`);
}

console.log("Done!");
