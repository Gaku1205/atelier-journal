import type { PlateScene } from "./issue";

/** 本物の写真に替えた図版（docs/design.md「図版（写真）の扱い」）。載っていない絵柄は SVG（Plate.tsx）のまま */
export type PlatePhoto = {
  /** public/ からの道（出どころは public/photos/CREDITS.md） */
  src: string;
  /** 何が写っているか（alt） */
  alt: string;
  /** object-position（枠で切るときに残す所） */
  position: string;
  /** 夜の店だけ灯りの色を残す */
  night?: boolean;
};

const PHOTOS: Partial<Record<PlateScene, PlatePhoto>> = {
  fogBeach: {
    src: "/photos/01-fog-beach-grey-morning.jpg",
    alt: "灰色の海に浮かぶ船影。雲の切れ間から薄い光が水面に落ちている",
    position: "50% 60%",
  },
  workshop: {
    src: "/photos/09-window-light-shadow.jpg",
    alt: "白い壁に落ちる、格子を抜けた光と影。窓の暗い四角が並ぶ",
    position: "30% 50%",
  },
  knit: {
    src: "/photos/05-knitted-wool.webp",
    alt: "灰色と生成りの羊毛の玉。毛足の柔らかい肌理を寄りで写している",
    position: "50% 15%",
  },
  nightStore: {
    src: "/photos/11-night-street-lamp.jpg",
    alt: "夜の石畳の路地。壁の灯りが濡れた路面に映り、奥は暗い",
    position: "50% 60%",
    night: true,
  },
};

/** 絵柄に対応する写真（無ければ undefined） */
export function photoFor(scene: PlateScene): PlatePhoto | undefined {
  return PHOTOS[scene];
}
