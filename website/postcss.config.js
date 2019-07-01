const tailwindcss = require("tailwindcss");
const postcssNesting = require('postcss-nesting');

module.exports = {
  plugins: [
    postcssNesting(),
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer")
  ]
};
