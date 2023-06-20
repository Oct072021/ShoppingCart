/**
 * 单个商品类
 * 由于原始数据没有‘选中数量’属性，因此开辟一个新内存空间，创造新的对象用于存储此属性，此做法好处在于不用改变原始数据
 * 也可以循环遍历原数据，给原数据新增一个属性，但可能会出现数据不统一的情况
 */
class UIGoods {

  constructor(g) {
    this.goods = g
    this.choose = 0
  }

  getTotalPrice() {
    return this.goods.price * this.choose
  }

  isChoose() {
    return this.choose > 0
  }

  increase() {
    this.choose++
  }

  decrease() {
    if (this.choose === 0) {
      return
    }
    this.choose--
  }
}


export { UIGoods }