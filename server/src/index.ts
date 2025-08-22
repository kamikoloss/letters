import { Hono } from 'hono'
import type { CloudflareBindings } from './types'
import type {
  StartBattleRequest,
  StartBattleResponse,
  StartSessionRequest,
  StartSessionResponse,
} from './types/api-types'
import { getRandomTerms, getUnixtimeDesc } from './utils'

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

  // セッションデータを作成する
  const sessionKey = `${req.userId}:${getUnixtimeDesc()}`
  c.env.SESSIONS.put(sessionKey, JSON.stringify({ termsHistory: [randomTerms] }))

  // レスポンス
  const res: StartSessionResponse = {
    sessionId: sessionKey,
    terms: randomTerms,
  }
  return c.json(res)
})


export default app
