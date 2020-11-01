<template>
  <div class="home">
    <custom-header type="user" title="Usuários" labelButton="Novo Usuário" @create="openModal"></custom-header>
    <custom-table
      :columns="columns"
      :options="true"
      type="user"
      @update="openModal"
      @view="view"
      @delete="this.delete"
      :rows="this.allUsers"
    ></custom-table>
    <modal @closed="model = {}" @submit="save()" :schema="schema" :model="model"></modal>
    <view-data :viewData="viewData" :viewDataTypes="viewDataTypes" viewName="Usuário"></view-data>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import service from '../features/users/store/service'
import User from '../models/user'

export default {
  name: 'Users',
  data() {
    return {
      viewDataTypes: User.viewDataTypes,
      columns: User.columns,
      schema: User.schema,
      model: User.model,
      viewData: {},
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState('users', ['allUsers']),
  },
  methods: {
    ...mapActions('users', ['getAllUsers']),
    async init() {
      await this.getAllUsers()
    },
    view(item) {
      this.viewData = item
      this.$modal.show('view')
    },
    openModal(item) {
      if (item) {
        delete item.password
        this.model = { ...item }
      }

      this.$modal.show('modal')
    },
    async save() {
      const user = { ...this.model }

      if (!user.id && !user.password) {
        this.$error('É necessário informar uma senha')
        return
      }

      if (
        (!user.id || user.password) &&
        user.password !== user.confirmPassword
      ) {
        this.$error('As senhas não coincidem')
        return
      }

      delete user.confirmPassword

      try {
        const save = user.id
          ? await service.updateUser(user)
          : await service.saveUser(user)
        await this.$success('Usuário')
        location.reload(true)
      } catch (error) {
        this.$error(error)
      }
    },
    async delete({ id }) {
      try {
        await service.deleteUser(id)
        await this.$delete('Usuário')
        location.reload(true)
      } catch (error) {
        this.$error(error)
      }
    },
  },
}
</script>

<style>
.vm--modal {
  overflow-y: scroll !important;
}
</style>
