import { UI } from './modules/UI.js'

const ui = new UI()

// 添加/移除到购物车
ui.doms.goodsContainer.addEventListener('click', e => {
	const index = +e.target.getAttribute('index')
	if (e.target.classList.contains('i-jiajianzujianjiahao')) {
		ui.increase(index)
	} else if (e.target.classList.contains('i-jianhao')) {
		ui.decrease(index)
	}
})

// 菜单导航
ui.doms.menu.addEventListener('click', e => {
	const index = +e.target.getAttribute('index')
	ui.swithMenu(index)
})

// 当前商品对应的菜单
ui.doms.goodsContainer.addEventListener('scroll', e => {
	const width = document.documentElement.clientWidth
	const topElem = document.elementFromPoint(width - 10, 10)
	const from = topElem.getAttribute('from')
	ui.swithMenu(from)
})

ui.doms.pay.addEventListener('click', e => {
	const dialog = ui.doms.collection
	dialog.showModal()
})
