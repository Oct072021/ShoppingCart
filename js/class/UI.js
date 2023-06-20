import { UIData } from "./UIData.js"

/**
 * 界面数据，逻辑
 */
class UI {
  constructor() {
    this.uiData = new UIData()

    this.doms = {
      goodsContainer: document.querySelector('.goods-list'),
      deliveryPrice: document.querySelector('.footer-car-tip'),
      totalPrice: document.querySelector('.footer-car-total'),
      footerPay: document.querySelector(".footer-pay"),
      footerPayInnerSpan: document.querySelector(".footer-pay span"),
      footerCar: document.querySelector('.footer-car'),
      badge: document.querySelector('.footer-car-badge')
    }

    const carRect = this.doms.footerCar.getBoundingClientRect()
    this.target = {
      x: carRect.left + carRect.width / 2,
      y: carRect.top + carRect.height / 5
    }

    this.createHTML()
    this.updateFooter()
    this.listenEvent()
  }

  createHTML() {
    let html = ''
    this.uiData.UIGoodsArr.map((item, index) => {
      html += `<div class="goods-item">
      <img src="${item.goods.pic}" alt="" class="goods-pic" />
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
    this.doms.goodsContainer.innerHTML = html
  }

  listenEvent() {
    this.doms.footerCar.addEventListener('animationend', function () {
      this.classList.remove('animate')
    })
  }

  increase(index) {
    this.uiData.increase(index)
    this.updateGoodsItem(index)
    this.updateFooter()
    this.addAnimate(index)
  }

  decrease(index) {
    this.uiData.decrease(index)
    this.updateGoodsItem(index)
    this.updateFooter()
  }

  // 更新某个商品的显示信息
  updateGoodsItem(index) {
    const goodsDOM = this.doms.goodsContainer.children[index]
    if (this.uiData.isChoose(index)) {
      goodsDOM.classList.add('active')
    } else {
      goodsDOM.classList.remove('active')
    }
    const span = goodsDOM.querySelector('.goods-btns span')
    span.textContent = this.uiData.UIGoodsArr[index].choose
  }

  // 更新页脚
  updateFooter() {
    // 设置配送费
    this.doms.deliveryPrice.textContent = `配送费为¥${this.uiData.deliveryPrice}`

    // 总价
    const totalPrice = this.uiData.getTotalPrice().toFixed(2)
    this.doms.totalPrice.textContent = totalPrice

    // 起送标准
    const deliveryThreshold = (this.uiData.deliveryThreshold - totalPrice).toFixed(2)

    if (this.uiData.isDelivery()) {
      this.doms.footerPay.classList.add('active')
    } else {
      this.doms.footerPay.classList.remove('active')
      this.doms.footerPayInnerSpan.textContent = `还差¥${deliveryThreshold}起送`
    }

    if (this.uiData.hasGoodsInCar()) {
      this.doms.footerCar.classList.add('active')
      this.doms.badge.textContent = this.uiData.getTotalChooseNum()
    } else {
      this.doms.footerCar.classList.remove('active')
    }
  }

  carAnimate() {
    this.doms.footerCar.classList.add('animate')
  }

  addAnimate(index) {
    const addBtn = this.doms.goodsContainer.children[index].querySelector('.i-jiajianzujianjiahao')
    const rect = addBtn.getBoundingClientRect()
    const start = {
      x: rect.left,
      y: rect.top
    }

    const div = document.createElement('div')
    div.className = 'add-to-car'
    const i = document.createElement('i')
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

    div.addEventListener('transitionend', () => {
      div.remove()
      this.carAnimate()
    }, { once: true })
  }
}

export { UI }