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
  const userId = generateUserId()
  const user: User = {
    //name: [],
    rate: 1500, // TODO: const
  }
  await c.env.USERS.put(userId, JSON.stringify(user))

  // レスポンス
  const res: RegisterUserResponse = {
    userId: userId,
  }
  return c.json(res)
})

/**
 * セッション開始
 */
app.post('/api/start-session', async (c) => {
  const { userId } = await c.req.json<StartSessionRequest>()
  const phase = 0
  console.log('/api/start-session', { userId })

  // ユーザーデータを取得する
  const user = await c.env.USERS.get<User>(userId, 'json')
  if (user === null) return c.json({ error: 'user is not found.', user })

  // 名辞の選択肢を抽選する
  const randomTermIds = getRandomTermIds()

  // ゴーレムデータを作成する
  const golemId = generateGolemId(phase, user.rate)
  const golem: Golem = {
    loseCount: 0,
    //name: [],
    terms: [],
    userId: userId,
    //userNames: [],
    //version: '',
    winCount: 0,
  }
  await c.env.GOLEMS.put(golemId, JSON.stringify(golem))

  // セッションデータを作成する
  const sessionKey = generateSessionId(userId)
  const session: Session = {
    latestGolemId: golemId,
    latestTermIds: randomTermIds,
    phase: phase,
    //remainingMoney: 100,
    //termsHistory: [randomTerms],
    userId: userId,
  }
  await c.env.SESSIONS.put(sessionKey, JSON.stringify(session))

  // レスポンス
  const res: StartSessionResponse = {
    sessionId: sessionKey,
    termIds: randomTermIds,
  }
  return c.json(res)
})

/**
 * バトル開始
 */
app.post('/api/start-battle', async (c) => {
  const { sessionId, terms } = await c.req.json<StartBattleRequest>()
  //console.log('/api/start-battle', { req })

  // セッションデータを取得する
  const session = await c.env.SESSIONS.get<Session>(sessionId, 'json')
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
app.post('/api/reroll-terms', async (c) => {
})

const generateUserId = () => {
  return getRandomString(16)
}
const generateSessionId = (userId: string) => {
  return `${userId}:${getUnixtimeDesc()}`
}
const generateGolemId = (phase: number, rate: number) => {
  // TODO: rate によるクラス分け, いまは X 固定
  return `${phase}:X:${getUnixtimeDesc()}:${getRandomString(4)}`
}

export default app
