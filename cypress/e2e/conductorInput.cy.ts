describe('conductorInput', () => {
  before(() => cy.visit('/'))

  beforeEach(() => {
    cy.get('#general-conductors').clear()
  })

  it('should start empty', () => {
    cy.get('#general-conductors').should('have.value', '')
  })

  it('should allow arbitrary integers', () => {
    cy.get('#general-conductors').type('10')
    cy.get('#general-conductors').should('have.value', '10')
  })

  it('should disallow negative numbers', () => {
    cy.get('#general-conductors').type('-10')
    cy.get('#general-conductors').should('have.value', '')
  })

  it('should allow only integer numbers', () => {
    cy.get('#general-conductors').type('10.5')
    cy.get('#general-conductors').should('have.value', '10')
  })
})
