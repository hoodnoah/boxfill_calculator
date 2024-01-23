import { describe, it, expect } from 'vitest'

import { AWGConductor, UnitSystem, getBoxFill } from '../BoxFill'
import type { BoxFill, Device } from '../BoxFill'
import { unwrapOrThrow } from '../Result'
import { Option } from '../Option'

describe('CalculateBoxFill', () => {
  it('agrees with table 314.16(A) for a 100mm X 32mm round/octagonal box w/ 18 AWG conductors', () => {
    const largestConductor = AWGConductor.AWG_18
    const numConductors_pass = 8
    const numConductors_fail = 9

    const boxFill_pass: BoxFill = unwrapOrThrow(
      getBoxFill({
        largestConductor,
        generalConductors: numConductors_pass,
        unitSystem: UnitSystem.Metric
      })
    )
    const boxFill_fail: BoxFill = unwrapOrThrow(
      getBoxFill({
        largestConductor,
        generalConductors: numConductors_fail,
        unitSystem: UnitSystem.Metric
      })
    )

    expect(boxFill_pass.value).toBeLessThanOrEqual(205)
    expect(boxFill_fail.value).toBeGreaterThan(205)
  })

  it('agrees with table 314.16(A) for a 100mm X 54mm X 54mm device w/ 6 AWG conductors', () => {
    const largestConductor = AWGConductor.AWG_6
    const numConductors_pass = 2
    const numConductors_fail = 3

    const boxFill_pass: BoxFill = unwrapOrThrow(
      getBoxFill({
        largestConductor: largestConductor,
        generalConductors: numConductors_pass,
        unitSystem: UnitSystem.Metric
      })
    )
    const boxFill_fail: BoxFill = unwrapOrThrow(
      getBoxFill({
        largestConductor,
        generalConductors: numConductors_fail,
        unitSystem: UnitSystem.Metric
      })
    )

    expect(boxFill_pass.value).toBeLessThanOrEqual(238)
    expect(boxFill_fail.value).toBeGreaterThan(238)
  })

  it('calculates a box fill correctly for 4x 18AWG conductors', () => {
    const largestConductor = AWGConductor.AWG_18
    const expectedResult = { unitSystem: UnitSystem.Metric, value: 98.4 }
    const actualResult = unwrapOrThrow(
      getBoxFill({
        largestConductor,
        generalConductors: 4,
        unitSystem: UnitSystem.Metric
      })
    )

    expect(actualResult.value).toBeCloseTo(expectedResult.value, 1)
  })

  it('calculates a box fill correctly for 2x 6AWG conductors with internal clamps', () => {
    const largestConductor = AWGConductor.AWG_6
    const expectedResult = {
      unitSystem: UnitSystem.Metric,
      value: Math.round((81.9 * 2 + 81.9) * 10) / 10
    }
    const actualResult = unwrapOrThrow(
      getBoxFill({
        largestConductor,
        generalConductors: 2,
        internalClamps: Option.Some(null),
        unitSystem: UnitSystem.Metric
      })
    )

    expect(actualResult.value).toBeCloseTo(expectedResult.value, 1)
  })

  it('calculates a box fill correctly for 2x 6AWG conductors with internal clamps, using imperial', () => {
    const largestConductor = AWGConductor.AWG_6
    const expectedResult = { unitSystem: UnitSystem.Imperial, value: 5 * 2 + 5 }
    const actualResult = unwrapOrThrow(
      getBoxFill({
        largestConductor: largestConductor,
        generalConductors: 2,
        internalClamps: Option.Some(null),
        unitSystem: UnitSystem.Imperial
      })
    )

    expect(actualResult.value).toBeCloseTo(expectedResult.value, 1)
  })

  it('calculates a box fill correctly for 14x 18AWG conductors, no internal clamp, and 3 support fittings', () => {
    const largestConductor = AWGConductor.AWG_18
    const allowance = 24.6
    const expectedResult = {
      unitSystem: UnitSystem.Metric,
      value: Math.round((allowance * 14 + allowance * 3) * 10) / 10
    }

    const actualResult = unwrapOrThrow(
      getBoxFill({
        largestConductor,
        generalConductors: 14,
        supportFittings: Option.Some(3),
        unitSystem: UnitSystem.Metric
      })
    )

    expect(actualResult.value).toBeCloseTo(expectedResult.value, 1)
  })

  it('calculates a box fill correctly for 14x 18AWG conductors, no internal clamp, and 3 support fittings, using imperial', () => {
    const largestConductor = AWGConductor.AWG_18
    const allowance = 1.5
    const expectedResult = {
      unitSystem: UnitSystem.Imperial,
      value: Math.round((allowance * 14 + allowance * 3) * 10) / 10
    }

    const actualResult = unwrapOrThrow(
      getBoxFill({
        largestConductor,
        generalConductors: 14,
        supportFittings: Option.Some(3),
        unitSystem: UnitSystem.Imperial
      })
    )

    expect(actualResult.value).toBeCloseTo(expectedResult.value, 1)
  })

  it('calculates a box fill correctly for 3x 12AWG conductors, internal clamps, 1 support fitting, one one-gang device and one two-gang device', () => {
    const largestConductor = AWGConductor.AWG_12
    const allowance = 36.9
    const devices: Device[] = [
      { largestAWG: largestConductor, numGangs: 1 },
      { largestAWG: largestConductor, numGangs: 2 }
    ]

    const expectedResult = {
      unitSystem: UnitSystem.Metric,
      value:
        Math.round(
          (allowance * 3 + allowance + allowance + allowance * 2 + allowance * 2 * 2) * 10
        ) / 10
    }

    const actualResult = unwrapOrThrow(
      getBoxFill({
        largestConductor,
        generalConductors: 3,
        internalClamps: Option.Some(null),
        supportFittings: Option.Some(1),
        devicesUsed: Option.Some({ devices }),
        unitSystem: UnitSystem.Metric
      })
    )

    expect(actualResult.value).toBeCloseTo(expectedResult.value, 1)
  })

  it('calculates a box fill correctly for 3x 12AWG conductors and 9x AWG 6 grounding conductors', () => {
    const largestConductor = AWGConductor.AWG_12
    const allowance = 36.9
    const groundingAllowance = 81.9

    const expectedResult = {
      unitSystem: UnitSystem.Metric,
      value:
        Math.round((allowance * 3 + groundingAllowance * 2 + groundingAllowance * 0.25) * 10) / 10
    }

    const actualResult = unwrapOrThrow(
      getBoxFill({
        largestConductor,
        generalConductors: 3,
        unitSystem: UnitSystem.Metric,
        groundingConductors: Option.Some({ largestAWG: AWGConductor.AWG_6, num: 9 })
      })
    )

    expect(actualResult.value).toBeCloseTo(expectedResult.value, 1)
  })

  it('calculates a box fill correctly for 1X AWG 10 wires and 2x AWG 14 terminal blocks', () => {
    const largestConductor = AWGConductor.AWG_10
    const allowance = 41.0
    const terminalAllowance = 32.8

    const expectedResult = {
      unitSystem: UnitSystem.Metric,
      value: Math.round((allowance + terminalAllowance * 2) * 10) / 10
    }

    const actualResult = unwrapOrThrow(
      getBoxFill({
        largestConductor,
        generalConductors: 1,
        unitSystem: UnitSystem.Metric,
        terminalBlocks: Option.Some({ largestAWG: AWGConductor.AWG_14, num: 2 })
      })
    )

    expect(actualResult.value).toBeCloseTo(expectedResult.value, 1)
  })
})
