<template>
  <div>
    <div class="lg:w-1/5 pr-0">
      <div class="relative pull-left lg:pr-0">
        <input
          v-if="!removeFilter"
          type="search"
          placeholder="Filtrar"
          v-model="filter"
          class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        />
      </div>
    </div>
    <div class="w-full mt-6">
      <div class="bg-white overflow-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-40 px-3" v-if="options">Opções</th>
              <th
                v-for="(item, index) in columns"
                :key="index"
                class="text-left py-3 px-4 uppercase font-semibold text-sm"
              >{{ item.label }}</th>
            </tr>
          </thead>
          <tbody lass="text-gray-700">
            <tr
              v-for="(itemRow, i) in filterData"
              :key="i"
              class="text-gray-700"
              style="border-bottom: 1px solid #D8D8D8"
            >
              <td v-if="options">
                <div class="lg:grid lg:grid-cols-3">
                  <button type="button">
                    <img
                      src="../assets/trash-outline.svg"
                      width="20"
                      @click="$emit('delete', itemRow)"
                      class="lg:mx-auto mt-1 mb-1"
                    />
                  </button>

                  <button class="hidden lg:block" type="button" @click="$emit('update', itemRow)">
                    <img src="../assets/create-outline.svg" width="20" class="lg:mx-auto mt-1 mb-1" />
                  </button>

                  <button class="hidden lg:block" type="button">
                    <img
                      src="../assets/eye-outline.svg"
                      width="20"
                      @click="$emit('view', itemRow)"
                      class="mx-auto mt-1 mb-1"
                    />
                  </button>
                </div>
              </td>
              <td v-for="(itemColumn, j) in columns" :key="j" class="text-left py-3 px-4">
                <span
                  v-if="itemColumn.currencyMask"
                >{{!itemRow[itemColumn.key] ? 'Não definido' : $currencyFormat(itemRow[itemColumn.key])}}</span>
                <span
                  v-else-if="itemColumn.dateMask"
                >{{ !itemRow[itemColumn.key] ? 'Não definido' : $dateFormat(itemRow[itemColumn.key])}}</span>
                <span
                  v-else
                >{{ !itemRow[itemColumn.key] ? 'Não definido' : itemRow[itemColumn.key]}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'custom-table',
  props: ['columns', 'rows', 'options', 'type', 'removeFilter'],
  data() {
    return {
      filter: '',
    }
  },
  computed: {
    filterData() {
      if (!this.filter) {
        return this.rows
      }

      const filterTemp = []

      this.rows.forEach((item, index) => {
        this.columns
          .filter(x => x.filter)
          .forEach(column => {
            if (
              item[column.key]
                .toString()
                .toLowerCase()
                .includes(this.filter.toString().toLowerCase())
            ) {
              if (!filterTemp.find(x => x.id === item.id)) {
                filterTemp.push(item)
              }
            }
          })
      })

      return filterTemp
    },
  },
  methods: {
    init: function() {
      this.filterData = this.rows
    },
  },
  setup(props, context) {
    const { columns, rows } = props
  },
}
</script>

<style scoped></style>
