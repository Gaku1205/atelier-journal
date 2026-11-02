"use client";

import { useEffect, useState } from "react";
import { formatFolio, pickFolio, type FolioSection } from "@/lib/format";
import { TOTAL_PAGES } from "@/lib/issue";

/** 画面の上からこの割合の位置を越えた頁を「いま開いている頁」にする */
const PROBE = 0.7;

/**
 * ノンブル。右下に固定。表紙では出さず、頁（data-folio を持つ要素）ごとに「p.04 / 48　題」に変わる。
 */
export function Folio() {
  const [current, setCurrent] = useState<{ page: number; title: string } | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nodes = document.querySelectorAll<HTMLElement>("[data-folio]");
      const sections: FolioSection[] = [];
      nodes.forEach((el) => {
        sections.push({
          top: el.getBoundingClientRect().top,
          page: Number(el.dataset.folio),
          title: el.dataset.folioTitle ?? "",
        });
      });
      const next = pickFolio(sections, window.innerHeight * PROBE);
      setCurrent((prev) =>
        prev?.page === next?.page && prev?.title === next?.title ? prev : next,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p className="folio" data-visible={current ? "true" : "false"} aria-hidden="true">
      {current ? (
        <>
          <span className="folio__no">{formatFolio(current.page, TOTAL_PAGES)}</span>
          <span className="folio__title">{current.title}</span>
        </>
      ) : null}
    </p>
  );
}
