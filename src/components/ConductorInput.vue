<script setup lang="ts">
import type { NumConductors } from '@/lib/BoxFill'
import { defineModel } from 'vue'

const numConductorsModel = defineModel({
  type: Number as () => NumConductors,
  required: true
})
</script>

<template>
  <input type="number" min="0" v-model="numConductorsModel" />
</template>
