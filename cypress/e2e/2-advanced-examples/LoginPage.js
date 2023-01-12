
/// <reference types = "Cypress"/>

import LoginDetails from "../PageModel.js/LoginPageModel"

describe("My test suite", function () {

    beforeEach(function () {
        cy.visit(Cypress.env("url"))
       
    })

    it('Validate the provided logins are correct and login is successfull', function () {
        LoginDetails.enterUserName('standard_user')
        LoginDetails.enterPassword('secret_sauce')
        LoginDetails.clickSubmitButton()
        cy.get('.title').should('contains.text', 'Products')
    })

    it("Validate for locked user and verifuy error message", function () {
        LoginDetails.enterUserName('locked_out_user')
        LoginDetails.enterPassword('secret_sauce')
        LoginDetails.clickSubmitButton()
        LoginDetails.elements.erroMessage().should('have.text', 'Epic sadface: Sorry, this user has been locked out.');

    })

    it('Incorrect username and verify error message', function () {
        LoginDetails.enterUserName('asd')
        LoginDetails.enterPassword('secret_sauce')
        LoginDetails.clickSubmitButton()
        LoginDetails.elements.erroMessage().should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })
})



