import { Hono } from 'hono'
import type { CloudflareBindings } from './types'
import type {
  RegisterUserResponse,
  StartBattleRequest,
  StartBattleResponse,
  StartSessionRequest,
  StartSessionResponse,
} from './types/api-types'
import type { Golem, Session, User } from './types/db-types'
import { getRandomString, getRandomTermIds, getUnixtimeDesc } from './utils'
import { cors } from 'hono/cors'

type Env = {
  Bindings: CloudflareBindings
}

const app = new Hono<Env>()
app.use('/api/*', cors())

/**
 * ユーザー登録
 */
app.post('/api/register-user', async (c) => {
  // ユーザーデータを作成する
  const userKey = `${getRandomString(16)}`
  const user: User = {
    //name: [],
    rate: 1500, // TODO: const
  }
  await c.env.USERS.put(userKey, JSON.stringify(user))

  // レスポンス
  const res: RegisterUserResponse = {
    userId: userKey,
  }
  return c.json(res)
})

/**
 * セッション開始
 */
app.post('/api/start-session', async (c) => {
  const req = await c.req.parseBody<StartSessionRequest>()
  const phase = 0

  // ユーザーデータを取得する
  const user = await c.env.SESSIONS.get<User>(req.userId, 'json')
  if (user === null) return c.json({ error: 'user is not found.' })

  // 名辞の選択肢を抽選する
  const randomTerms = getRandomTermIds()

  // ゴーレムデータを作成する
  const golemKey = `${phase}:X:${getUnixtimeDesc()}`
  const golem: Golem = {
    loseCount: 0,
    //name: [],
    terms: [],
    userId: req.userId,
    //userNames: [],
    //version: '',
    winCount: 0,
  }
  await c.env.SESSIONS.put(golemKey, JSON.stringify(golem))

  // セッションデータを作成する
  const sessionKey = `${req.userId}:${getUnixtimeDesc()}`
  const session: Session = {
    latestGolemId: golemKey,
    latestTermIds: randomTerms,
    phase: phase,
    //remainingMoney: 100,
    //termsHistory: [randomTerms],
    userId: req.userId,
  }
  await c.env.SESSIONS.put(sessionKey, JSON.stringify(session))

  // レスポンス
  const res: StartSessionResponse = {
    sessionId: sessionKey,
    termIds: randomTerms,
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
  if (session === null) return c.json({ error: 'golem is not found.' })

  // TODO: 対戦相手のゴーレムを抽選する

  // TODO: 対戦内容をシミュレートする

  // ゴーレムデータを作成する
  const golemKey = `${session.phase}:X:${getUnixtimeDesc()}`
  await c.env.SESSIONS.put(golemKey, JSON.stringify(golem))

  // セッションデータを更新する

  // TODO: レスポンス
  const res: StartBattleResponse = {
    actions: [],
    //enemyGolemName: [],
    //enemyUserName: [],
    loseCount: 0,
    //remainingMoney: 100,
    termIds: [],
    winCount: 0,
  }
  return c.json(res)
})

/**
 * TODO: リロール
 */

export default app
