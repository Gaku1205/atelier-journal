"use client";

import { useEffect, useState } from "react";
import { issue, nav } from "@/lib/issue";

/**
 * 上の帯。表紙の上では白文字を差分合成で重ね、表紙を過ぎたら紙色の地＋墨の下罫（data-past-cover）。
 */
export function Masthead() {
  const [pastCover, setPastCover] = useState(false);

  useEffect(() => {
    const cover = document.getElementById("cover");
    if (!cover) return;
    const bar = 56;
    const io = new IntersectionObserver(
      ([entry]) => setPastCover(!entry.isIntersecting),
      { rootMargin: `-${bar}px 0px 0px 0px`, threshold: 0 },
    );
    io.observe(cover);
    return () => io.disconnect();
  }, []);

  return (
    <header className="masthead" data-past-cover={pastCover ? "true" : "false"}>
      <a className="masthead__brand" href="#cover">
        {issue.brand}
      </a>
      <p className="masthead__issue mono">
        {issue.journal} No.{issue.no} — {issue.season}
      </p>
      <nav className="masthead__nav" aria-label="この号の頁">
        <ul>
          {nav.map((n) => (
            <li key={n.anchor}>
              <a href={`#${n.anchor}`}>
                <span className="link-line">{n.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
