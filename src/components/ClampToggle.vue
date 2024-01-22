<script setup lang="ts">
import { computed, defineModel, watch } from 'vue'
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

// Update the AWG value in clampsUsedModel when it's changed
watch(
  () => props.largestAWG,
  () => {
    if (clampsUsedModel.value._tag === 'Some') {
      emit(
        'update:clampsUsedModel',
        Option.Some({
          largestAWG: props.largestAWG
        })
      )
    }
  }
)
</script>

<template>
  <button @click="toggleClampsUsedValue">{{ clampsUsedDisplayValue }}</button>
</template>
