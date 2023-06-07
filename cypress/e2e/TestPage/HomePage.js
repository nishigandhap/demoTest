
/// <reference types = "Cypress"/>

import PageModel from "../../PageModel/HomePageModel"
import LoginPageModel from "../../PageModel/LoginPageModel"

const inventoryItem = new PageModel()
const loginDetails = new LoginPageModel()

describe("My home page suite", () => {

    beforeEach(function () {
        cy.visit(Cypress.env("url"))
        loginDetails.loginDetails('standard')
        loginDetails.verifyTitleOfPage()
    })

    it('E2E flow from adding product till checkout', () => {
        inventoryItem.addProductItem('Sauce Labs Bike Light', 'Sauce Labs Backpack')
        inventoryItem.expectCartLinkPage()
        inventoryItem.clickCheckOutButton()
        inventoryItem.enterDetailsForCheckoutInformation('Rob', 'Drake', '2135')
        inventoryItem.checkoutOverview('Sauce Labs Bike Light', 'Sauce Labs Backpack')
        inventoryItem.clickFinishButton()
        inventoryItem.checkoutCompleteOrder()
    })

    it('Filters products by price in ascending order', () => {
        inventoryItem.verifyPriceListIsAscending()
    })

    it('Verify all links are working', () => {
        inventoryItem.verifyBrokenLink()
    })

    it('Cart updated', () => {
        inventoryItem.addProductItem('Sauce Labs Bolt T-Shirt', 'Sauce Labs Onesie')
        inventoryItem.productUpdateInCart()
    })
})