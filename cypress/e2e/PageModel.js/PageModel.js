class PageModel {

    constructor() {

        this.inventoryItemName
    }

    expectInventoryItemName(inventoryItemName) {

        return cy.get('#inventory_container').each((item, index, list) => {
            const verifyInventoryItemName = item.find('.inventory_item_name').text()
            if (verifyInventoryItemName.includes(inventoryItemName)) {
                cy.contains(inventoryItemName).should('be.visible').then(function (inventoryItemName) {
                    cy.log(inventoryItemName.text())
                })
            }
        })
    }

    addInventoryItemToCart() {
        return cy.get('#add-to-cart-sauce-labs-bike-light').click();
    }

    cartLink() {
        return cy.get('.shopping_cart_link').click()
    }

    expectCartLinkPage() {
        this.cartLink()
        cy.get('.title').should('have.text', 'Your Cart')

    }

    clickCheckOutButton() {
        cy.get('#checkout').click()
        cy.get('.title').should('have.text', 'Checkout: Your Information')
    }

    enterDetailsForCheckoutInformation(firstName, LastName, postCode) {
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(LastName)
        cy.get('#postal-code').type(postCode)
        cy.get('#continue').click()
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

        cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER')
    }

    verifyPriceListIsAscending() {
        cy.get('.product_sort_container').select(2)
        let prices = []
        cy.get('.inventory_item_price').each((el) => {
            let price = parseFloat(el.text().replace(/\$/g, ""))
            prices.push(price)
        }).then(() => {
            cy.wrap(prices)
            //prices.sort((a,b)=> b-a)
            let isAscending = true;
            for (let i = 0; i < prices.length - 1; i++) {
                if (prices[i] > prices[i + 1]) {
                    isAscending = false;
                    break;
                }
            }
            if (isAscending) {
                cy.log('Ascending');
            } else {
                cy.log('List is not ascending');
            }
        })

    }

}

export default PageModel;





