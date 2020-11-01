<template>
  <div id="app">
    <nav
      v-if="!$route.meta.public"
      :class="collapse ? 'h-full' : ''"
      :style="collapse ? 'overflow-y: scroll;': ''"
      class="bg-gray-800 fixed top-0 w-full z-50"
    >
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="lg:relative lg:flex lg:items-center lg:justify-between lg:h-16">
          <div
            class="block lg:hidden flex justify-between px-4 py-3"
            :class="!collapse ? 'items-center' : ''"
          >
            <div>
              <button
                @click="collapse = !collapse"
                type="button"
                class="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
                :class="collapse ? 'pt-8' : ''"
              >
                <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path
                    v-if="collapse"
                    fill-rule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                  <path
                    v-if="!collapse"
                    fill-rule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                </svg>
              </button>
            </div>
            <div :class="collapse ? 'block' : 'hidden'" class="w-full px-2 pt-2 pb-4">
              <div v-for="(item, index) in menuItems" :key="index" class="relative">
                <template>
                  <div class="dropdown inline-block relative py-5">
                    <a
                      :href="item.router"
                      class="px-3 rounded-md text-sm font-medium leading-5 py-2 text-white bg-gray-800 focus:outline-none focus:text-white focus:bg-gray-900 hover:bg-gray-900 transition duration-150 ease-in-out"
                    >
                      <span class="mr-1">{{ item.name }}</span>
                    </a>
                  </div>
                </template>
              </div>
              <div class="relative py-5">
                <a
                  @click="logout"
                  class="px-3 rounded-md text-sm font-medium leading-5 text-white bg-gray-800 focus:outline-none focus:text-white focus:bg-gray-900 hover:bg-gray-900 transition duration-150 ease-in-out"
                >
                  <span class="mr-1">Sair</span>
                </a>
              </div>
            </div>
            <div>
              <img v-if="!collapse" class="h-12" src="./assets/logo-example.png" alt="Logo" />
            </div>
          </div>
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex-shrink-0">
              <img class="hidden lg:block h-20 w-auto" src="./assets/logo-example.png" alt="Logo" />
            </div>
            <div class="hidden lg:block lg:mt-6 z-200">
              <div v-if="user" class="flex absolute">
                <div v-for="(item, index) in menuItems" :key="index">
                  <div class="dropdown inline-block relative">
                    <a
                      :href="item.router"
                      class="ml-5 px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-800 focus:outline-none focus:text-white focus:bg-gray-900 hover:bg-gray-900 transition duration-150 ease-in-out"
                    >
                      <span class="mr-1">{{ item.name }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="hidden lg:block absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button
                  class="flex text-sm border-2 items-center border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
                  id="user-menu"
                  aria-label="User menu"
                  @click="hidden = !hidden"
                  aria-haspopup="true"
                >
                  <span class="text-white mr-3">{{ currentUser }}</span>
                  <div
                    class="h-8 w-8 flex bg-white justify-center items-center rounded-full"
                  >{{ currentUser ? currentUser[0] : '' }}</div>
                </button>
              </div>
              <div
                :class="
                  `${
                    hidden ? 'hide scale-0' : 'show ease-in-out scale-100'
                  } transition duration-100 transform origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg`
                "
              >
                <div
                  class="py-1 rounded-md bg-white shadow-xs"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <button
                    @click="logout"
                    class="block px-4 w-full py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                    role="menuitem"
                  >Sair</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="flex flex-col h-auto">
      <div class="w-full mb-auto">
        <div v-if="$route.path != '/login'" class="sm:p-20 pt-20 pl-4 pr-4">
          <router-view />
        </div>
        <div v-else class="mx-auto" id="container">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MENU_ITEMS } from './app-menu'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      collapse: false,
      hidden: true,
      menuItems: MENU_ITEMS,
      user: {},
    }
  },
  async created() {
    const userDetails = await this.getDetailsUser()
    console.log('userDetails ', userDetails)
  },
  computed: {
    currentUser() {
      return this.$store.state.auth?.user?.username
    },
    main() {
      return this.$route.path !== '/login'
    },
  },
  methods: {
    ...mapActions('auth', ['getDetailsUser']),
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="stylus">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
