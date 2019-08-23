export default {
  path: '/default-object',
  async handler() {
    return {
      hello: 'default object world',
    };
  },
};
