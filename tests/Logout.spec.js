const assert = require('assert');
const LoginPage = require('../pageobjects/login.page');

describe('Logout', () => {
  it('should log out and redirect to the login page', () => {
    LoginPage.open();
    LoginPage.login('standard_user', 'secret_sauce');

    const inventoryPageTitle = $('.#header_container > div.header_secondary_container > span'); 
    assert.equal(inventoryPageTitle.getText(), 'Products', 'Not logged in or not on the inventory page');

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
  });
});

