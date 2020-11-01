import service from './service'

const getAllProducts = async ({ commit }) => {
  const data = await (await service.getAllProducts()).data

  await commit('SAVE_ALL_PRODUCTS', data)
}

export default {
  getAllProducts,
}
