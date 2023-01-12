
/// <reference types = "Cypress"/>

import PageModel from "../PageModel.js/PageModel"
import LoginDetails from "../PageModel.js/LoginPageModel"

const inventoryItem = new PageModel()

describe("My test suite", function () {

    beforeEach(function () {
        cy.visit(Cypress.env("url"))
    })

    it('E2E flow from adding product till checkout', function () {
        LoginDetails.enterUserName('standard_user')
        LoginDetails.enterPassword('secret_sauce')
        LoginDetails.clickSubmitButton()
        cy.get('.title').should('contains.text', 'Products')
        inventoryItem.expectInventoryItemName('Sauce Labs Bike Light')
        inventoryItem.addInventoryItemToCart()
        inventoryItem.expectCartLinkPage()
        inventoryItem.clickCheckOutButton()
        inventoryItem.enterDetailsForCheckoutInformation('ABC', 'XYZ', '2135')
        inventoryItem.checkoutOverview('Sauce Labs Bike Light')
        inventoryItem.clickFinishButton()
        inventoryItem.checkoutCompleteOrder()
    })

    it('Filters products by price in ascending order', function () {
        LoginDetails.enterUserName('standard_user')
        LoginDetails.enterPassword('secret_sauce')
        LoginDetails.clickSubmitButton()
        cy.get('.title').should('contains.text', 'Products')
        inventoryItem.verifyPriceListIsAscending()
    })
})
