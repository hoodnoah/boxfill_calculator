<script setup lang="ts">
import { Store } from '@/store/Store'
import { computed } from 'vue'

import { UnitSystem } from '@/lib/BoxFill'

const unitSystemDisplayValue = computed(() => {
  const unitSystem = Store.getUnitSystem()

  switch (unitSystem) {
    case UnitSystem.Metric:
      return 'cubic centimeters'
    default:
      return 'cubic inches'
  }
})
</script>

<template>
  {{ unitSystemDisplayValue }}
</template>
