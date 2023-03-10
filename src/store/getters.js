export default {
  shopCartLength(state) {
    return state.cartList.length
  },
  shopCart(state) {
    return state.cartList
  },
  totalPrice(state) {
    return '￥' + state.cartList.filter(item => item.checked)
      .reduce((x, y) => x + y.price * y.count, 0).toFixed(2)
  },
  checkedCount(state) {
    return state.cartList.filter(item => item.checked).length
  },
  isSelectAll(state) {
    if (!state.cartList.length) return false // 购物车为空时，取消全选
    return state.cartList.every(item => item.checked)
    // return !state.cartList.some(item => !item.checked)
  }
}