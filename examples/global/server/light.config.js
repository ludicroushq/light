module.exports = {
  global: {
    middleware() {
      console.log('hello world');
    },
    plugin(fn) {
      return async (req, res) => {
        console.log('before');
        const result = await fn(req, res);
        console.log('after');
        return result;
      };
    },
  },
};
