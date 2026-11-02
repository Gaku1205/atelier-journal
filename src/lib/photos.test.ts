import { describe, expect, it } from "vitest";
import { photoFor } from "./photos";

describe("photoFor", () => {
  it("写真に替えた絵柄は src と alt を返す", () => {
    for (const scene of ["fogBeach", "workshop", "knit", "nightStore"] as const) {
      const p = photoFor(scene);
      expect(p?.src).toMatch(/^\/photos\/.+\.(jpg|webp|png)$/);
      expect(p?.alt.length).toBeGreaterThan(0);
    }
  });

  it("夜の店だけ night が付く", () => {
    expect(photoFor("nightStore")?.night).toBe(true);
    expect(photoFor("knit")?.night).toBeUndefined();
  });

  it("SVG のままの絵柄は undefined", () => {
    expect(photoFor("sea")).toBeUndefined();
    expect(photoFor("linen")).toBeUndefined();
    expect(photoFor("folded")).toBeUndefined();
  });
});
