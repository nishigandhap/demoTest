
class LoginDetails {

    elements = {

        userNameInput: () => cy.get("#user-name"),
        passwordInput: () => cy.get("#password"),
        submitButton: () => cy.get("#login-button"),
        erroMessage: () => cy.get('h3')
    }

    enterUserName(userName) {
        this.elements.userNameInput().type(userName)

    }
    enterPassword(password) {
        this.elements.passwordInput().type(password)

    }
    clickSubmitButton() {
        this.elements.submitButton().click()

    }

}

module.exports = new LoginDetails()

