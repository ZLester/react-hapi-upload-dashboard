const userController = require('./userController');
const userValidation = require('./userValidation');

module.exports = server => {
  server.route({
    method: 'POST',
    path: '/api/users',
    config: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
      },
      handler: userController.createOne,
      validate: userValidation.validateCreateOne,
    },
  });

  server.route({
    method: 'GET',
    path: '/api/users',
    config: {
      handler: userController.retrieve,
    },
  });

  server.route({
    method: 'DELETE',
    path: '/api/users',
    config: {
      handler: userController.delete,
    },
  });

  server.route({
    method: 'GET',
    path: '/api/users/{id}',
    config: {
      handler: userController.retrieveOne,
      validate: userValidation.validateId,
    },
  });

  server.route({
    method: 'DELETE',
    path: '/api/users/{id}',
    config: {
      handler: userController.deleteOne,
      validate: userValidation.validateId,
    },
  });

  server.route({
    method: 'GET',
    path: '/api/users/{id}/images',
    config: {
      handler: userController.retrieveUserImages,
      validate: userValidation.validateId,
    },
  });

  server.route({
    method: 'POST',
    path: '/api/users/{id}/images',
    config: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
      },
      handler: userController.addUserImage,
      validate: userValidation.validateAddImage,
    },
  });

  server.route({
    method: 'DELETE',
    path: '/api/users/{uId}/images/{iId}',
    config: {
      handler: userController.removeUserImage,
      validate: userValidation.validateRemoveImage,
    },
  });
};
