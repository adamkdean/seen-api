require('nomoreunhandledrejections')();

const Joi = require('joi');
const mongodb = require('mongodb').MongoClient;

const api = {

  db: null,

  init: async () => {
    api.db = await mongodb.connect(process.env.MONGODB_URI);
  },

  routes: [
    {
      method: 'GET',
      path: '/',
      config: {
        handler: (request, reply) => {
          reply({ status: 'OK' });
        }
      }
    },
    {
      method: 'GET',
      path: '/films',
      config: {
        validate: {
          query: Joi.object({
            when: Joi.string().default('last_week')
          })
        },
        handler: (request, reply) => {
          const when = request.query.when;
          reply([
            { title: 'test1', 'director': 'Adam', 'popularity': 1.0 },
            { title: 'test2', 'director': 'Kirsty', 'popularity': 0.7 }
          ]);
        }
      }
    },
    {
      method: 'GET',
      path: '/film/{slug}',
      config: {
        validate: {
          params: Joi.object({
            slug: Joi.string()
          })
        },
        handler: (request, reply) => {
          reply({ 'error': 'Not implemented' })
            .statusCode(404);
        }
      }
    },
    {
      method: 'GET',
      path: '/review/{slug}',
      config: {
        validate: {
          params: Joi.object({
            slug: Joi.string()
          })
        },
        handler: (request, reply) => {
          reply({ 'error': 'Not implemented' })
            .statusCode(404);
        }
      }
    }
  ]
};

module.exports = exports = api;
