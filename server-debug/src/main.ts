import './style.css'

const FIELD_SIZE = [12, 4] // [x, y]
const TERMS_SIZE = [6, 6] // [x, y]

const refreshField = (): void => {
  const fieldBlock = document.getElementById('field')
  if (fieldBlock === null) return

  const isWall = (x: number, y: number): boolean => {
    if (x === 0 || x === FIELD_SIZE[0] + 1) return true
    if (y === 0 || y === FIELD_SIZE[1] + 1) return true
    return false
  }
  let html = ''
  for (let y = 0; y < FIELD_SIZE[1] + 2; y++) {
    for (let x = 0; x < FIELD_SIZE[0] + 2; x++) {
      if (isWall(x, y)) {
        html += /*html*/ `<div class="cell bg-gray"></div>`
      } else {
        html += /*html*/ `<div class="cell"></div>`
      }
    }
  }
  fieldBlock.innerHTML = html;
}

// TODO: term pos
const refreshTerms = (terms: number[], isYou = true): void => {
  const termsBlock = document.getElementById(isYou ? 'terms-you' : 'terms-enemy')
  if (termsBlock === null) return

  let html = ''
  for (let y = 0; y < TERMS_SIZE[1]; y++) {
    for (let x = 0; x < TERMS_SIZE[0]; x++) {
      html += /*html*/ `<div class="cell"></div>`
    }
  }
  termsBlock.innerHTML = html;
}

const loadLocalStorage = (): void => {
  // start-session-user-id
  const userId = localStorage.getItem('start-session-user-id')
  const userIdInput = document.getElementById('start-session-user-id')
  if (userId === null || userIdInput === null) return
  (userIdInput as HTMLInputElement).value = userId
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/ `
<header class="flex gap-x-4">
  <h1 class="w-32">LETTERS</h1>
  <button type="button" id="menu-debugger" class="w-32">Debugger</button>
  <button type="button" id="menu-users" class="w-32">Users</button>
  <button type="button" id="menu-golems" class="w-32">Golems</button>
  <button type="button" id="menu-sessions" class="w-32">Sessions</button>
</header>
<main>
  <div class="my-4">
    <div class="flex gap-x-4">
    <div>
      <h2>Field</h2>
      <div id="field" class="grid-field"></div>
      <div>
        <div>Session ID: <span id="session-id">xxxx</span></div>
        <div>Phase: <span id="session-phase">9999</span></div>
        <div>Turn: <span id="session-turn">9999</span></div>
      </div>
    </div>
    <div>
      <h2>You</h2>
      <div id="terms-you" class="grid-terms"></div>
      <div>
        <div>User ID: <span id="you-user-id">xxxx</span></div>
        <div>Golem ID: <span id="you-golem-id">xxxx</span></div>
        <div>Rate: <span id="you-rate">9999</span></div>
        <div>HP: <span id="you-hp">9999</span></div>
        <div>GD: <span id="you-gd">9999</span></div>
      </div>
    </div>
    <div>
      <h2>Enemy</h2>
      <div id="terms-enemy" class="grid-terms"></div>
      <div>
        <div>User ID: <span id="enemy-user-id">xxxx</span></div>
        <div>Golem ID: <span id="enemy-golem-id">xxxx</span></div>
        <div>Rate: <span id="enemy-rate">9999</span></div>
        <div>HP: <span id="enemy-hp">9999</span></div>
        <div>GD: <span id="enemy-gd">9999</span></div>
      </div>
    </div>
  </div>
  <div class="my-4">
    <h2>API</h2>
    <div class="flex gap-x-4">
      <div class="w-32">
        <button id="register-user" type="button" class="w-full">register-user</button>
      </div>
      <div class="w-32">
        <button id="start-session" type="button" class="w-full">start-session</button>
        <div>User ID</div>
        <input type="text" id="start-session-user-id" class="w-full" />
      </div>
      <div class="w-32">
        <button id="start-battle" type="button" class="w-full">start-battle</button>
        <div>Terms</div>
        <textarea rows="6" id="start-battle-terms" class="w-full"></textarea>
      </div>
      <div class="w-32">
        <button id="reroll-terms" type="button" class="w-full">reroll-terms</button>
      </div>
    </div>
  </div>
</main>
<footer>
</footer>
`

// 初期化
refreshField()
refreshTerms([], true) // You
refreshTerms([], false) // Enemy
loadLocalStorage()

// ボタン
document.getElementById('register-user')?.addEventListener('click', async () => {
  // リクエスト
  const { userId } = await registerUser()
  // ユーザー ID の入力欄に設定する
  const userIdInput = document.getElementById('start-session-user-id')
  if (userIdInput === null) return
  (userIdInput as HTMLInputElement).value = userId
  localStorage.setItem('start-session-user-id', userId)
})
document.getElementById('start-session')?.addEventListener('click', async () => {
})
document.getElementById('start-battle')?.addEventListener('click', async () => {
})

// 通信
export interface RegisterUserResponse {
  userId: string // User.id 
}
const registerUser = async(): Promise<RegisterUserResponse> => {
  const data = {}
  const url = `${import.meta.env.VITE_API_BASE_URL}/api/register-user`
  return fetch(url, { method: 'POST', body: JSON.stringify(data)})
    .then(async res => {
      const json = await res.json()
      console.log(url, { data, json })
      return json
    })
}

const startSession = () => {

}

const startBattle = () => {

}
