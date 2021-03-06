const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const User = require('./User');
const Image = require('../images/Image');

const { internal, notFound } = require('../../errors');
const { handleResponse, handleError } = require('../utils');

const { STORAGE_PATH, RETRIEVAL_PATH } = require('../../../env');

const saveUserImage = (user, image) => (
  new Promise((resolve, reject) => {
    const { filename, headers } = image.hapi;
    // Create image instance with metadata
    const newImage = new Image({
      user: user._id,
      filename,
      headers,
    });
    // Add file path to instance for later retrieval
    newImage.filepath = RETRIEVAL_PATH + newImage._id + filename;
    const storagepath = STORAGE_PATH + newImage._id + filename;
    // Add reference to owning user
    user.images.push(newImage._id);
    // Create write stream and pipe image to file
    const file = fs.createWriteStream(storagepath);
    image.pipe(file);
    // Resolve on User and newly created Image instance to be saved
    image.on('end', resolve([user, newImage]));
    image.on('error', reject(new Error('Error Saving File')));
  })
);

exports.retrieve = (req, reply) => {
  User.find({})
    .populate('images')
    .then(users => handleResponse(reply, users))
    .catch(err => handleError(reply, internal, 500, err));
};

exports.retrieveOne = (req, reply) => {
  const { id } = req.params;
  User.findById(id)
    .populate('images')
    .then(user => {
      if (!user) {
        return handleError(reply, notFound, 404);
      }
      handleResponse(reply, user);
    })
    .catch(err => handleError(reply, internal, 500, err));
};

exports.createOne = (req, reply) => {
  const { firstName, lastName, phoneNumber, image } = req.payload;
  const newUser = { firstName, lastName, phoneNumber };
  User.create(newUser)
    .then(createdUser => saveUserImage(createdUser, image))
    .spread((createdUser, createdImage) => Promise.all([createdUser.save(), createdImage.save()]))
    .spread(savedUser => savedUser.populate('images').execPopulate())
    .then(populatedUser => handleResponse(reply, populatedUser, 201))
    .catch(err => handleError(reply, internal, 500, err));
};

exports.delete = (req, reply) => {
  User.find({})
    .then(foundUsers => Promise.all([foundUsers, User.remove({}), Image.remove({})]))
    .spread(removedUsers => handleResponse(reply, removedUsers, 200))
    .catch(err => handleError(reply, internal, 500, err));
};

exports.deleteOne = (req, reply) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .populate('images')
    .then(removedUser => {
      if (!removedUser) {
        return handleError(reply, notFound, 404);
      }
      // Remove all images associated with the user
      const removedAssociatedImages = removedUser.images.reduce((promises, image) => {
        // Remove from Mongo
        promises.push(Image.findByIdAndRemove(image._id));
        // Remove from filesystem
        promises.push(fs.unlinkAsync(STORAGE_PATH + image._id + image.filename));
        return promises;
      }, []);
      return Promise.all(removedAssociatedImages)
        .spread(() => handleResponse(reply, removedUser, 200));
    })
    .catch(err => handleError(reply, internal, 500, err));
};

exports.retrieveUserImages = (req, reply) => {
  const { id } = req.params;
  User.findById(id)
    .select('images')
    .populate('images')
    .then(foundUser => {
      if (!foundUser) {
        return handleError(reply, notFound, 404);
      }
      handleResponse(reply, foundUser.images);
    })
    .catch(err => handleError(reply, internal, 500, err));
};

exports.addUserImage = (req, reply) => {
  const { id } = req.params;
  const { image } = req.payload;
  User.findById(id)
    .then(foundUser => {
      if (!foundUser) {
        return handleError(reply, notFound, 404);
      }
      return foundUser;
    })
    .then(foundUser => saveUserImage(foundUser, image))
    .spread((foundUser, createdImage) => Promise.all([foundUser.save(), createdImage.save()]))
    .spread(updatedUser => updatedUser.populate('images').execPopulate())
    .then(populatedUser => handleResponse(reply, populatedUser, 201))
    .catch(err => handleError(reply, internal, 500, err));
};

exports.removeUserImage = (req, reply) => {
  const { userId, imageId } = req.params;
  Promise.all([User.findById(userId), Image.findById(imageId)])
    .spread((foundUser, foundImage) => {
      if (!foundUser || !foundImage) {
        return handleError(reply, notFound, 404);
      }
      // Delete image from collection/filesystem and update User
      return Promise.all([foundImage, Image.findByIdAndRemove(imageId), fs.unlinkAsync(STORAGE_PATH + foundImage._id + foundImage.filename), foundUser.save()])
        .spread(removedImage => handleResponse(reply, removedImage));
    })
    .catch(err => handleError(reply, internal, 500, err));
};
