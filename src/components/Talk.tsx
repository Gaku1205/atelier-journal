import { talk } from "@/lib/issue";
import { Frame } from "./Frame";
import { RunningHead } from "./RunningHead";

/** 対話（p.40、夜の頁）。地は墨。大見出しの 2 行目を字下げして弁柄（夜）に */
export function Talk() {
  return (
    <section
      id={talk.anchor}
      className="page night"
      data-folio={talk.page}
      data-folio-title={talk.title}
      aria-labelledby="talk-title"
    >
      <RunningHead page={talk.page} label="Conversation" />
      <div className="grid split">
        <header className="split__head" data-reveal>
          <p className="talk__heading" aria-hidden="true">
            <span>{talk.heading[0]}</span>
            <span className="talk__heading-2">{talk.heading[1]}</span>
          </p>
          <h2 id="talk-title" className="talk__title">
            {talk.title}
          </h2>
          <p className="talk__sub">{talk.sub}</p>
          <Frame figure={talk.figure} id="plate-talk" ratio="34" className="talk__figure" />
        </header>
        <dl className="split__body talk" data-reveal>
          {talk.remarks.map((r, i) => (
            <div key={i} className="talk__row">
              <dt className="mono talk__who">{r.speaker}</dt>
              <dd>{r.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
