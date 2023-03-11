import {
  ADD_COUNTER,
  ADD_NEW_PRODUCT
} from './mutation-types'

export default {
  // 同步操作有判断逻辑等复杂操作也建议先由Actions进行处理
  // 从而保证 Mutations 中每个回调函数满足单一职责原则, 便于进行跟踪
  addToCart({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      let i = state.cartList.findIndex(product => product.iid === payload.iid)
      if (i !== -1) {
        // cartList 找到了 payload 对应的iid（多次添加）
        commit(ADD_COUNTER, i)
        resolve('当前商品数量+1')
      } else {
        // cartList 中未找到 payload 对应的 iid（第一次添加）
        payload.count = 1
        payload.checked = true
        commit(ADD_NEW_PRODUCT, payload)
        resolve('添加购物车成功')
      }
    })
  }
}