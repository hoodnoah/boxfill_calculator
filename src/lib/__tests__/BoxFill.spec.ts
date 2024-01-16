import { describe, it, expect } from 'vitest'

import { AWGConductor, UnitSystem, getBoxFill } from '../BoxFill'
import type { BoxFill } from '../BoxFill'
import { unwrapOrThrow } from '../Result'

describe('CalculateBoxFill', () => {
  it('agrees with table 314.16(A) for a 100mm X 32mm round/octagonal box w/ 18 AWG conductors', () => {
    const conductor = AWGConductor.AWG_18
    const numConductors_pass = 8
    const numConductors_fail = 9

    const boxFill_pass: BoxFill = unwrapOrThrow(getBoxFill(conductor, numConductors_pass))
    const boxFill_fail: BoxFill = unwrapOrThrow(getBoxFill(conductor, numConductors_fail))

    expect(boxFill_pass.value).toBeLessThanOrEqual(205)
    expect(boxFill_fail.value).toBeGreaterThan(205)
  })

  it('agrees with table 314.16(A) for a 100mm X 54mm X 54mm device w/ 6 AWG conductors', () => {
    const conductor = AWGConductor.AWG_6
    const numConductors_pass = 2
    const numConductors_fail = 3

    const boxFill_pass: BoxFill = unwrapOrThrow(getBoxFill(conductor, numConductors_pass))
    const boxFill_fail: BoxFill = unwrapOrThrow(getBoxFill(conductor, numConductors_fail))

    expect(boxFill_pass.value).toBeLessThanOrEqual(238)
    expect(boxFill_fail.value).toBeGreaterThan(238)
  })

  it('calculates a box fill correctly for 4x 18AWG conductors', () => {
    const expectedResult = { unitSystem: UnitSystem.Metric, value: 98.4 }
    const actualResult = unwrapOrThrow(getBoxFill(AWGConductor.AWG_18, 4, UnitSystem.Metric))

    expect(actualResult).toEqual(expectedResult)
  })
})
