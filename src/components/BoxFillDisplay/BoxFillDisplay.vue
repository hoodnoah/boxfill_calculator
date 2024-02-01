<script setup lang="ts">
import { computed, defineModel } from 'vue'

import { type Result } from '@/lib/Result'
import { UnitSystem, type BoxFill } from '@/lib/BoxFill'

import UnitSystemToggle from '@/components/BoxFillDisplay/UnitSystemToggle.vue'

const props = defineProps({
  boxFillResult: {
    type: Object as () => Result<BoxFill>,
    required: true
  }
})

const unitSystemModel = defineModel('unitSystemModel', {
  type: Number as () => UnitSystem,
  required: true
})

const boxFillDisplayValue = computed<string>(() => {
  if (props.boxFillResult.ok === false) {
    return 'error'
  } else {
    return props.boxFillResult.value.value.toFixed(1)
  }
})
</script>

<template>
  <div class="box-fill-display">
    <span class="digit-readout">{{ boxFillDisplayValue }}</span>
    <UnitSystemToggle v-model:unit-system-model="unitSystemModel" />
  </div>
</template>

<style scoped>
/* Font import */
@import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap');

.box-fill-display {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 2em;
  align-items: center;
}

.digit-readout {
  font-family: 'Rubik Mono', monospace, sans-serif;
  font-size: 100px;
  min-width: 50%;
  text-align: right;
}
</style>
