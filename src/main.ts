import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './assets/styles/index.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-js-modal/dist/styles.css'
import 'vue-form-generator/dist/vfg.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import VueSweetalert2 from 'vue-sweetalert2'
import VueCurrencyInput from 'vue-currency-input'
import VueFormGenerator from 'vue-form-generator'
import VueTheMask from 'vue-the-mask'
import vmmodal from 'vue-js-modal'
import Multiselect from 'vue-multiselect'

import VfgTheMask from '@/components/VfgTheMask.vue'
import VfgMoneyMask from '@/components/VfgMoneyMask.vue'
import Header from '@/components/Header.vue'
import Datatable from '@/components/Datatable.vue'
import ViewData from '@/components/ViewData.vue'
import Modal from '@/components/Modal.vue'


import SwalUtils from './utils/swal.js'
import Formatters from './utils/formatters.js'

Vue.use(VueFormGenerator)
Vue.use(VueSweetalert2)
Vue.use(VueCurrencyInput)
Vue.use(SwalUtils)
Vue.use(Formatters)
Vue.use(VueTheMask)
Vue.use(vmmodal, { componentName: 'custom-modal' })

Vue.component('modal', Modal)
Vue.component('field-vfg-the-mask', VfgTheMask)
Vue.component('field-money', VfgMoneyMask)
Vue.component('custom-header', Header)
Vue.component('custom-table', Datatable)
Vue.component('view-data', ViewData)
Vue.component('multiselect', Multiselect)

Vue.config.productionTip = false

Vue.prototype.$moment = value => {
  moment.locale('pt')
  if (!value) return moment()
  return moment(value)
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
