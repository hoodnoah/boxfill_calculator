<script setup lang="ts">
import type { Conductors } from '@/lib/BoxFill'
import { defineModel } from 'vue'
import { AWGConductor } from '@/lib/BoxFill'

const emit = defineEmits(['update:conductorModel'])

// get all supported AWG options
const awgOptions = Object.values(AWGConductor).filter((x) => !isNaN(Number(x)))

const conductorModel = defineModel<Conductors>('conductorModel', { type: Object, required: true })

function updateConductorModel() {
  emit('update:conductorModel', {
    num: conductorModel.value.num,
    largestAWG: conductorModel.value.largestAWG
  })
}
</script>

<template>
  <input type="number" v-model="conductorModel.num" @change="updateConductorModel" />

  <select v-model="conductorModel.largestAWG" @change="updateConductorModel">
    <option v-for="awg in awgOptions" :key="awg" :value="awg">{{ 'AWG ' + awg }}</option>
  </select>
</template>
