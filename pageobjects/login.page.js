class LoginPage {
    get usernameField() { return $('#Username'); } 
    get passwordField() { return $('#password'); } 
    get loginButton() { return $('#login-button'); } 

    constructor() {
        this.url = 'https://www.saucedemo.com';
    }

    async open() {
        await browser.url(this.url); // Используйте this.url
    }

    async login(username, password) {
        await this.usernameField.setValue(username);
        await this.passwordField.setValue(password);
        await this.loginButton.click();
    }
}

module.exports = new LoginPage();

