module.exports = {
  path: '/api/v1/extra/object',
  async handler() {
    return {
      hello: 'extra object world',
    };
  },
};
