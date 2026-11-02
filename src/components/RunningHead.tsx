import { pad2 } from "@/lib/format";
import { issue } from "@/lib/issue";

type RunningHeadProps = {
  page: number;
  /** 右側の「p.04 — 」の後ろ（Feature 01 など） */
  label: string;
};

/** 頁の頭の柱。左に誌名と号、右に「p.04 — Feature 01」。下に 1px の罫 */
export function RunningHead({ page, label }: RunningHeadProps) {
  return (
    <div className="running-head mono" aria-hidden="true">
      <span className="running-head__title">
        {issue.journal} No.{issue.no}
      </span>
      <span>
        p.{pad2(page)} — {label}
      </span>
    </div>
  );
}
