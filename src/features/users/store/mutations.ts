import * as types from './mutation-types'
export default {
  [types.SAVE_ALL_USERS](state, data) {
    state.allUsers = data
  },
  [types.SAVE_USER](state, data) {
    state.allUsers.push(data)
  },
}
