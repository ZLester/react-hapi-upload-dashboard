const Mongoose = require('mongoose');
const Promise = require('bluebird');
const Path = require('path');
const request = require('supertest');
const logger = require('winston');
const exec = Promise.promisify(require('child_process').exec);

const server = require('../../server.js');

const { STORAGE_PATH } = require('../../env');

const stubUsers = [
  {
    firstName: 'Bill',
    lastName: 'Gates',
    phoneNumber: '5554441234',
    imagePath: './gates.jpg',
  },
  {
    firstName: 'Steve',
    lastName: 'Wozniak',
    phoneNumber: '2225551234',
    imagePath: './woz.jpeg',
  },
  {
    firstName: 'Linus',
    lastName: 'Torvalds',
    phoneNumber: '3337771234',
    imagePath: './torvalds.png',
  },
];

const deleteUsers = () => (
  new Promise((resolve, reject) => {
    request(server.listener).del('/api/users')
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
  })
);

const seedDb = users => (
  // Delete all images in /dist/images
  exec(`rm -r ${STORAGE_PATH} && mkdir ${STORAGE_PATH}`)
    .then(() => deleteUsers())
    .then(() => {
      const createUsers = users.map(user => {
        return new Promise((resolve, reject) => {
          request(server.listener).post('/api/users')
            .type('form')
            .field('firstName', user.firstName)
            .field('lastName', user.lastName)
            .field('phoneNumber', user.phoneNumber)
            .attach('image', Path.join(__dirname, user.imagePath))
            .end((err, res) => {
              if (err) {
                return reject(err);
              }
              resolve(res);
            });
          });
      })
      return Promise.all(createUsers);
    })
);

seedDb(stubUsers)
  .then(() => {
    server.stop(() => {
      logger.info('Seeded Database');
      Mongoose.connection.close();
    });
  })
  .catch(err => {
    server.stop(() => {
      logger.error(err);
      logger.error('Error Seeding Database');
      Mongoose.connection.close();
    });
  })

