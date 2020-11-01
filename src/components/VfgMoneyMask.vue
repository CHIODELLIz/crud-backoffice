<template>
  <div class="w-full">
    <currency-input
      class="form-control w-full"
      v-model="value"
      :placeholder="schema.placeholder"
      currency="BRL"
    />
  </div>
</template>
<script>
import { abstractField } from 'vue-form-generator'
export default {
  mixins: [abstractField],
}
</script>