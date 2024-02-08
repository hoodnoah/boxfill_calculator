<script setup lang="ts">
import { Option } from '@/lib/Option'
import { AWGConductor } from '@/lib/BoxFill'
import AWGInput from '@/components/AWGInput.vue'

// Used for defaults
const props = defineProps<{ largestAWG: AWGConductor, header?: string }>()

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
    <div class="terminal-blocks-header">
        <h2 v-if="props.header !== undefined && props.header != ''">{{ props.header }}</h2>
        <button class="add-item-button" name="addTerminalBlock" @click="addNewTerminalBlock">+</button>
    </div>
    <div class="terminal-blocks-list">
        <div class="terminalBlocksDisplay" v-for="(block, index) in Option.getOrDefault(terminalBlocksModel, [])"
            :key="index">
            <AWGInput class="terminal-block-awg-input" v-model="Option.getOrDefault(terminalBlocksModel, [])[index]" />
            <button class="delete-item-button" name="deleteTerminalBlock" @click="removeTerminalBlock(index)">
                X
            </button>
        </div>
    </div>
</template>

<style scoped>
@import url('@/assets/main.css');

.terminal-blocks-header {
    display: flex;
    flex-flow: row nowrap;
    gap: 1em;
    align-items: baseline;
}

.terminalBlocksDisplay {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: flex-end;
    align-items: baseline;
    gap: 1em;
}

.terminal-blocks-list {
    display: flex;
    flex-flow: column nowrap;
    gap: .5em;
}

.terminal-block-awg-input {
    flex-grow: 1;
}

.add-item-button {
    background-color: var(--color-button-green);
}

.delete-item-button {
    background-color: var(--color-button-red);
}
</style>
