<script setup lang="ts">
import { computed, defineModel } from 'vue'

import { UnitSystem } from '@/lib/BoxFill'

const unitSystemModel = defineModel('unitSystemModel', {
    type: Number as () => UnitSystem,
    required: true
})

const unitSystemDisplayValue = computed<string>(() => {
    switch (unitSystemModel.value) {
        case UnitSystem.Metric:
            return 'cubic centimeters'
        case UnitSystem.Imperial:
            return 'cubic inches'
        default:
            return 'error'
    }
})

function toggleUnitSystemValue() {
    if (unitSystemModel.value === UnitSystem.Metric) {
        unitSystemModel.value = UnitSystem.Imperial
    } else {
        unitSystemModel.value = UnitSystem.Metric
    }
}
</script>

<template>
    <button @click="toggleUnitSystemValue">{{ unitSystemDisplayValue }}</button>
</template>

<style scoped>
/* global style */
@import url('@/assets/main.css');

/* font import */
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');

button {
    /* font */
    font-family: 'Rubik', monospace;
    font-size: 1rem;

    /* box */
    border: none;
    padding: .5em;
    border-radius: 10px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.12),
        2px 2px 2px rgba(0, 0, 0, 0.12),
        4px 4px 4px rgba(0, 0, 0, 0.12),
        8px 8px 8px rgba(0, 0, 0, 0.12),
        16px 16px 16px rgba(0, 0, 0, 0.12);

    /* interactivity */
    cursor: pointer;
}

@media (hover: hover) {
    button:hover {
        background-color: var(--color-border-hover);
    }
}
</style>
