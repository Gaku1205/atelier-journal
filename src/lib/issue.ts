/** 今号（USUZUMI JOURNAL No.07）の中身。文言は docs/design.md の「考え」に合わせる */

/** 図版の絵柄（src/components/Plate.tsx で描く） */
export type PlateScene =
  | "sea"
  | "fogBeach"
  | "workshop"
  | "linen"
  | "nightStore"
  | "knit"
  | "folded";

export type Figure = {
  /** 図版の番号（Fig.01 の 1） */
  no: number;
  scene: PlateScene;
  /** 何が写っているか（aria-label） */
  label: string;
  /** キャプション（Fig.01 — の後ろ） */
  caption: string;
};

export type ContentsEntry = {
  page: number;
  /** ページ内の行き先（#の後ろ） */
  anchor: string;
  title: string;
  sub: string;
  en: string;
};

export type Piece = {
  model: string;
  name: string;
  material: string;
  color: string;
  price: number;
  isNew: boolean;
  figure: Figure;
};

export type Remark = {
  speaker: string;
  text: string;
};

export type StoreInfo = {
  term: string;
  detail: string;
};

export type News = {
  /** YYYY-MM-DD */
  date: string;
  text: string;
  isNew: boolean;
};

export type Colophon = {
  term: string;
  detail: string;
};

export const TOTAL_PAGES = 48;

export const issue = {
  brand: "USUZUMI",
  journal: "USUZUMI JOURNAL",
  no: "07",
  theme: "余白を、まとう。",
  season: "2026 秋冬",
  seasonEn: "AUTUMN / WINTER 2026",
  subtitle: "The Quiet Season",
  price: "店頭で無料",
} as const;

/** 上の帯のナビ */
export const nav: readonly { label: string; anchor: string }[] = [
  { label: "目次", anchor: "contents" },
  { label: "読み物", anchor: "feature-01" },
  { label: "品々", anchor: "pieces" },
  { label: "店", anchor: "store" },
];

export const contents: readonly ContentsEntry[] = [
  {
    page: 4,
    anchor: "feature-01",
    title: "灰色の朝に、針を持つ。",
    sub: "縫い手・汐見葉子の一日",
    en: "A Grey Morning",
  },
  {
    page: 18,
    anchor: "feature-02",
    title: "麻を、冬に着る。",
    sub: "重ねるための七つの決まり",
    en: "Linen in Winter",
  },
  {
    page: 30,
    anchor: "pieces",
    title: "品々 2026 秋冬",
    sub: "十二型のうち四つ",
    en: "The Pieces",
  },
  {
    page: 40,
    anchor: "talk",
    title: "手の跡が、残る服を。",
    sub: "縫い手と写真家の対話",
    en: "Conversation",
  },
  {
    page: 46,
    anchor: "store",
    title: "凪浦の店",
    sub: "海まで歩いて三分",
    en: "The Store",
  },
];

export const contentsIntro =
  "海辺の小さなアトリエ USUZUMI が、季節ごとに刷る冊子。七号目は、寒くなる前の、何も起きない朝のことを書きました。";

export const coverFigure: Figure = {
  no: 0,
  scene: "sea",
  label: "夜明け前の凪浦の海。灰色の空と水平線、遠くに低い島影",
  caption: "",
};

export const contentsFigure: Figure = {
  no: 0,
  scene: "knit",
  label: "灰色の羊毛の編み地を寄りで写した図版",
  caption: "羽織の編み地。灰は染めずに、羊の色のまま",
};

