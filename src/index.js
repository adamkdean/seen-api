const Hapi = require('hapi');
const server = new Hapi.Server();
const routes = require('./routes');

const httpHost = process.env.HTTP_HOST || '0.0.0.0';
const httpPort = process.env.HTTP_PORT || 8000;

const init = (err) => {
  if (err) console.error(err);

  console.log('connect to mongodb first?');

  server.start(() => console.log(`Server listening in ${server.info.uri}`));
};

server.connection({ host: httpHost, port: httpPort });
server.route(routes);
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
}, init);
