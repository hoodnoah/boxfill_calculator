<script setup lang="ts">
import { computed, defineModel } from 'vue'
import { Option } from '@/lib/Option'

const clampsUsedModel = defineModel({
  type: Object as () => Option.Option<null>,
  required: true
})

const clampsUsedDisplayValue = computed<string>(() => {
  if (clampsUsedModel.value._tag === 'None') {
    return 'no'
  } else {
    return 'yes'
  }
})

function toggleClampsUsed() {
  if (clampsUsedModel.value === undefined || clampsUsedModel.value._tag === 'None') {
    clampsUsedModel.value = Option.Some(null)
  } else {
    clampsUsedModel.value = Option.None()
  }
}
</script>

<template>
  <button name="clampToggle" @click="toggleClampsUsed">{{ clampsUsedDisplayValue }}</button>
</template>
