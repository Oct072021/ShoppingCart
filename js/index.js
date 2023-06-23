import { UI } from "./class/UI.js"

const ui = new UI()

ui.doms.goodsContainer.addEventListener('click', (e) => {
  console.log(e.target);
  const index = +e.target.getAttribute('index')
  if (e.target.classList.contains('i-jiajianzujianjiahao')) {
    ui.increase(index)
  } else if (e.target.classList.contains('i-jianhao')) {
    ui.decrease(index)
  }
})

ui.doms.menu.addEventListener('click', function (e) {
  const index = +e.target.getAttribute('index')
  ui.swithMenu(index)
})