import type { Action, Term } from '.'
// TODO: 名辞は座標もいる

/**
 * ユーザー
 */
export interface User {
  /**
   * ユーザー ID
   */
  key: string

  name: number[] // ユーザー名
  rate: number // レーティング
}

/**
 * ゴーレム
 * 
 * フェーズごとのスナップショット
 * 対戦相手の検索に使用する
 */
export interface Golem {
  /**
   * "<phase>:<User.rate>:<unixtimeDesc>:<Golem.id>"
   * 
   * TODO: 複数キャラ対応時にキャラごとのレートにする
   */
  key: string

  id: string // ゴーレム ID
  loseCount: number // 敗北数
  name: number[] // ゴーレム名
  terms: Term[] // 名辞の構成
  userId: string // ユーザー ID
  userNames: number[] // ユーザー名
  version: string // API バージョン
  winCount: number // 勝利数
}

/**
 * セッション
 */
export interface Session {
  /**
   * "<User.id>:<unixtimeDesc>"
   */
  key: string

  termsHistory: number[][] // 提示されたすべての名辞の選択肢の履歴
}

/**
 * バトル
 * 
 * 1戦ごとの内容
 */
export interface Battle {
  /**
   * [key] バトル ID 
   */
  key: string

  actions: Action[] // アクション履歴
  // TODO
}
