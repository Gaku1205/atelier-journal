import { pad2 } from "@/lib/format";
import { contents, contentsFigure, contentsIntro } from "@/lib/issue";
import { Frame } from "./Frame";
import { RunningHead } from "./RunningHead";

/** 目次（p.02）。墨の罫で区切った行。指した行のほかは薄くなる（CSS） */
export function Contents() {
  return (
    <section
      id="contents"
      className="page"
      data-folio="2"
      data-folio-title="目次"
      aria-labelledby="contents-title"
    >
      <RunningHead page={2} label="目次" />
      <div className="grid split">
        <header className="split__head" data-reveal>
          <h2 id="contents-title" className="section-title">
            Contents
          </h2>
          <p className="ja-sub">目 次</p>
          <p className="split__intro">{contentsIntro}</p>
          <Frame
            figure={contentsFigure}
            id="plate-contents"
            ratio="34"
            className="contents__figure"
          />
        </header>
        <ol className="split__body contents" data-reveal>
          {contents.map((c) => (
            <li key={c.page} className="contents__row">
              <a href={`#${c.anchor}`} className="contents__link">
                <span className="contents__page">{pad2(c.page)}</span>
                <span className="contents__text">
                  <span className="contents__title">{c.title}</span>
                  <span className="contents__sub">{c.sub}</span>
                </span>
                <span className="contents__en">{c.en}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
