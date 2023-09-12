/**
 * 单个商品类
 * 由于原始数据没有‘选中数量’属性，因此开辟一个新内存空间，创造新的对象用于存储此属性，此做法好处在于不用改变原始数据
 * 也可以循环遍历原数据，给原数据新增一个属性，但可能会出现数据不统一的情况
 */
class UIGoods {

  constructor(g) {
    // 标准写法
    // this.goods = g
    // this.choose = 0

    // 使用属性描述符
    Object.defineProperty(this, 'goods', {
      configurable: false,
      get: function () {
        return g
      },
      set: function () {
        throw new Error('goods属性只可读，不可修改')
      }
    })

    let internalChooseVal = 0
    Object.defineProperty(this, 'choose', {
      configurable: false,
      get: function () {
        return internalChooseVal
      },
      set: function (val) {
        if (typeof val !== 'number') {
          throw new Error('choose属性必须为数字')
        }
        if (parseInt(val) !== val) {
          throw new Error('choose属性必须为整数')
        }
        if (val < 0) {
          throw new Error('choose属性必须 >= 0')
        }
        internalChooseVal = val
      }
    })
  }

  // ES6语法，与defineProperty同理
  // 把totalPrice变为属性
  get TotalPrice() {
    return this.goods.price * this.choose
  }

  // 同理，isChoose变为属性
  get isChoose() {
    return this.choose > 0
  }

  increase() {
    this.choose++
  }

  decrease() {
    // if (this.choose === 0) {
    //   return
    // }
    // this.choose--
    this.choose > 0 && this.choose--  // 二元表达式简写
  }
}


export { UIGoods }