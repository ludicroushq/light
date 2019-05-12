const withSass = require('@zeit/next-sass');
const { join } = require('path');
const guides = require('../../guides/guides.json');

const { NODE_ENV, COMMIT_REF } = process.env;

const mappedURL = `https://raw.githubusercontent.com/ludicrousxyz/light/${COMMIT_REF || 'master'}`;

module.exports = withSass({
  async exportPathMap() {
    const routes = {
      '/': { page: '/' },
      '/guides/': { page: '/guides' },
    };

    guides.forEach((guide) => {
      routes[join('/guides', guide)] = {
        page: '/guides',
        query: { title: guide },
      };
    });

    return routes;
  },
  env: {
    BASE_URL: NODE_ENV === 'development' ? 'http://localhost:8080' : mappedURL,
  },
});
