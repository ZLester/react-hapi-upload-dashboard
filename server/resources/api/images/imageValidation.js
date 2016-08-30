const Joi = require('joi');

const isValidMongooseId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

exports.validateRetrieveOne = {
  params: {
    id: isValidMongooseId,
  },
};
