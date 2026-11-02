import type { ReactNode } from "react";
import type { PlateScene } from "@/lib/issue";

/**
 * 図版（写真の代わりに SVG で描いた絵）。粒子（feTurbulence）と周辺減光を重ねて写真らしく見せる。
 * 色味は彩度を落とした灰・生成り・藍・墨。夜の店だけ暖かい灯り（docs/design.md「図版（写真）の扱い」）。
 */
type PlateProps = {
  scene: PlateScene;
  /** 何が写っているか（必須） */
  label: string;
  /** ページの中で一意の名前（フィルターの id に使う） */
  id: string;
  /** 同じ絵柄を暗く描く（墨のシャツなど） */
  tone?: "light" | "dark";
  className?: string;
};

/** 同じ入力なら同じ並びになる乱数（描くたびに絵が変わらないように） */
function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const SIZE: Record<PlateScene, [number, number]> = {
  sea: [1600, 1000],
  fogBeach: [800, 1000],
  workshop: [800, 1000],
  linen: [800, 1000],
  nightStore: [800, 1000],
  knit: [800, 1000],
  folded: [800, 1000],
};

function streaks(
  rand: () => number,
  count: number,
  w: number,
  yFrom: number,
  yTo: number,
  color: string,
  maxOpacity: number,
): ReactNode[] {
  const out: ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    const t = rand();
    const y = yFrom + (yTo - yFrom) * Math.pow(t, 0.85);
    const rx = w * (0.08 + rand() * 0.35);
    const cx = rand() * w;
    const ry = 2 + (y - yFrom) / (yTo - yFrom) * 9 * rand();
    out.push(
      <ellipse
        key={i}
        cx={cx}
        cy={y}
        rx={rx}
        ry={ry}
        fill={color}
        opacity={(0.15 + rand() * 0.85) * maxOpacity}
      />,
    );
  }
  return out;
}

function Sea({ id, w, h }: { id: string; w: number; h: number }) {
  const rand = seeded(7);
  const horizon = h * 0.6;
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#384143" />
          <stop offset="0.55" stopColor="#66706c" />
          <stop offset="0.86" stopColor="#a9a493" />
          <stop offset="1" stopColor="#c4bcaa" />
        </linearGradient>
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8a291" />
          <stop offset="0.25" stopColor="#7a7d74" />
          <stop offset="0.7" stopColor="#434a49" />
          <stop offset="1" stopColor="#262c2d" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="22 3" />
        </filter>
        <filter id={`${id}-haze`} x="-20%" y="-100%" width="140%" height="300%">
          <feGaussianBlur stdDeviation="14 5" />
        </filter>
      </defs>
      <rect width={w} height={horizon} fill={`url(#${id}-sky)`} />
      <ellipse
        cx={w * 0.52}
        cy={horizon - 30}
        rx={w * 0.4}
        ry={60}
        fill="#cfc7b4"
        opacity="0.45"
        filter={`url(#${id}-haze)`}
      />
      <ellipse
        cx={w * 0.8}
        cy={horizon}
        rx={w * 0.22}
        ry={20}
        fill="#4b4c48"
        opacity="0.85"
        filter={`url(#${id}-haze)`}
      />
      <rect y={horizon} width={w} height={h - horizon} fill={`url(#${id}-water)`} />
      <g filter={`url(#${id}-soft)`}>
        {streaks(rand, 46, w, horizon + 6, h, "#d9d2c0", 0.5)}
        {streaks(rand, 26, w, horizon + 40, h, "#1e2324", 0.55)}
      </g>
      <rect y={horizon - 1} width={w} height={2} fill="#d7d0bf" opacity="0.55" />
    </>
  );
}

