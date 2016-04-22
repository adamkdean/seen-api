const Hapi = require('hapi');
const server = new Hapi.Server();
const api = require('./api');

const httpHost = process.env.HTTP_HOST || '0.0.0.0';
const httpPort = process.env.HTTP_PORT || 8000;

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
}, async (err) => {
  if (err) console.error(err);

  await api.init();

  server.connection({ host: httpHost, port: httpPort });
  server.route(api.routes);
  server.start(() => console.log(`Server listening in ${server.info.uri}`));
});
