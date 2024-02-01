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
/* Font import */
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');

button {
  align-items: center;
  appearance: none;
  background-color: #fcfcfd;
  border-radius: 4px;
  border-width: 0;
  box-shadow:
    rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
    #d6d6e7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395a;
  cursor: pointer;
  display: inline-flex;
  font-family: 'Rubik', monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition:
    box-shadow 0.15s,
    transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;
}

button:focus {
  box-shadow:
    #d6d6e7 0 0 0 1.5px inset,
    rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
    #d6d6e7 0 -3px 0 inset;
}

button:hover {
  box-shadow:
    rgba(45, 35, 66, 0.4) 0 4px 8px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
    #d6d6e7 0 -3px 0 inset;
  transform: translateY(-2px);
}

button:active {
  box-shadow: #d6d6e7 0 3px 7px inset;
  transform: translateY(2px);
}
</style>
