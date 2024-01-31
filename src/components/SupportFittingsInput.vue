<script setup lang="ts">
import { computed } from 'vue'
import { Option } from '@/lib/Option'
import type { NumSupportFittings } from '@/lib/BoxFill'

const emit = defineEmits(['update:modelValue'])
const supportFittingsModel = defineModel<Option.Option<NumSupportFittings>>({
  required: true
})

const displayValue = computed(() => {
  return Option.getOrDefault(
    Option.map(supportFittingsModel.value, (n) => n.toString()),
    ''
  )
})

function updateSupportFittings(event: InputEvent) {
  const input = event.target as HTMLInputElement
  const value = input.value
  const newSupportFittings = parseInt(value, 10)

  if (isNaN(newSupportFittings) || newSupportFittings < 1) {
    emit('update:modelValue', Option.None())
  } else {
    emit('update:modelValue', Option.Some(newSupportFittings as NumSupportFittings))
  }
}
</script>

<template>
  <input
    name="support-fittings"
    type="number"
    min="0"
    @input="updateSupportFittings($event as InputEvent)"
    :value="displayValue"
  />
</template>
