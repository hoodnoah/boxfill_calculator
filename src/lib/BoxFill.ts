import { wrap, wrapError, unwrapOrThrow } from './Result'
import type { Result } from './Result'

const CM_PER_INCH = 2.54

export enum UnitSystem {
  Metric,
  Imperial
}

export interface Allowance {
  unitSystem: UnitSystem
  value: number
}

export type BoxFill = Allowance

export enum AWGConductor {
  AWG_18 = 18,
  AWG_16 = 16,
  AWG_14 = 14,
  AWG_12 = 12,
  AWG_10 = 10,
  AWG_8 = 8,
  AWG_6 = 6
}

function getAllowance(conductor: AWGConductor): Result<Allowance> {
  switch (conductor) {
    case AWGConductor.AWG_18:
      return wrap({ unitSystem: UnitSystem.Metric, value: 24.6 })
    case AWGConductor.AWG_16:
      return wrap({ unitSystem: UnitSystem.Metric, value: 28.7 })
    case AWGConductor.AWG_14:
      return wrap({ unitSystem: UnitSystem.Metric, value: 32.8 })
    case AWGConductor.AWG_12:
      return wrap({ unitSystem: UnitSystem.Metric, value: 36.9 })
    case AWGConductor.AWG_10:
      return wrap({ unitSystem: UnitSystem.Metric, value: 41.0 })
    case AWGConductor.AWG_8:
      return wrap({ unitSystem: UnitSystem.Metric, value: 49.2 })
    case AWGConductor.AWG_6:
      return wrap({ unitSystem: UnitSystem.Metric, value: 81.9 })
    default:
      return wrapError(new Error('Invalid AWG conductor'))
  }
}

function switchUnitSystem(allowance: Allowance): Allowance {
  if (allowance.unitSystem === UnitSystem.Metric) {
    const value = allowance.value / CM_PER_INCH ** 3
    return { unitSystem: UnitSystem.Imperial, value }
  } else {
    const value = allowance.value * CM_PER_INCH ** 3
    return { unitSystem: UnitSystem.Metric, value }
  }
}

export function getBoxFill(
  largestConductor: AWGConductor,
  numConductors: number,
  unitSystem: UnitSystem = UnitSystem.Metric
): Result<BoxFill> {
  const allowance = getAllowance(largestConductor)
  if (!allowance.ok) {
    return allowance
  }
  const boxFill = numConductors * allowance.value.value

  if (unitSystem === allowance.value.unitSystem) {
    return { ok: true, value: { unitSystem, value: boxFill } }
  } else {
    return { ok: true, value: { unitSystem, value: switchUnitSystem(allowance.value).value } }
  }
}
