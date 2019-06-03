const withSass = require('@zeit/next-sass');
const join = require('url-join');
const guides = require('../../guides/guides.json');
const docs = require('../../docs/docs.json');

const { NODE_ENV, COMMIT_REF } = process.env;

const mappedURL = `https://raw.githubusercontent.com/ludicrousxyz/light/${COMMIT_REF || 'master'}`;

module.exports = withSass({
  async exportPathMap() {
    const routes = {
      '/': { page: '/' },
    };

    const processRoutes = (obj, prefix) => {
      Object.keys(obj).forEach((key) => {
        const guide = obj[key];
        if (typeof guide !== 'string') {
          return processRoutes(guide, prefix);
        }
        routes[join(prefix, guide)] = {
          page: prefix,
          query: { title: guide },
        };
        return null;
      });
    };

    processRoutes(guides, '/guides');
    processRoutes(docs, '/docs');

    return routes;
  },
  env: {
    BASE_URL: NODE_ENV === 'development' ? 'http://localhost:8080' : mappedURL,
  },
});
