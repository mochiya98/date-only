export function escapeRegExp(pattern: string): string {
  return pattern.replace(/[.*+?^=!:${}()|[\]/\\]/g, "\\$&"); // $&はマッチした部分文字列全体を意味します
}
