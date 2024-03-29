<script setup lang="ts">
import { Option } from '@/lib/Option'
import type { IDDevice, IDDevices } from '@/store/Store'
import DeviceDisplay from './DeviceDisplay.vue'
import { AWGConductor } from '@/lib/BoxFill'

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{ largestAWG: AWGConductor, header?: string }>()

const devicesModel = defineModel<Option.Option<IDDevices>>({ required: true })

// Gets an id one larger than the largest present, or 1 if None
function getNewId(devices: Option.Option<IDDevices>): number {
    return Option.getOrDefault(
        Option.map(devices, (devicesUnwrapped) => {
            return devicesUnwrapped.reduce((prev, d) => (d.id > prev ? d.id : prev), 0) + 1
        }),
        1
    )
}

// Replaces a Device with a new version
function updateDevice(device: IDDevice): void {
    const devices = Option.getOrDefault(devicesModel.value, [])

    const index = devices.findIndex((x) => x.id === device.id)

    if (index === -1) {
        return
    } else {
        const newDevices = [...devices]
        newDevices[index] = device
        emit('update:modelValue', Option.Some(newDevices))
    }
}

// Creates a new default device, adds it to the list
function addNewDevice(): void {
    const id = getNewId(devicesModel.value)
    const largestAWG = props.largestAWG

    const newDevice = {
        id,
        largestAWG,
        numGangs: 1
    }

    const originalDevices = Option.getOrDefault(devicesModel.value, [])
    const newDevices = [...originalDevices, newDevice]
    emit('update:modelValue', Option.Some(newDevices))
}

// Removes a Device, by ID
function deleteDevice(device: IDDevice): void {
    const devices = [...Option.getOrDefault(devicesModel.value, [])]
    const index = devices.findIndex((x) => x.id === device.id)

    if (index === -1) {
        return
    } else {
        devices.splice(index, 1)
        const emitDevices = devices.length < 1 ? Option.None() : Option.Some(devices)
        emit('update:modelValue', emitDevices)
    }
}
</script>

<template>
    <div class="devices-display-header">
        <h2 v-if="props.header !== undefined && props.header != ''">{{ props.header }}</h2>
        <button name="addDevice" @click="addNewDevice">+</button>
    </div>
    <div class="devices-display" v-if="Option.isSome(devicesModel)">
        <div v-for="idDevice in Option.getOrDefault(devicesModel, [])" :key="idDevice.id">
            <DeviceDisplay :modelValue="idDevice" @delete-device="deleteDevice(idDevice)"
                @update-device="updateDevice(idDevice)" />
        </div>
    </div>
</template>

<style scoped>
@import url('@/assets/main.css');

.devices-display-header {
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    gap: 1em;
}

.devices-display-header button {
    background-color: var(--color-button-green);
}

.devices-display {
    display: flex;
    flex-flow: column nowrap;
    gap: .25em;
}
</style>
