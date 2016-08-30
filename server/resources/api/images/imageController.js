const Promise = require('bluebird');
const Image = require('./Image');
const { internal, notFound } = require('../../errors');
const { handleResponse, handleError } = require('../utils');

exports.retrieve = (req, reply) => {
  Image.find({})
    .populate('user')
    .then(images => handleResponse(reply, images))
    .catch(err => handleError(reply, internal, 500, err));
};

exports.retrieveOne = (req, reply) => {
  const { id } = req.params;
  Image.findById(id)
    .populate('user')
    .then(image => {
      if (!image) {
        return handleError(reply, notFound, 404);
      }
      handleResponse(reply, image);
    })
    .catch(err => handleError(reply, internal, 500, err));
};

exports.delete = (req, reply) => {
  Image.find({})
    .populate('user')
    .then(images => Promise.all([images, Image.remove({})]))
    .spread(removedImages => handleResponse(reply, removedImages))
    .catch(err => handleError(reply, internal, 500, err));
};
