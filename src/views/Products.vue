<template>
  <div class="products">
    <custom-header title="Produtos" labelButton="Novo Produto" @create="openModal"></custom-header>
    <custom-table
      :columns="columns"
      :options="true"
      @update="openModal"
      @view="view"
      @delete="this.delete"
      :rows="this.allProducts"
    ></custom-table>
    <modal @closed="model = {}" @submit="save()" :schema="schema" :model="model"></modal>
    <view-data :viewData="viewData" :viewDataTypes="viewDataTypes" viewName="Produto"></view-data>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import service from '../features/products/store/service'
import Product from '../models/product'

export default {
  name: 'Products',
  data() {
    return {
      columns: Product.columns,
      viewDataTypes: Product.viewDataTypes,
      model: Product.model,
      schema: Product.schema,
      viewData: {},
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState('products', ['allProducts']),
    ...mapState('stores', ['allStores']),
  },
  methods: {
    ...mapActions('products', ['getAllProducts']),
    ...mapActions('stores', ['getAllStores']),
    async init() {
      await this.getAllProducts()
      await this.getAllStores()

      this.schema.fields[
        this.schema.fields.findIndex(x => x.model === 'stores')
      ].values = this.allStores
    },
    view(item) {
      this.viewData = item
      this.$modal.show('view')
    },
    openModal(item) {
      if (item) {
        this.model = {...item}
      }

      this.$modal.show('modal')
    },
    async save() {
      const product = {
        ...this.model,
        stores: this.model.stores.map(x => {
          return x.id
        }),
      }

      try {
        product.id
          ? await service.updateProduct(product)
          : await service.saveProduct(product)

        await this.$success('Produto')
        location.reload(true)
      } catch (error) {
        this.$error(error.message)
      }
    },
    async delete({ id }) {
      try {
        await service.deleteProduct(id)
        await this.$delete('Produto')
        location.reload(true)
      } catch (error) {
        this.$error(error.response.data.message)
      }
    },
  },
}
</script>

<style scoped></style>
