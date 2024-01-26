<script setup lang="ts">
import { Option } from '@/lib/Option'
import type { NumConductors } from '@/lib/BoxFill'
import { ref } from 'vue'

const groundingConductorsModel = defineModel<Option.Option<NumConductors>>({ required: true })

const groundingConductorsDisplayValue = ref(0)

function updateGroundingConductorsModel() {
  if (groundingConductorsDisplayValue.value > 0) {
    groundingConductorsModel.value = Option.Some(groundingConductorsDisplayValue.value)
  } else {
    groundingConductorsModel.value = Option.None()
  }
}
</script>

<template>
  <input
    name="numGroundingConductors"
    type="number"
    min="0"
    step="1"
    v-model="groundingConductorsDisplayValue"
    @input="updateGroundingConductorsModel"
  />
</template>
