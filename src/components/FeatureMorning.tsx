import { feature1 } from "@/lib/issue";
import { Frame } from "./Frame";
import { RunningHead } from "./RunningHead";

/** 読み物1（p.04）。左 7 段に断ち落としの図版、右 4 段に縦組みの題と本文。後半に引用と大小の図版 */
export function FeatureMorning() {
  const [big, small, third] = feature1.figures;
  const [first, ...rest] = feature1.body;
  return (
    <article
      id={feature1.anchor}
      className="page"
      data-folio={feature1.page}
      data-folio-title={feature1.title}
      aria-labelledby="feature-01-title"
    >
      <RunningHead page={feature1.page} label="Feature 01" />
      <div className="grid feature">
        <div className="feature__figure" data-reveal>
          <Frame figure={big} id="plate-f1-a" ratio="45" bleed="l" />
        </div>
        <div className="feature__text">
          <p className="mono kicker" data-reveal>
            {feature1.kicker}
          </p>
          <div className="feature__opening" data-reveal>
            <h2 id="feature-01-title" className="v-title">
              {feature1.titleLines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </h2>
            <div className="feature__lead">
              <p>{feature1.lead}</p>
              <p className="byline">{feature1.byline}</p>
            </div>
          </div>
          <div className="prose" data-reveal>
            <p className="has-dropcap">
              <span className="dropcap">{first.slice(0, 1)}</span>
              {first.slice(1)}
            </p>
            {rest.map((p) => (
              <p key={p.slice(0, 8)}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      <blockquote className="pull" data-reveal>
        <p lang="en">{feature1.quote.en}</p>
        <footer>{feature1.quote.ja}</footer>
      </blockquote>

      <div className="grid stagger">
        <div className="stagger__small" data-reveal>
          <Frame figure={small} id="plate-f1-b" ratio="34" />
        </div>
        <div className="stagger__big" data-reveal>
          <Frame figure={third} id="plate-f1-c" ratio="45" bleed="r" />
        </div>
      </div>
    </article>
  );
}
