import { Hono } from 'hono'
import type { CloudflareBindings } from './types'
import type {
  StartBattleRequest,
  StartBattleResponse,
  StartSessionRequest,
  StartSessionResponse,
} from './types/api-types'
import { getRandomTerms, getUnixtimeDesc } from './utils'
import type { Golem, Session } from './types/db-types'

type Env = {
  Bindings: CloudflareBindings
}

const app = new Hono<Env>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

/**
 * セッション開始
 */
app.post('/api/start-session', async (c) => {
  const req = await c.req.parseBody<StartSessionRequest>()

  // 名辞の選択肢を抽選する
  const randomTerms = getRandomTerms()

  // ゴーレムデータを作成する
  const golemKey = `0:X:${getUnixtimeDesc()}`
  const golem: Golem = {
    loseCount: 0,
    name: [], // TODO
    terms: [],
    userId: req.userId,
    userNames: [], // TODO
    version: '', // TODO
    winCount: 0,
  }
  c.env.SESSIONS.put(golemKey, JSON.stringify(golem))

  // セッションデータを作成する
  const sessionKey = `${req.userId}:${getUnixtimeDesc()}`
  const session: Session = {
    latestGolemId: golemKey,
    latestTerms: randomTerms,
    phase: 0,
    termsHistory: [randomTerms],
    userId: req.userId,
  }
  c.env.SESSIONS.put(sessionKey, JSON.stringify(session))

  // レスポンス
  const res: StartSessionResponse = {
    sessionId: sessionKey,
    terms: randomTerms,
  }
  return c.json(res)
})

/**
 * バトル開始
 */
app.post('/api/start-battle', async (c) => {
  const req = await c.req.parseBody<StartBattleRequest>()

  // セッションデータを取得する
  const session = await c.env.SESSIONS.get<Session>(req.sessionId, 'json')
  if (session === null) return c.json({ error: 'session is not found.' })

  // ゴーレムデータを取得する
  const golem = await c.env.GOLEMS.get<Golem>(session.latestGolemId, 'json')
  if (session === null) return c.json({ error: 'session is not found.' })

  // TODO: 対戦相手のゴーレムを抽選する

  // TODO: 対戦内容をシミュレートする

  // ゴーレムデータを作成する
  const golemKey = `${session.phase}:X:${getUnixtimeDesc()}`
  c.env.SESSIONS.put(golemKey, JSON.stringify(golem))

  // セッションデータを更新する

  // TODO: レスポンス
  const res: StartBattleResponse = {
    actions: [],
    enemyGolemName: [],
    enemyUserName: [],
    loseCount: 0,
    remainingMoney: 100,
    terms: [],
    winCount: 0,
  }
})

/**
 * TODO: リロール
 */

export default app
