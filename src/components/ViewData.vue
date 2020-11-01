<template>
  <div>
    <custom-modal height="auto" style="overflow-y: scroll;" name="view">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg text-left">
        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div class="w-full flex items-center">
            <div class="w-3/4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">{{ viewName }}</h3>
              <p
                class="mt-1 max-w-2xl text-sm leading-5 text-gray-500"
              >Abaixo estão todos os detalhes do item selecionado</p>
            </div>
            <div class="w-1/4 text-right">
              <button @click="$modal.hide('view')">
                <img src="../assets/close-icon.svg" width="40" class="mx-auto mb-1" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <dl v-for="(item, i) in viewDataTypes" :key="i">
            <div v-if="viewData[item.key]">
              <div v-if="!item.array" class="bg-gray-50 px-6 py-2">
                <dt class="text-sm leading-5 font-medium text-gray-500">{{ item.label }}</dt>
                <dd
                  class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 mb-4 sm:col-span-2"
                >{{ format(item) }}</dd>
                <hr />
              </div>
              <div v-else class="bg-white px-6 py-5">
                <dt class="text-sm leading-5 font-medium text-gray-500 mb-2">{{ item.label }}</dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  <table class="min-w-full bg-white">
                    <thead class="bg-gray-800 text-white">
                      <tr>
                        <th
                          v-for="(itemArrayColumn, index) in item.keys"
                          :key="index"
                          class="text-left py-3 px-4 uppercase font-semibold text-sm"
                        >{{ itemArrayColumn.label }}</th>
                      </tr>
                    </thead>
                    <tbody lass="text-gray-700">
                      <tr
                        v-for="(itemRow, i) in viewData[item.key]"
                        :key="i"
                        class="text-gray-700"
                        style="border-bottom: 1px solid #D8D8D8"
                      >
                        <td
                          v-for="(itemArrayColumn, j) in item.keys"
                          :key="j"
                          class="text-left py-3 px-4"
                        >
                          <span>{{ itemRow[itemArrayColumn.key] }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </custom-modal>
  </div>
</template>

<script>
export default {
  name: 'view-data',
  props: ['viewDataTypes', 'viewData', 'viewName'],
  methods: {
    format(value) {
      return value.currencyMask
        ? this.$currencyFormat(this.viewData[value.key])
        : value.dateMask
        ? this.$dateFormat(this.viewData[value.key])
        : this.viewData[value.key]
    },
  },
}
</script>

<style scoped></style>
