const LoginPage = require('../pageobjects/login.page');

describe('Valid Login', () => {
    before(() => {
       
        browser.waitUntil(() => {
            return browser.getUrl() === 'https://www.saucedemo.com/'; 
        }, { timeout: 10000, timeoutMsg: 'Страница не загрузилась' });
    });

    it('should allow a user to login with valid credentials', () => {
        LoginPage.open(); 
        LoginPage.login('problem_user', 'secret_sauce'); 

        
        const inventoryTitle = $('.title');
        const productItems = $$('.inventory_item');

        
        expect(inventoryTitle).toHaveText('PRODUCTS');

        expect(productItems).toBeElementsArrayOfSize({ gte: 1 });

        
    });
});

