import type { Action } from '.'
// NOTE: number[] の名前は定数の組み合わせ
// TODO: 選択肢は enum[] にする？

/**
 * ゲーム開始 リクエスト
 */
export interface StartGameRequest {
  golemName: number[] // ゴーレム名
  userId: string // User.id
}

/**
 * ゲーム開始 レスポンス
 */
export interface StartGameResponse {
  sessionId: string // セッション ID
  terms: number[] // 名辞の選択肢
}

/**
 * バトル開始 リクエスト
 */
export interface StartBattleRequest {
  terms: number[] // 名辞の選択肢
}

/**
 * バトル開始 レスポンス
 */
export interface StartBattleResponse {
  actions: Action[] // アクション履歴
  enemyGolemName: number[] // 対戦相手のゴーレム名
  enemyUserName: number[] // 対戦相手のユーザー名
  loseCount: number // 敗北数
  remainingMoney: number // 残り金額
  terms: number[] // 名辞の選択肢
  winCount: number // 勝利数
}

/**
 * 名辞選択肢リロール リクエスト
 */
export interface RerollTermsRequest {
  sessionId: string // セッション ID
}

/**
 * 名辞選択肢リロール リクエスト
 */
export interface RerollTermsResponse {
  remainingMoney: number // 残り金額
  terms: number[] // 名辞の選択肢
}
