import type { CSSProperties } from "react";
import { formatFig } from "@/lib/format";
import { feature2 } from "@/lib/issue";
import { Plate } from "./Plate";
import { RunningHead } from "./RunningHead";

const KANJI = ["一", "二", "三", "四", "五", "六", "七"];

/** 読み物2（p.18）。全面の図版（sticky）の上を、紙色のパネルが流れる。本文は縦組み */
export function FeatureLinen() {
  return (
    <article
      id={feature2.anchor}
      className="page page--flush"
      data-folio={feature2.page}
      data-folio-title={feature2.title}
      aria-labelledby="feature-02-title"
    >
      <div className="page-head">
        <RunningHead page={feature2.page} label="Feature 02" />
      </div>
      <div className="linen">
        <div className="linen__stage">
          <Plate
            scene={feature2.figure.scene}
            label={feature2.figure.label}
            id="plate-linen"
            tone="dark"
            className="linen__plate"
          />
          <p className="linen__heading" aria-hidden="true">
            <span>{feature2.heading[0]}</span>
            <span>{feature2.heading[1]}</span>
          </p>
          <p className="linen__caption mono">
            {`${formatFig(feature2.figure.no)} — ${feature2.figure.caption}`}
          </p>
        </div>
        <div className="linen__panels">
          <section className="panel" data-reveal>
            <p className="mono kicker">{feature2.kicker}</p>
            <div className="panel__vertical">
              <h2 id="feature-02-title" className="v-title v-title--panel">
                {feature2.title}
              </h2>
              <div className="v-prose">
                {feature2.body.map((p) => (
                  <p key={p.slice(0, 8)}>{p}</p>
                ))}
              </div>
            </div>
          </section>
          <section className="panel" aria-labelledby="linen-rules" data-reveal>
            <h3 id="linen-rules" className="panel__title">
              {feature2.rulesTitle}
            </h3>
            <ol className="rules poem">
              {feature2.rules.map((r, i) => (
                <li key={r} style={{ "--i": i } as CSSProperties}>
                  <span className="rules__no">{KANJI[i]}</span>
                  <span>{r}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
      <blockquote className="pull pull--after" data-reveal>
        <p lang="en">{feature2.quote.en}</p>
        <footer>{feature2.quote.ja}</footer>
      </blockquote>
    </article>
  );
}
