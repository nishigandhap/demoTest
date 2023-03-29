/// <reference types = 'cypress'/>


const apiUrl = `${Cypress.env('Api_url')}`


describe('APi test suite', () => {

    it.only('Get forms', () => {
        cy.fixture('apiTest.json').then((apiTest) => {
            const token = apiTest.api_token;
            cy.request({
                method: 'GET',
                url: apiUrl + 'forms',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).should(({ status, body }) => {
                expect(status).to.eq(200)
                expect(body.total_items).is.eq(body.items.length)
            })
        })
    })
})
