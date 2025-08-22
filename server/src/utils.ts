
const UNIXTIME_DESC_BASE = 1000000000000

/**
 * 降順用 Unixtime を取得する
 * 
 * (UNIXTIME_DESC_BASE - Unixtime) のゼロ埋め10文字
 */
export function getUnixtimeDesc(): string {
  const unixtime = Math.floor(Date.now())
  return String(UNIXTIME_DESC_BASE - unixtime).padStart(10, '0');
}

/**
 * 名辞の選択肢を抽選する
 */
export function getRandomTerms(): number[] {
  // TODO
  return [1,2,3,4,5]
}
