import * as types from './mutation-types'
export default {
  [types.SAVE_ALL_STORES](state, data) {
    state.allStores = data
  },
}
