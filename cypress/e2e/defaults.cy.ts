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

  it('defaults to 0 general conductors', () => {
    cy.get('#general-conductors').should('have.value', '0')
  })

  it('defaults to no internal clamps', () => {
    cy.get('#internal-clamps').contains('no')
  })

  it('defaults to 0 support fittings', () => {
    cy.get('#support-fittings').should('have.value', '0')
  })

  it('starts with no devices', () => {
    cy.get('#devices').should('not.exist')
  })

  it('defaults to 0 grounding conductors', () => {
    cy.get('#grounding-conductors').should('have.value', '0')
  })

  it('starts with no terminal blocks', () => {
    cy.get('#terminal-blocks').should('not.exist')
  })
})
