describe('conductorInput', () => {
  before(() => cy.visit('/'))

  it('should start at 0', () => {
    cy.get('[name="conductorInput"]').should('have.value', '0')
  })
})
