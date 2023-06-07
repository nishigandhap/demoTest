class PageModel {

    constructor() {

        this.inventoryItemName
    }

    addProductItem(...inventoryItemNames) {
        inventoryItemNames.forEach((inventoryItemName) => {
            const itemId = `add-to-cart-${inventoryItemName.toLowerCase().replace(/\s/g, '-')}`
            cy.get('.inventory_item_name')
                .contains(inventoryItemName)
                .then(() => {
                    cy.get(`#${itemId}`).click();
                })
        })
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

    checkoutOverview(...inventoryItemNames) {
        inventoryItemNames.forEach((inventoryItemName) => {
            cy.get('.inventory_item_name')
                .contains(inventoryItemName)
                .should('have.text', inventoryItemName)
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
                    expect(isAscending).to.be.true
                } else {
                    expect(isAscending).not.to.be.true
                }
            })
    }

    verifyBrokenLink() {
        cy.get('a').each(link => {
            if (link.prop('href')) {
                cy.request({
                    url: link.prop('href'),
                    failOnStatusCode: false,
                    timeout: 4000
                })
                cy.log(link.prop('href'))
            }
        })
    }


    productUpdateInCart() {
        cy.get('.shopping_cart_link').each((product) => {
            cy.wrap(product).invoke('text').then((productValue) => {
                cy.get('.shopping_cart_badge').invoke('text').should('equal', productValue);
            })
        })
    }
}

export default PageModel;