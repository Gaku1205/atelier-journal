import { afterEach, describe, expect, it, vi } from "vitest";
import { withBase } from "./asset";

describe("withBase", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("環境変数が空（未設定）のときは道をそのまま返す", () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "");
    expect(withBase("/photos/a.jpg")).toBe("/photos/a.jpg");

    delete process.env.NEXT_PUBLIC_BASE_PATH;
    expect(withBase("/photos/a.jpg")).toBe("/photos/a.jpg");
  });

  it("/atelier-journal のときは前に階層を付ける", () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/atelier-journal");
    expect(withBase("/photos/a.jpg")).toBe("/atelier-journal/photos/a.jpg");
  });
});
