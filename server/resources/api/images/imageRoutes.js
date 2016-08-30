const imageController = require('./imageController');
const imageValidation = require('./imageValidation');

module.exports = server => {
  server.route({
    method: 'GET',
    path: '/api/images',
    config: {
      handler: imageController.retrieve,
    },
  });

  server.route({
    method: 'DELETE',
    path: '/api/images',
    config: {
      handler: imageController.delete,
    },
  });

  server.route({
    method: 'GET',
    path: '/api/images/{id}',
    config: {
      handler: imageController.retrieveOne,
      validate: imageValidation.validateRetrieveOne,
    },
  });
};
