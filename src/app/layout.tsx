import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--serif",
});

const mincho = Shippori_Mincho({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--mincho",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--mono",
});

export const metadata: Metadata = {
  title: "USUZUMI JOURNAL No.07 — 余白を、まとう。",
  description:
    "海辺の町・凪浦で、麻とウールの服を少量だけ縫うアトリエ USUZUMI の季刊誌。2026 秋冬号。",
};

/** JS が動いたときだけ動きを付ける（html.js）。描画の前に付けて、ちらつかせない */
const jsFlag = "document.documentElement.classList.add('js')";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${serif.variable} ${mincho.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
