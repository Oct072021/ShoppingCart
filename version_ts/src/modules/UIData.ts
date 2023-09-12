import { Goods } from '../data.d'
import UIGoods from './UIGoods'
import { goods } from '../data'

// 商品数据的集合
class UIData {
  uiGoodsArr: Array<UIGoods>

  deliveryThreshold: number = 30 // 起送费，此处应通过网络获取
  deliveryPrice: number = 2.5 // 配送费，同理，通过网络获取

  constructor() {
    this.uiGoodsArr = goods.map((item) => {
      return new UIGoods(item)
    })
  }

  get totalPrice(): number {
    let sum: number = 0
    this.uiGoodsArr.map((item) => {
      sum += item.totalPrice
    })

    return sum + this.deliveryPrice // 商品总价 + 配送费
  }

  get totalChooseNum(): number {
    let sum: number = 0
    this.uiGoodsArr.map((item) => {
      sum += item.choose
    })

    return sum
  }

  isChoose(index: number): boolean {
    return this.uiGoodsArr[index].isChoose
  }

  isGoodsInCar(): boolean {
    return this.totalChooseNum > 0
  }

  isDelivery(): boolean {
    return this.totalPrice >= this.deliveryThreshold
  }

  increase(index: number): void {
    this.uiGoodsArr[index].increase()
  }

  decrease(index: number): void {
    this.uiGoodsArr[index].decrease()
  }
}

export default UIData
