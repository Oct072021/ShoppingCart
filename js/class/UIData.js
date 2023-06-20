import { UIGoods } from "./UIGoods.js"

/**
 * 整个界面的商品数据，即商品的集合
 */
class UIData {

  constructor() {
    // 传统写法
    // let uiGoods = []
    // for (let i = 0; i < goods.length; i++) {
    //   const uig = new UIGoods(goods[i])
    //   uiGoods.push(uig)
    // }

    // map写法
    const uiGoods = goods.map(item => {
      return new UIGoods(item)
    })
    this.UIGoodsArr = uiGoods

    this.deliveryThreshold = 30 // 起送费，此处应通过网络获取
    this.deliveryPrice = 2.5 // 配送费，同理，通过网络获取
  }

  getTotalPrice() {
    let sum = 0

    // 传统写法
    // for (let i = 0; i < this.UIGoodsArr.length; i++) {
    //   sum += this.UIGoodsArr[i].getTotalPrice()
    // }

    // map写法
    this.UIGoodsArr.map(item => {
      sum += item.getTotalPrice()
    })

    return sum
  }

  isChoose(index) {
    return this.UIGoodsArr[index].isChoose()
  }

  increase(index) {
    this.UIGoodsArr[index].increase()
  }

  decrease(index) {
    this.UIGoodsArr[index].decrease()
  }

  getTotalChooseNum() {
    let num = 0;
    this.UIGoodsArr.map(item => {
      num += item.choose
    })
    return num
  }

  hasGoodsInCar() {
    return this.getTotalChooseNum() > 0
  }

  isDelivery() {
    return this.getTotalPrice() >= this.deliveryThreshold
  }
}

export { UIData }