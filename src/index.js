const hapi = require('hapi');
const server = new hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply({ status: 'OK' });
  }
});

server.register({
  register: require('good'),
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        log: '*',
        response: '*'
      }
    }]
  }
}, (err) => {
  if (err) console.error(err);
  server.start(() => console.log(`Server listening in ${server.info.uri}`));
});
