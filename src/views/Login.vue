<template>
  <div class="container mx-auto">
    <div class="w-full xl:w-3/4 lg:w-11/12 flex items-center h-screen mx-auto justify-center">
      <div class="w-full lg:w-1/2 bg-white p-5 text-left rounded-lg">
        <form class="px-8 pt-6 pb-8 bg-white rounded">
          <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="email">E-mail</label>
            <input
              class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              v-model="form.email"
              type="text"
              placeholder="E-mail"
              :disabled="loading ? true : false"
            />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="password">Senha</label>
            <input
              class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="password"
              v-model="form.password"
              placeholder="Senha"
              :disabled="loading ? true : false"
            />
          </div>
          <div class="text-center">
            <button
              :disabled="loading ? true : false"
              class="w-full px-4 py-2 font-bold text-white bg-gray-800 rounded-full hover:bg-gray-900 focus:outline-none focus:shadow-outline"
              type="button"
              @click="submit"
            >{{ loading ? 'Entrando...' : 'Entrar' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import router from '@/router/index'
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      loading: false,
    }
  },
  methods: {
    ...mapActions('auth', ['signIn']),
    async submit() {
      this.loading = true

      try {
        await this.signIn(this.form)
        router.push('/products')
      } catch (error) {
        this.$error(error.response.data.message || error.response.message)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="stylus" scoped></style>
