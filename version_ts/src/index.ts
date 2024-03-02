import './style/add-to-car.scss'
import './style/collection.scss'
import './style/common.scss'
import './style/container.scss'
import './style/footer.scss'

import UI from './modules/UI'

const ui = new UI()

// 添加/移除到购物车
ui.doms.goodsContainer.addEventListener('click', e => {
	const target: HTMLElement = e.target as HTMLElement
	const index: number = +target.getAttribute('index')!

	if (target.classList.contains('i-jiajianzujianjiahao')) {
		ui.increase(index)
	} else if (target.classList.contains('i-jianhao')) {
		ui.decrease(index)
	}
})

// 菜单导航
ui.doms.menu.addEventListener('click', e => {
	const target: HTMLElement = e.target as HTMLElement
	const index: number = +target.getAttribute('index')!
	ui.swithMenu(index)
})

// 当前商品对应的菜单
ui.doms.goodsContainer.addEventListener('wheel', e => {
	const width = document.documentElement.clientWidth
	const topElem: HTMLElement = document.elementFromPoint(width - 10, 0) as HTMLElement
	const from: number = +topElem.getAttribute('from')!
	ui.swithMenu(from)
})

ui.doms.pay.addEventListener('click', e => {
	const dialog: HTMLDialogElement = ui.doms.collection as HTMLDialogElement
	dialog.showModal()
})
