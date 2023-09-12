import { Goods } from '../data.d'

// 商品数据
class UIGoods {
  private _goods: Goods
  private _choose: number = 0

  constructor(g: Goods) {
    this._goods = g
  }

  get choose(): number {
    return this._choose
  }

  set choose(val: number) {
    if (Math.round(val) !== val) {
      return
    }
    if (val < 0) {
      return
    }
    this._choose = val
  }

  get goods():Goods {
    return this._goods
  }

  increase(): void {
    this._choose++
  }

  decrease(): void {
    this._choose > 0 && this._choose--
  }

  get totalPrice(): number {
    return this.goods.price * this._choose
  }

  get isChoose(): boolean {
    return this._choose > 0
  }
}

export default UIGoods
