const AWG_OPTIONS = [18, 16, 14, 12, 10, 8, 6] as const

describe('awgInput', () => {
  before(() => cy.visit('/'))

  it('should have 7 AWG Options', () => {
    const numOptions = AWG_OPTIONS.length
    cy.get('[name="awgInput"]').within(() => cy.get('option').should('have.length', numOptions))
  })

  it('should have all supported AWG options', () => {
    cy.get('[name="awgInput"]').within(() => {
      AWG_OPTIONS.forEach((option) => {
        cy.get('option').should('contain', option.toString())
      })
    })
  })
})
