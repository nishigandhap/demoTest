/// <reference types = "Cypress"/>

describe('Broken test link suite', () => {

    it('Test broken links', () => {
        cy.visit('https://www.heycater.com/en')
        cy.contains('Order suitable ').should('be.visible')
        cy.get('a').each(link => {
            if (link && link.prop('href') && !link.prop('href').startsWith('tel:')) {
                cy.request({
                    url: link.prop('href'),
                    failOnStatusCode: false,
                    timeout: 4000
                })
                cy.log(link.prop('href'))
            }
        })
    })
})