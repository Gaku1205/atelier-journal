import { formatFig } from "@/lib/format";
import type { Figure } from "@/lib/issue";
import { Plate } from "./Plate";

type FrameProps = {
  figure: Figure;
  /** ページの中で一意の名前（図版のフィルターの id） */
  id: string;
  ratio?: "34" | "45";
  tone?: "light" | "dark";
  /** キャプションを出すか */
  caption?: boolean;
  /** 図版を画面の端まで断ち落とす（l：左、r：右） */
  bleed?: "l" | "r";
  className?: string;
};

/** 図版の枠（.frame）とキャプション「Fig.01 — …」 */
export function Frame({
  figure,
  id,
  ratio = "45",
  tone,
  caption = true,
  bleed,
  className,
}: FrameProps) {
  return (
    <figure className={["figure", className].filter(Boolean).join(" ")}>
      <div className={`frame frame--${ratio}${bleed ? ` frame--bleed-${bleed}` : ""}`}>
        <Plate scene={figure.scene} label={figure.label} id={id} tone={tone} />
      </div>
      {caption && figure.caption ? (
        <figcaption className="caption">
          {formatFig(figure.no)} — {figure.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
