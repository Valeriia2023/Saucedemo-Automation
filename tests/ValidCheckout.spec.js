const assert = require('assert');
const LoginPage = require('../pageobjects/login.page');

describe('Valid Checkout', () => {
  it('should complete a valid checkout process', () => {
    LoginPage.open();
    LoginPage.login('standard_user', 'secret_sauce');

    const inventoryPageTitle = $('.#header_container > div.header_secondary_container'); 
    assert.equal(inventoryPageTitle.getText(), 'Products', 'Not logged in or not on the inventory page');

    const addToCartButton = $('[data-test="add-to-cart-sauce-labs-backpack"]');
    addToCartButton.click();

    const cartItemCount = $('.shopping_cart_badge');
    assert.equal(cartItemCount.getText(), '1', 'Item count did not increase');

    const cartButton = $('[data-test="shopping-cart-button"]');
    cartButton.click();

    const cartPageTitle = $('.#cart_contents_container');
    assert.equal(cartPageTitle.getText(), 'Your Cart', 'Not on the cart page');

    const checkoutButton = $('[data-test="checkout"]');
    checkoutButton.click();

    const checkoutPageTitle = $('.#checkout_info_container'); 
    assert.equal(checkoutPageTitle.getText(), 'Checkout: Your Information', 'Not on the checkout page');

    const firstNameField = $('[data-test="firstName"]');
    const lastNameField = $('[data-test="lastName"]');
    const postalCodeField = $('[data-test="postalCode"]');
    const continueButton = $('[data-test="continue"]');

    firstNameField.setValue('John'); 
    lastNameField.setValue('Doe'); 
    postalCodeField.setValue('10110'); 
    continueButton.click();

    const overviewPageTitle = $('.#checkout_summary_container'); 
    assert.equal(overviewPageTitle.getText(), 'Checkout: Overview', 'Not on the overview page');

    const productInOverview = $('[data-test="item_4_title_link"]');
    assert.equal(productInOverview.getText(), 'Sauce Labs Backpack', 'Product in overview does not match cart');

    const totalAmount = $('.summary_total_label');
    assert.equal(totalAmount.getText(), 'Total: $29.99', 'Total amount is incorrect');

    const finishButton = $('[data-test="finish"]');
    finishButton.click();

    const completePageTitle = $('.#checkout_complete_container'); 
    assert.equal(completePageTitle.getText(), 'Finish', 'Not on the complete page');

    const thankYouMessage = $('.complete-header');
    assert.equal(thankYouMessage.getText(), 'THANK YOU FOR YOUR ORDER', 'Thank you message is not displayed');

    const backHomeButton = $('[data-test="back-to-products"]');
    backHomeButton.click();

    assert.equal(cartItemCount.getText(), '', 'Cart is not empty after completing the order');
  });
});
