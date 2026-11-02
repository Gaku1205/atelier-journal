import { pad2 } from "@/lib/format";
import { contents, coverFigure, issue } from "@/lib/issue";
import { Plate } from "./Plate";

/** バーコードの線の太さ（見た目だけ） */
const BARS = [3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1, 3];

/** 表紙。縁に紙色を残した全面図版の上に、誌名・号・特集名・副題・目次の抜粋・バーコード */
export function Cover() {
  return (
    <section id="cover" className="cover" aria-label="表紙">
      <div className="cover__sheet">
        <Plate
          scene={coverFigure.scene}
          label={coverFigure.label}
          id="plate-cover"
          className="cover__plate"
        />
        <p className="cover__kicker mono">季刊 {issue.journal}</p>
        <h1 className="cover__title">
          <span className="sr-only">{issue.journal}</span>
          <span aria-hidden="true">Usuzumi</span>
        </h1>
        <p className="cover__no">
          <span className="mono">No.</span>
          <span className="cover__no-num">{issue.no}</span>
        </p>
        <p className="cover__theme">{issue.theme}</p>
        <p className="cover__sub">
          <span className="cover__sub-en">{issue.subtitle}</span>
          <span className="mono">{issue.seasonEn}</span>
        </p>
        <ol className="cover__toc">
          {contents.slice(0, 4).map((c) => (
            <li key={c.page}>
              <a href={`#${c.anchor}`}>
                <span className="cover__toc-page">p.{pad2(c.page)}</span>
                <span className="link-line">{c.title}</span>
              </a>
            </li>
          ))}
        </ol>
        <div className="cover__barcode" aria-hidden="true">
          <div className="cover__bars">
            {BARS.map((b, i) => (
              <span key={i} style={{ width: `${b}px` }} />
            ))}
          </div>
          <p className="mono">
            No.{issue.no} / {issue.price}
          </p>
        </div>
      </div>
    </section>
  );
}
