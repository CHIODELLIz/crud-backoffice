import service from './service'

const getAllUsers = async ({ commit }) => {
  const data = await (await service.getAllUsers()).data

  await commit('SAVE_ALL_USERS', data)
}

const saveUser = async ({ commit }, obj: Record<string, string>) => {
  return service.saveUser(obj).then(async user => {
    await commit('SAVE_USER', user.data)
  })
}

export default {
  getAllUsers,
  saveUser,
}
