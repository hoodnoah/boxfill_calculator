describe('defaults', () => {
  before(() => cy.visit('/'))

  it('displays zero box fill on launch', () => {
    cy.get('#box-fill-display').children().contains('0.0')
  })

  it('defaults boxFillDisplay to imperial units', () => {
    cy.get('#box-fill-display').children().contains('cubic inches')
  })

  it('defaults largestAWG to 12 AWG', () => {
    cy.get('#largest-conductor').children().contains('12')
  })

  it('defaults general conductors to empty', () => {
    cy.get('#general-conductors').should('have.value', '')
  })

  it('defaults to no internal clamps', () => {
    cy.get('#internal-clamps').contains('no')
  })

  it('defaults to no support fittings', () => {
    cy.get('#support-fittings').should('have.value', '')
  })

  it('starts with no devices', () => {
    cy.get('.devicesDisplay').should('not.exist')
  })

  it('defaults to no grounding conductors', () => {
    cy.get('#grounding-conductors').should('have.value', '')
  })

  it('starts with no terminal blocks', () => {
    cy.get('#terminal-blocks').should('not.exist')
  })
})
