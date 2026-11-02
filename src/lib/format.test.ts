import { describe, expect, it } from "vitest";
import {
  formatFig,
  formatFolio,
  formatNewsDate,
  formatPrice,
  pad2,
  pickFolio,
} from "./format";

describe("pad2", () => {
  it("1 桁は 0 を足して 2 桁にする", () => {
    expect(pad2(4)).toBe("04");
    expect(pad2(0)).toBe("00");
  });
  it("2 桁以上はそのまま", () => {
    expect(pad2(48)).toBe("48");
    expect(pad2(120)).toBe("120");
  });
});

describe("formatFolio", () => {
  it("「p.04 / 48」の形にする", () => {
    expect(formatFolio(4, 48)).toBe("p.04 / 48");
    expect(formatFolio(30, 48)).toBe("p.30 / 48");
  });
});

describe("formatFig", () => {
  it("「Fig.01」の形にする", () => {
    expect(formatFig(1)).toBe("Fig.01");
    expect(formatFig(0)).toBe("Fig.00");
  });
});

describe("formatPrice", () => {
  it("円記号と 3 桁区切りを付ける", () => {
    expect(formatPrice(38500)).toBe("¥38,500");
    expect(formatPrice(9900)).toBe("¥9,900");
    expect(formatPrice(128000)).toBe("¥128,000");
  });
});

describe("formatNewsDate", () => {
  it("年・月・日の間を全角スペースで空ける", () => {
    expect(formatNewsDate("2026-10-21")).toBe("2026　10　21");
    expect(formatNewsDate("2026-9-3")).toBe("2026　09　03");
  });
  it("形が違うときはそのまま返す", () => {
    expect(formatNewsDate("秋")).toBe("秋");
  });
});

describe("pickFolio", () => {
  const sections = [
    { top: 900, page: 2, title: "目次" },
    { top: 2100, page: 4, title: "灰色の朝に、針を持つ。" },
    { top: 4000, page: 18, title: "麻を、冬に着る。" },
  ];

  it("表紙の上（どの頁の頭も届いていない）では出さない", () => {
    expect(pickFolio(sections, 600)).toBeNull();
  });
  it("頭が probe を越えた頁のうち、いちばん下の物を選ぶ", () => {
    expect(pickFolio(sections, 900)).toEqual({ page: 2, title: "目次" });
    expect(pickFolio(sections, 2500)).toEqual({
      page: 4,
      title: "灰色の朝に、針を持つ。",
    });
    expect(pickFolio(sections, 9999)?.page).toBe(18);
  });
  it("並び順に左右されない", () => {
    const reversed = [...sections].reverse();
    expect(pickFolio(reversed, 2500)?.page).toBe(4);
  });
  it("頁が無ければ出さない", () => {
    expect(pickFolio([], 100)).toBeNull();
  });
});
