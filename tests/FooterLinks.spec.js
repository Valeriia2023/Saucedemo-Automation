const assert = require('assert');
const LoginPage = require('../pageobjects/login.page');

describe('Footer Links', () => {
  it('should open social media links in new tabs', () => {
    LoginPage.open();
    LoginPage.login('standard_user', 'secret_sauce');

    const inventoryPageTitle = $('.#header_container > div.header_secondary_container'); 
    assert.equal(inventoryPageTitle.getText(), 'Products', 'Not logged in or not on the inventory page');

    const footerLinks = $$('.#page_wrapper > footer > ul'); 
    const linkNames = ['Twitter', 'Facebook', 'LinkedIn'];
    
    for (let i = 0; i < footerLinks.length; i++) {
      browser.newWindow(footerLinks[i].getAttribute('href'));
      
      browser.switchWindow(linkNames[i]);
      
      assert.equal(browser.getUrl(), expectedSocialMediaUrls[i], `Incorrect URL for ${linkNames[i]}`);
      
      browser.closeWindow();
      
      browser.switchWindow(inventoryPageTitle);
    }
  });
});
