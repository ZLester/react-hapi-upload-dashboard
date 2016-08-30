const Hapi = require('hapi');

const server = new Hapi.Server({
  connections: {
    router: {
      stripTrailingSlash: true,
    },
  },
});

require('./db');
require('./config')(server);
require('./routes')(server);

module.exports = server;
