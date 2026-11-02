/** 誌面の小さな文字（ノンブル・図版番号・価格・日付）の整形と、いまどの頁にいるかの判定 */

/** 数を 2 桁にそろえる（4 → "04"） */
export function pad2(n: number): string {
  return String(Math.max(0, Math.trunc(n))).padStart(2, "0");
}

/** ノンブルの番号の部分（"p.04 / 48"） */
export function formatFolio(page: number, total: number): string {
  return `p.${pad2(page)} / ${pad2(total)}`;
}

/** 図版の番号（"Fig.01"） */
export function formatFig(n: number): string {
  return `Fig.${pad2(n)}`;
}

/** 価格（38500 → "¥38,500"） */
export function formatPrice(yen: number): string {
  return `¥${Math.round(yen).toLocaleString("en-US")}`;
}

/** お知らせの日付（"2026-10-21" → "2026　10　21"。間は全角スペース） */
export function formatNewsDate(iso: string): string {
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(iso);
  if (!m) return iso;
  return `${m[1]}　${pad2(Number(m[2]))}　${pad2(Number(m[3]))}`;
}

/** 頁の位置（画面の上からの距離）と、その頁のノンブル */
export type FolioSection = {
  top: number;
  page: number;
  title: string;
};

/**
 * いま開いている頁を決める。
 * 画面の上から probe の位置より上に頭が来ている頁のうち、いちばん下の物。
 * どの頁もまだ probe に届いていなければ（表紙の上）null。
 */
export function pickFolio(
  sections: readonly FolioSection[],
  probe: number,
): { page: number; title: string } | null {
  let found: FolioSection | null = null;
  for (const s of sections) {
    if (s.top <= probe && (found === null || s.top >= found.top)) {
      found = s;
    }
  }
  return found ? { page: found.page, title: found.title } : null;
}
