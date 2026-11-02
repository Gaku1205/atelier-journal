import { formatNewsDate } from "@/lib/format";
import { contents, store } from "@/lib/issue";
import { RunningHead } from "./RunningHead";

/** 店・お知らせ・奥付（p.46）。縦の墨罫で左右に分け、最後に誌名を画面幅いっぱいに */
export function Store() {
  return (
    <section
      id={store.anchor}
      className="page page--last"
      data-folio={store.page}
      data-folio-title={store.heading}
      aria-labelledby="store-title"
    >
      <RunningHead page={store.page} label={store.headingEn} />
      <div className="store">
        <div className="store__left" data-reveal>
          <h2 id="store-title" className="store__title">
            {store.heading}
          </h2>
          <dl className="store__info">
            {store.info.map((s) => (
              <div key={s.term}>
                <dt>{s.term}</dt>
                <dd>{s.detail}</dd>
              </div>
            ))}
          </dl>
          <h3 className="store__sub">お知らせ</h3>
          <ul className="news">
            {store.news.map((n) => (
              <li key={n.date}>
                <time className="mono" dateTime={n.date}>
                  {formatNewsDate(n.date)}
                </time>
                <p>
                  {n.text}
                  {n.isNew ? <em className="new">new</em> : null}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="store__right" data-reveal>
          <nav aria-label="この号の頁（下）">
            <ul className="store__nav">
              {contents.map((c) => (
                <li key={c.anchor}>
                  <a className="link-line link-line--2" href={`#${c.anchor}`}>
                    {c.en}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="colophon">
            <h3 className="store__sub">奥付</h3>
            <dl>
              {store.colophon.map((c) => (
                <div key={c.term}>
                  <dt>{c.term}</dt>
                  <dd>{c.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <p className="endmark" aria-hidden="true">
        Usuzumi
      </p>
    </section>
  );
}
