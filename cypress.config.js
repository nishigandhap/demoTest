const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.js',
  },

  env: {

    url: 'https://www.saucedemo.com/',
    Api_url: "https://api.typeform.com/"

  },
  chromeWebSecurity: false,

});
