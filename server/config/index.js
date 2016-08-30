const Inert = require('inert');
const { PORT } = require('../env');

module.exports = server => {
  server.register(Inert, () => {});
  server.connection({ port: PORT });
};
