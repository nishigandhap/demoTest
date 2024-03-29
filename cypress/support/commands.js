
import sampleForm from '../fixtures/sampleForm.json'
import updateForm from '../fixtures/updateTitle.json'
import workspace from '../fixtures/workspace.json'


const compareSnapshotCommand = require('cypress-image-diff-js/dist/command');
compareSnapshotCommand();

const apiUrl = `${Cypress.env('Api_url')}`
const authorization = ` Bearer ${Cypress.env('apiToken')}`


Cypress.Commands.add('cleanUpBeforeStart', () => {
    cy.request({
        method: 'GET',
        url: `${apiUrl}forms`,
        headers: { authorization }
    }).then(({ status, body }) => {
        expect(status).to.eq(200)
        body.items.forEach(item => {
            if (item.title === sampleForm.title) {
                cy.request({
                    method: 'DELETE',
                    url: `${apiUrl}forms/${item.id}`,
                    headers: { authorization }
                }).should(({ status }) => {
                    expect(status).to.eq(204)
                })
            }
        })
    })
})

Cypress.Commands.add('createForm', () => {
    cy.request({
        method: 'POST',
        url: `${apiUrl}forms`,
        headers: { authorization },
        body: sampleForm
    })
})

Cypress.Commands.add('updateForm', () => {
    cy.request({
        method: 'GET',
        url: `${apiUrl}forms`,
        headers: { authorization }
    }).then(({ status, body }) => {
        expect(status).to.eq(200)
        const itemId = body.items[0].id
        body.items.forEach(item => {
            if (item[0] === updateForm.id) {
                cy.request({
                    method: 'PUT',
                    url: `${apiUrl}forms/${itemId}`,
                    headers: { authorization },
                    body: { title: updateForm.title }

                })
            }
        })
    })
})


Cypress.Commands.add('updateWorkSpace', () => {
    cy.createForm()
        .then(({ status, body }) => {
            expect(status).is.eq(201)
            const workspaceID = body.workspace.href
            cy.request({
                method: 'PATCH',
                url: `${workspaceID}`,
                headers: { authorization },
                body: workspace
            }).then(({ status }) => {
                expect(status).is.eq(204)
                cy.request({
                    method: 'GET',
                    url: `${workspaceID}`,
                    headers: { authorization },
                    body: { value: workspace.json }
                })
            })
        })
})