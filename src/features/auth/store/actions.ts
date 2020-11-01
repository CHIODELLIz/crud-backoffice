import service from './service'

const signIn = async ({ commit }: any, obj: Record<string, string>) => {
  return service.signIn(obj).then(success => {
    commit('SAVE_USER', success.data)
  })
}

const getDetailsUser = async ({ commit }) => {
  return service.getDetails().then(async result => {
    await commit('SAVE_DETAILS', result.data)
  })
}

export default {
  signIn,
  getDetailsUser,
}
