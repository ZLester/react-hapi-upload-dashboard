const Joi = require('joi');

// Placeholders
const isValidDocId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const isValidName = Joi.string();
const isValidPhoneNumber = Joi.any();
const isValidImage = Joi.any();

exports.validateId = {
  params: {
    id: isValidDocId,
  },
};

exports.validateCreateOne = {
  payload: {
    firstName: isValidName,
    lastName: isValidName,
    phoneNumber: isValidPhoneNumber,
    image: isValidImage,
  },
};

exports.validateAddImage = {
  params: {
    id: isValidDocId,
  },
  payload: {
    image: isValidImage,
  },
};

exports.validateRemoveImage = {
  params: {
    uId: isValidDocId,
    iId: isValidDocId,
  },
};
