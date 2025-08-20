import { Action } from '.'
// TODO: 選択肢は enum[] にする？

/**
 * ゲーム開始 API リクエスト
 */
export interface StartGameRequest {
  golemName: number[] // ゴーレム名 (選択肢の組み合わせ)
  userId: string // ユーザー識別子
}

/**
 * ゲーム開始 API レスポンス
 */
export interface StartGameResponse {
  sessionId: string // セッション識別子
  terms: number[] // 名辞選択肢
}

/**
 * バトル開始 API リクエスト
 */
export interface StartBattleRequest {
  terms: number[] // 名辞選択肢
}

/**
 * バトル開始 API レスポンス
 */
export interface StartBattleResponse {
  actions: Action[] // アクション履歴
  enemyGolemName: number[] // 対戦相手のゴーレム名
  enemyUserName: number[] // 対戦相手のユーザー名
  loseCount: number // 敗北数
  remainingMoney: number // 残り金額
  terms: number[] // 名辞選択肢
  winCount: number // 勝利数
}

/**
 * 名辞選択肢リロール API リクエスト
 */
export interface RerollTermsRequest {
  // 送信することない？
}

/**
 * 名辞選択肢リロール API リクエスト
 */
export interface RerollTermsResponse {
  remainingMoney: number // 残り金額
  terms: number[] // 名辞選択肢
}
