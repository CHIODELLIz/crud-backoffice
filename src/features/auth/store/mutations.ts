import * as types from './mutation-types'
export default {
  [types.SAVE_USER](state: any, obj: Record<string, string>) {
    localStorage.setItem('token', obj.token)
    state.token = obj.token
    state.user = obj
  },
  [types.SAVE_DETAILS](state, data) {
    state.user = data
  },
}
