import { menu } from '../data'
import { Doms, Target } from '../data.d'
import UIData from './UIData'

// 页面数据、逻辑
class UI {
  uiData: UIData
  doms: Doms
  target: Target

  constructor() {
    this.uiData = new UIData()
    this.doms = {
      goodsContainer: document.querySelector('.goods-list')!,
      deliveryPrice: document.querySelector('.footer-car-tip')!,
      totalPrice: document.querySelector('.footer-car-total')!,
      footerPay: document.querySelector('.footer-pay')!,
      footerPayInnerSpan: document.querySelector('.footer-pay span')!,
      footerCar: document.querySelector('.footer-car')!,
      badge: document.querySelector('.footer-car-badge')!,
      menu: document.querySelector('.menu')!,
      pay: document.querySelector('.footer-pay a')!,
      collection: document.querySelector('dialog')!,
    }

    const carRect: DOMRect = this.doms.footerCar.getBoundingClientRect()
    this.target = {
      x: carRect.left + carRect.width / 2,
      y: carRect.top + carRect.height / 5,
    }

    this.createHTML()
    this.updateFooter()
    this.listenEvent()
  }

  // init
  createHTML(): void {
    // 商品列表HTML
    let goodsList_HTML: string = ''
    this.uiData.uiGoodsArr.map((item, index) => {
      const src = require(`./../assets/${item.goods.pic}.png`)
      // 使用js引入的图片不会经过Webpack打包，因此使用CommonJS风格的require引入
      goodsList_HTML += `<div class="goods-item" from='${item.goods.from}'>
      <img src="${src}" class="goods-pic" />
      <div class="goods-info">
        <h2 class="goods-title">${item.goods.title}</h2>
        <p class="goods-desc">${item.goods.desc}</p>
        <p class="goods-sell">
          <span>月售 ${item.goods.sellNumber}</span>
          <span>好评率 ${item.goods.favorRate}</span> 
        </p>
        <div class="goods-confirm">
          <p class="goods-price">
            <span class="goods-price-unit">¥</span>
            <span>${item.goods.price}</span>
          </p>
          <div class="goods-btns">
            <i index='${index}' class="iconfont i-jianhao"></i>
            <span>${item.choose}</span>
            <i index='${index}' class="iconfont i-jiajianzujianjiahao"></i>
          </div>
        </div>
      </div>
    </div>`
    })
    this.doms.goodsContainer.innerHTML = goodsList_HTML

    // 菜单栏HTML
    let frag: DocumentFragment = document.createDocumentFragment()
    menu.map((item, index) => {
      const div: HTMLElement = document.createElement('div')
      div.classList.add('menu-item')
      div.setAttribute('index', `${index}`)
      if (index === 0) {
        div.classList.add('active')
      }

      const span: HTMLElement = document.createElement('span')
      span.textContent = item
      span.setAttribute('index', `${index}`)

      div.appendChild(span)
      frag.appendChild(div)
    })
    this.doms.menu.appendChild(frag)
  }

  // 更新商品信息
  updateGoodsItem(index: number): void {
    const goodsDOM: HTMLElement = this.doms.goodsContainer.children[index] as HTMLElement

    if (this.uiData.isChoose(index)) {
      goodsDOM.classList.add('active')
    } else {
      goodsDOM.classList.remove('active')
    }

    const span: HTMLElement = goodsDOM.querySelector('.goods-btns span') as HTMLElement
    span.textContent = this.uiData.uiGoodsArr[index].choose + ''
  }

  // 更新页脚
  updateFooter(): void {
    // 设置配送费
    this.doms.deliveryPrice.textContent = `配送费为¥${this.uiData.deliveryPrice}`

    // 总价
    const totalPrice: number = +this.uiData.totalPrice.toFixed(2)
    this.doms.totalPrice.textContent = totalPrice + ''

    // 起送标准
    const deliveryThreshold: number = +(this.uiData.deliveryThreshold - totalPrice).toFixed(2)

    if (this.uiData.isDelivery()) {
      this.doms.footerPay.classList.add('active')
    } else {
      this.doms.footerPay.classList.remove('active')
      this.doms.footerPayInnerSpan.textContent = `还差¥${deliveryThreshold}起送`
    }

    if (this.uiData.isGoodsInCar()) {
      this.doms.footerCar.classList.add('active')
      this.doms.badge.textContent = this.uiData.totalChooseNum + ''
    } else {
      this.doms.footerCar.classList.remove('active')
    }
  }

  carAnimate() {
    this.doms.footerCar.classList.add('animate')
  }

  addAnimate(index: number) {
    const addBtn: HTMLElement = this.doms.goodsContainer.children[index].querySelector('.i-jiajianzujianjiahao') as HTMLElement
    const rect: DOMRect = addBtn.getBoundingClientRect()
    const start = {
      x: rect.left,
      y: rect.top,
    }

    const div: HTMLElement = document.createElement('div')
    div.className = 'add-to-car'
    const i: HTMLElement = document.createElement('i')
    i.className = 'iconfont i-jiajianzujianjiahao'
    // 设置初始位置
    div.style.transform = `translateX(${start.x}px)`
    i.style.transform = `translateY(${start.y}px)`

    div.appendChild(i)
    document.body.appendChild(div)
    // 强行渲染
    div.clientWidth

    // 设置结束位置
    div.style.transform = `translate(${this.target.x}px)`
    i.style.transform = `translateY(${this.target.y}px)`

    div.addEventListener(
      'transitionend',
      () => {
        div.remove()
        this.carAnimate()
      },
      { once: true }
    )
  }

  listenEvent(): void {
    this.doms.footerCar.addEventListener('animationend', function () {
      this.classList.remove('animate')
    })
  }

  increase(index: number): void {
    this.uiData.increase(index)
    this.updateGoodsItem(index)
    this.updateFooter()
    this.addAnimate(index)
  }

  decrease(index: number): void {
    this.uiData.decrease(index)
    this.updateGoodsItem(index)
    this.updateFooter()
  }

  swithMenu(index: number) {
    if (this.doms.menu.children[index].classList.contains('active')) {
      return
    }
    const active: HTMLElement = this.doms.menu.querySelector('.active')!
    active.classList.remove('active')
    this.doms.menu.children[index].classList.add('active')

    // 可能对应菜单内暂没有商品数据
    try {
      // 导航至指定位置
      const targetItem: HTMLElement = this.doms.goodsContainer.querySelector(`div[from='${index}']`)!
      targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch (error) {
      throw new Error('暂无对应商品哦！')
    }
  }
}

export default UI
