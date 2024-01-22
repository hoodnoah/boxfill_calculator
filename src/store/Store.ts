import { computed, reactive, type ComputedRef } from 'vue'
import { UnitSystem } from '@/lib/BoxFill'
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
  generalConductors: Conductors
  internalClamps: Option.Option<Conductors>
}

// Initialize state
const State = reactive<State>({
  unitSystem: DEFAULT_UNIT_SYSTEM,
  generalConductors: { num: 0, largestAWG: AWGConductor.AWG_12 },
  internalClamps: Option.None()
})

// Getters
function tryGetBoxFill(): ComputedRef<Result<BoxFill>> {
  return computed(() => {
    const boxFillResult = calculateBoxFill({
      generalConductors: State.generalConductors,
      unitSystem: State.unitSystem,
      internalClamps: State.internalClamps
    })

    return boxFillResult
  })
}

function getUnitSystem(): UnitSystem {
  return State.unitSystem
}

// Getters
function getGeneralConductors(): Conductors {
  return State.generalConductors
}

function getInternalClamps(): Option.Option<Conductors> {
  return State.internalClamps
}

// Setters
function setUnitSystem(unitSystem: UnitSystem): void {
  State.unitSystem = unitSystem
}

function setGeneralConductors(generalConductors: Conductors): void {
  State.generalConductors = generalConductors
}

function setInternalClamps(internalClamps: Option.Option<Conductors>): void {
  State.internalClamps = internalClamps
}

export const Store = {
  tryGetBoxFill,
  getUnitSystem,
  getGeneralConductors,
  getInternalClamps,
  setUnitSystem,
  setGeneralConductors,
  setInternalClamps
}
