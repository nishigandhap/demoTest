
class LoginDetails {

    elements = {
        submitButton: () => cy.get("#login-button")
    }

    loginDetails(userType) {
        cy.fixture('login').then((el) => {
            switch (userType) {
                case 'standard':
                    cy.insertUserName(el.standard)
                    cy.insertPassword(el.password)
                    break
                case 'locked':
                    cy.insertUserName(el.locked)
                    cy.insertPassword(el.password)
                    break
                case 'problem':
                    cy.insertUserName(el.problem)
                    cy.insertPassword(el.password)
                    break
                case 'wrongusername':
                    cy.insertUserName(el.wrongusername)
                    cy.insertPassword(el.password)
                    break
                case 'glitch':
                    cy.insertUserName(el.glitch)
                    cy.insertPassword(el.password)
                    break
            }
        })
    }

    clickSubmitButton() {
        this.elements.submitButton().click()
    }

    verifyTitleOfPage() {
        this.clickSubmitButton()
        cy.contains('Products').should('be.visible')
    }

    errorMessageForLockedUser() {
        this.clickSubmitButton()
        cy.contains('Epic sadface: Sorry, this user has been locked out.').should('be.visible')
    }

    invalidImageForHomePage() {
        this.verifyTitleOfPage()
        cy.get('.inventory_item_img').first().compareSnapshot('problemImage', 0.2)

    }

    errorMessageForWrongUserName() {
        this.clickSubmitButton()
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
    }

    performanceGlitch() {
        this.clickSubmitButton()
        cy.contains('Products').should('be.visible')
    }

}

export default LoginDetails;
