<script setup lang="ts">
import { computed, defineModel } from 'vue'

import { type Result } from '@/lib/Result'
import { UnitSystem, type BoxFill } from '@/lib/BoxFill'

import UnitSystemToggle from '@/components/BoxFillDisplay/UnitSystemToggle.vue'

const props = defineProps({
    boxFillResult: {
        type: Object as () => Result<BoxFill>,
        required: true
    }
})

const unitSystemModel = defineModel('unitSystemModel', {
    type: Number as () => UnitSystem,
    required: true
})

const boxFillDisplayValue = computed<string>(() => {
    if (props.boxFillResult.ok === false) {
        return 'error'
    } else {
        return props.boxFillResult.value.value.toFixed(1)
    }
})
</script>

<template>
    <div class="box-fill-display">
        <span class="digit-readout">{{ boxFillDisplayValue }}</span>
        <UnitSystemToggle v-model:unit-system-model="unitSystemModel" />
    </div>
</template>

<style scoped>
/* font import */
@import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap');

.box-fill-display {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    gap: 1rem;
}

.digit-readout {
    font-family: 'Rubik Mono', monospace;
    font-size: 7em;
}
</style>
