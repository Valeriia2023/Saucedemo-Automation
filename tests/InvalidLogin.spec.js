const assert = require('assert');
const LoginPage = require('../pageobjects/login.page');

describe('Login with invalid login', () => {
  it('should display an error message for invalid login', () => {
    
    LoginPage.open();

    LoginPage.login('standarD_user', 'secret_sauce');

    const errorMessage = $('.#login_button_container > div > form > div.error-message-container.error > h3'); 
    assert.equal(errorMessage.isDisplayed(), true, 'Error message is not displayed');

    const loginField = LoginPage.usernameField; 
    const loginFieldBorderColor = loginField.getCSSProperty('border-color'); 
    assert.equal(loginFieldBorderColor.parsed.hex, '#ff0000', 'Login field border color is not red');

    const passwordField = LoginPage.passwordField; 
    const passwordFieldBorderColor = passwordField.getCSSProperty('border-color'); 
    assert.equal(passwordFieldBorderColor.parsed.hex, '#ff0000', 'Password field border color is not red');

    const errorMessageText = errorMessage.getText();
    assert.equal(errorMessageText, 'Epic sadface: Username and password do not match any user in this service', 'Error message text is incorrect');
  });
});

