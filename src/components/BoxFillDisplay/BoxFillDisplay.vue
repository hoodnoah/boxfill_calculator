<script setup lang="ts">
import { Store } from '@/store/Store'
import { computed, defineModel } from 'vue'

import UnitSystemToggle from '@/components/BoxFillDisplay/UnitSystemToggle.vue'
import { type BoxFill } from '@/lib/BoxFill'

const boxFillModel = defineModel<BoxFill>('boxFillModel', { type: Object, required: true })

// Rounds/pads the box fill value to one decimal place
const boxFillDisplayValue = computed(() => {
  return boxFillModel.value.value.toFixed(1)
})
</script>

<template>
  <div class="box-fill-display">
    <h1>{{ boxFillDisplayValue }} <UnitSystemToggle /></h1>
  </div>
</template>
