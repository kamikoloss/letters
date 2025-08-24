import type { Action, Term } from '.'

/**
 * ユーザー
 * 
 * key: "<randomString16>"
 */
export interface User {
  //name: number[] // ユーザー名
  rate: number // レート
}

/**
 * ゴーレム
 * 
 * フェーズごとのスナップショット
 * 対戦相手の検索に使用する
 * 
 * key: "<phase>:<レートクラス>:<unixtimeDesc>:<randomString4>"
 * TODO: 複数キャラ対応時にキャラごとのレートにする
 */
export interface Golem {
  loseCount: number // 敗北数
  //name: number[] // ゴーレム名
  terms: Term[] // 名辞の構成
  userId: string // ユーザー ID
  //userNames: number[] // ユーザー名
  //version: string // API バージョン
  winCount: number // 勝利数
}

/**
 * セッション
 * 
 * key: "<User.id>:<unixtimeDesc>"
 */
export interface Session {
  latestGolemId: string // 最新のゴーレム ID
  latestTermIds: number[] // 最新の名辞の選択肢
  phase: number // フェーズ数
  //remainingMoney: number // 残り金額
  //termIdsHistory: number[][] // 提示されたすべての名辞の選択肢の履歴
  userId: string // ユーザー ID
}

/**
 * バトル
 * 
 * 1戦ごとの内容
 */
export interface Battle {
  actions: Action[] // アクション履歴
  // TODO
}
