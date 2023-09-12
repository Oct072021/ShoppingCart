interface Goods {
  pic: string
  title: string
  desc: string
  sellNumber: number
  favorRate: number
  price: number
  from: number
}

interface Doms {
  goodsContainer: HTMLElement
  deliveryPrice: HTMLElement
  totalPrice: HTMLElement
  footerPay: HTMLElement
  footerPayInnerSpan: HTMLElement
  footerCar: HTMLElement
  badge: HTMLElement
  menu: HTMLElement
  pay: HTMLElement
  collection: HTMLElement
}

interface Target {
  x: number
  y: number
}

export { Goods, Doms, Target }
