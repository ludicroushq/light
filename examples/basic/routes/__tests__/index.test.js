const { createTest } = require('light');
const request = require('supertest');

// notice how we are just importing the one route and running the test on it?
// routes created with `createRoute` are nothing more than functions
const index = require('../index');
it('works with a singular import', async (done) => {
  expect.assertions(2);
  const response = await request(index).get('/');
  expect(response.status).toBe(200);
  expect(response.body).toBe({
    hello: 'world',
  });
  done();
});

// const server = createTest(index, {
//   path: '/graphql',
// });
// let url;

// beforeEach(async () => {
//   url = await server.listen();
// });

// afterEach(async () => {
//   server.close();
// });

// describe('user', () => {
//   describe('me', () => {
//     const query = `
//       {
//         me {
//           email
//         }
//       }
//     `;

//     describe('without user', () => {
//       it('returns null', async () => {
//         expect.assertions(2);
//         const { req, res } = await light.testGraphQL(url, query);
//         expect(req.status).toStrictEqual(200);
//         expect(res.data.me).toBe(null);
//       });
//     });

//     describe('with user', () => {
//       given('user', async () => createUser());

//       describe('without authorization header', () => {
//         it('returns null', async () => {
//           expect.assertions(2);
//           const { req, res } = await light.testGraphQL(url, query);
//           expect(req.status).toStrictEqual(200);
//           expect(res.data.me).toBe(null);
//         });
//       });

//       describe('with authorization header', () => {
//         given('token', () => 'hello');
//         given('accessToken', async () => createLinkedAccessToken(await given.user, given.token, given.accessTokenOptions));

//         it('returns the user', async () => {
//           await given.accessToken;
//           const user = await given.user;

//           expect.assertions(2);
//           const { req, res } = await light.testGraphQL(url, query, { headers: { Authorization: `Bearer ${given.token}` } });
//           expect(req.status).toStrictEqual(200);
//           expect(res.data.me.email).toBe(user.email);
//         });

//         describe('with expired token', () => {
//           it('returns null', async () => {
//             given('accessTokenOptions', () => ({ expires_at: new Date(Date.now()) }));
//             const accessToken = await given.accessToken;

//             expect.assertions(2);
//             const { req, res } = await light.testGraphQL(url, query, { headers: { Authorization: `Bearer ${accessToken.token}` } });
//             expect(req.status).toStrictEqual(200);
//             expect(res.data.me).toBe(null);
//           });
//         });
//       });
//     });
//   });
// });
