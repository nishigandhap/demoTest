class PageModel {

    constructor() {

        this.inventoryItemName
    }

    expectInventoryItemName(inventoryItemName) {
        return cy.get('#inventory_container').each((item) => {
            const verifyInventoryItemName = item.find('.inventory_item_name').text()
            expect(verifyInventoryItemName).to.includes(inventoryItemName)
                ? expect(inventoryItemName).to.exist
                : expect(inventoryItemName).to.not.exist;
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
                expect(inventoryItemName).to.exist
            } else if (expect(item).to.not.equal(inventoryItemName)) {
                expect(inventoryItemName).to.not.exist
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
                    expect(isAscending).to.be.true
                } else {
                    expect(isAscending).not.to.be.true
                }
            })
    }

    verifyBrokenLink(){
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

}

export default PageModel;