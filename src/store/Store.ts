import { computed, reactive, type ComputedRef } from 'vue'
import { UnitSystem, AWGConductor, getBoxFill as calculateBoxFill } from '@/lib/BoxFill'
import type { BoxFill, Device, NumConductors, NumSupportFittings } from '@/lib/BoxFill'

export interface IDDevice extends Device {
  id: number
}

export type IDDevices = IDDevice[]

import { type Result } from '@/lib/Result'
import { Option } from '@/lib/Option'

const DEFAULT_UNIT_SYSTEM = UnitSystem.Imperial

interface State {
  unitSystem: UnitSystem
  largestConductor: AWGConductor
  generalConductors: Option.Option<NumConductors>
  internalClamps: Option.Option<null>
  supportFittings: Option.Option<NumSupportFittings>
  devices: Option.Option<IDDevices>
  groundingConductors: Option.Option<NumConductors>
  terminalBlocks: Option.Option<AWGConductor[]>
}

// Initialize state
const State = reactive<State>({
  unitSystem: DEFAULT_UNIT_SYSTEM,
  largestConductor: AWGConductor.AWG_12,
  generalConductors: Option.None(),
  internalClamps: Option.None(),
  supportFittings: Option.None(),
  devices: Option.None(),
  groundingConductors: Option.None(),
  terminalBlocks: Option.None()
})

// Utility
function sortDevices(devices: IDDevices): IDDevices {
  return [...devices].sort((a, b) => a.id - b.id)
}

// Getters
function tryGetBoxFill(): ComputedRef<Result<BoxFill>> {
  return computed(() => {
    const boxFillResult = calculateBoxFill({
      largestConductor: State.largestConductor,
      generalConductors: State.generalConductors,
      unitSystem: State.unitSystem,
      internalClamps: State.internalClamps,
      supportFittings: State.supportFittings,
      devices: State.devices,
      groundingConductors: State.groundingConductors,
      terminalBlocks: State.terminalBlocks
    })

    return boxFillResult
  })
}

function getUnitSystem(): UnitSystem {
  return State.unitSystem
}

function getLargestConductor(): AWGConductor {
  return State.largestConductor
}

function getGeneralConductors(): Option.Option<NumConductors> {
  return State.generalConductors
}

function getInternalClamps(): Option.Option<null> {
  return State.internalClamps
}

function getSupportFittings(): Option.Option<NumSupportFittings> {
  return State.supportFittings
}

function getDevices(): Option.Option<IDDevices> {
  return State.devices
}

function getGroundingConductors(): Option.Option<NumConductors> {
  return State.groundingConductors
}

function getTerminalBlocks(): Option.Option<AWGConductor[]> {
  return State.terminalBlocks
}

// Setters
function setUnitSystem(unitSystem: UnitSystem): void {
  State.unitSystem = unitSystem
}

function setLargestConductor(newAWG: AWGConductor): void {
  State.largestConductor = newAWG
}

function setGeneralConductors(generalConductors: Option.Option<NumConductors>): void {
  State.generalConductors = generalConductors
}

function setInternalClamps(internalClamps: Option.Option<null>): void {
  State.internalClamps = internalClamps
}

function setSupportFittings(supportFittings: Option.Option<NumSupportFittings>): void {
  State.supportFittings = supportFittings
}

function setDevices(devices: IDDevices): void {
  if (devices.length == 0) {
    State.devices = Option.None()
  } else {
    State.devices = Option.Some(sortDevices(devices))
  }
}

function setGroundingConductors(conductors: Option.Option<NumConductors>): void {
  State.groundingConductors = conductors
}

function setTerminalBlocks(terminalBlocks: Option.Option<AWGConductor[]>): void {
  State.terminalBlocks = terminalBlocks
}

// Actions
/**
 * Adds a single device to the list of devices
 * @param device the device to add, with or without ID (it will be reassigned automatically)
 * @returns the device added, with its assigned ID value.
 */
function addDevice(device: Device): IDDevice {
  const devicesArray: IDDevices = Option.getOrDefault(State.devices, [])
  const id = devicesArray.length + 1
  const idDevice: IDDevice = { ...device, id: id }
  if (devicesArray.length === 0) {
    setDevices([idDevice])
  } else {
    Option.map(State.devices, (devices) => devices.push(idDevice))
  }

  return idDevice
}

/**
 * Removes a device from the list of devices, by ID
 * @param device The device to remove, with its ID
 */
function removeDevice(device: IDDevice): void {
  const newDeviceArr = Option.getOrDefault(
    Option.map(State.devices, (deviceArr) => {
      return deviceArr.filter((arrDevice) => arrDevice.id != device.id)
    }),
    []
  )
  setDevices(newDeviceArr)
}

export const Store = {
  tryGetBoxFill,
  getUnitSystem,
  getLargestConductor,
  getGeneralConductors,
  getInternalClamps,
  getSupportFittings,
  getDevices,
  getGroundingConductors,
  getTerminalBlocks,
  setUnitSystem,
  setLargestConductor,
  setGeneralConductors,
  setInternalClamps,
  setSupportFittings,
  setDevices,
  setGroundingConductors,
  setTerminalBlocks,
  addDevice,
  removeDevice
}
