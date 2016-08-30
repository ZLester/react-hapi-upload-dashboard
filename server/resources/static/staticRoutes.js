const { STATIC_PATH } = require('../../env');

module.exports = server => {
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: STATIC_PATH,
        index: true,
        listing: true,
      },
    },
  });
};
