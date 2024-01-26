<script setup lang="ts">
import { Option } from '@/lib/Option'
import { AWGConductor } from '@/lib/BoxFill'

const props = defineProps<{ largestAWG: AWGConductor }>()
const terminalBlocksModel = defineModel<Option.Option<AWGConductor[]>>({ required: true })
const emit = defineEmits(['update:modelValue'])

function addNewTerminalBlock() {
  const newTerminalBlock = props.largestAWG
  const updatedBlocks = Option.getOrDefault(terminalBlocksModel.value, [])
  updatedBlocks.push(newTerminalBlock)
  emit('update:modelValue', Option.Some(updatedBlocks))
}

function removeTerminalBlock(index: number): void {
  const updatedBlocks = Option.getOrDefault(terminalBlocksModel.value, [])
  updatedBlocks.splice(index, 1)
  if (updatedBlocks.length === 0) {
    emit('update:modelValue', Option.None())
  } else {
    emit('update:modelValue', Option.Some(updatedBlocks))
  }
}
</script>

<template>
  <button name="addTerminalBlock" @click="addNewTerminalBlock">+ add terminal block</button>
  <div v-for="(block, index) in Option.getOrDefault(terminalBlocksModel, [])" :key="index">
    {{ block + ' AWG' }}
    <button @click="removeTerminalBlock(index)">- remove terminal block</button>
  </div>
</template>
