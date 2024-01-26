<script setup lang="ts">
import type { IDDevice } from '@/store/Store'
import AWGInput from '@/components/AWGInput.vue'
import type { AWGConductor } from '@/lib/BoxFill'

const emit = defineEmits(['deleteDevice', 'updateDevice'])

const deviceModel = defineModel<IDDevice>({ required: true })

function handleUpdate(key: keyof IDDevice, value: AWGConductor) {
  deviceModel.value[key] = value
  emit('updateDevice', deviceModel)
}
</script>

<template>
  <AWGInput v-model="deviceModel.largestAWG" />
  <input
    type="number"
    min="1"
    name="numGangInput"
    v-model="deviceModel.numGangs"
    @update:modelValue="handleUpdate('largestAWG', $event)"
  />
  <button name="deleteButton" @click="$emit('deleteDevice', deviceModel)">- delete device</button>
</template>
