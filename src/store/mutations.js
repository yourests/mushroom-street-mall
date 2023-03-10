import {
  ADD_COUNTER,
  ADD_NEW_PRODUCT,
  CHANGE_CHECKED,
  SELECT_NONE,
  SELECT_ALL
} from './mutation-types'

export default {
  [ADD_COUNTER](state, payload) {
    state.cartList[payload].count += 1
  },
  [ADD_NEW_PRODUCT](state, payload) {
    state.cartList.push(payload)
  },
  [CHANGE_CHECKED](state, payload) {
    let product = state.cartList.find(item => item.iid === payload.iid)
    product.checked = !product.checked
  },
  [SELECT_NONE](state) {
    state.cartList.forEach(product => product.checked = false)
  },
  [SELECT_ALL](state) {
    state.cartList.forEach(product => product.checked = true)
  }
}