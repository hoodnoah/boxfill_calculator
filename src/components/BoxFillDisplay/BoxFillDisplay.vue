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
    <h1>
      {{ boxFillDisplayValue }} <UnitSystemToggle v-model:unit-system-model="unitSystemModel" />
    </h1>
  </div>
</template>
