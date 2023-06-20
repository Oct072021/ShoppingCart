import { UI } from "./class/UI.js"

const ui = new UI()

ui.doms.goodsContainer.addEventListener('click', (e) => {
  const index = +e.target.getAttribute('index')
  if (e.target.classList.contains('i-jiajianzujianjiahao')) {
    ui.increase(index)
  } else if (e.target.classList.contains('i-jianhao')) {
    ui.decrease(index)
  }
})