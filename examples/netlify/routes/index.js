// IMPORTANT NOTE: You will need to set LIGHT_ENV=netlify in the Netlify Environment Variables settings
const { createRoute } = require('light');

module.exports = createRoute(() => {
  return {
    async GET() {
      return {
        hello: 'netlify!',
      }
    }
  }
})
