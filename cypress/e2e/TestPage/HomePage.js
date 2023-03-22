
/// <reference types = "Cypress"/>

import PageModel from "../../PageModel/PageModel"
import LoginPageModel from "../../PageModel/LoginPageModel"

const inventoryItem = new PageModel()
const loginDetails = new LoginPageModel()

describe("My test suite",  ()=> {

    beforeEach(function () {
        cy.visit(Cypress.env("url"))
    })

    it('E2E flow from adding product till checkout',  ()=> {
        loginDetails.loginDetails('standard')
        loginDetails.verifyTitleOfPage()
        inventoryItem.expectInventoryItemName('Sauce Labs Bike Light')
        inventoryItem.addInventoryItemToCart()
        inventoryItem.expectCartLinkPage()
        inventoryItem.clickCheckOutButton()
        inventoryItem.enterDetailsForCheckoutInformation('ABC', 'XYZ', '2135')
        inventoryItem.checkoutOverview('Sauce Labs Bike Light')
        inventoryItem.clickFinishButton()
        inventoryItem.checkoutCompleteOrder()
    })

    it('Filters products by price in ascending order',  ()=> {
        loginDetails.loginDetails('standard')
        loginDetails.verifyTitleOfPage()
        inventoryItem.verifyPriceListIsAscending()
    })
})
