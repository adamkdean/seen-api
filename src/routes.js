const indexRoute = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply({ status: 'OK' });
  }
};

const filmsRoute = {
  method: 'GET',
  path: '/films',
  config: {
    handler: (request, reply) => {
      const when = request.query.when || 'last_week';
      reply([
        { title: 'test1', 'director': 'Adam', 'popularity': 1.0 },
        { title: 'test2', 'director': 'Kirsty', 'popularity': 0.7 }
      ]);
    }
  }
};

module.exports = exports = [
  indexRoute,
  filmsRoute
];
