/// <reference types = 'cypress'/>

import sampleForm from '../../fixtures/sampleForm.json'

const apiUrl = `${Cypress.env('Api_url')}`
const authorization = ` Bearer ${Cypress.env('apiToken')}`



describe('APi test suite', () => {

    it('Get forms', () => {
        cy.request({
            method: 'GET',
            url: `${apiUrl}forms`,
            headers: { authorization },
        }).should(({ status, body }) => {
            expect(status).to.eq(200)
            expect(body.total_items).is.eq(body.items.length)
        })
    })

    it('Create a form', () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}forms`,
            headers: { authorization },
            body: sampleForm
        }).should(({ status, body, headers }) => {
            expect(status).to.eq(201)
            expect(headers['content-type']).to.eq('application/json')
            expect(body.title).is.eq(sampleForm.title)
        })
    })

})
