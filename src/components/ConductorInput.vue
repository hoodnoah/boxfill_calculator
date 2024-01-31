<script setup lang="ts">
import { Option } from '@/lib/Option'
import type { NumConductors } from '@/lib/BoxFill'
import { computed, defineModel } from 'vue'

const emit = defineEmits(['update:modelValue'])
const numConductorsModel = defineModel<Option.Option<NumConductors>>({ required: true })

const displayValue = computed(() => {
  return Option.getOrDefault(
    Option.map(numConductorsModel.value, (n) => n.toString()),
    ''
  )
})

function updateNumConductors(event: InputEvent) {
  const input = event.target as HTMLInputElement
  const value = input.value
  const newNumConductors = parseInt(value, 10)

  if (isNaN(newNumConductors) || newNumConductors < 1) {
    emit('update:modelValue', Option.None())
  } else {
    emit('update:modelValue', Option.Some(newNumConductors as NumConductors))
  }
}
</script>

<template>
  <input
    name="conductorInput"
    type="number"
    @input="updateNumConductors($event as InputEvent)"
    :value="displayValue"
  />
</template>
