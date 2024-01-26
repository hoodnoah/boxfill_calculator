describe('defaults', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays zero box fill on launch', () => {
    cy.get('.box-fill-display').children().contains('0.0')
  })

  it('defaults to imperial units', () => {
    cy.get('.box-fill-display').children().contains('cubic inches')
  })

  it('defaults to 12 AWG', () => {
    cy.get('[name="awgInput"]').children().contains('12')
  })
})
