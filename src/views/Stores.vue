<template>
  <div class="stores">
    <custom-header title="Lojas" labelButton="Nova Loja" @create="openModal"></custom-header>
    <custom-table
      :columns="columns"
      :options="true"
      @update="openModal"
      @view="view"
      @delete="this.delete"
      :rows="this.allStores"
    ></custom-table>
    <modal @closed="model = {}" @submit="save()" :schema="schema" :model="model"></modal>
    <view-data :viewData="viewData" :viewDataTypes="viewDataTypes" viewName="Loja"></view-data>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { EventBus } from '../event-bus.js'
import service from '../features/stores/store/service'
import Store from '../models/store'
import StatesCities from '../assets/data/estados-cidades.json'

export default {
  name: 'Stores',
  data() {
    return {
      columns: Store.columns,
      viewDataTypes: Store.viewDataTypes,
      model: Store.model,
      schema: Store.schema,
      viewData: {},
      cities: [],
      states: [],
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState('stores', ['allStores']),
    ...mapState('products', ['allProducts']),
  },
  methods: {
    ...mapActions('stores', ['getAllStores']),
    ...mapActions('products', ['getAllProducts']),
    async init() {
      EventBus.$on('change-state', this.changeState)

      await this.getAllStores()
      await this.getAllProducts()

      this.schema.fields[
        this.schema.fields.findIndex(x => x.model === 'products')
      ].values = this.allProducts

      this.states = StatesCities.states.map(x => {
        return { id: x.initials, name: x.name }
      })

      this.schema.fields[
        this.schema.fields.findIndex(x => x.model === 'state')
      ].values = this.states

      this.schema.fields[
        this.schema.fields.findIndex(x => x.model === 'city')
      ].values = this.cities

      this.schema.fields[
        this.schema.fields.findIndex(x => x.model === 'state')
      ].onChanged = function() {
        EventBus.$emit('change-state')
      }
    },
    view(item) {
      this.viewData = item
      this.$modal.show('view')
    },
    openModal(item) {
      if (item) {
        this.model = { ...item }

        this.model.state = StatesCities.states.find(
          x => x.initials === this.model.state
        )
        this.model.state = {
          id: this.model.state.initials,
          name: this.model.state.name,
        }

        this.changeState({ name: this.model.city })
      }

      this.$modal.show('modal')
    },
    changeState(city) {
      this.schema.fields[
        this.schema.fields.findIndex(x => x.model === 'city')
      ].values = StatesCities.states
        .find(x => x.initials === this.model.state.id)
        .cities.map(x => {
          return { id: x, name: x }
        })
      this.model.city = city ? city : null
    },
    async save() {
      const store = {
        ...this.model,
        state: this.model.state.id,
        city: this.model.city.name,
        products: this.model.products.map(x => {
          return x.id
        }),
      }

      try {
        store.id
          ? await service.updateStore(store)
          : await service.saveStore(store)

        await this.$success('Loja')
        location.reload(true)
      } catch (error) {
        this.$error(error.message)
      }
    },
    async delete({ id }) {
      try {
        await service.deleteStore(id)
        await this.$delete('Loja')
        location.reload(true)
      } catch (error) {
        this.$error(error.response.data.message)
      }
    },
  },
}
</script>

<style scoped></style>
