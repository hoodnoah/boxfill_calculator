<script setup lang="ts">
import { Store } from '@/store/Store'
import { computed } from 'vue'

import { type Conductors, UnitSystem } from '@/lib/BoxFill'

import BoxFillDisplay from '@/components/BoxFillDisplay/BoxFillDisplay.vue'
import ConductorInput from './components/ConductorInput/ConductorInput.vue'

const boxFillResult = Store.tryGetBoxFill()

const unitSystem = computed({
  get: () => Store.getUnitSystem(),
  set: (unitSystem: UnitSystem) => Store.setUnitSystem(unitSystem)
})

const generalConductors = computed<Conductors>({
  get: () => {
    return Store.getGeneralConductors()
  },
  set: (generalConductors: Conductors) => {
    Store.setGeneralConductors(generalConductors)
  }
})
</script>

<template>
  <header>
    <div class="wrapper"></div>
  </header>

  <main>
    <BoxFillDisplay v-model:unitSystemModel="unitSystem" :box-fill-result="boxFillResult" />
    <h1>general conductors:</h1>
    <ConductorInput v-model:conductorModel="generalConductors" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
