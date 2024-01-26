<script setup lang="ts">
import { computed } from 'vue'
import { Option } from '@/lib/Option'
import type { NumSupportFittings } from '@/lib/BoxFill'

const model = defineModel({
  type: Object as () => Option.Option<NumSupportFittings>,
  required: true
})

const displayValue = computed({
  get: () => {
    if (model.value === undefined || model.value._tag === 'None') {
      return 0
    } else {
      return model.value.value
    }
  },
  set: (newValue) => {
    if (newValue === 0) {
      model.value = Option.None()
    } else {
      model.value = Option.Some(newValue)
    }
  }
})
</script>

<template>
  <input name="support-fittings" type="number" min="0" v-model="displayValue" />
</template>
