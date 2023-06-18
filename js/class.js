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
/**
 * 整个界面的数据，即商品的集合
 */
class UI {

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

export { UI }