const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/2-advanced-examples/*.js',
  },

  env: {

    url : 'https://www.saucedemo.com/',

  },
  chromeWebSecurity: false,

});
