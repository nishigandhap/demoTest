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
    Api_url: "https://api.typeform.com/",
    apiToken: 'tfp_DVj7dAbN4mygb7r5SAXL8oF2Qh9FRFCs99sRRSec4n4R_3pcoU8wFxZuGh9'

  },
  chromeWebSecurity: false,

});
