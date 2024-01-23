<script setup lang="ts">
import { Option } from '@/lib/Option'
import type { Conductors } from '@/lib/BoxFill'
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const model = defineModel({
  type: Object as () => Option.Option<Conductors>,
  required: true
})

const displayValue = ref(0)

function updateModel() {
  if (displayValue.value > 0) {
    // emit('update:modelValue', Option.Some({largestAWG: model.value.}))
  } else {
    emit('update:modelValue', Option.None)
  }
}
</script>

<template>
  <label for="support-fittings">Number of support fittings</label>
  <input
    name="support-fittings"
    type="number"
    min="0"
    v-model="displayValue"
    @input="updateModel"
  />
</template>
