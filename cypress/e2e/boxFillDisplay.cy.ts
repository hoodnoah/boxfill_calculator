describe('boxFillDisplay', () => {
  beforeEach(() => cy.visit('/'))
  it('should start at 0.0', () => {
    cy.get('#box-fill-display').children().contains('0.0')
  })

  it('should not change when *only* the awg selection changes', () => {
    cy.get('[name="awgInput"] option').each(($_optionElement, index) => {
      cy.get('[name="awgInput"]').select(index)
      cy.get('#box-fill-display').children().contains('0.0')
    })
  })

  it('should reflect the Allowance for one conductor at each conductor gauge, for imperial measurements', () => {
    // Set one conductor
    cy.get('#general-conductors').type('1')
    const expected_values = [1.5, 1.75, 2.0, 2.25, 2.5, 3.0, 5.0]

    cy.get('[name="awgInput"] option').each(($_optionElement, index) => {
      cy.get('[name="awgInput"]').select(index)
      cy.get('#box-fill-display').children().contains(expected_values[index].toFixed(1))
    })
  })

  it('should reflect the Allowance for one conductor at each conductor gauge, for metric measurements', () => {
    // Set one conductor
    cy.get('#general-conductors').type('1')

    // Set metric
    cy.get('#box-fill-display button').click()
    cy.get('#box-fill-display').children().contains('cubic centimeters')
    const expected_values = [24.6, 28.7, 32.8, 36.9, 41.0, 49.2, 81.9]

    cy.get('[name="awgInput"] option').each(($_optionElement, index) => {
      cy.get('[name="awgInput"]').select(index)
      cy.get('#box-fill-display').children().contains(expected_values[index].toFixed(1))
    })
  })

  it('should reflect the Allowance for internal clamps based on the largest conductor present, imperial', () => {
    // Ensure state of internal clamps
    cy.get('#internal-clamps').contains('no')
    cy.get('#internal-clamps').click()
    cy.get('#internal-clamps').contains('yes')

    // Ensure state of unit system
    cy.get('#box-fill-display button').contains('cubic inches')

    const expected_values = [1.5, 1.75, 2.0, 2.25, 2.5, 3.0, 5.0]

    cy.get('[name="awgInput"] option').each(($_optionElement, index) => {
      cy.get('[name="awgInput"]').select(index)
      cy.get('#box-fill-display').children().contains(expected_values[index].toFixed(1))
    })
  })

  it('should reflect the Allowance for internal clamps based on the largest conductor present, metric', () => {
    // Ensure state of internal clamps
    cy.get('#internal-clamps').contains('no')
    cy.get('#internal-clamps').click()
    cy.get('#internal-clamps').contains('yes')

    // Ensure state of unit system
    cy.get('#box-fill-display button').click()
    cy.get('#box-fill-display').contains('cubic centimeters')

    const expected_values = [24.6, 28.7, 32.8, 36.9, 41.0, 49.2, 81.9]

    cy.get('[name="awgInput"] option').each(($_optionElement, index) => {
      cy.get('[name="awgInput"]').select(index)
      cy.get('#box-fill-display').children().contains(expected_values[index].toFixed(1))
    })
  })

  it('should reflect the Allowance for support fittings, based on the largest conductor present, imperial', () => {
    cy.get('#support-fittings').should('have.value', '')
    cy.get('#support-fittings').type('1')

    const expected_values = [1.5, 1.75, 2.0, 2.25, 2.5, 3.0, 5.0]

    cy.get('[name="awgInput"] option').each(($_optionElement, index) => {
      cy.get('[name="awgInput"]').select(index)
      cy.get('#box-fill-display').children().contains(expected_values[index].toFixed(1))
    })
  })

  it('should reflect the Allowance for support fittings, based on the largest conductor present, metric', () => {
    cy.get('#support-fittings').should('have.value', '')
    cy.get('#support-fittings').type('1')

    const expected_values = [24.6, 28.7, 32.8, 36.9, 41.0, 49.2, 81.9]

    // Ensure state of unit system
    cy.get('#box-fill-display button').click()
    cy.get('#box-fill-display').contains('cubic centimeters')

    cy.get('[name="awgInput"] option').each(($_optionElement, index) => {
      cy.get('[name="awgInput"]').select(index)
      cy.get('#box-fill-display').children().contains(expected_values[index].toFixed(1))
    })
  })
})
