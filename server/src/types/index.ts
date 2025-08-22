import type { KVNamespace } from '@cloudflare/workers-types'
import { ActionType } from '../enums'

/**
 * Cloudflare Binding 設定
 */
export interface CloudflareBindings {
  USERS: KVNamespace
  GOLEMS: KVNamespace
  SESSIONS: KVNamespace
}

/**
 * アクション
 * n ターン目に起きたこと
 */
export interface Action {
  actionType: ActionType // 動作タイプ
}

/**
 * 名辞
 */
export interface Term {
  id: number // 名辞 ID
  position: number[] // 座標 [x, y]
}
