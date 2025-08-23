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

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/ `
<header>
  <h1>LETTERS Debugger</h1>
</header>
<main>
  <div class="my-4">
    <div class="flex gap-x-4">
    <div>
      <h2>Field</h2>
      <div id="field" class="grid-field"></div>
      <div>Turn: <span id="battle-turn">x</span></div>
    </div>
    <div>
      <h2>You</h2>
      <div id="terms-you" class="grid-terms"></div>
      <div>HP: <span id="you-hp">x</span></div>
    </div>
    <div>
      <h2>Enemy</h2>
      <div id="terms-enemy" class="grid-terms"></div>
      <div>HP: <span id="enemy-hp">x</span></div>
    </div>
  </div>
  <div class="my-4">
    <h2>API</h2>
    <div>
      <input type="text" />
      <button id="register-user" type="button">register-user</button>
    </div>
    <button id="start-session" type="button">start-session</button>
    <button id="start-battle" type="button">start-battle</button>
  </div>
</main>
<footer>
</footer>
`

// 初期化
refreshField()
refreshTerms([], true) // You
refreshTerms([], false) // Enemy

// ボタン
document.getElementById('register-user')?.addEventListener('click', () => {
})
document.getElementById('start-session')?.addEventListener('click', () => {
})
document.getElementById('start-battle')?.addEventListener('click', () => {
})

// 通信
const registerUser = () => {

}
const startSession = () => {

}
const startBattle = () => {

}
