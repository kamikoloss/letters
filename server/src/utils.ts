
const RANDOM_STRING_BASE = 'abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const UNIXTIME_DESC_BASE = 1000000000000

/**
 * ランダム文字列を取得する
 */
export function getRandomString(length: number): string {
  let result = ''
  const baseLength = RANDOM_STRING_BASE.length
  for (let i = 0; i < length; i++) {
    result += RANDOM_STRING_BASE.charAt(Math.floor(Math.random() * baseLength))
  }
  return result
}

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
export function getRandomTermIds(): number[] {
  // TODO
  return [1,2,3,4,5]
}
