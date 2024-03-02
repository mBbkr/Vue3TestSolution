import { mount } from '@cypress/vue'
import InputSolution from '@/components/InputSolution.vue'

describe('InputSolution Component', () => {
  beforeEach(() => {
    mount(InputSolution)
  })

  it('Updates displayed value properly', () => {
    cy.get('span[contenteditable="true"]').type('abc123')
    cy.get('span[contenteditable="true"]').should('have.text', '123')
  })

  it('Accepts only numeric characters', () => {
    cy.get('span[contenteditable="true"]').type('abc123')
    cy.get('span[contenteditable="true"]').invoke('text').should('match', /^[0-9]+$/)
  })

  it('Removes leading zeros', () => {
    cy.get('span[contenteditable="true"]').type('00123')
    cy.get('span[contenteditable="true"]').should('have.text', '123')
  })

  it('should update the age when input is entered and regex work', () => {
    const newAge = '123456789'
    cy.get('span[contenteditable="true"]').type(newAge)
    cy.get('span[contenteditable="true"]').should('contain.text', '123 456 789')
  })

  it('should update the age when input is entered and regex work', () => {
    const newAge = '0abcèé_&"àç_"&7891avreéç"àé&çè&é2'
    cy.get('span[contenteditable="true"]').type(newAge)
    cy.get('span[contenteditable="true"]').should('contain.text', '78 912')
  })
})