const assert = require('assert');
const LoginPage = require('../pageobjects/login.page');

describe('Saving the cart after logout', () => {
  it('should save the cart after logout and login again', () => {
    LoginPage.open();
    LoginPage.login('standard_user', 'secret_sauce');

    const inventoryPageTitle = $('.#header_container > div.header_secondary_container > span');
    assert.equal(inventoryPageTitle.getText(), 'Products', 'Not logged in or not on the inventory page');

    const addToCartButton = $('.#add-to-cart-sauce-labs-backpack');
    addToCartButton.click();

    const cartItemCount = $('.#shopping_cart_container > a > span');
    assert.equal(cartItemCount.getText(), '1', 'Cart count did not increase');

    const burgerButton = $('.#react-burger-menu-btn'); 
    
    burgerButton.click();

    const menuItems = $$('.#inventory_sidebar_link','.#about_sidebar_link','.#logout_sidebar_link','.#reset_sidebar_link'); 
    assert.equal(menuItems.length, 4, 'Menu is not expanded or does not have 4 items');

    const logoutButton = $('.#logout_sidebar_link'); 
    logoutButton.click();

    const loginPageTitle = $('.#root > div'); 
    assert.equal(loginPageTitle.isDisplayed(), true, 'Not redirected to login page');

    const usernameField = LoginPage.usernameField;
    const passwordField = LoginPage.passwordField;
    assert.equal(usernameField.getValue(), '', 'Username field is not empty');
    assert.equal(passwordField.getValue(), '', 'Password field is not empty');

    LoginPage.login('standard_user', 'secret_sauce');

    assert.equal(inventoryPageTitle.getText(), 'Products', 'Not logged in or not on the inventory page after login');
    assert.equal(cartItemCount.getText(), '1', 'Cart count is not preserved after login');

    const cartButton = $('.#shopping_cart_container > a'); 
    cartButton.click();

    const cartPageTitle = $('.#cart_contents_container'); 
    assert.equal(cartPageTitle.getText(), 'Your Cart', 'Not on the cart page');
    const cartItemName = $('.#item_4_title_link > div'); 
    assert.equal(cartItemName.getText(), 'Sauce Labs Backpack', 'Cart item is not as expected');
  });
});
