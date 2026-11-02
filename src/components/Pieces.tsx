import { formatPrice } from "@/lib/format";
import { pieces, piecesSection } from "@/lib/issue";
import { Frame } from "./Frame";
import { RunningHead } from "./RunningHead";

/** 品々（p.30）。左 4 段に見出し（sticky）、右 7 段に 2 列。偶数番目は下へずらす */
export function Pieces() {
  return (
    <section
      id={piecesSection.anchor}
      className="page"
      data-folio={piecesSection.page}
      data-folio-title="品々"
      aria-labelledby="pieces-title"
    >
      <RunningHead page={piecesSection.page} label="The Pieces" />
      <div className="grid split">
        <header className="split__head split__head--sticky" data-reveal>
          <h2 id="pieces-title" className="section-title">
            {piecesSection.heading}
          </h2>
          <p className="ja-sub">{piecesSection.headingJa}</p>
          <p className="split__intro">{piecesSection.intro}</p>
          <p className="mono note">{piecesSection.note}</p>
        </header>
        <ul className="split__body pieces">
          {pieces.map((p, i) => (
            <li key={p.model} className="piece" data-reveal>
              <Frame
                figure={p.figure}
                id={`plate-piece-${i}`}
                ratio={i % 3 === 0 ? "34" : "45"}
                tone={p.color === "墨" ? "dark" : "light"}
                caption={false}
              />
              <div className="piece__meta">
                <p className="piece__model mono">
                  {p.model}
                  {p.isNew ? <em className="new">new</em> : null}
                </p>
                <h3 className="piece__name">{p.name}</h3>
                <p className="piece__material">
                  {p.material}　{p.color}
                </p>
                <p className="piece__price">{formatPrice(p.price)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
