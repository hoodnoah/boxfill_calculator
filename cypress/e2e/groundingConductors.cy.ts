describe('groundingConductorsInput', () => {
  const ALLOWANCES_IMPERIAL = [1.5, 1.75, 2.0, 2.25, 2.5, 3.0, 5.0] as const

  beforeEach(() => cy.visit('/'))

  it('should default to blank', () => {
    cy.get('#grounding-conductors').should('have.value', '')
  })

  it('should add a single allowance based on the largest AWG present', () => {
    cy.get('#largest-conductor').each(($element, index) => {
      cy.wrap($element).select(index)

      cy.get('#grounding-conductors').type('1')

      cy.get('#box-fill-display').contains(ALLOWANCES_IMPERIAL[index].toFixed(1))

      cy.get('#grounding-conductors').clear()
    })

    cy.get('#box-fill-display').should('not.contain', 'NaN')
  })

  it('should allow arbitrary integers', () => {
    cy.get('#grounding-conductors').type('10')
    cy.get('#grounding-conductors').should('have.value', '10')
  })

  it('should disallow negative numbers', () => {
    cy.get('#grounding-conductors').type('-10')
    cy.get('#grounding-conductors').should('have.value', '')
  })

  it('should allow only integer numbers', () => {
    cy.get('#grounding-conductors').type('10.5')
    cy.get('#grounding-conductors').should('have.value', '10')
  })
})
