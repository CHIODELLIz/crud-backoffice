import service from './service'

const getAllStores = async ({ commit }) => {
  const data = await (await service.getAllStores()).data

  await commit('SAVE_ALL_STORES', data)
}

export default {
  getAllStores,
}
