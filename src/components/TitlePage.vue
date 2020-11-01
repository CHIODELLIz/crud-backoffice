<template>
  <div class="w-full mt-6 lg:flex lg:mb-0 mb-6 text-left lg:justify-between">
    <p class="text-4xl pb-3 lg:flex lg:items-center">{{ title }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'title-page',
  props: ['title'],
  setup(props, context) {
    const { title } = props
  },
}
</script>

<style scoped></style>
