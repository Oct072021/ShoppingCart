import { UI } from './modules/UI.js'

const ui = new UI()

// 新增/减少商品
ui.doms.goodsContainer.addEventListener('click', (e) => {
  const index = +e.target.getAttribute('index')
  if (e.target.classList.contains('i-jiajianzujianjiahao')) {
    ui.increase(index)
  } else if (e.target.classList.contains('i-jianhao')) {
    ui.decrease(index)
  }
})

// 菜单导航
ui.doms.menu.addEventListener('click', (e) => {
  const index = +e.target.getAttribute('index')
  ui.swithMenu(index)
})

// 当前商品对应的菜单
ui.doms.goodsContainer.addEventListener('wheel', (e) => {
  const topElem = document.elementFromPoint(100, 10)
  const from = topElem.getAttribute('from')
  ui.swithMenu(from)
})

ui.doms.pay.addEventListener('click', (e) => {
  const dialog = ui.doms.collection
  dialog.showModal()
})
