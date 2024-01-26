<script setup lang="ts">
import { Option } from '@/lib/Option'
import { AWGConductor } from '@/lib/BoxFill'
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{ largestAWG: AWGConductor }>()
const terminalBlocksModel = defineModel<Option.Option<AWGConductor[]>>({ required: true })

const terminalBlocksDisplayValue = ref(Option.getOrDefault(terminalBlocksModel.value, []))

function addNewTerminalBlock() {
  const newTerminalBlock = props.largestAWG
  terminalBlocksDisplayValue.value.push(newTerminalBlock)
  emit('update:modelValue', Option.Some(terminalBlocksDisplayValue.value))
}

function removeTerminalBlock(id: number): void {
  terminalBlocksDisplayValue.value.splice(id, 1)
  if (terminalBlocksDisplayValue.value.length == 0) {
    emit('update:modelValue', Option.None())
  } else {
    emit('update:modelValue', Option.Some(terminalBlocksDisplayValue.value))
  }
}
</script>

<template>
  <button name="addTerminalBlock" @click="addNewTerminalBlock">+ add terminal block</button>
  <div v-for="(block, index) in terminalBlocksDisplayValue" :key="index">
    {{ block + ' AWG' }}
    <button @click="removeTerminalBlock(index)">- remove terminal block</button>
  </div>
</template>
