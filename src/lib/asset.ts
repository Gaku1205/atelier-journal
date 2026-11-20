/**
 * 公開先の階層（basePath）を付けた道を返す。
 * 例：NEXT_PUBLIC_BASE_PATH=/atelier-journal のとき withBase("/photos/a.jpg") は "/atelier-journal/photos/a.jpg"。
 * 値が無ければ path をそのまま返す（今の公開と同じ道）。
 * 環境変数は呼び出し時に読む（テストで切り替えられるように）。
 */
export function withBase(path: string): string {
  return (process.env.NEXT_PUBLIC_BASE_PATH ?? "") + path;
}
