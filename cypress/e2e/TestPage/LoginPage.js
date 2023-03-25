
/// <reference types = "Cypress"/>

import LoginPageModel from "../../PageModel/LoginPageModel"

const loginDetails = new LoginPageModel()

describe("My login page suite", function () {
    beforeEach(function () {
        cy.visit(Cypress.env("url"))
    })

    it('Valid credentials for login',  ()=> {
        loginDetails.loginDetails('standard')
        loginDetails.verifyTitleOfPage()
    })

    it("Validate for locked user and verify error message",  ()=> {
        loginDetails.loginDetails('locked')
        loginDetails.errorMessageForLockedUser()
    })

    it('Problem user', () => {
        loginDetails.loginDetails('problem')
        loginDetails.invalidImageForHomePage()
    })

    it('Performance glitch user', ()=>{
        loginDetails.loginDetails('glitch')
        loginDetails.performanceGlitch()
    })

    it('Incorrect username and verify error message', ()=> {
        loginDetails.loginDetails('wrongusername')
        loginDetails.errorMessageForWrongUserName()
    })
})



