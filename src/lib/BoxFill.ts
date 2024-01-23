import { wrap, type Result } from './Result'
import { Option } from '@/lib/Option'

const CM_PER_INCH = 2.54 as const

export enum UnitSystem {
  Metric,
  Imperial
}

const DEFAULT_UNIT_SYSTEM = UnitSystem.Metric as const

export interface Allowance {
  unitSystem: UnitSystem
  value: number
}

const DEFAULT_ZERO_ALLOWANCE = {
  unitSystem: UnitSystem.Metric,
  value: 0
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

export type NumConductors = number
export type NumSupportFittings = number

export interface Conductor {
  largestAWG: AWGConductor
}

export interface Device {
  largestAWG: AWGConductor
  numGangs: number
}

export interface Devices {
  devices: Device[]
}

export interface Conductors extends Conductor {
  num: number
}

export interface BoxFillParameters {
  largestConductor: AWGConductor
  generalConductors: NumConductors
  internalClamps?: Option.Option<null>
  supportFittings?: Option.Option<NumSupportFittings>
  devicesUsed?: Option.Option<Devices>
  groundingConductors?: Option.Option<Conductors>
  terminalBlocks?: Option.Option<Conductors>
  unitSystem: UnitSystem
}

function getAllowance(awgConductor: AWGConductor): Allowance {
  switch (awgConductor) {
    case AWGConductor.AWG_18:
      return { unitSystem: UnitSystem.Metric, value: 24.6 }
    case AWGConductor.AWG_16:
      return { unitSystem: UnitSystem.Metric, value: 28.7 }
    case AWGConductor.AWG_14:
      return { unitSystem: UnitSystem.Metric, value: 32.8 }
    case AWGConductor.AWG_12:
      return { unitSystem: UnitSystem.Metric, value: 36.9 }
    case AWGConductor.AWG_10:
      return { unitSystem: UnitSystem.Metric, value: 41.0 }
    case AWGConductor.AWG_8:
      return { unitSystem: UnitSystem.Metric, value: 49.2 }
    case AWGConductor.AWG_6:
      return { unitSystem: UnitSystem.Metric, value: 81.9 }
    default:
      throw new Error('Invalid conductor provided.')
  }
}

/**
 * Switches the unit system of an allowance
 * @param allowance The allowance to switch the unit system of
 * @returns An allowance in metric, if provided imperial, or in imperial, if provided metric.
 */
function switchUnitSystem(allowance: Allowance): Allowance {
  if (allowance.unitSystem === UnitSystem.Metric) {
    const value = allowance.value / CM_PER_INCH ** 3
    return { unitSystem: UnitSystem.Imperial, value }
  } else {
    const value = allowance.value * CM_PER_INCH ** 3
    return { unitSystem: UnitSystem.Metric, value }
  }
}

/**
 * Gets the conductor fill for a given number of conductors at a specific gauge,
 * based on the largest conductor. Reference: Table 314.16(B)(1)
 * @param allowance The allowance, from table 314.16(B)(1)
 * @param numConductors The number of conductors in the box (does not include grounds)
 * @returns The conductor fill in cubic centimeters.
 */
function getConductorFill(largestAWG: AWGConductor, generalConductors: NumConductors): Allowance {
  const allowance = getAllowance(largestAWG)
  return {
    unitSystem: allowance.unitSystem,
    value: allowance.value * generalConductors
  }
}

/**
 * Gets the clamp fill based on whether or not internal clamps are being used.
 * Only adds a single allowance, per NEC 314.16(B)(2).
 * @param allowance The allowance, from table 314.16(B)(1)
 * @param clampsIncluded Whether or not internal clamps are being used
 * @returns A result containing the clamp fill, which is calculated as a single allowance if clamps are included, or 0 if they aren't.
 */
function getClampFill(
  largestAWG: AWGConductor,
  internalClamps: Option.Option<null>
): Option.Option<Allowance> {
  return Option.map(internalClamps, () => {
    const allowance = getAllowance(largestAWG)
    return {
      unitSystem: allowance.unitSystem,
      value: allowance.value
    }
  })
}

/**
 * Gets the support fitting fill based on the number of support fittings used.
 * @param allowance The allowance, from table 314.16(B)(1)
 * @param supportFittingsUsed The number of support fittings used.
 * @returns A result containing the support fitting fill, which is calculated as the allowance times the number of support fittings used.
 */
function getSupportFittingFill(
  largestAWG: AWGConductor,
  supportFittings: Option.Option<NumSupportFittings>
): Option.Option<Allowance> {
  return Option.map(supportFittings, (fittings) => {
    const allowance = getAllowance(largestAWG)
    return {
      unitSystem: allowance.unitSystem,
      value: allowance.value * fittings
    }
  })
}

/**
 * Gets the device fill based on the number of devices and number of gangs for those devices.
 * @param device A description of the device, which contains the number of gangs added.
 * @returns The device fill, which is a double-allowance per gang.
 */
function getDeviceFill(device: Device): Allowance {
  const allowance = getAllowance(device.largestAWG)
  return {
    unitSystem: allowance.unitSystem,
    value: allowance.value * 2 * device.numGangs
  }
}

/**
 * Reduces a list of devices to their respective allowances, summing them.
 * @param allowance The allowance, from table 314.16(B)(1)
 * @param devices An array of devices to include in the box fill calculation
 * @returns An Allowance representing the sums of the allowances for all devices included.
 */
function getDevicesFillTotal(devices: Option.Option<Devices>): Option.Option<Allowance> {
  return Option.map(devices, (devices) => {
    const deviceAllowances = devices.devices.map(getDeviceFill)
    const totalAllowance = deviceAllowances.reduce((acc, cur) => {
      return {
        unitSystem: acc.unitSystem,
        value: acc.value + cur.value
      }
    })
    return totalAllowance
  })
}

/**
 * Calculates the grounding conductor fill, based on the number of grounding conductors and their largest gauge
 * @param groundingConductors An object containing the number, and size of the largest grounding conductors.
 * @returns The box fill for grounding conductors.
 */
function getGroundingConductorFill(
  groundingConductors: Option.Option<Conductors>
): Option.Option<Allowance> {
  return Option.map(groundingConductors, (groundingConductors) => {
    const groundingAllowance = getAllowance(groundingConductors.largestAWG)
    const numFullAllowances = Math.floor(groundingConductors.num / 4)
    const numPartialAllowances = groundingConductors.num % 4
    const totalAllowance =
      numFullAllowances * groundingAllowance.value +
      numPartialAllowances * 0.25 * groundingAllowance.value

    return {
      unitSystem: groundingAllowance.unitSystem,
      value: totalAllowance
    }
  })
}

/**
 * Gets the terminal block fill based on the largest terminated conductor and the number of terminal blocks.
 * @param terminalBlockFill The largest terminated conductor and the number of terminal blocks.
 * @returns The allowance for terminal block fill
 */
function getTerminalBlockFill(
  terminalBlockFill: Option.Option<Conductors>
): Option.Option<Allowance> {
  return Option.map(terminalBlockFill, (terminalBlockFill) => {
    const allowance = getAllowance(terminalBlockFill.largestAWG)
    return {
      unitSystem: allowance.unitSystem,
      value: allowance.value * terminalBlockFill.num
    }
  })
}

/**
 * Calculates the box fill given the largest conductor, number of conductors,
 * number of yokes/straps, number of grounding connectors, and number of devices.
 * @param boxFillArgs An object containing the parameters for calculating box fill, e.g. largest conductor, unit system, number of devices, etc.
 * @returns A result if the box fill can be calculated, or an error if the box fill cannot be calculated.
 */
export function getBoxFill(boxFillArgs: BoxFillParameters): Result<BoxFill> {
  // Null-coalesce the optional parameters into Option.None
  const largestAWG = boxFillArgs.largestConductor
  const generalConductors = boxFillArgs.generalConductors
  const supportFittings = boxFillArgs.supportFittings ?? Option.None()
  const internalClamps = boxFillArgs.internalClamps ?? Option.None()
  const devicesUsed = boxFillArgs.devicesUsed ?? Option.None()
  const groundingConductors = boxFillArgs.groundingConductors ?? Option.None()
  const terminalBlocks = boxFillArgs.terminalBlocks ?? Option.None()
  const unitSystem = boxFillArgs.unitSystem

  // Calculate intermediate fill values, default to 0 if None
  const conductorFill = getConductorFill(largestAWG, generalConductors)
  const clampFill = Option.getOrDefault(
    getClampFill(largestAWG, internalClamps),
    DEFAULT_ZERO_ALLOWANCE
  )
  const supportFittingsFill = Option.getOrDefault(
    getSupportFittingFill(largestAWG, supportFittings),
    DEFAULT_ZERO_ALLOWANCE
  )
  const deviceFill = Option.getOrDefault(getDevicesFillTotal(devicesUsed), DEFAULT_ZERO_ALLOWANCE)
  const groundingConductorFill = Option.getOrDefault(
    getGroundingConductorFill(groundingConductors),
    DEFAULT_ZERO_ALLOWANCE
  )
  const terminalBlockFill = Option.getOrDefault(
    getTerminalBlockFill(terminalBlocks),
    DEFAULT_ZERO_ALLOWANCE
  )

  const boxFill = {
    unitSystem: DEFAULT_UNIT_SYSTEM,
    value:
      conductorFill.value +
      clampFill.value +
      supportFittingsFill.value +
      deviceFill.value +
      groundingConductorFill.value +
      terminalBlockFill.value
  }

  if (unitSystem === boxFill.unitSystem) {
    return wrap(boxFill)
  } else {
    const convertedBoxFill = switchUnitSystem(boxFill)
    return wrap(convertedBoxFill)
  }
}
