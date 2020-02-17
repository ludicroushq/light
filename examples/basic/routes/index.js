const { useRoute } = require('light');

const { setHandler, addMiddleware, addPlugin } = useRoute('index');

console.log('required')

addMiddleware(() => console.log('hi'));
addPlugin((fn) => async (req, res) => {
  console.log('before');
  const result = await fn(req, res);
  console.log('after');
  return result;
});

const a = setHandler(async () => {
  return {
    hello: 'worldssdfa',
  };
});
console.log(a)

module.exports = a;
