import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { store } from '@/store/Store'
import { UnitSystem } from '@/lib/BoxFill'
import UnitSystemToggle from '../BoxFillDisplay/UnitSystemToggle.vue'

describe('BoxFillDisplay', () => {
  it('Displays the initial unit system correctly', () => {
    const wrapper = mount(UnitSystemToggle)
    expect(wrapper.text()).toContain('cubic centimeters')
  })

  it('Displays an updated unit system correctly', () => {
    store.setUnitSystem(UnitSystem.Imperial)
    const wrapper = mount(UnitSystemToggle)
    expect(wrapper.text()).toContain('cubic inches')
  })
})
