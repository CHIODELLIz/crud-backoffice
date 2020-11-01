import Vue from 'vue'
import Vuex from 'vuex'

import auth from '../features/auth/store/index'
import users from '../features/users/store/index'
import products from '../features/products/store/index'
import stores from '../features/stores/store/index'

Vue.use(Vuex)

const modules = {
  auth,
  users,
  products,
  stores,
}

export default new Vuex.Store({
  modules,
})
