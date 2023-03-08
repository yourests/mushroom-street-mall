import {
  ADD_COUNTER,
  ADD_NEW_PRODUCT
} from './mutation-types'

export default {
  [ADD_COUNTER](state, payload) {
    state.cartList[payload].count += 1
  },
  [ADD_NEW_PRODUCT](state, payload) {
    state.cartList.push(payload)
  }
}