import { computed, reactive, type ComputedRef } from 'vue'
import { UnitSystem, type NumConductors, type NumSupportFittings } from '@/lib/BoxFill'
import {
  type BoxFill,
  type Conductors,
  AWGConductor,
  getBoxFill as calculateBoxFill
} from '@/lib/BoxFill'
import { type Result } from '@/lib/Result'
import { Option } from '@/lib/Option'

/*
   State to manage:
    - BoxFill
    - UnitSystem
    - generalConductors
*/

const DEFAULT_UNIT_SYSTEM = UnitSystem.Metric

interface State {
  unitSystem: UnitSystem
  largestConductor: AWGConductor
  generalConductors: NumConductors
  internalClamps: Option.Option<null>
  supportFittings: Option.Option<NumSupportFittings>
}

// Initialize state
const State = reactive<State>({
  unitSystem: DEFAULT_UNIT_SYSTEM,
  largestConductor: AWGConductor.AWG_12,
  generalConductors: 0,
  internalClamps: Option.None(),
  supportFittings: Option.None()
})

// Getters
function tryGetBoxFill(): ComputedRef<Result<BoxFill>> {
  return computed(() => {
    const boxFillResult = calculateBoxFill({
      largestConductor: State.largestConductor,
      generalConductors: State.generalConductors,
      unitSystem: State.unitSystem,
      internalClamps: State.internalClamps,
      supportFittings: State.supportFittings
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

function getGeneralConductors(): NumConductors {
  return State.generalConductors
}

function getInternalClamps(): Option.Option<null> {
  return State.internalClamps
}

function getSupportFittings(): Option.Option<NumSupportFittings> {
  return State.supportFittings
}

// Setters
function setUnitSystem(unitSystem: UnitSystem): void {
  State.unitSystem = unitSystem
}

function setLargestConductor(newAWG: AWGConductor): void {
  State.largestConductor = newAWG
}

function setGeneralConductors(generalConductors: NumConductors): void {
  State.generalConductors = generalConductors
}

function setInternalClamps(internalClamps: Option.Option<null>): void {
  State.internalClamps = internalClamps
}

function setSupportFittings(supportFittings: Option.Option<NumSupportFittings>): void {
  State.supportFittings = supportFittings
}

export const Store = {
  tryGetBoxFill,
  getUnitSystem,
  getLargestConductor,
  getGeneralConductors,
  getInternalClamps,
  getSupportFittings,
  setUnitSystem,
  setLargestConductor,
  setGeneralConductors,
  setInternalClamps,
  setSupportFittings
}
