const assert = require('assert');
const LoginPage = require('../pageobjects/login.page');

describe('Checkout without Products', () => {
  it('should not allow checkout when the cart is empty', () => {
    LoginPage.open();
    LoginPage.login('standard_user', 'secret_sauce');

    const inventoryPageTitle = $('.#header_container > div.header_secondary_container'); 
    assert.equal(inventoryPageTitle.getText(), 'Products', 'Not logged in or not on the inventory page');

    const cartButton = $('[data-test="shopping-cart-button"]');
    cartButton.click();

    const cartPageTitle = $('.#cart_contents_container'); 
    assert.equal(cartPageTitle.getText(), 'Your Cart', 'Not on the cart page');

    const checkoutButton = $('[data-test="checkout"]');
    checkoutButton.click();

    const emptyCartMessage = $('.cart_empty_label');
    assert.equal(emptyCartMessage.getText(), 'Your cart is empty', 'Empty cart message is not displayed');

    const cartPageTitleAfterCheckout = $('.subheader');
    assert.equal(cartPageTitleAfterCheckout.getText(), 'Your Cart', 'Not on the cart page after checkout attempt');
  });
});
