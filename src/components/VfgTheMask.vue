<template>
  <div class="w-full">
    <the-mask 
      class="form-control w-full"
      :mask="schema.mask"
      v-model="value"
      :placeholder="schema.placeholder"
      :tokens="schema.tokens"
      ></the-mask>
  </div>
</template>
<script>
import { abstractField } from 'vue-form-generator';
export default {
  mixins: [ abstractField ]
}
</script>