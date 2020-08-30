const fastify = require('fastify')();

fastify.get('/', async (request, reply) => {
  reply.type('application/json').code(200);
  return { hello: 'world' };
});

module.exports = fastify;
