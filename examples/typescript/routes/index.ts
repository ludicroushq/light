import { createRoute } from 'light';

export default createRoute(({ useMiddleware }) => {
  useMiddleware((fn) => async (ctx) => {
    console.log('before');
    const result = await fn(ctx);
    console.log('after');
    return result;
  });

  return {
    async GET({ req }) {
      console.log(`receiving request at path: ${req.url}`);
      return {
        hello: 'world',
      };
    }
  }
})
