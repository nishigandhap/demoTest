class PageModel {

    constructor() {

        this.inventoryItemName
    }

    expectInventoryItemName(inventoryItemName) {
        return cy.get('#inventory_container').each((item) => {
            const verifyInventoryItemName = item.find('.inventory_item_name').text()
            if (verifyInventoryItemName.includes(inventoryItemName)) {
                cy.contains(inventoryItemName).should('be.visible').then(function (inventoryItemName) {
                    cy.log(inventoryItemName.text())
                })
            }
        })
    }

    addInventoryItemToCart() {
        cy.get('#add-to-cart-sauce-labs-bike-light').click();
    }

    cartLink() {
         cy.get('.shopping_cart_link').click()
    }

    expectCartLinkPage() {
        this.cartLink()
        cy.get('.title').should('have.text', 'Your Cart')
    }

    clickCheckOutButton() {
        cy.get('#checkout').click()
        cy.get('.title').should('have.text', 'Checkout: Your Information')
    }

    enterDetailsForCheckoutInformation(firstName, lastName, postCode) {
        cy.get('#first-name')
            .type(firstName)
            .get('#last-name')
            .type(lastName)
            .get('#postal-code')
            .type(postCode)
            .get('#continue')
            .click();
    }

    checkoutOverview(inventoryItemName) {
        cy.get('.inventory_item_name').each((item) => {
            if (item.text() === inventoryItemName) {
                cy.contains(inventoryItemName).should('be.visible')
                cy.log(inventoryItemName)
            } else if (expect(item).to.not.equal(inventoryItemName)) {
                cy.log('Inventory not found')
            }
        })
    }

    clickFinishButton() {
        cy.get('#finish').click()
    }

    checkoutCompleteOrder() {
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
    }

    verifyPriceListIsAscending() {
        cy.get('.product_sort_container').select(2);
        cy.get('.inventory_item_price')
            .invoke('text')
            .then((pricesText) => {
                const prices = pricesText.split(/\$/).filter(Boolean).map(parseFloat)
                const isAscending = prices.every((price, index) => index === 0 || price >= prices[index - 1]);
                if (isAscending) {
                    cy.log('Ascending');
                } else {
                    cy.log('Not ascending');
                }
            })
    }

}

export default PageModel;

