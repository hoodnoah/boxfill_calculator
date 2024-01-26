<script setup lang="ts">
import { computed } from 'vue'
import { Option } from '@/lib/Option'
import type { IDDevice, IDDevices } from '@/store/Store'
import { FP_Utility } from '@/lib/FP_Utility'
import DeviceDisplay from './DeviceDisplay.vue'
import { AWGConductor } from '@/lib/BoxFill'

const emit = defineEmits(['update:modelValue'])

const tryFindIndex = FP_Utility.tryFindIndex

const props = defineProps<{ largestAWG: AWGConductor }>()

const devicesModel = defineModel<Option.Option<IDDevices>>({ required: true })
const displayDevices = computed(() => Option.getOrDefault(devicesModel.value, []))

function devicesEqual(d1: IDDevice, d2: IDDevice): boolean {
  return d1.id === d2.id
}

// Replaces a Device with a new version
function updateDevice(device: IDDevice): void {
  const index = Option.bind(devicesModel.value, (devices) =>
    tryFindIndex(devices, device, devicesEqual)
  )

  Option.map(index, (n) => {
    Option.map(devicesModel.value, (devices) => {
      devices[n] = { ...device }
    })
  })
}

function addNewDevice(): void {
  const id = Option.getOrDefault(
    Option.map(devicesModel.value, (devices) => devices.length),
    1
  )
  const largestAWG = props.largestAWG

  const newDevice = {
    id,
    largestAWG,
    numGangs: 1
  }
  if (Option.isNone(devicesModel.value)) {
    devicesModel.value = Option.Some([newDevice])
  } else {
    Option.map(
      devicesModel.value,
      (devices) => (devicesModel.value = Option.Some([...devices, newDevice]))
    )
  }
}

// Removes a Device, by ID
function deleteDevice(device: IDDevice): void {
  Option.map(devicesModel.value, (devices) => {
    const index = tryFindIndex(devices, device, devicesEqual)

    Option.map(index, (i) => devices.splice(i, 1))
  })
}

// Handlers
function handleUpdate(updatedDevice: IDDevice): void {
  updateDevice(updatedDevice)
  emit('update:modelValue', devicesModel.value)
}

function handleDelete(device: IDDevice): void {
  deleteDevice(device)
  emit('update:modelValue', devicesModel.value)
}
</script>

<template>
  <button name="addDevice" @click="addNewDevice">+ add new device</button>
  <div v-if="displayDevices.length > 0">
    <div v-for="(displayDevice, index) in displayDevices" :key="displayDevice.id">
      <DeviceDisplay
        v-model="displayDevices[index]"
        @delete-device="handleDelete"
        @update-device="handleUpdate"
      />
    </div>
  </div>
</template>