/** 読み物1 */
export const feature1 = {
  page: 4,
  anchor: "feature-01",
  kicker: "FEATURE 01 — A GREY MORNING",
  title: "灰色の朝に、針を持つ。",
  /** 縦組みの題の行の切れ目 */
  titleLines: ["灰色の朝に、", "針を持つ。"],
  lead: "縫い手・汐見葉子さんの一日は、まだ海が色を持たない時間に始まる。USUZUMI の服が、どんな光の中で縫われているのかを見に行った。",
  byline: "文・薄墨編集室　図・遠野 律",
  body: [
    "朝の五時、凪浦の海はまだ色を持たない。空と水の境目がほどけて、すべてが一枚の灰色になる。汐見さんはその時間に窓を開け、作業台の上に麻を広げる。「この光でしか、生地の本当の色は分からないんです」。",
    "USUZUMI の服は、ほとんどが一人の手で縫われる。一日に仕上がるのは、多くて二着。裁ち、縫い、洗い、干す。乾いた布が少しだけ縮んで、形が落ち着くのを待ってから、ようやく店に並ぶ。",
    "作業場の壁には、縫い上がったばかりのスモックが一枚掛かっている。窓の格子の影がその上をゆっくり横切っていくのを、汐見さんは手を止めずに眺めている。",
  ],
  quote: {
    en: "The light decides the colour.",
    ja: "色は、光が決める。",
  },
  figures: [
    {
      no: 1,
      scene: "fogBeach",
      label: "霧の浜。灰色の海と空の境目がほどけ、波打ち際に人が一人立っている",
      caption: "午前五時十分、凪浦の浜。空と海の境目がほどける",
    },
    {
      no: 2,
      scene: "workshop",
      label: "作業場の窓辺。格子の影が落ちる作業台と、壁に掛かったスモック",
      caption: "作業場の窓。格子の影が、一日に一度だけ台の上を渡る",
    },
    {
      no: 3,
      scene: "folded",
      label: "作業台に畳んで重ねた生成りと灰色の服",
      caption: "仕上がりを待つ服。洗ってから三日、畳んで寝かせる",
    },
  ] satisfies Figure[],
} as const;

/** 読み物2 */
export const feature2 = {
  page: 18,
  anchor: "feature-02",
  kicker: "FEATURE 02 — LINEN IN WINTER",
  heading: ["Linen", "in Winter"],
  title: "麻を、冬に着る。",
  body: [
    "麻は夏の布だと思われている。けれど凪浦の冬は、湿った海風が骨まで届く。乾きやすく、風を通し、重ねるほど暖かくなる麻は、この町の冬にこそ向いている。",
    "大切なのは、一枚で頑張らないこと。肌に麻、間にウール、外にまた麻。薄い物を重ねて、その日の風に合わせて一枚ずつ脱いでいく。",
  ],
  rulesTitle: "重ねるための七つの決まり",
  rules: [
    "肌にいちばん近い一枚は、洗いざらしの麻にする。",
    "間には、薄く編んだウールを一枚だけ。",
    "外の一枚は、内より少しだけ長く。",
    "色は、灰と生成りと墨の三つから選ぶ。",
    "袖は折らずに、手首の上でたるませる。",
    "寒い日ほど、首もとを空けておく。",
    "脱いだ一枚は、腕に掛けて持ち歩く。",
  ],
  figure: {
    no: 4,
    scene: "linen",
    label: "生成りの麻の生地を寄りで写した図版。織り目と柔らかな皺",
    caption: "冬の麻。打ち込みを詰めて、風を少しだけ止める",
  } satisfies Figure,
  quote: {
    en: "Wear the space between.",
    ja: "余白を、まとう。",
  },
} as const;

/** 品々 */
export const piecesSection = {
  page: 30,
  anchor: "pieces",
  heading: "Pieces",
  headingJa: "品 々",
  intro:
    "今季は十二型。そのうち、凪浦の冬にいちばん着てほしい四つを選びました。すべて店頭と、季節の便りでの受け付けのみです。",
  note: "十二型のうち四つ",
} as const;

