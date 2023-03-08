import {
  ADD_COUNTER,
  ADD_NEW_PRODUCT
} from './mutation-types'

export default {
  // 同步操作有判断逻辑等复杂操作也建议先由Actions进行处理
  // 从而保证 Mutations 中每个回调函数满足单一职责原则, 便于进行跟踪
  addCart({ state, commit }, payload) {
    let i = state.cartList.findIndex(product => product.iid === payload.iid)
    if (i !== -1) {
      commit(ADD_COUNTER, i)
    } else {
      payload.count = 1
      commit(ADD_NEW_PRODUCT, payload)
    }
  }
}