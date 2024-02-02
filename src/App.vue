<script setup lang="ts">
import { Store } from '@/store/Store'
import { computed } from 'vue'

import {
    UnitSystem,
    AWGConductor,
    type NumConductors,
    type NumSupportFittings
} from '@/lib/BoxFill'
import type { IDDevices } from '@/store/Store'
import { Option } from '@/lib/Option'

import BoxFillDisplay from '@/components/BoxFillDisplay/BoxFillDisplay.vue'
import AWGInput from './components/AWGInput.vue'
import ConductorInput from '@/components/ConductorInput.vue'
import ClampToggle from '@/components/ClampToggle.vue'
import SupportFittingsInput from './components/SupportFittingsInput.vue'
import DevicesDisplay from './components/DeviceInput/DevicesDisplay.vue'
import TerminalBlockInput from './components/TerminalBlockInput.vue'

// Computed property at the Store level
const boxFillResult = Store.tryGetBoxFill()

const unitSystem = computed({
    get: () => Store.getUnitSystem(),
    set: (unitSystem: UnitSystem) => Store.setUnitSystem(unitSystem)
})

const largestConductor = computed({
    get: () => Store.getLargestConductor(),
    set: (largestConductor: AWGConductor) => Store.setLargestConductor(largestConductor)
})

const generalConductors = computed<Option.Option<NumConductors>>({
    get: () => Store.getGeneralConductors(),
    set: (generalConductors: Option.Option<NumConductors>) =>
        Store.setGeneralConductors(generalConductors)
})

const internalClamps = computed({
    get: () => Store.getInternalClamps(),
    set: (internalClamps: Option.Option<null>) => Store.setInternalClamps(internalClamps)
})

const supportFittings = computed({
    get: () => Store.getSupportFittings(),
    set: (supportFittings: Option.Option<NumSupportFittings>) =>
        Store.setSupportFittings(supportFittings)
})

const devices = computed<Option.Option<IDDevices>>({
    get: () => Store.getDevices(),
    set: (devices) => {
        const rawDevices = Option.getOrDefault(devices, [])
        Store.setDevices(rawDevices)
    }
})

const groundingConductors = computed<Option.Option<NumConductors>>({
    get: () => Store.getGroundingConductors(),
    set: (conductors) => {
        Store.setGroundingConductors(conductors)
    }
})

const terminalBlocks = computed<Option.Option<AWGConductor[]>>({
    get: () => Store.getTerminalBlocks(),
    set: (newBlocks) => {
        Store.setTerminalBlocks(newBlocks)
    }
})
</script>

<template>
    <header>
        <!-- Readout -->
        <BoxFillDisplay id="box-fill-display" v-model:unitSystemModel="unitSystem" :box-fill-result="boxFillResult" />
    </header>

    <main>
        <!-- Input -->
        <h2>largest conductor in box:</h2>
        <AWGInput id="largest-conductor" v-model="largestConductor" />

        <h2>general conductors:</h2>
        <ConductorInput id="general-conductors" v-model="generalConductors" />

        <h2>internal clamps:</h2>
        <ClampToggle id="internal-clamps" v-model="internalClamps" />

        <h2>support fittings:</h2>
        <SupportFittingsInput id="support-fittings" v-model="supportFittings" />

        <h2>devices:</h2>
        <DevicesDisplay id="devices" v-model="devices" :largestAWG="largestConductor" />

        <h2>grounding conductors:</h2>
        <ConductorInput id="grounding-conductors" v-model="groundingConductors" />

        <h2>terminal blocks:</h2>
        <TerminalBlockInput id="terminal-blocks" v-model="terminalBlocks" :largestAWG="largestConductor" />
    </main>
</template>

<style scoped>
header {
    width: 100%;
    margin-top: 2em;
    margin-bottom: 2em;
}

main {
    max-width: 500px;
    margin: 0 auto;

    /* flex */
    display: flex;
    flex-flow: column nowrap;
}
</style>
