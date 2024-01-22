<script setup lang="ts">
import { computed, defineEmits, defineModel, defineProps } from 'vue'
import { Option } from '@/lib/Option'
import { type Conductor, AWGConductor } from '@/lib/BoxFill'

const emit = defineEmits(['update:clampsUsedModel'])

const props = defineProps({
  largestAWG: {
    type: Number as () => AWGConductor,
    required: true
  }
})

const clampsUsedModel = defineModel('clampsUsedModel', {
  type: Object as () => Option.Option<Conductor>,
  required: true
})

const clampsUsedDisplayValue = computed<string>(() => {
  if (clampsUsedModel.value._tag === 'None') {
    return 'no'
  } else {
    return 'yes'
  }
})

function toggleClampsUsedValue() {
  if (clampsUsedModel.value._tag === 'None') {
    emit(
      'update:clampsUsedModel',
      Option.Some({
        num: 1,
        largestAWG: props.largestAWG
      })
    )
  } else {
    emit('update:clampsUsedModel', Option.None())
  }
}
</script>

<template>
  <button @click="toggleClampsUsedValue">{{ clampsUsedDisplayValue }}</button>
</template>
