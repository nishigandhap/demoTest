
class LoginDetails {

    elements = {

        insertUserName: () => cy.get('#user-name'),
        insertPassword: () => cy.get('#password'),
        submitButton: () => cy.get("#login-button"),
        errorMessage:() => cy.get('.error-message-container.error'),
        titleForPage: ()=> cy.get('.title')
    }

    loginDetails(userType) {
        cy.fixture('login').then((el) => {
            switch (userType) {
                case 'standard':
                    this.elements.insertUserName().type(el.standard)
                    this.elements.insertPassword().type(el.password)
                    break
                case 'locked':
                    this.elements.insertUserName().type(el.locked)
                    this.elements.insertPassword().type(el.password)
                    break
                case 'problem':
                    this.elements.insertUserName().type(el.problem)
                    this.elements.insertPassword().type(el.password)
                    break
                case 'wrongusername':
                    this.elements.insertUserName().type(el.wrongusername)
                    this.elements.insertPassword().type(el.password)
                    break
                case 'glitch':
                    this.elements.insertUserName().type(el.glitch)
                    this.elements.insertPassword().type(el.password)
                    break
            }
        })
    }

    clickSubmitButton() {
        this.elements.submitButton().click()
    }

    verifyTitleOfPage() {
        this.clickSubmitButton()
        this.elements.titleForPage().contains('Products').should('be.visible')
    }

    errorMessageForLockedUser() {
        this.clickSubmitButton()
        this.elements.errorMessage().should('have.text','Epic sadface: Sorry, this user has been locked out.')
    }

    invalidImageForHomePage() {
        this.verifyTitleOfPage()
        cy.get('.inventory_item_img').first().compareSnapshot('problemImage', 0.2)

    }

    errorMessageForWrongUserName() {
        this.clickSubmitButton()
        this.elements.errorMessage().should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    }

    performanceGlitch() {
        this.clickSubmitButton()
        this.elements.titleForPage().contains('Products').should('be.visible')
    }

}

export default LoginDetails;