export const pieces: readonly Piece[] = [
  {
    model: "UZ-0701",
    name: "麻の長いスモック",
    material: "麻 100%",
    color: "生成り・灰",
    price: 38500,
    isNew: true,
    figure: {
      no: 5,
      scene: "folded",
      label: "畳んで重ねた生成りの麻のスモック",
      caption: "麻の長いスモック",
    },
  },
  {
    model: "UZ-0702",
    name: "羊色の羽織",
    material: "ウール 100%（染めず）",
    color: "羊の色",
    price: 52800,
    isNew: true,
    figure: {
      no: 6,
      scene: "knit",
      label: "染めていない灰色の羊毛で編んだ羽織の編み地",
      caption: "羊色の羽織",
    },
  },
  {
    model: "UZ-0703",
    name: "重ね着の麻のシャツ",
    material: "麻 100%",
    color: "墨",
    price: 29700,
    isNew: false,
    figure: {
      no: 7,
      scene: "linen",
      label: "墨色に近い麻のシャツの生地の皺",
      caption: "重ね着の麻のシャツ",
    },
  },
  {
    model: "UZ-0704",
    name: "海風よけの外套",
    material: "麻 60%・ウール 40%",
    color: "灰",
    price: 74800,
    isNew: false,
    figure: {
      no: 8,
      scene: "workshop",
      label: "作業場の壁に掛かった灰色の外套と、窓の格子の影",
      caption: "海風よけの外套",
    },
  },
];

/** 対話（夜の頁） */
export const talk = {
  page: 40,
  anchor: "talk",
  heading: ["Hands", "remain."],
  title: "手の跡が、残る服を。",
  sub: "縫い手 汐見葉子 × 写真家 遠野 律",
  figure: {
    no: 9,
    scene: "nightStore",
    label: "夜の凪浦の店。窓から暖かい灯りがこぼれ、通りは暗い",
    caption: "閉店後の店。灯りは一つだけ残す",
  } satisfies Figure,
  remarks: [
    {
      speaker: "遠野",
      text: "撮っていて思ったのは、USUZUMI の服は新品なのに、もう誰かが着たあとのように見えるということです。",
    },
    {
      speaker: "汐見",
      text: "それは、たぶん洗ってから店に出しているからです。一度水を通すと、布が自分の形を思い出すんです。",
    },
    {
      speaker: "遠野",
      text: "縫い目も、少しだけ揺れていますね。",
    },
    {
      speaker: "汐見",
      text: "機械のようには真っすぐにならないです。でも、その揺れを見て、着る人が「これは誰かの手だ」と分かってくれたら、それでいいと思っています。",
    },
    {
      speaker: "遠野",
      text: "十年後に、どんな服になっていてほしいですか。",
    },
    {
      speaker: "汐見",
      text: "くたびれて、色が抜けて、その人の体の形になっていてほしい。手の跡の上に、着た人の跡が重なっていくのが、いちばん美しいと思います。",
    },
  ] satisfies Remark[],
} as const;

/** 店・お知らせ・奥付 */
export const store = {
  page: 46,
  anchor: "store",
  heading: "凪浦の店",
  headingEn: "The Store",
  info: [
    { term: "所在地", detail: "凪浦町 浜通り 3-7（海まで歩いて三分）" },
    { term: "営業", detail: "11:00 — 17:00" },
    { term: "定休日", detail: "火・水曜日、海の荒れた日" },
    { term: "受け付け", detail: "店頭と、季節の便りのみ" },
  ] satisfies StoreInfo[],
  news: [
    {
      date: "2026-10-21",
      text: "七号「余白を、まとう。」を店頭で配りはじめました。",
      isNew: true,
    },
    {
      date: "2026-10-03",
      text: "羊色の羽織の、今季の受け付けを始めます。",
      isNew: true,
    },
    {
      date: "2026-09-12",
      text: "秋の間、土曜日は 18:00 まで開けています。",
      isNew: false,
    },
  ] satisfies News[],
  colophon: [
    { term: "発行", detail: "USUZUMI（凪浦）" },
    { term: "編集", detail: "薄墨編集室" },
    { term: "図", detail: "遠野 律" },
    { term: "号", detail: "No.07　2026 秋冬　全 48 頁" },
  ] satisfies Colophon[],
} as const;
