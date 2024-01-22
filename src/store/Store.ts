import { computed, reactive, type ComputedRef } from 'vue'
import { UnitSystem } from '@/lib/BoxFill'
import {
  type BoxFill,
  type Conductors,
  AWGConductor,
  getBoxFill as calculateBoxFill
} from '@/lib/BoxFill'
import { type Result } from '@/lib/Result'

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
}

// Initialize state
const State = reactive<State>({
  unitSystem: DEFAULT_UNIT_SYSTEM,
  generalConductors: { num: 0, largestAWG: AWGConductor.AWG_12 }
})

// Getters
function tryGetBoxFill(): ComputedRef<Result<BoxFill>> {
  return computed(() => {
    const boxFillResult = calculateBoxFill({
      generalConductors: State.generalConductors,
      unitSystem: State.unitSystem
    })

    return boxFillResult
  })
}

function getUnitSystem(): UnitSystem {
  return State.unitSystem
}

// Getters
function getGeneralConductors(): Conductors {
  return { ...State.generalConductors }
}

// Setters
function setUnitSystem(unitSystem: UnitSystem): void {
  State.unitSystem = unitSystem
}

function setGeneralConductors(generalConductors: Conductors): void {
  State.generalConductors = generalConductors
}

export const Store = {
  tryGetBoxFill,
  getUnitSystem,
  getGeneralConductors,
  setUnitSystem,
  setGeneralConductors
}
