const Mongoose = require('mongoose');
const Promise = require('bluebird');
const Path = require('path');
const request = require('supertest');
const logger = require('winston');

const server = require('../../server.js');

const stubUsers = [
  {
    firstName: 'Bill',
    lastName: 'Gates',
    phoneNumber: '5554441234',
  },
  {
    firstName: 'Steve',
    lastName: 'Wozniak',
    phoneNumber: '2225551234',
  },
  {
    firstName: 'Linus',
    lastName: 'Torvalds',
    phoneNumber: '3337771234',
  },
];

const stubImages = [
  './gates.jpg',
  './torvalds.png',
  './woz.jpeg',
];

const deleteUsers = () => {
  return new Promise((resolve, reject) => {
    request(server.listener).del('/api/users')
    .end((err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};

const seedDb = (users, images) => {
  return deleteUsers()
    .then(() => {
      const createUsers = stubUsers.map((user, index) => {
        return new Promise((resolve, reject) => {
          request(server.listener).post('/api/users')
            .type('form')
            .field('firstName', user.firstName)
            .field('lastName', user.lastName)
            .field('phoneNumber', user.phoneNumber)
            .attach('image', Path.join(__dirname, stubImages[index]))
            .end((err, res) => {
              if (err) {
                return reject(err);
              }
              resolve(res);
            });
          });
      })
      return Promise.all(createUsers);
    });
};

server.start(() => {
  seedDb(stubUsers, stubImages)
    .then(() => {
      server.stop(() => {
        logger.info('Seeded Database');
        process.exit();
      });
    })
    .catch(err => {
      server.stop(() => {
        logger.error(err);
        logger.error('Error Seeding Database');
        process.exit();
      });
    })
});

