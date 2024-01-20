import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { store } from '@/store/Store'
import BoxFillDisplay from '../BoxFillDisplay/BoxFillDisplay.vue'
import { type BoxFill, UnitSystem } from '@/lib/BoxFill'

describe('BoxFillDisplay', () => {
  it('Displays initial state with one decimal point', () => {
    const wrapper = mount(BoxFillDisplay)
    expect(wrapper.text()).toContain('0.0')
  })

  it('Displays updated state with one decimal point', () => {
    const newAllowance: BoxFill = {
      value: 10,
      unitSystem: UnitSystem.Metric
    }

    store.setBoxFill(newAllowance)

    const wrapper = mount(BoxFillDisplay)
    expect(wrapper.text()).toContain('10.0')
  })

  it('Displays updated state with one decimal point, when state contains multiple', () => {
    const newAllowance: BoxFill = {
      value: 10.123,
      unitSystem: UnitSystem.Metric
    }

    store.setBoxFill(newAllowance)

    const wrapper = mount(BoxFillDisplay)
    expect(wrapper.text()).toContain('10.1')
  })

  it('Displays the correct unit system', () => {
    const newAllowance: BoxFill = {
      value: 10.123,
      unitSystem: UnitSystem.Metric
    }

    const expectedValue = 10.123 / 2.54 ** 3

    store.setBoxFill(newAllowance)
    store.setUnitSystem(UnitSystem.Imperial)

    const wrapper = mount(BoxFillDisplay)
    expect(wrapper.text()).toContain(expectedValue.toFixed(1))
  })
})
