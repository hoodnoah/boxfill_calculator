describe('terminalBlocks', () => {
  const ALLOWANCES_IMPERIAL = [1.5, 1.75, 2.0, 2.25, 2.5, 3.0, 5.0] as const

  beforeEach(() => cy.visit('/'))

  it('should add a terminal block with the selected largest AWG, for each possible AWG', () => {
    cy.get('#largest-conductor>select').each(($option, index) => {
      cy.get('#largest-conductor>select').select(index)

      cy.get('[name="addTerminalBlock"]').click()

      cy.get('#box-fill-display').contains(ALLOWANCES_IMPERIAL[index].toFixed(1))

      cy.get('.terminalBlocksDisplay').within(() => {
        cy.get('[name="deleteTerminalBlock"]').click()
      })

      cy.get('#box-fill-display').contains('0.0')
    })
  })

  it('should allow changing the AWG for each possible option', () => {
    cy.get('[name="addTerminalBlock"]').click()

    cy.get(':nth-child(1) > .awg-input-wrapper > select > option').each(($option, index) => {
      cy.get(':nth-child(1) > .awg-input-wrapper > select').select(index)

      cy.get('#box-fill-display').contains(ALLOWANCES_IMPERIAL[index].toFixed(1))
    })
  })

  it('should delete terminal blocks with respect to their unique order', () => {
    // Create 5 terminal blocks
    for (let i = 0; i < 5; i++) {
      cy.get('[name="addTerminalBlock"]').click()
    }

    // Set each block's AWG to its index
    cy.get('.terminal-blocks-list .awg-input-wrapper select').each((elem, index) => {
      cy.wrap(elem).select(index)
    })

    // Delete blocks 2 and 4
    cy.get('.terminalBlocksDisplay').eq(1).find('[name="deleteTerminalBlock"]').click()
    cy.get('.terminalBlocksDisplay').eq(2).find('[name="deleteTerminalBlock"]').click()

    // Should have the allowance for AWG 18, 14, and 10
    const expectedAllowance = [
      ALLOWANCES_IMPERIAL[0],
      ALLOWANCES_IMPERIAL[2],
      ALLOWANCES_IMPERIAL[4]
    ].reduce((acc, x) => acc + x, 0)

    cy.get('#box-fill-display').contains(expectedAllowance.toFixed(1))
  })
})
