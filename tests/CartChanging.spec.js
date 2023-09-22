const assert = require('assert');
cconst LoginPage = require('../pageobjects/login.page');

describe('Cart Changing', () => {
  it('should change the cart contents as expected', () => {
    LoginPage.open();
    LoginPage.login('standard_user', 'secret_sauce');

    const inventoryPageTitle = $('.#header_container > div.header_secondary_container'); 
    assert.equal(inventoryPageTitle.getText(), 'Products', 'Not logged in or not on the inventory page');

    const cartButton = $('[data-test="shopping-cart-button"]');
    cartButton.click();

    const cartPageTitle = $('.#cart_contents_container'); 
    assert.equal(cartPageTitle.getText(), 'Your Cart', 'Not on the cart page');

    const initialItemCount = $$('.cart_item').length;

    const addToCartButtons = $$('[data-test="add-to-cart"]');
    addToCartButtons[0].click();

    const itemCountAfterAdd = $$('.cart_item').length;
    assert.equal(itemCountAfterAdd, initialItemCount + 1, 'Item count did not increase by 1 after adding');

    addToCartButtons[1].click();
    addToCartButtons[2].click();

    const itemCountAfterMultipleAdd = $$('.cart_item').length;
    assert.equal(itemCountAfterMultipleAdd, initialItemCount + 3, 'Item count did not increase by 2 after adding multiple items');

    const removeButtons = $$('[data-test="remove"]');
    removeButtons[0].click();

    const itemCountAfterRemove = $$('.cart_item').length;
    assert.equal(itemCountAfterRemove, initialItemCount + 2, 'Item count did not decrease by 1 after removing');
  });
});
