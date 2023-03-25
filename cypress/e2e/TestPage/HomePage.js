
/// <reference types = "Cypress"/>

import PageModel from "../../PageModel/HomePageModel"
import LoginPageModel from "../../PageModel/LoginPageModel"

const inventoryItem = new PageModel()
const loginDetails = new LoginPageModel()

describe("My home page suite",  ()=> {

    beforeEach(function () {
        cy.visit(Cypress.env("url"))
        loginDetails.loginDetails('standard')
        loginDetails.verifyTitleOfPage()
    })

    it('E2E flow from adding product till checkout',  ()=> {
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
        inventoryItem.verifyPriceListIsAscending()
    })

})
