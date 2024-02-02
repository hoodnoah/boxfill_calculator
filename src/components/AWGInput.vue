<script setup lang="ts">
import { AWGConductor } from '@/lib/BoxFill'

const emit = defineEmits(['update:modelValue'])

const awgSelected = defineModel({ type: Number as () => AWGConductor, required: true })

// get all supported AWG options
const awgOptions = Object.values(AWGConductor).filter((x) => !isNaN(Number(x)))

function updateAWGModel() {
    emit('update:modelValue', awgSelected.value)
}
</script>

<template>
    <div>
        <h2>largest conductor in box:</h2>
        <select v-model="awgSelected" @input="updateAWGModel" name="awgInput">
            <option v-for="awg in awgOptions" :key="awg" :value="awg">{{ 'AWG ' + awg }}</option>
        </select>
    </div>
</template>
