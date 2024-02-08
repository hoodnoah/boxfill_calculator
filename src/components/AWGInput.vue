<script setup lang="ts">
import { AWGConductor } from '@/lib/BoxFill'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{ header?: string }>()

const awgSelected = defineModel({ type: Number as () => AWGConductor, required: true })

// get all supported AWG options
const awgOptions = Object.values(AWGConductor).filter((x) => !isNaN(Number(x)))

function updateAWGModel() {
    emit('update:modelValue', awgSelected.value)
}
</script>

<template>
    <div class="awg-input-wrapper">
        <h2 v-if="props.header !== undefined && props.header !== ''">largest conductor in box:</h2>
        <select v-model="awgSelected" @input="updateAWGModel" name="awgInput">
            <option v-for="awg in awgOptions" :key="awg" :value="awg">{{ 'AWG ' + awg }}</option>
        </select>
    </div>
</template>

<style scoped>
select {
    width: 100%;
}
</style>
