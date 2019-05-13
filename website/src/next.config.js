const withSass = require('@zeit/next-sass');
const join = require('url-join');
const guides = require('../../guides/guides.json');

const { NODE_ENV, COMMIT_REF } = process.env;

const mappedURL = `https://raw.githubusercontent.com/ludicrousxyz/light/${COMMIT_REF || 'master'}`;

module.exports = withSass({
  async exportPathMap() {
    const routes = {
      '/': { page: '/' },
      '/guides/': { page: '/guides' },
      '/docs': { page: '/docs' },
      '/docs/': { page: '/docs' },
    };

    const processRoutes = (obj) => {
      Object.keys(obj).forEach((key) => {
        const guide = obj[key];
        if (typeof guide !== 'string') {
          return processRoutes(guide);
        }
        routes[join('/guides', guide)] = {
          page: '/guides',
          query: { title: guide },
        };
      });
    };

    processRoutes(guides);

    return routes;
  },
  env: {
    BASE_URL: NODE_ENV === 'development' ? 'http://localhost:8080' : mappedURL,
  },
});
