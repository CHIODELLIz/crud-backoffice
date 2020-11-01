<template>
  <title-page :title="title">
    <div class="lg:flex lg:items-center">
      <div>
        <button
          v-if="labelButton"
          class="bg-gray-800 w-full lg:w-auto hover:bg-gray-500 text-white py-2 px-3 uppercase font-semibold text-xs rounded"
          @click="$emit('create')"
          type="button"
        >{{ labelButton }}</button>
      </div>
    </div>
  </title-page>
</template>

<script>
import TitlePage from '@/components/TitlePage.vue'
export default {
  name: 'custom-header',
  props: ['type', 'title', 'labelButton'],
  setup(props, context) {
    const {
      type,
      title,
      labelButton,
      additionalButton,
      exportButton,
      exportData,
      exportFields,
      generateQrcodeButton,
    } = props
  },
  components: {
    TitlePage,
  },
}
</script>

<style scoped></style>
