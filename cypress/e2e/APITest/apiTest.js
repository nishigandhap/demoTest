/// <reference types = 'cypress'/>

import sampleForm from '../../fixtures/sampleForm.json'
import updateForm from '../../fixtures/updateTitle.json'
import multipleForms from '../../fixtures/multipleForms.json'

const apiUrl = `${Cypress.env('Api_url')}`
const authorization = ` Bearer ${Cypress.env('apiToken')}`


describe('APi test suite', () => {
    // beforeEach(() => {
    //     cy.cleanUpBeforeStart()
    // })

    it('Get forms', () => {
        cy.request({
            method: 'GET',
            url: `${apiUrl}forms`,
            headers: { authorization },
        }).should(({ status, body }) => {
            expect(status).to.eq(200)
            expect(body.total_items).is.eq(body.items.length)
            expect(body)
        })
    })

    it('Create a form', () => {
        cy.createForm()
            .should(({ status, body, headers }) => {
                expect(status).to.eq(201)
                expect(headers['content-type']).to.eq('application/json')
                expect(body.title).is.eq(sampleForm.title)
                expect(body.fields.length).is.eq(sampleForm.fields.length)
                expect(body.type).is.eq(sampleForm.type)
            })
    })

    it('Update title of page', () => {
        cy.updateForm()
            .should(({ status, body }) => {
                expect(status).to.eq(200)
                expect(body.title).is.eq(updateForm.title)
            })
    })

    it('Method not found', () => {
        cy.request({
            method: 'GET',
            url: `${apiUrl}forms/`,
            headers: { authorization },
            failOnStatusCode: false,
            body: { "code": "NOT_FOUND", "description": "Endpoint not found" }
        }).should(({ status, body }) => {
            expect(status).is.eq(404)
            expect(body.code).to.eq('NOT_FOUND')
            expect(body.description).to.eq('Endpoint not found')
        })
    })
//Here I am trying to intercept the request and fetch the data from multipleForms.json file.
    it.only('Intercept the form', () => {
        cy.intercept({
            method: 'GET',
            url: `${apiUrl}forms`,
            headers: { authorization },
            body: multipleForms
        }).should(({ status, body }) => {
            expect(status).is.eq(200)
        })
    })
})