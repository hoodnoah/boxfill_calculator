<script setup lang="ts">
import { computed, defineModel } from 'vue'

import { UnitSystem } from '@/lib/BoxFill'

const unitSystemModel = defineModel('unitSystemModel', {
  type: Object,
  required: true
})

const unitSystemDisplayValue = computed<string>(() => {
  switch (unitSystemModel.value) {
    case UnitSystem.Metric:
      return 'cubic centimeters'
    case UnitSystem.Imperial:
      return 'cubic inches'
    default:
      return 'error'
  }
})

function toggleUnitSystemValue() {
  if (unitSystemModel.value === UnitSystem.Metric) {
    unitSystemModel.value = UnitSystem.Imperial
  } else {
    unitSystemModel.value = UnitSystem.Metric
  }
}
</script>

<template>
  <button @click="toggleUnitSystemValue">{{ unitSystemDisplayValue }}</button>
</template>
