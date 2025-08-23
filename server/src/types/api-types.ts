import type { Action } from '.'
// NOTE: number[] の名前は定数の組み合わせ
// TODO: 選択肢は enum[] にする？

/**
 * ユーザー登録 リクエスト
 */
export interface RegisterUserRequest {
  //
}

/**
 * ユーザー登録 レスポンス
 */
export interface RegisterUserResponse {
  // 
}

/**
 * セッション開始 リクエスト
 */
export interface StartSessionRequest {
  //golemName: number[] // ゴーレム名
  userId: string // User.id
}

/**
 * セッション開始 レスポンス
 */
export interface StartSessionResponse {
  sessionId: string // セッション ID
  termIds: number[] // 名辞の選択肢
}

/**
 * バトル開始 リクエスト
 */
export interface StartBattleRequest {
  sessionId: string // セッション ID
  termIds: number[] // 選択した名辞の選択肢
}

/**
 * バトル開始 レスポンス
 */
export interface StartBattleResponse {
  actions: Action[] // アクション履歴
  //enemyGolemName: number[] // 対戦相手のゴーレム名
  //enemyUserName: number[] // 対戦相手のユーザー名
  loseCount: number // 敗北数
  //remainingMoney: number // 残り金額
  termIds: number[] // 名辞の選択肢
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
  //remainingMoney: number // 残り金額
  //termIds: number[] // 名辞の選択肢
}
