import * as types from './mutation-types'
export default {
  [types.SAVE_ALL_PRODUCTS](state, data) {
    state.allProducts = data
  },
}
