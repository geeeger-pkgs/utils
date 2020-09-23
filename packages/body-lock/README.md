# bridge

锁移动端背景滚动

## Usage

```javascript
import { lock, unlock } from "@geeeger/body-lock"
import randomId from "@geeeger/random-id"

export default function alert(message: string, title: string = '提示') {
  return new Promise((resolve) => {
    const div = document.createElement('div')
    div.className = 'cube-alert'
    div.id = randomId()
    const template = `<div class="box"><div class="title">${title}</div><div class="info">${message}</div><div class="foot"><div class="ok">确定</div></div></div>`
    div.innerHTML = template
    document.body.appendChild(div)
    const target = document.getElementById(div.id)
    lock()
    if (target) {
      const confirm = target.querySelector(".foot")
      if (confirm) {
        confirm.addEventListener('click', () => {
          document.body.removeChild(target)
          resolve()
          unlock()
        })
      }
    }
  })
}

```
