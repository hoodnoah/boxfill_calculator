const ALLOWANCES_IMPERIAL = [1.5, 1.75, 2.0, 2.25, 2.5, 3.0, 5.0] as const
const ALLOWANCES_METRIC = [24.6, 28.7, 32.8, 36.9, 41.0, 49.2, 81.9] as const

describe('deviceInput, imperial', () => {
  beforeEach(() => cy.visit('/'))

  it('should add a device, defaulting to the chosen largest AWG', () => {
    cy.get('[name="awgInput"] option').each(($_element, index) => {
      cy.get('[name="awgInput"]').select(index)
      cy.get('[name="addDevice"]').click()

      cy.get('#box-fill-display')
        .children()
        .contains((ALLOWANCES_IMPERIAL[index] * 2).toFixed(1))

      cy.get('[name="deleteButton"]').click()

      cy.get('#box-fill-display').children().contains('0.0')
    })
  })

  it('should add a new device, and update the parent state for each AWG', () => {
    // Add device
    cy.get('[name="addDevice"]').click()

    // Check every device AWG option
    cy.get('.devices-display')
      .find('select option')
      .each(($_element, index) => {
        cy.get('.devices-display').find('select').select(index)

        cy.get('#box-fill-display')
          .children()
          .contains((ALLOWANCES_IMPERIAL[index] * 2).toFixed(1))
      })
  })

  it('should delete devices correctly', () => {
    // Add five devices
    for (let i = 0; i < 5; i++) {
      cy.get('[name="addDevice"]').click()
    }

    // Set each device to a different AWG, based on its index
    cy.get('.devices-display > div').each(($div, index) => {
      cy.wrap($div).find('[name="awgInput"]').select(index)
    })

    // Delete devices 2 and 4
    cy.get('.devices-display > div').eq(1).find('[name="deleteButton"]').click()
    cy.get('.devices-display > div').eq(2).find('[name="deleteButton"]').click()

    // Should have the allowance for AWG 18, 14, and 10
    const expectedAllowance =
      [ALLOWANCES_IMPERIAL[0], ALLOWANCES_IMPERIAL[2], ALLOWANCES_IMPERIAL[4]].reduce(
        (acc, x) => acc + x,
        0
      ) * 2

    cy.get('#box-fill-display').children().contains(expectedAllowance.toFixed(1))
  })

  it('should allow the deletion of *all* devices', () => {
    for (let i = 0; i < 5; i++) {
      cy.get('[name="addDevice"]').click()
    }

    cy.get('.devices-display > div').each(($div) => {
      cy.wrap($div).children().find('[name="deleteButton"]').click()
    })

    cy.get('div.devices-display').should('not.exist')
    cy.get('#box-fill-display').contains('0.0')
  })
})
