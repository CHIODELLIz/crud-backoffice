<template>
  <div>
    <custom-modal
      height="auto"
      style="overflow-y: scroll;"
      class="hidden lg:block"
      @closed="$emit('closed')"
      name="modal"
    >
      <div class="px-8 pt-6 pb-8 mb-4 text-left">
        <div slot="top-right">
          <button class="text-right" @click="$modal.hide('modal')">
            <img src="../assets/close-icon.svg" width="40" class="mx-auto mb-1" />
          </button>
        </div>
        <vue-form-generator
          ref="vfg"
          :schema="schema"
          :model="model"
          :options="formOptions"
          @validated="setValidState"
          @model-updated="$emit('model-updated', schema, model)"
        ></vue-form-generator>
        <button
          class="bg-gray-800 hover:bg-gray-500 text-white py-2 px-3 uppercase font-semibold text-xs rounded"
          v-on:click="onSubmit"
        >Salvar</button>
      </div>
    </custom-modal>
    <custom-modal
      class="block lg:hidden"
      height="100%"
      width="100%"
      style="overflow-y: scroll;"
      @closed="$emit('closed')"
      name="modal"
    >
      <div class="px-8 pt-6 pb-8 mb-4 text-left">
        <div slot="top-right">
          <button class="text-right" @click="$modal.hide('modal')">
            <img src="../assets/close-icon.svg" width="40" class="mx-auto mb-1" />
          </button>
        </div>
        <vue-form-generator
          ref="vfg"
          :schema="schema"
          :model="model"
          :options="formOptions"
          @validated="setValidState"
          @model-updated="$emit('model-updated', schema, model)"
        ></vue-form-generator>
        <button
          class="bg-gray-800 hover:bg-gray-500 text-white py-2 px-3 uppercase font-semibold text-xs rounded"
          v-on:click="onSubmit"
        >Salvar</button>
      </div>
    </custom-modal>
  </div>
</template>

<script>
import VueFormGenerator from 'vue-form-generator'

export default {
  props: {
    formOptions: {
      default: function() {
        return {
          validateAfterLoad: true,
          validateAfterChanged: true,
          validateAsync: true,
        }
      },
    },
    schema: {
      required: true,
    },
    model: {
      required: true,
    },
  },
  data() {
    return {
      isValid: false,
    }
  },
  methods: {
    async setValidState(isValid) {
      this.isValid = isValid
      const promise = this.schema.fields.map(async x => {
        if (x.required && !this.model[x.model]) {
          this.isValid = false
        }
      })

      await Promise.all(promise)
    },
    onSubmit() {
      if (!this.isValid) {
        return this.$error('É necessário preencher todos os campos com *')
      } else {
        this.$emit('submit')
      }
    },
  },
  mounted() {
    this.schema.fields
      .filter(x => x.required)
      .forEach(item => {
        item.validator =
          item.type !== 'vueMultiSelect' && item.inputType === 'text'
            ? VueFormGenerator.validators.string.locale({
                fieldIsRequired: '',
              })
            : null
        item.hint = 'Este campo é obrigatório'
      })
  },
}
</script>

<style lang="stylus" scoped></style>
