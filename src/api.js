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
            when: Joi.string()
                     .valid(['last_week', 'last_month', 'last_year', 'all_time'])
                     .default('last_week')
          })
        },
        handler: async (request, reply) => {
          const when = request.query.when;
          const sortOptions = {};
          sortOptions[`popularity_${when}`] = -1;

          const cursor = await api.db.collection('films').find().sort(sortOptions);
          const array = [];

          cursor.each((err, film) => {
            if (film === null) return reply(array);
            array.push({
              slug: film.slug,
              title: film.title,
              director: film.director,
              score: film.vote_average,
              overview: film.overview,
              poster_path: film.poster_path,
              length: film.length
            });
          });
        }
      }
    },
    {
      method: 'GET',
      path: '/film/{slug}',
      config: {
        validate: {
          params: Joi.object({
            slug: Joi.string().required()
          })
        },
        handler: async (request, reply) => {
          const film = await api.db.collection('films').findOne({ slug: request.params.slug });

          if (film === null) return reply({ error: 'Not Found'}).statusCode(404);
          reply({
            slug: film.slug,
            title: film.title,
            director: film.director,
            score: film.vote_average,
            overview: film.overview,
            poster_path: film.poster_path,
            length: film.length
          });
        }
      }
    },
    {
      method: 'GET',
      path: '/reviews',
      config: {
        validate: {
          query: Joi.object({
            when: Joi.string()
                     .valid(['last_week', 'last_month', 'last_year', 'all_time'])
                     .default('last_week')
          })
        },
        handler: async (request, reply) => {
          const when = request.query.when;
          const sortOptions = {};
          sortOptions[`popularity_${when}`] = -1;

          const cursor = await api.db.collection('reviews').find().sort(sortOptions);
          const array = [];

          cursor.each((err, review) => {
            if (review === null) return reply(array);
            array.push({
              filmSlug: review.filmSlug,
              author: review.author,
              content: review.content
            });
          });
        }
      }
    },
    {
      method: 'GET',
      path: '/reviews/{slug}',
      config: {
        validate: {
          params: Joi.object({
            slug: Joi.string().required()
          })
        },
        handler: async (request, reply) => {
          const cursor = await api.db.collection('reviews').find({ filmSlug: request.params.slug });
          const array = [];

          cursor.each((err, review) => {
            if (review === null) return reply(array);
            array.push({
              filmSlug: review.filmSlug,
              author: review.author,
              content: review.content
            });
          });
        }
      }
    }
  ]
};

module.exports = exports = api;