function FogBeach({ id, w, h }: { id: string; w: number; h: number }) {
  const rand = seeded(19);
  const horizon = h * 0.33;
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfc1ba" />
          <stop offset="1" stopColor="#e6e3da" />
        </linearGradient>
        <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c5c7c1" />
          <stop offset="1" stopColor="#8b918d" />
        </linearGradient>
        <linearGradient id={`${id}-sand`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cbc3b1" />
          <stop offset="1" stopColor="#a89e8a" />
        </linearGradient>
        <filter id={`${id}-soft`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="16 3" />
        </filter>
        <filter id={`${id}-fig`}>
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      <rect width={w} height={horizon} fill={`url(#${id}-sky)`} />
      <rect y={horizon} width={w} height={h - horizon} fill={`url(#${id}-water)`} />
      <g filter={`url(#${id}-soft)`}>
        {streaks(rand, 34, w, horizon + 10, h * 0.85, "#eeeae1", 0.6)}
        {streaks(rand, 14, w, horizon + 80, h * 0.85, "#727873", 0.4)}
      </g>
      <g filter={`url(#${id}-fig)`} fill="#3b3e3c">
        <circle cx={w * 0.64} cy={h * 0.68} r={6} />
        <rect x={w * 0.64 - 6} y={h * 0.68 + 6} width={12} height={62} />
      </g>
      <rect
        x={w * 0.64 - 5}
        y={h * 0.68 + 70}
        width={10}
        height={34}
        fill="#3b3e3c"
        opacity="0.18"
        filter={`url(#${id}-fig)`}
      />
      <path
        d={`M0 ${h * 0.8} C ${w * 0.3} ${h * 0.76}, ${w * 0.6} ${h * 0.79}, ${w} ${h * 0.86} L ${w} ${h} L 0 ${h} Z`}
        fill={`url(#${id}-sand)`}
      />
    </>
  );
}

function Workshop({ id, w, h, dark }: { id: string; w: number; h: number; dark: boolean }) {
  const wall = dark ? "#6f6c66" : "#b8b2a5";
  const bars: ReactNode[] = [];
  for (let i = 0; i < 4; i++) {
    bars.push(
      <path
        key={i}
        d={`M ${80 + i * 120} ${h * 0.72} l 70 0 l 140 ${h * 0.28} l -70 0 Z`}
        fill="#4e4a43"
        opacity="0.35"
      />,
    );
  }
  return (
    <>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={dark ? "#8a867e" : "#d3cdbf"} />
          <stop offset="1" stopColor={wall} />
        </linearGradient>
        <filter id={`${id}-blur`}>
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={`${id}-blur2`}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect width={w} height={h} fill={`url(#${id}-wall)`} />
      <g filter={`url(#${id}-blur)`}>
        <rect x={40} y={90} width={320} height={430} fill="#ece7dc" opacity="0.9" />
      </g>
      <g stroke="#57534c" strokeWidth="10" opacity="0.7" filter={`url(#${id}-blur2)`}>
        <line x1={200} y1={90} x2={200} y2={520} />
        <line x1={40} y1={300} x2={360} y2={300} />
        <rect x={40} y={90} width={320} height={430} fill="none" />
      </g>
      <g filter={`url(#${id}-blur2)`}>
        <line x1={590} y1={120} x2={590} y2={170} stroke="#4a463f" strokeWidth="3" />
        <path d="M520 170 L660 170 L700 250 L680 640 L500 640 L480 250 Z" fill={dark ? "#8f8b83" : "#e1dbcd"} />
        <path d="M520 170 L590 210 L660 170" fill="none" stroke="#9a9488" strokeWidth="4" />
        <path d="M590 210 L590 640" stroke="#b5ae9f" strokeWidth="3" opacity="0.6" />
      </g>
      <rect y={h * 0.72} width={w} height={h * 0.28} fill={dark ? "#4e4a43" : "#8b8275"} />
      <rect y={h * 0.72} width={w} height={6} fill="#ddd6c8" opacity="0.5" />
      <g filter={`url(#${id}-blur2)`}>{bars}</g>
    </>
  );
}

function Linen({ id, w, h, dark }: { id: string; w: number; h: number; dark: boolean }) {
  const base = dark ? "#4a4843" : "#d4ccbb";
  const hi = dark ? "#7a766d" : "#ece6d8";
  const lo = dark ? "#22211f" : "#9f9684";
  return (
    <>
      <defs>
        <pattern id={`${id}-weave`} width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="1.5" fill={hi} opacity="0.08" />
          <rect width="1.5" height="3" fill={lo} opacity="0.07" />
        </pattern>
        <filter id={`${id}-fold`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
      </defs>
      <rect width={w} height={h} fill={base} />
      <g filter={`url(#${id}-fold)`}>
        <path d={`M -100 ${h * 0.2} C 200 ${h * 0.1}, 500 ${h * 0.45}, ${w + 100} ${h * 0.3}`} stroke={hi} strokeWidth="90" fill="none" opacity="0.8" />
        <path d={`M -100 ${h * 0.42} C 250 ${h * 0.32}, 450 ${h * 0.62}, ${w + 100} ${h * 0.5}`} stroke={lo} strokeWidth="70" fill="none" opacity="0.7" />
        <path d={`M -100 ${h * 0.68} C 300 ${h * 0.55}, 520 ${h * 0.85}, ${w + 100} ${h * 0.72}`} stroke={hi} strokeWidth="110" fill="none" opacity="0.7" />
        <path d={`M -100 ${h * 0.9} C 200 ${h * 0.82}, 600 ${h}, ${w + 100} ${h * 0.92}`} stroke={lo} strokeWidth="80" fill="none" opacity="0.6" />
      </g>
      <rect width={w} height={h} fill={`url(#${id}-weave)`} />
    </>
  );
}

function NightStore({ id, w, h }: { id: string; w: number; h: number }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#151616" />
          <stop offset="1" stopColor="#24221f" />
        </linearGradient>
        <radialGradient id={`${id}-lamp`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e2b57a" />
          <stop offset="0.6" stopColor="#a8693a" />
          <stop offset="1" stopColor="#4a3122" />
        </radialGradient>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="40" />
        </filter>
        <filter id={`${id}-soft`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id={`${id}-wet`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="6 14" />
        </filter>
      </defs>
      <rect width={w} height={h} fill={`url(#${id}-sky)`} />
      <rect x={60} y={180} width={680} height={560} fill="#2b2926" />
      <ellipse cx={400} cy={430} rx={260} ry={200} fill="#b47a45" opacity="0.35" filter={`url(#${id}-glow)`} />
      <g filter={`url(#${id}-soft)`}>
        <rect x={180} y={300} width={300} height={260} fill={`url(#${id}-lamp)`} />
        <g stroke="#2b2926" strokeWidth="8">
          <line x1={330} y1={300} x2={330} y2={560} />
          <line x1={180} y1={430} x2={480} y2={430} />
        </g>
        <rect x={540} y={360} width={110} height={380} fill="#3a3530" />
        <rect x={556} y={380} width={78} height={150} fill="#7a5233" opacity="0.6" />
        <circle cx={300} cy={360} r={14} fill="#f0d3a2" />
      </g>
      <rect y={740} width={w} height={h - 740} fill="#121313" />
      <g filter={`url(#${id}-wet)`}>
        <rect x={210} y={760} width={240} height={180} fill="#a8693a" opacity="0.35" />
        <rect x={290} y={760} width={30} height={200} fill="#e2b57a" opacity="0.25" />
      </g>
    </>
  );
}

function Knit({ id, w, h }: { id: string; w: number; h: number }) {
  return (
    <>
      <defs>
        <pattern id={`${id}-st`} width="56" height="68" patternUnits="userSpaceOnUse">
          <rect width="56" height="68" fill="#7d7b75" />
          <path d="M4 2 Q 14 40 28 64 Q 42 40 52 2" fill="none" stroke="#a9a69e" strokeWidth="15" strokeLinecap="round" />
          <path d="M6 8 Q 15 44 28 66 Q 41 44 50 8" fill="none" stroke="#585650" strokeWidth="3" opacity="0.5" />
        </pattern>
        <linearGradient id={`${id}-light`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efebe2" stopOpacity="0.25" />
          <stop offset="0.5" stopColor="#efebe2" stopOpacity="0" />
          <stop offset="1" stopColor="#1d1c1a" stopOpacity="0.3" />
        </linearGradient>
        <filter id={`${id}-dof`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="2" seed="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="40" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>
      <g filter={`url(#${id}-dof)`}>
        <rect x={-80} y={-80} width={w + 160} height={h + 160} fill={`url(#${id}-st)`} />
      </g>
      <rect width={w} height={h} fill={`url(#${id}-light)`} />
    </>
  );
}

function Folded({ id, w, h }: { id: string; w: number; h: number }) {
  const layers = [
    { y: 640, c: "#d9d2c3" },
    { y: 580, c: "#9b978e" },
    { y: 530, c: "#e7e1d3" },
    { y: 470, c: "#4b4a46" },
    { y: 420, c: "#ddd6c6" },
  ];
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9c2b4" />
          <stop offset="1" stopColor="#ada596" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
        <filter id={`${id}-soft`}>
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>
      <rect width={w} height={h} fill={`url(#${id}-bg)`} />
      <rect x={90} y={0} width={240} height={h} fill="#e8e3d8" opacity="0.25" filter={`url(#${id}-shadow)`} />
      <ellipse cx={w / 2} cy={720} rx={300} ry={40} fill="#3b3833" opacity="0.5" filter={`url(#${id}-shadow)`} />
      <g filter={`url(#${id}-soft)`}>
        {layers.map((l, i) => (
          <g key={i}>
            <path
              d={`M ${170 + i * 4} ${l.y} L ${630 - i * 3} ${l.y} L ${640 - i * 3} ${l.y + 64} L ${160 + i * 4} ${l.y + 64} Z`}
              fill={l.c}
            />
            <rect x={170 + i * 4} y={l.y + 54} width={460 - i * 7} height={10} fill="#1d1c1a" opacity="0.12" />
          </g>
        ))}
      </g>
    </>
  );
}

export function Plate({ scene, label, id, tone = "light", className }: PlateProps) {
  const [w, h] = SIZE[scene];
  const dark = tone === "dark";
  let body: ReactNode;
  switch (scene) {
    case "sea":
      body = <Sea id={id} w={w} h={h} />;
      break;
    case "fogBeach":
      body = <FogBeach id={id} w={w} h={h} />;
      break;
    case "workshop":
      body = <Workshop id={id} w={w} h={h} dark={dark} />;
      break;
    case "linen":
      body = <Linen id={id} w={w} h={h} dark={dark} />;
      break;
    case "nightStore":
      body = <NightStore id={id} w={w} h={h} />;
      break;
    case "knit":
      body = <Knit id={id} w={w} h={h} />;
      break;
    case "folded":
      body = <Folded id={id} w={w} h={h} />;
      break;
  }
  return (
    <svg
      className={className ? `plate ${className}` : "plate"}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
    >
      <defs>
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <radialGradient id={`${id}-vignette`} cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity={scene === "nightStore" ? 0.6 : 0.38} />
        </radialGradient>
      </defs>
      {body}
      <rect
        width={w}
        height={h}
        filter={`url(#${id}-grain)`}
        opacity="0.16"
        style={{ mixBlendMode: "overlay" }}
      />
      <rect width={w} height={h} fill={`url(#${id}-vignette)`} />
    </svg>
  );
}
