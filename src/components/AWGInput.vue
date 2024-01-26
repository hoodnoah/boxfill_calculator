<script setup lang="ts">
import { AWGConductor } from '@/lib/BoxFill'

const emit = defineEmits(['update:modelValue'])

const awgSelected = defineModel({ type: Number as () => AWGConductor, required: true })

// get all supported AWG options
const awgOptions = Object.values(AWGConductor).filter((x) => !isNaN(Number(x)))

function updateAWGModel() {
  emit('update:modelValue', awgSelected.value)
}
</script>

<template>
  <select v-model="awgSelected" @change="updateAWGModel" name="awgInput">
    <option v-for="awg in awgOptions" :key="awg" :value="awg">{{ 'AWG ' + awg }}</option>
  </select>
</template>
