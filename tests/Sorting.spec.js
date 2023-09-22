const assert = require('assert');
const LoginPage = require('../pageobjects/login.page');

describe('Sorting', () => {
  it('should sort products by different criteria', () => {
    LoginPage.open();
    LoginPage.login('standard_user', 'secret_sauce');

    const inventoryPageTitle = $('.#header_container > div.header_secondary_container'); 
    assert.equal(inventoryPageTitle.getText(), 'Products', 'Not logged in or not on the inventory page');

    const sortingOptions = [
      'Price (low to high)',
      'Price (high to low)',
      'Name (A to Z)',
      'Name (Z to A)'
    ];

    for (const option of sortingOptions) {
      const sortDropdown = $('.#header_container > div.header_secondary_container > div > span > select'); 
      sortDropdown.selectByVisibleText(option);

      const productNames = $$('.#item_4_title_link > div'); 
      const sortedProductNames = productNames.map((element) => element.getText());

      if (option === 'Price (low to high)') {
        const sortedPrices = $$('.#inventory_container > div > div:nth-child(1) > div.inventory_item_description > div.pricebar > div'); 
        const sortedProductPrices = sortedPrices.map((element) => element.getText());

        for (let i = 0; i < sortedProductPrices.length - 1; i++) {
          const price1 = parseFloat(sortedProductPrices[i].replace('$', ''));
          const price2 = parseFloat(sortedProductPrices[i + 1].replace('$', ''));
          assert.ok(price1 <= price2, 'Products are not sorted correctly by price');
        }
      } else if (option === 'Price (high to low)') {
        const sortedPrices = $$('.#inventory_container > div > div:nth-child(1) > div.inventory_item_description > div.pricebar > div'); 
        const sortedProductPrices = sortedPrices.map((element) => element.getText());

        for (let i = 0; i < sortedProductPrices.length - 1; i++) {
          const price1 = parseFloat(sortedProductPrices[i].replace('$', ''));
          const price2 = parseFloat(sortedProductPrices[i + 1].replace('$', ''));
          assert.ok(price1 >= price2, 'Products are not sorted correctly by price');
        }
      } else if (option === 'Name (A to Z)') {
        sortedProductNames.forEach((name, index) => {
          if (index < sortedProductNames.length - 1) {
            assert.ok(name.localeCompare(sortedProductNames[index + 1]) <= 0, 'Products are not sorted correctly by name');
          }
        });
      } else if (option === 'Name (Z to A)') {
        sortedProductNames.forEach((name, index) => {
          if (index < sortedProductNames.length - 1) {
            assert.ok(name.localeCompare(sortedProductNames[index + 1]) >= 0, 'Products are not sorted correctly by name');
          }
        });
      }
    }
  });
});
