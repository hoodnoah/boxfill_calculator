<script setup lang="ts">
import type { IDDevice } from '@/store/Store'
import AWGInput from '@/components/AWGInput.vue'
import type { AWGConductor } from '@/lib/BoxFill'

const emit = defineEmits(['deleteDevice', 'updateDevice'])

const deviceModel = defineModel<IDDevice>({ required: true })

function handleUpdate(key: keyof IDDevice, value: AWGConductor) {
    emit('updateDevice', { ...deviceModel.value, [key]: value })
}
</script>

<template>
    <div class="single-device-display">
        <AWGInput v-model="deviceModel.largestAWG" />
        <div class="gang-input">

            <span>gangs:</span>
            <input type="number" min="1" name="numGangInput" v-model="deviceModel.numGangs"
                @update:modelValue="handleUpdate('largestAWG', $event)" />
        </div>
        <button name="deleteButton" @click="$emit('deleteDevice', deviceModel.id)">
            X
        </button>
    </div>
</template>

<style scoped>
.single-device-display {
    display: flex;
    flex-flow: row nowrap;
    gap: .5em;
    width: 100%;
    justify-content: space-around;
    align-items: baseline;
}

.gang-input {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    justify-content: flex-end;
    gap: 1em;
}

button {
    background-color: var(--color-button-red);
}
</style>
