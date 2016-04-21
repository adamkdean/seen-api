const Joi = require('joi');

const indexRoute = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply({ hello: 'world' });
  }
};

const testRoute = {
  method: 'GET',
  path: '/test',
  config: {
    handler: (request, reply) => {
      reply({ name: 'testRoute' });
    }
  }
};

module.exports = exports = [
  indexRoute,
  testRoute
];
